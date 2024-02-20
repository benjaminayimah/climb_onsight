<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Climbing Experiences</div>
        <div>
            <div class="mb-8">Rate your proficiency in the following activities</div>
            <ul class="list br-16">
                <sign-up-activities-list v-for="activity in form.activities" :key="activity.id" :activity="activity" @change-val="changeVal" />
            </ul>
        </div>
        <div>
            <div class="mb-8">Skills I know</div>
            <ul class="mb-16 pill flx gap-16">
                <sign-up-skills-list v-for="skill in skills" :key="skill" :skill="skill" :selectedSkills="form.skills" @select-skill="selectSkill"/>
            </ul>
            <div class="flx jc-sb ai-c mb-8">
                <div class="label">Add more</div>
                <span class="gray fs-08">Seperated with a comma</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.type_yours" type="text" name="skills" id="skills" placeholder="Add more" class="form-control">
            </div>
        </div>
        <error-display-card v-if="validation.error" :errors="validation.errors"/>
        <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c">
            <span>Continue</span>
        </button>
        <router-link :to="{ name: 'ClimberPersonalInfo'}" class="w-100 a-button">Back</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SignUpSkillsList from '@/components/includes/SignUpSkillsList.vue'
import SignUpActivitiesList from '@/components/includes/SignUpActivitiesList.vue'
import ErrorDisplayCard from '@/components/includes/ErrorDisplayCard.vue'
import inputValidation from '@/mixins/inputValidation'
export default {
    components: { SignUpSkillsList, SignUpActivitiesList, ErrorDisplayCard },
    name: 'ClimberClimbingExperience',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            skills: (state) => state.data.climberSkills,
            newUser: (state) => state.newUser
        }),
    },
    data() {
        return {
            form: {
                skills: [],
                activities: [],
                type_yours: '',
            },
        }
    },
    methods: {
        async updateNewUser() {
            this.validation.error ? this.clearErrs() : ''
            let errors = {}
            if(!this.form.skills.length && !this.form.type_yours) {
                errors.skill = ['Select at least one skill form the list or type yours in the field.']
                this.showErr(errors)
            }else {
                await this.$store.commit('updateClimbingExp', this.form)
                this.$router.push({ name: 'ClimberFunFacts' })
            }
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
            this.newUser && this.newUser.type_yours ? this.form.type_yours = this.newUser.type_yours : ''
            if (this.newUser && this.newUser.activities) {
                this.form.activities = this.newUser.activities
            }else {
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
    margin-right: -20px;
    margin-left: -20px;

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