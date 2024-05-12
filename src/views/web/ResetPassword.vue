<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-32 h-100">
            <div>
                <logo />
            </div>
            <div class="w-100 flx ai-c flx-1">
                <div class="flx-1 flx column gap-32">
                    <div class="text-center">
                        <div class="fw-700 fs-2rem">{{ successful ? 'Successful!' : 'Almost there!' }}</div>
                        <div v-if="!successful">Enter your new password</div>
                    </div>
                    <form v-if="!successful" @submit.prevent="doSubmit" id="reset_pass_form">
                        <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                            <span>{{ systemErr.message }}</span>
                        </div>
                        <div class="form-wrapper flx column gap-16">
                            <div class="form-row column">
                                <label for="password">New password</label>
                                <div class="input-wrapper">
                                    <input v-model="form.password" :type="showPass ? 'text' : 'password'" class="form-control" :class="{ 'error-border': validation.errors.password }" name="password" id="password" placeholder="Enter a new password">
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
                            </div>
                            <div class="form-row column">
                                <label for="password_confirmation">Confirm password</label>
                                <div class="input-wrapper">
                                    <input v-model="form.password_confirmation" :type="showPass ? 'text' : 'password'" class="form-control" :class="{ 'error-border': validation.errors.password_confirmation }" name="password" id="password_confirmation" placeholder="Confirm password">
                                    <span class="hide-show-pass absolute centered br-50" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                            <g transform="translate(1.182 1.182)">
                                                <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                                <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <span class="input-error" v-if="validation.error && validation.errors.password_confirmation">
                                    {{ validation.errors.password_confirmation[0] }}
                                </span>
                            </div>
                            <button class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                                <spinner v-if="submiting" :size="20" :color="'#fff'" />
                                <span>{{ submiting ? 'Please wait...' : 'Continue'}}</span>
                            </button>
                        </div>
                    </form>
                    <div v-else class="email-sent text-center">
                        <p>The password for your account has been changed.</p>
                        <p><span>You can now sign in with your new password. </span><router-link :to="{ name: 'SignIn' }" >Sign in now</router-link></p>
                    </div>
                    <div v-if="!successful" class="flx column gap-4 ai-c acc-footer">
                        <div class="text-center">
                            <router-link :to="{ name: 'SignIn'}" class="a-link" href="#">Back to login page</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <foot-note />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
import inputValidationMixin from '@/mixins/inputValidation';
import Spinner from '@/components/includes/Spinner.vue'
import Logo from '@/components/includes/Logo.vue';
import FootNote from '@/components/includes/FootNote.vue';
import passwordToggleMixin from '@/mixins/passwordToggle';
export default {
    components: { Spinner, Logo, FootNote },
    name: 'ResetPassword',
    mixins: [inputValidationMixin, passwordToggleMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            form: {
                password: '',
                password_confirmation: '',
                token: ''
            },
            successful: false  
        }
    },
    methods: {
        async doSubmit() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            const url = this.hostname + '/api/reset-password'
            axios.post(url, this.form)
            .then(() => {
                this.successful = true
                this.stopSpinner()
            })
            .catch(e => {
                this.errorResponse(e)
                this.stopSpinner()
            })
        }
    },
    mounted() {
        this.form.token = this.$route.params.payload
    }
}
</script>