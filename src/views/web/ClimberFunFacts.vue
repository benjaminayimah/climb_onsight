<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Fun facts</div>
        <div>
            <div class="mb-8">Tell us fun facts about your climbing experience</div>
            <div class="input-wrapper mb-16">
                <textarea v-model="form.bio" class="w-100 form-control" name="funfact" rows="4" placeholder="Type here..." :class="{ 'error-border': validation.errors.bio }"></textarea>
                <span class="input-error" v-if="validation.error && validation.errors.bio">
                    {{ validation.errors.bio[0] }}
                </span>
            </div>
            <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c">
                <span>Continue</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import inputValidation from '@/mixins/inputValidation'
export default {
    name: 'ClimberFunFacts',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            newUser: (state) => state.newUser.form
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
            let errors = { bio: ''}
            if(this.form.bio == '') {
                errors.bio = ['This field is required']
                this.showErr(errors)
            }else {
                await this.$store.commit('updateBio', this.form)
                this.$router.push({ name: 'ClimberInterestedSkills' })
            }
        },
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
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