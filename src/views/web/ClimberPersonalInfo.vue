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
                        <input v-model="form.DOB" type="date" name="dob" id="dob" class="form-control">
                    </div>
                </div>
                <div class="form-row column">
                    <!-- <label for="gender">Gender</label> -->
                    <div class="input-wrapper">
                        <select v-model="form.gender" name="gender" id="gender" class="form-control">
                            <option value="" selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <button @click="updateNewUser" class="button-primary gap-8 w-100 btn-lg ai-c" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                    <spinner v-if="submiting" />
                    <span>{{ submiting ? 'Please wait...' : 'Continue'}}</span>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import imageUploadMixin from '@/mixins/imageUpload'
import { mapState } from 'vuex'
import inputValidation from "@/mixins/inputValidation";
import Spinner from '@/components/includes/Spinner.vue';
import Avatar from '@/components/includes/Avatar.vue';
export default {
    components: { Spinner, Avatar },
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
            this.stopSpinner()
            let stored = JSON.parse(localStorage.getItem('newUser'))
            stored.form.DOB = this.form.DOB
            stored.form.gender = this.form.gender
            localStorage.setItem('newUser', JSON.stringify(stored))
            this.$router.push({ name: 'ClimberClimbingExp' })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>