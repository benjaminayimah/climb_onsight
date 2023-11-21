<template>
    <button class="nav-dropdown-toggle br-50" :id="id" @click="doDropdown(id)">
        <svg id="settings" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22 24">
            <path d="M9,12a2,2,0,1,0,2-2A2,2,0,0,0,9,12Z" fill="#595959"/>
            <path d="M13.972,2.426a3.034,3.034,0,0,0-5.945,0A3.028,3.028,0,0,1,4.049,4.684,2.98,2.98,0,0,0,1.077,9.743a2.938,2.938,0,0,1,0,4.514,2.98,2.98,0,0,0,2.972,5.059,3.028,3.028,0,0,1,3.978,2.257,3.034,3.034,0,0,0,5.945,0,3.028,3.028,0,0,1,3.978-2.257,2.98,2.98,0,0,0,2.972-5.059,2.938,2.938,0,0,1,0-4.514,2.98,2.98,0,0,0-2.972-5.059A3.028,3.028,0,0,1,13.972,2.426ZM7,12a4,4,0,1,0,4-4A4,4,0,0,0,7,12Z" fill="#595959" fill-rule="evenodd"/>
        </svg>
    </button>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="100" :opacity="0.4" />
        <div v-if="toggleMenu" class="dropdown" :style="{ top: dynamicFloatingDiv.top+60 + 'px'}">
            <div class="flx jc-sb ai-c mb-16">
                <div class="flx gap-8">
                    <button v-if="reset_pass" @click="resetPassword" class="bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 13.503 23.619">
                            <path d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z" transform="translate(-11.251 -6.194)"/>
                        </svg>
                    </button>
                    <strong>{{ computedTitle }}</strong>
                </div>
                <button @click="closeDropdown(id)" class="btn-close scale-in bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
            </div>
            <ul v-if="!reset_pass">
                <li>
                    <a @click.prevent="resetPassword" href="#" class="flx gap-16 ai-c">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16.5 18">
                            <path d="M-3427-681.75c0-3.088,1.456-3.75,8.25-3.75s8.25.662,8.25,3.75-1.456,3.75-8.25,3.75S-3427-678.662-3427-681.75Zm3.75-9.75a4.5,4.5,0,0,1,4.5-4.5,4.5,4.5,0,0,1,4.5,4.5,4.5,4.5,0,0,1-4.5,4.5A4.5,4.5,0,0,1-3423.25-691.5Z" transform="translate(3427 696)" fill="#212135"/>
                        </svg>
                        <span>Reset password</span>
                    </a>
                </li>
            </ul>
            <div v-else>
                <form @submit.prevent="" id="password_reset">
                    <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                        <span>{{ systemErr.message }}</span>
                    </div>
                    <div class="form-wrapper flx column gap-16">
                        <div class="form-row column">
                            <label for="current_password">Current password</label>
                            <div class="input-wrapper">
                                <input v-model="form.current_password" class="form-control" :class="{ 'error-border': validation.errors.current_password }" type="password" name="current_password" id="current_password" placeholder="Enter old password">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.current_password">
                                {{ validation.errors.current_password[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="new_password">New password</label>
                            <div class="input-wrapper">
                                <input v-model="form.new_password" class="form-control" :class="{ 'error-border': validation.errors.new_password }" type="password" name="new_password" id="new_password" placeholder="New password">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.new_password">
                                {{ validation.errors.new_password[0] }}
                            </span>
                        </div>
                        <button @click="doSubmit" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                            <spinner v-if="submiting" :size="18" />
                            <span>{{ submiting ? 'Please wait...' : 'Submit'}}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </teleport>
</template>

<script>
import alertMixin from '@/mixins/alertMixin';
import axios from 'axios';
import { mapState } from 'vuex';
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import Backdrop from '../includes/Backdrop.vue'
import inputValidationMixin from '@/mixins/inputValidation';
import Spinner from '../includes/Spinner.vue';
export default {
    components: { Backdrop, Spinner },
    name: 'SettingsDropdown',
    props: {
        id: String
    },
    mixins: [dropdownToggleMixin, inputValidationMixin, alertMixin],
    computed: {
        ...mapState({
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
            hostname: (state) => state.hostname,
            token: (state) => state.token,

        }),
        computedTitle() {
            let title = 'Settings'
            if(this.reset_pass) {
                title = 'Reset password'
            }
            return title
        }
    },
    data () {
        return {
            form: {
                current_password: '',
                new_password: ''
            },
            reset_pass: false,
        }
    },
    methods: {
        doDropdown(id) {
            if(this.reset_pass) {
                this.reset_pass = false
            }
            this.openDropdown(id)
        },
        async doSubmit() {
            this.startSpinner()
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            try {
                const res = await axios.post(this.hostname + '/api/update-password?token=' + this.token, this.form)
                this.stopSpinner()
                this.showAlert('success', res.data)
                this.resetFormData(res.data)
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        resetFormData() {
            this.form.current_password = ''
            this.form.new_password = ''
            this.closeDropdown(this.id)
        },
        resetPassword() {
            this.reset_pass = !this.reset_pass
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown{
    width: 320px;
    right: calc(134px + var(--main-padding));
}
ul {
    margin-left: -12px;
}
li {
    &:hover {
        a {
            background-color: var(--list-hover);
        }
    }
}
a {
    padding: 16px 12px;
    border-radius: 12px;
}
</style>