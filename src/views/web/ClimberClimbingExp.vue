<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Climbing Experiences</div>
        <div>
            <div class="mb-8">Select your proficiency with the following activities</div>
            <ul class="list br-16">
                <sign-up-activities-list v-for="activity in form.activities" :key="activity.id" :activity="activity" @change-val="changeVal" />
            </ul>
        </div>
        <div>
            <div class="mb-8">Skills i know</div>
            <ul class="mb-16 pill flx gap-16">
                <sign-up-skills-list v-for="skill in computedSkills" :key="skill" :skill="skill" :selectedSkills="form.skills" @select-skill="selectSkill"/>
            </ul>
            <div class="input-wrapper">
                <input v-model="typeYours" type="text" name="skills" id="skills" placeholder="Enter yours" class="form-control">
            </div>
        </div>
        <button @click="updateNewUser" :to="{ name: 'ClimberFunFacts'}" class="button-primary gap-8 w-100 btn-lg ai-c">
            <span>Continue</span>
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SignUpSkillsList from '@/components/includes/SignUpSkillsList.vue'
import SignUpActivitiesList from '@/components/includes/SignUpActivitiesList.vue'
export default {
    components: { SignUpSkillsList, SignUpActivitiesList },
    name: 'ClimberClimbingExperience',
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            skills: (state) => state.data.climberSkills,
            newUser: (state) => state.newUser.form
        }),
        computedSkills() {
            const totalSkils = this.skills
            const mySkills = JSON.parse(localStorage.getItem('newUser')).form.skills
            if(mySkills)
            return [...new Set([...totalSkils, ...mySkills])];
            else
            return totalSkils
        },
    },
    data() {
        return {
            typeYours: '',
            form: {
                skills: [],
                activities: []
            },
        }
    },
    methods: {
        async updateNewUser() {
            this.typeYours ? this.form.skills.push(this.typeYours) : ''
            await this.$store.commit('updateClimbingExp', this.form)
            this.$router.push({ name: 'ClimberFunFacts' })
        },
        selectSkill(payload) {
            const i = this.form.skills.find(data => data === payload)
            if (i) {
                this.form.skills = this.form.skills.filter(x => x !== i)
            } else {
                this.form.skills.push(payload)
            }
        },
        changeVal(payload) {
            let activity = this.form.activities.find(data => data.name === payload.name)
            activity.level = payload.level
        },
        presetForm() {
            this.newUser && this.newUser.skills ? this.form.skills = this.newUser.skills : ''
            this.newUser.activities ? this.form.activities = this.newUser.activities : ''
            if(!this.newUser.activities) {
                this.form.activities = [
                    { name: 'Bouldering', level: 0 },
                    { name: 'Ice climbing', level: 0 },
                    { name: 'Outdoor climbing', level: 0 },
                    { name: 'Trad', level: 0 }
                ]
            }
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>
ul.list {
    border: 1px solid #D9D9D9;
    overflow: hidden;
}
ul.pill {
    flex-wrap: wrap;
    margin-right: -12px;
    margin-left: -12px;

    li {
        cursor: pointer;
        padding: 12px 32px;
        border-radius: 16px;
        border-radius: 1.25rem;
        border: 1px solid #D9D9D9;
        &:hover {
            background-color: #f2f2f7;
        }
    }
}
</style>