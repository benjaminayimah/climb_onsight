<template>
  <teleport to="#modal_title">
        Reset user's password
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="password">New password</label>
                    <div class="input-wrapper">
                        <input v-model="form.new_password" autocomplete="new-password" :type="showPass ? 'text' : 'password'" class="form-control" :class="{ 'error-border': validation.errors.new_password }" name="password" id="password" placeholder="8 characters min">
                        <span class="hide-show-pass absolute centered br-50" :class="{ 'hide-pass-active' : showPass }" @click="togglePass">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 26.364 26.364">
                                <g transform="translate(1.182 1.182)">
                                    <path d="M16027.619-15079.234a21.431,21.431,0,0,1-4.111-4.4,2.816,2.816,0,0,1,0-3.226,21.339,21.339,0,0,1,4.111-4.406,11.5,11.5,0,0,1,7.129-2.734,11.516,11.516,0,0,1,7.132,2.734,21.4,21.4,0,0,1,4.107,4.4,2.822,2.822,0,0,1,0,3.229,21.4,21.4,0,0,1-4.107,4.4,11.51,11.51,0,0,1-7.132,2.734A11.492,11.492,0,0,1,16027.619-15079.234Zm.927-10.853a19.948,19.948,0,0,0-3.813,4.087,1.32,1.32,0,0,0,0,1.5,19.8,19.8,0,0,0,3.81,4.084,10.018,10.018,0,0,0,6.2,2.412,10.015,10.015,0,0,0,6.2-2.412,19.886,19.886,0,0,0,3.814-4.088,1.322,1.322,0,0,0,0-1.5,19.9,19.9,0,0,0-3.81-4.083,10.011,10.011,0,0,0-6.2-2.413A10.013,10.013,0,0,0,16028.546-15090.087Zm1.454,4.836a4.754,4.754,0,0,1,4.748-4.748,4.758,4.758,0,0,1,4.752,4.748,4.758,4.758,0,0,1-4.752,4.752A4.754,4.754,0,0,1,16030-15085.251Zm1.5,0a3.253,3.253,0,0,0,3.25,3.25,3.253,3.253,0,0,0,3.249-3.25,3.253,3.253,0,0,0-3.249-3.25A3.253,3.253,0,0,0,16031.5-15085.251Z" transform="translate(-16022.748 15097.25)" fill="#000"/>
                                    <path v-if="!showPass" d="M0,22.121-2.121,20,20-2.121,22.121,0Z" transform="translate(2 2)" fill="#000" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div class="flx gap-16">
                        <a @click.prevent="generatePass(16)" href="#" class="a-link">Or auto-generate a strong password</a>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.new_password">
                        {{ validation.errors.new_password[0] }}
                    </span>
                </div>
                <!-- <div>
                    <label for="send_email" class="flx gap-8" data-type="input-wrapper">
                        <input v-model="form.sendEmail" type="checkbox" id="send_email">
                        Automatically send login details to user's email?
                    </label>
                </div> -->
            </form>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <button @click="submitUpdate" class="button-primary w-100 btn-rounded gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
            <spinner v-if="submiting" :size="18" />
            <span>{{ submiting ? 'Submitting...' : 'Submit'}}</span>
        </button> 
    </teleport>
</template>

<script>
import alertMixin from '@/mixins/alertMixin';
import axios from 'axios';
import Spinner from '@/components/includes/Spinner.vue'
import passwordToggleMixin from '@/mixins/passwordToggle';
import inputValidation from '@/mixins/inputValidation'
import { mapState } from 'vuex';
export default {
    components: { Spinner },
    name: 'ResetAdminPass',
    mixins: [inputValidation, passwordToggleMixin, alertMixin],
    computed: {
        ...mapState({
            user: (state) => state.forms.tempStorage,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            form: {
                new_password: ''
            },
        }
    },
    methods: {
        submitUpdate() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            axios.put(this.hostname+'/api/reset-admin-password/'+this.user.id+'?token='+this.token, this.form)
            .then((res) => {
                this.showAlert('success', res.data)
                this.stopSpinner()
                this.$store.commit('closeModal')
            }).catch((e) => {
                this.errorResponse(e)
                this.stopSpinner()
            })
        },
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>

<style>
.modal-width {
    width: 430px;
}
</style>