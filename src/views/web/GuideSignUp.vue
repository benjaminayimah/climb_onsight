<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-80 h-100">
            <div>
                <logo />
            </div>
            <div class="w-100 flx ai-c flx-1 pb-20">
                <div v-if="!signedUp" class="flx-1 flx column gap-100">
                    <div class="text-center">
                        <div class="fw-700 fs-3rem">Welcome</div>
                        <div>Create your login details</div>
                    </div>
                    <form @submit.prevent="doSubmit" id="guide_signup_form">
                        <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                            <span>{{ systemErr.message }}</span>
                        </div>
                        <div class="form-wrapper flx column gap-16">
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
                                <label for="password">New password</label>
                                <div class="input-wrapper">
                                    <input v-model="form.password" class="form-control" :class="{ 'error-border': validation.errors.password }" type="password" name="password" id="password" placeholder="Enter a new password">
                                </div>
                                <span class="input-error" v-if="validation.error && validation.errors.password">
                                    {{ validation.errors.password[0] }}
                                </span>
                            </div>
                            <div class="form-row column">
                                <label for="password_confirmation">Confirm password</label>
                                <div class="input-wrapper">
                                    <input v-model="form.password_confirmation" class="form-control" :class="{ 'error-border': validation.errors.password_confirmation }" type="password" name="password" id="password_confirmation" placeholder="Confirm password">
                                </div>
                                <span class="input-error" v-if="validation.error && validation.errors.password_confirmation">
                                    {{ validation.errors.password_confirmation[0] }}
                                </span>
                            </div>
                            <button class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                                <spinner v-if="submiting" :size="20" :color="'#fff'" />
                                <span>{{ submiting ? 'Please wait...' : 'Login'}}</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div v-else class="flx ai-c w-100 column gap-16">
                    <svg xmlns="http://www.w3.org/2000/svg" height="4" viewBox="0 0 204 4">
                        <g transform="translate(-831 -590.5)">
                            <line x2="200" transform="translate(833 592.5)" fill="none" stroke="rgba(0,0,0,0.2)" stroke-linecap="round" stroke-width="4"/>
                            <line :x2="progressFill" transform="translate(833 592.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="4"/>
                        </g>
                    </svg>
                    <span>Signing in...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
import inputValidationMixin from '@/mixins/inputValidation';
import signupLoaderMixin from '@/mixins/signupLoaderMixin';
import Spinner from '@/components/includes/Spinner.vue'
import Logo from '@/components/includes/Logo.vue';
export default {
    components: { Spinner, Logo },
    name: 'GuideSignUp',
    mixins: [inputValidationMixin, signupLoaderMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                password_confirmation: '',
                token: ''
            }
        }
    },
    methods: {
        async doSubmit() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            const url = this.hostname + '/api/create-guide-login'
            axios.post(url, this.form)
            .then(() => {
                this.stopSpinner()
                this.$store.commit('handleSignedUp')
                this.startProgress()
                this.submitSignin()
            })
            .catch(e => {
                this.errorResponse(e)
                this.stopSpinner()
            })
        },
        async submitSignin() { 
            try {
                const res = await this.$store.dispatch('signIn', this.form)
                this.signinSuccess(res.data)
            } catch (e) {
                this.signingIn = false
                this.errorResponse(e)
            }
        }
    },
    mounted() {
        this.form.token = this.$route.params.payload
        this.form.email = this.$route.query.email
    }
}
</script>
