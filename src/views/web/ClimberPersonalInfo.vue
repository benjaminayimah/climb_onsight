<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Personal information</div>
        <div class="centered">
            <avatar :status="status" @deleteTemp="deltmp" @upload-click="uploadClick" />
            <div>Add profile image</div>
            <span class="input-error" v-if="imageStatus.active">{{ imageStatus.msg }}</span>
        </div>
        <form @submit.prevent="">
            <input class="hide" @change="uploadTemp" name="image" id="avatar_img" type="file" ref="img"> 
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <div class="input-wrapper">
                        <input v-model="form.DOB" type="date" name="dob" id="dob" class="form-control" :class="{ 'error-border': validation.errors.DOB }">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.DOB">
                        {{ validation.errors.DOB[0] }}
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
                <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c">
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
import Avatar from '@/components/includes/Avatar.vue';
export default {
    components: { Avatar },
    name: 'ClimberPersonalInfo',
    mixins: [inputValidation, imageUploadMixin],
    computed: {
        ...mapState({
            hostname: (state) => state.hostname
        })
    },
    data() {
        return {
            form: {
                DOB: JSON.parse(localStorage.getItem('newUser')).form.DOB || '',
                gender: JSON.parse(localStorage.getItem('newUser')).form.gender || ''
            },
        }
    },
    methods: {
        updateNewUser() {
            let errors = { DOB: '', gender: ''}
            if(this.form.DOB == '' || this.form.gender == '') {
                if(this.form.DOB == '') {
                    errors.DOB = ['The Date of Birth field is required']
                }
                if(this.form.gender == '') {
                    errors.gender = ['The gender field is required']
                }
                this.showErr(errors)
            }else {
                let stored = JSON.parse(localStorage.getItem('newUser'))
                stored.form.DOB = this.form.DOB
                stored.form.gender = this.form.gender
                localStorage.setItem('newUser', JSON.stringify(stored))
                this.$router.push({ name: 'ClimberClimbingExp' })
            }
            
        },
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
        }
    }
}
</script>

<style lang="scss" scoped>

</style>