<template>
    <teleport to="#modal_title">
        Edit profile
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width">
            <div class="br-16 flx column gap-16">
                <div class="centered">
                    <avatar-uploader
                        :status="status"
                        :hostname="hostname"
                        :dimension="140"
                        :auth="true"
                        :color="user.color"
                        @deleteTemp="deltmp"
                        @upload-click="uploadClick"
                    />
                    <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
                </div>
                <form @submit.prevent="" id="profile_edit_form">
                    <input class="hide" @change="uploadTemp('avatar_img')" name="image" id="avatar_img" type="file" ref="img"> 
                    <div v-if="systemErr.error" class="invalid-credentials response-message text-center mb-32">
                        <span>{{ systemErr.message }}</span>
                    </div>
                    <div class="form-wrapper flx column gap-16">
                        <div class="form-row column">
                            <label for="name">Company Name</label>
                            <div class="input-wrapper">
                                <input v-model="form.name" class="form-control" :class="{ 'error-border': validation.errors.name }" type="text" name="name" id="name" placeholder="Enter your full name">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.name">
                                {{ validation.errors.name[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="email">Email</label>
                            <div class="input-wrapper">
                                <input v-model="form.email" class="form-control" :class="{ 'error-border': validation.errors.email }" type="text" name="email" id="email" placeholder="Enter your email">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.email">
                                {{ validation.errors.email[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="phone">Phone number</label>
                            <div class="input-wrapper">
                                <input v-model="form.phone_number" @input="formatPhoneNumber" class="form-control" :class="{ 'error-border': validation.errors.phone_number }" type="text" name="phone" id="phone" placeholder="+1 (123) 456 7890">
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.phone_number">
                                {{ validation.errors.phone_number[0] }}
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="flx gap-8 jc-fe">
            <button @click="$store.commit('closeModal')" class="btn-md btn-danger">
                <span>Revert</span>
            </button>
            <button @click="submitUpdate" class="button-primary btn-md gap-8" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="20" :color="'#fff'" />
                <span>{{ submiting ? 'Please wait...' : 'Save changes'}}</span>
            </button>
        </div>
    </teleport>
</template>

<script>
import axios from 'axios';
import imageUpload from '@/mixins/imageUpload';
import alertMixin from '@/mixins/alertMixin';
import inputValidation from '@/mixins/inputValidation';
import { mapState } from 'vuex';
import Spinner from '@/components/includes/Spinner.vue';
import AvatarUploader from '@/components/includes/AvatarUploader.vue';
export default {
    components: { Spinner, AvatarUploader },
    name: 'ProfileEditModal',
    mixins: [inputValidation, alertMixin, imageUpload],
    computed: {
        ...mapState({
            user: (state) => state.forms.tempStorage,
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        })
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: '',
                tempImage: null
            }
        }
    },
    methods: {
        presetForm() {
            this.form.name = this.user.name
            this.form.email = this.user.email
            this.form.phone_number = this.user.phone_number
            this.user.profile_picture ? this.afterTempUpload(this.user.profile_picture) : ''
        },
        async submitUpdate() {
            this.validation.error || this.systemErr.error ? this.clearErrs() : ''
            this.startSpinner()
            try {
                const res = await axios.put(this.hostname+'/api/auth-user/' + this.user.id + '?token=' + this.token, this.form)
                this.updateSuccess(res.data.user)
                this.showAlert('success', res.data.message)
                this.stopSpinner()
            } catch (e) {
                this.stopSpinner()
                this.errorResponse(e)

            } 
        },
        updateSuccess(res) {
            this.$store.commit('updateUser', res)
            this.editMode = false
            this.$store.commit('closeModal')
        },
    },
    mounted() {
        this.$store.commit('stopFormLoader')
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 500px;
}
.bg-img {
    border-radius: 16px;
    height: 200px;
    button {
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        inset: auto auto 16px 16px;
        padding: 10px;
        color: #000000;
        border-radius: 30px;
    }
}

</style>