<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-80 h-100">
            <div>
                <logo />
            </div>
            <div class="w-100 flx ai-c flx-1">
                <div class="flx-1 flx column gap-100">
                    <div class="text-center">
                        <div class="fw-700 fs-2rem">{{ successful ? 'Successful!' : 'Almost there!' }}</div>
                        <div v-if="!successful">Enter your new password</div>
                    </div>
                    <form v-if="!successful" @submit.prevent="doSubmit" id="reset_pass_form">
                        <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                            <span>{{ systemErr.message }}</span>
                        </div>
                        <div class="form-wrapper flx column gap-24">
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
                                <spinner v-if="submiting" :size="18" />
                                <span>{{ submiting ? 'Please wait...' : 'Continue'}}</span>
                            </button>
                        </div>
                    </form>
                    <div v-else class="email-sent">
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
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';
import inputValidationMixin from '@/mixins/inputValidation';
import Spinner from '@/components/includes/Spinner.vue'
import Logo from '@/components/includes/Logo.vue';
export default {
    components: { Spinner, Logo },
    name: 'ResetPassword',
    mixins: [inputValidationMixin],
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

<style lang="scss" scoped>

</style>