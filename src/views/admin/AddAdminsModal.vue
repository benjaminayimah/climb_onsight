<template>
    <teleport to="#modal_title">
        <span v-if="update && !updatePermissions">Edit info</span>
        <span v-else-if="permissions">Assign permissions to user</span>
        <span v-else-if="updatePermissions">Update permissions</span>
        <span v-else>Add new admin</span>
    </teleport>
    <teleport to="#modal_content">
        <div class="mb-16">{{ permissions || updatePermissions ? 'What would they have access to?' : 'Please fill out the form' }}</div>
        <div v-if="!permissions && !updatePermissions" class="modal-width">
            <form @submit.prevent="" class="flx column gap-24">
                <div class="form-row column">
                    <label for="name">Admin name</label>
                    <div class="input-wrapper">
                        <input v-model="form.name" class="form-control" type="text" name="name" id="name"  placeholder="Name of admin" :class="{ 'error-border': validation.errors.name }">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.name">
                        {{ validation.errors.name[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input v-model="form.email" class="form-control" type="email" name="email" id="email"  placeholder="Enter email" :class="{ 'error-border': validation.errors.email }">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.email">
                        {{ validation.errors.email[0] }}
                    </span>
                </div>
                <div v-if="!update" class="form-row column">
                    <label for="password">Password</label>
                    <div class="input-wrapper">
                        <input v-model="form.password" autocomplete="new-password" :type="showPass ? 'text' : 'password'" class="form-control" :class="{ 'error-border': validation.errors.password }" name="password" id="password" placeholder="8 characters min">
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
                    <span class="input-error" v-if="validation.error && validation.errors.password">
                        {{ validation.errors.password[0] }}
                    </span>
                </div>
                <div v-if="!update">
                    <label for="send_email" class="flx gap-8" data-type="input-wrapper">
                        <input v-model="form.sendEmail" type="checkbox" id="send_email">
                        Automatically send login details to user's email?
                    </label>
                </div>
            </form>
        </div>
        <div v-else class="modal-width">
            <div class="flx flx-1 flx-wrap gap-24">
                <access-list v-for="access in adminAccess" :key="access.id" :access="access" @do-check="doCheck" />
            </div>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="text-center flx jc-c">
            <button @click="submitUpdate" v-if="update && !updatePermissions" class="button-primary btn-rounded gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submitting...' : 'Update'}}</span>
            </button>
            <button v-else-if="permissions || updatePermissions" @click="submitPermissions" class="button-primary btn-rounded gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submitting...' : 'Submit'}}</span>
            </button> 
            <button v-else @click="submitSignUp" class="button-primary btn-rounded gap-8 btn-lg" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submitting...' : 'Submit'}}</span>
            </button>
        </div>
    </teleport>
</template>

<script>
import axios from 'axios';
import alertMixin from '@/mixins/alertMixin';
import inputValidation from '@/mixins/inputValidation';
import passwordToggleMixin from '@/mixins/passwordToggle';
import Spinner from '@/components/includes/Spinner.vue';
import AccessList from '@/components/includes/AccessList.vue';
import { mapState } from 'vuex';
export default {
    components: { Spinner, AccessList },
    name: 'AddAdminsModal',
    mixins: [inputValidation, passwordToggleMixin, alertMixin],
    computed: {
        ...mapState({
            token: (state) => state.token,
            hostname: (state) => state.hostname,
            update: (state) => state.forms.tempStorage,
            updatePermissions: (state) => state.forms.permissions
        })
    },
    data () {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                sendEmail: true
            },
            completed: false,
            adminAccess: [
                {id: 1, name: 'events', abbr:'e', status: false},
                {id: 2, name: 'climbers', abbr:'c', status: false},
                {id: 3, name: 'guides', abbr:'g', status: false},
                {id: 4, name: 'stats', abbr:'s', status: false},
                {id: 5, name: 'locations', abbr:'l', status: false},
                {id: 6, name: 'payments', abbr:'p', status: false},
                {id: 7, name: 'merchandise', abbr:'m', status: false}
            ],
            user: '',
            permissions: false
        }
    },
    methods: {
        submitSignUp() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            axios.post(this.hostname+'/api/sub-admins?token='+this.token, this.form)
            .then((res) => {
                this.signupSuccess(res.data.user)
            }).catch((e) => {
                this.errorResponse(e)
                this.stopSpinner()
            })
        },
        async signupSuccess(res) {
            this.stopSpinner()
            this.permissions = true
            this.user = res
            this.$store.commit('addToAdmins', res)
        },
        async submitPermissions() {
            this.startSpinner()
            try {
                const res = await axios.post(this.hostname+'/api/update-permissions/'+this.user.id+'?token='+this.token, { permissions: this.adminAccess} )
                this.$store.commit('updateToAdmins', res.data.user)
                this.$store.commit('closeModal')
                this.showAlert('success', res.data.message)
                this.stopSpinner()
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        async submitUpdate() {
            this.startSpinner()
            try {
                const res = await axios.put(this.hostname+'/api/auth-user/' + this.update.id + '?token=' + this.token, this.form)
                this.$store.commit('updateToAdmins', res.data.user)
                this.showAlert('success', 'Profile info is updated')
                this.$store.commit('closeModal')
                this.stopSpinner()
            } catch (e) {
                this.errorResponse(e)
                this.stopSpinner()
            }
        },
        doCheck(id) {
            const i = this.adminAccess.findIndex(data => data.id === id)
            this.adminAccess[i].status = !this.adminAccess[i].status
        },
        doSubmit() {
            this.$store.commit('closeModal')
        },
        presetUpdate() {
            if(this.update.name && this.update.email && !this.updatePermissions) {
                this.form.name = this.update.name
                this.form.email = this.update.email
            }else if(this.updatePermissions) {
                this.adminAccess = JSON.parse(this.update.permissions)
                this.user = this.update
            }
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.presetUpdate()
    }
}
</script>
<style scoped>
.btn-lg {
    padding-left: 75px;
    padding-right: 75px;
}
.modal-width {
    width: 560px;
}
</style>
