<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-16 h-100 h-100">
            <div>
                <logo />
            </div>
            <div class="w-100 flx ai-c flx-1">
                <div class="flx-1 flx column gap-40">
                    <div class="text-center">
                        <div class="fw-700 fs-5rem">Welcome</div>
                        <div>Log in to Climb Onsight</div>
                    </div>
                    <form @submit.prevent="submitSignIn" id="signin_form">
                        <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                            <span>{{ systemErr.message }}</span>
                        </div>
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
                                <label for="password">Password</label>
                                <div class="input-wrapper">
                                    <input v-model="form.password" :type="showPass ? 'text' : 'password'" class="form-control" :class="{ 'error-border': validation.errors.password }" name="password" id="password" placeholder="*********">
                                    <span class="hide-show-pass absolute centered br-50" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                            <g transform="translate(1.182 1.182)">
                                                <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                                <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <span class="input-error" v-if="validation.error && validation.errors.password">
                                    {{ validation.errors.password[0] }}
                                </span>
                                <div class="forgot-pass">
                                    <router-link :to="{ name: 'ForgotPassword' }" class="a-link">Forgot your password?</router-link>
                                </div>
                            </div>
                            <button class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                                <spinner v-if="submiting" :size="20" :color="'#fff'" />
                                <span>{{ submiting ? 'Please wait...' : 'Log in'}}</span>
                            </button>
                        </div>
                    </form>
                    <div class="flx column gap-4 ai-c acc-footer">
                        <div class="text-center">
                            <span>Don't have an account? </span>
                            <router-link :to="{ name: 'SignUp'}" class="a-link">Sign up</router-link>
                        </div>
                        <div class="flx gap-8">
                            <span>Or</span><router-link :to="{ name: 'ApplyAsGuide' }" class="a-link">Apply as a Guide</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import passwordToggleMixin from '@/mixins/passwordToggle'
import inputValidationMixin from '@/mixins/inputValidation'
import Spinner from '@/components/includes/Spinner.vue'
import Logo from '@/components/includes/Logo.vue'
export default {
    components: { Spinner, Logo },
    name: 'SignIn',
    mixins: [inputValidationMixin, passwordToggleMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            form : {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async submitSignIn() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            try {
                const res = await this.$store.dispatch('signIn', this.form)
                this.signinSuccess(res.data)
                this.stopSpinner()
            } catch (e) {
                this.stopSpinner()
                this.errorResponse(e)
            }
        },
        async signinSuccess(res) {
            this.stopSpinner()
            await this.$store.commit('signInSuccess', res)
            this.$router.push({ name: 'Home' })
            this.$store.dispatch('getAuthUser', this.token)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>