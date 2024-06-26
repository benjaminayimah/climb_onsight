<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-32 h-100">
            <div>
                <logo />
            </div>
            <div class="w-100 flx ai-c flx-1">
                <div class="flx-1 flx column gap-32">
                    <div class="text-center">
                        <div class="fw-700 fs-2rem">{{ emailSent ? 'Check your email' : 'Forgot password' }}</div>
                        <div v-if="!emailSent">Enter your email to continue</div>
                    </div>
                    <form v-if="!emailSent" @submit.prevent="submit" id="forgot_pass_form">
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
                            <button class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                                <spinner v-if="submiting" :size="20" :color="'#fff'" />
                                <span>{{ submiting ? 'Please wait...' : 'Continue'}}</span>
                            </button>
                        </div>
                    </form>
                    <div v-else class="email-sent br-16 text-center">
                        <p>An email has been sent to <strong>{{ form.email }}</strong>, open the mail and follow the link to reset your password.</p>
                        <p>
                            <span>Haven't received the email?</span>
                            <a href="#" @click.prevent="toggleBack">Resend it</a>
                        </p>
                    </div>
                    <div class="flx column gap-4 ai-c acc-footer">
                        <div class="text-center">
                            <router-link :to="{ name: 'SignIn'}" class="a-link">Back to login page</router-link>
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
export default {
    components: { Spinner, Logo, FootNote },
    name: 'ForgotPassword',
    mixins: [inputValidationMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            form: {
                email: ''
            },
            emailSent: false,
            successMsg: ''
        }
    },
    methods: {
        async submit() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/forgot-password', this.form)
                this.signinSuccess(res.data)
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async signinSuccess(res) {
            this.stopSpinner()
            this.emailSent = true
            this.successMsg = res.message
        },
        toggleBack () {
            this.emailSent = !this.emailSent
        }
    }
}
</script>