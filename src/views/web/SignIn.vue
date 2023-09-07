<template>
    <div class="logon-column-wrapper flx column ai-c br-16 bg-white flx-grow-1">
        <div class="flx column column-inner ai-c gap-60">
            <logo />
            <div class="w-100 flx column gap-40">
                <div class="text-center">
                    <div class="fw-700 fs-5rem">Welcome</div>
                    <div>Log in to climb on sight</div>
                </div>
                <form @submit.prevent="signIn">
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
                            <label for="password">Password</label>
                            <div class="input-wrapper">
                                <input v-model="form.password" class="form-control" :class="{ 'error-border': validation.errors.password }" type="password" name="password" id="password" placeholder="Enter password">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.password">
                                {{ validation.errors.password[0] }}
                            </span>
                            <div class="forgot-pass">
                                <router-link :to="{ name: 'ForgotPassword' }" class="a-link">Forgot your password?</router-link>
                            </div>
                        </div>
                        <button class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                            <spinner v-if="submiting" />
                            <span>{{ submiting ? 'Please wait...' : 'Log in'}}</span>
                        </button>
                    </div>
                </form>
                <div class="flx column gap-4 ai-c acc-footer">
                    <div class="text-center">
                        <span>Don't have an account? </span>
                        <router-link :to="{ name: 'SignUp'}" class="a-link" href="#">Sign up</router-link>
                    </div>
                    <div class="flx gap-8">
                        <span>Or</span><router-link :to="{ name: 'ApplyAsGuide' }" class="a-link">Apply as a Guide</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postApi } from '@/api'
import { mapState } from 'vuex'
import inputValidationMixin from '@/mixins/inputValidation'
import Spinner from '@/components/includes/Spinner.vue'
import Logo from '@/components/includes/Logo.vue'
export default {
    components: { Spinner, Logo },
    name: 'SignIn',
    mixins: [inputValidationMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
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
        async signIn() {
            this.validation.error ? this.clearErrs() : ''
            this.startSpinner()
            try {
                const res = await postApi(this.hostname+'/api/login', this.form)
                this.signinSuccess(res.data)
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async signinSuccess(res) {
            this.stopSpinner()
            await this.$store.commit('signInSuccess', res)
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>