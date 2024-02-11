<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Fill the forms below</div>
        <form @submit.prevent="" id="guide_com_form">
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
                <div class="form-row column">
                    <label for="country">Country</label>
                    <div class="input-wrapper">
                        <select v-model="form.country" name="country" id="country" class="form-control" :class="{ 'error-border': validation.errors.country }">
                            <option selected value="">Select country</option>
                            <option v-for="(country, index) in countries" :key="index" :value="country.code">{{ country.country }}</option>
                        </select>
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.country">
                        {{ validation.errors.country[0] }}
                    </span>
                </div>
                <button @click.prevent="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </button>
                <router-link :to="{ name: 'SignIn'}" class="w-100 a-button">Cancel</router-link>
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
            newGUide: (state) => state.data.newGuide,
            countries: (state) => state.country.countries
        })
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: '',
                country: ''
            }
        }
    },
    methods: {
        async updateNewGuide() {
            let errors = {}
            if(this.form.name == '' || this.form.email == '' || !this.validateEmail(this.form.email) || this.form.phone_number == '' || this.form.country == '') {
                if(this.form.name == '') {
                    errors.name = ['The name field is required']
                }
                if(this.form.email == '') {
                    errors.email = ['The email field is required']
                }
                else if (!this.validateEmail(this.form.email)) {
                    errors.email = ['Please provide a valid email']
                }
                if(this.form.phone_number == '') {
                    errors.phone_number = ['The phone number field is required']
                }if(this.form.country == '') {
                    errors.country = ['The country field is required']
                }
                this.showErr(errors)
            }else {
                await this.$store.commit('updateCompanyInfo', this.form)
                this.$router.push({ name: 'GuideDocuments' })
            }
        },
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email)
        },
        presetForm() {
            this.newGUide && this.newGUide.name ? this.form.name = this.newGUide.name : ''
            this.newGUide && this.newGUide.email ? this.form.email = this.newGUide.email : ''
            this.newGUide && this.newGUide.phone_number ? this.form.phone_number = this.newGUide.phone_number : ''
            this.newGUide && this.newGUide.country ? this.form.country = this.newGUide.country : ''
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>

</style>