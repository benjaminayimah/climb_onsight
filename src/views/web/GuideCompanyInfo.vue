<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Fill the forms below</div>
        <form @submit.prevent="">
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <label for="companyName">Company name</label>
                    <div class="input-wrapper">
                        <input v-model="form.name" :class="{ 'error-border': validation.errors.name }" type="text" name="companyName" id="companyName" class="form-control" placeholder="Company Name">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.name">
                        {{ validation.errors.name[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="email">Email</label>
                    <div class="input-wrapper">
                        <input v-model="form.email" :class="{ 'error-border': validation.errors.email }" type="email" name="email" id="email" class="form-control" placeholder="Company Email">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.email">
                        {{ validation.errors.email[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <label for="phone">Phone</label>
                    <div class="input-wrapper">
                        <input @input="formatPhoneNumber" v-model="form.phone_number" :class="{ 'error-border': validation.errors.phone_number }" type="tel" name="phone" id="phone" class="form-control" placeholder="Company Phone">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.phone_number">
                        {{ validation.errors.phone_number[0] }}
                    </span>
                </div>
                <button @click.prevent="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import inputValidationMixin from '@/mixins/inputValidation'
import phoneNumberMixin from '@/mixins/phoneNumberMixin'
export default {
    name: 'GuideCompanyInfo',
    mixins: [inputValidationMixin, phoneNumberMixin],
    computed: {
        ...mapState({
            newGUide: (state) => state.data.newGuide
        })
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: ''
            }
        }
    },
    methods: {
        async updateNewGuide() {
            let errors = { name: '', email: '', phone_number: ''}
            if(this.form.name == '' || this.form.email == '' || this.form.phone_number == '') {
                if(this.form.name == '') {
                    errors.name = ['The name field is required']
                }
                if(this.form.email == '') {
                    errors.email = ['The email field is required']
                }
                if(this.form.phone_number == '') {
                    errors.phone_number = ['The phone number field is required']
                }
                this.showErr(errors)
            }else {
                await this.$store.commit('updateCompanyInfo', this.form)
                this.$router.push({ name: 'GuideDocuments' })
            }
        },
        presetForm() {
            this.newGUide && this.newGUide.name ? this.form.name = this.newGUide.name : ''
            this.newGUide && this.newGUide.email ? this.form.email = this.newGUide.email : ''
            this.newGUide && this.newGUide.phone_number ? this.form.phone_number = this.newGUide.phone_number : ''
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>

</style>