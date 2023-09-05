<template>
    <div class="logon-column-wrapper flx column ai-c jc-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-24">
            <div class="ff-2">CLIMB ONSIGHT</div>
            <div class="w-100 flx column gap-24">
                <div class="text-center">
                    <div class="fw-700 fs-2rem">Welcome</div>
                    <div>Sign up to climb on sight</div>
                </div>
                <form @submit.prevent="signUp">
                    <!-- <div v-if="userError.error" class="invalid-credentials response-message text-center mb-32">
                        <span>{{ userError.message }}</span>
                    </div> -->
                    <div class="form-wrapper flx column gap-24">
                        <div class="form-row column">
                            <label for="email">Email</label>
                            <div class="input-wrapper">
                                <input v-model="form.email" class="form-control" :class="{ 'error-border': validation.errors.email }" type="email" name="email" id="email" placeholder="Enter your email">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.email">
                                {{ validation.errors.email[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="name">Full name</label>
                            <div class="input-wrapper">
                                <input v-model="form.full_name" class="form-control" :class="{ 'error-border': validation.errors.full_name }" type="text" name="name" id="name" placeholder="Enter your full name">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.full_name">
                                {{ validation.errors.full_name[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="phone">Phone number</label>
                            <div class="input-wrapper">
                                <input v-model="form.phone_number" class="form-control" :class="{ 'error-border': validation.errors.phone_number }" type="text" name="phone" id="phone" placeholder="Eg. 111 222 3334">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.phone_number">
                                {{ validation.errors.phone_number[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="password">Password</label>
                            <div class="input-wrapper">
                                <input v-model="form.password" class="form-control" :class="{ 'error-border': validation.errors.password }" type="password" name="password" id="password" placeholder="8 characters min">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.password">
                                {{ validation.errors.password[0] }}
                            </span>
                            <div class="forgot-pass">
                                <a class="a-link" href="#">Forgot your password?</a>
                            </div>
                        </div>
                        <button class="button-primary gap-8 w-100 btn-lg ai-c">
                            <spinner v-if="submiting" />
                            <span>{{ submiting ? 'Please wait...' : 'Sign up'}}</span>
                        </button>
                    </div>
                </form>
                <div class="flx column gap-4 ai-c acc-footer">
                    <div class="text-center">
                        <span>Already have an account? </span>
                        <router-link :to="{ name: 'SignIn'}" class="a-link" href="#">Log in</router-link>
                    </div>
                    <div class="flx gap-8">
                        <span>Or</span><a href="#" class="a-link">Apply as a Guide</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postApi } from '@/api'
import inputValidationMixin from '@/mixins/inputValidation'
import Spinner from '@/components/includes/Spinner.vue'
export default {
  components: { Spinner },
    name: 'SignUp',
    mixins: [inputValidationMixin],
    data() {
        return {
            form : {
                email: '',
                password: '',
                full_name: '',
                phone_number: ''
            }
        }
    },
    methods: {
        async signUp() {
            this.validation.error ? this.clearErrs() : ''
            this.startSpinner()
            try {
                const res = await postApi('https://climbonsightbackend.cevonbeauty.com/api/register/climber', this.form)
                // this.signupSuccess(res.data)
                console.log(res.data)
            } catch (e) {
                console.error(e.response)
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async signupSuccess(res) {
            this.stopSpinner()
            await this.$store.commit('signUpSuccess', res)
            // this.$router.push({ name: 'Dashboard' })
        }
    }
}
</script>

<style lang="scss" scoped>


</style>