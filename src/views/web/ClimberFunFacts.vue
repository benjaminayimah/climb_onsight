<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Fun facts</div>
        <div>
            <div class="mb-8">Tell us fun facts about your climbing experience</div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.bio" class="w-100 form-control" name="funfact" rows="4" placeholder="Type here..."></textarea>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c">
                <span>Continue</span>
            </button>
            <router-link :to="{ name: 'ClimberClimbingExp'}" class="w-100 a-button mt-16">Back</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ClimberFunFacts',
    computed: {
        ...mapState({
            newUser: (state) => state.newUser
        })
    },
    data() {
        return {
            form: {
                bio: '',
            }
        }
    },
    methods: {
        async updateNewUser() {
            await this.$store.commit('updateBio', this.form)
            this.$router.push({ name: 'ClimberInterestedSkills' })
        },
        presetForm() {
            this.newUser.bio ? this.form.bio = this.newUser.bio : ''
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>

</style>