<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Personal information</div>
        <div class="centered">
            <avatar-uploader
                :status="status"
                :dimension="80"
                :hostname="hostname"
                :auth="false"
                :color="'#565656'"
                @deleteTemp="deltmp"
                @upload-click="uploadClick"
            />
            <div>Add profile image</div>
            <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
        </div>
        <!-- <button @click="deltmp('f3M2P63h1JqO5xPLbSz8cRTBEpaYXchfvOYWidMe.jpg')">delete</button> -->
        <form @submit.prevent="" id="climber_info_form">
            <input class="hide" @change="uploadTemp('avatar_img')" name="image" id="avatar_img" type="file" ref="img"> 
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <div class="input-wrapper">
                        <input v-model="form.dob" type="date" name="dob" id="dob" class="form-control" :class="{ 'error-border': validation.errors.dob }">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.dob">
                        {{ validation.errors.dob[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <!-- <label for="gender">Gender</label> -->
                    <div class="input-wrapper">
                        <select v-model="form.gender" name="gender" id="gender" class="form-control" :class="{ 'error-border': validation.errors.gender }">
                            <option value="" selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.gender">
                        {{ validation.errors.gender[0] }}
                    </span>
                </div>
                <button @click.prevent="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : status.spin }" :disabled="status.spin ? true : false">
                    Continue
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import imageUploadMixin from '@/mixins/imageUpload'
import { mapState } from 'vuex'
import inputValidation from "@/mixins/inputValidation";
import AvatarUploader from '@/components/includes/AvatarUploader.vue';
export default {
    components: { AvatarUploader },
    name: 'ClimberPersonalInfo',
    mixins: [inputValidation, imageUploadMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            newUser: (state) => state.newUser
        })
    },
    data() {
        return {
            form: {
                dob: '',
                gender: '',
                tempImage: ''
            },
            token: JSON.parse(localStorage.getItem('newToken'))
        }
    },
    methods: {
        async updateNewUser() {
            this.validation.error ? this.clearErrs() : ''
            let errors = {}
            if(this.form.dob == '' || this.form.gender == '') {
                if(this.form.dob == '') {
                    errors.dob = ['The Date of Birth field is required']
                }
                if(this.form.gender == '') {
                    errors.gender = ['The gender field is required']
                }
                this.showErr(errors)
            }else {
                await this.$store.commit('updatePersonalInfo', this.form)
                this.$router.push({ name: 'ClimberClimbingExp' })
            }
        },
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
        },
        presetForm() {
            this.newUser && this.newUser.dob ? this.form.dob = this.newUser.dob : ''
            this.newUser && this.newUser.gender ? this.form.gender = this.newUser.gender : ''
            if(this.newUser && this.newUser.tempImage) {
                this.form.tempImage = this.newUser.tempImage
                this.status.tempImage = this.newUser.tempImage
            }
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>

</style>