<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Terms & Conditions, Guide insurance, Certificates etc.</div>
        <form @submit.prevent="" id="guide_doc_form">
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <span class="gray fs-09">Required</span>
                    <doc-upload-input @add-to-formArr="addToFormArr" @del-file="delFile"  :id="'guide_terms'" :formInput2="form.guide_terms" :label="'Terms & Conditions or waiver file'" :validationError="validation.errors.guide_terms"/>
                    <span class="input-error" v-if="validation.error && validation.errors.guide_terms">
                        {{ validation.errors.guide_terms[0] }}
                    </span>
                </div>
                <div class="form-row column">
                    <span class="gray fs-09">Optional</span>
                    <doc-upload-input @add-to-formArr="addToFormArr" @del-file="delFile"  :id="'guide_insurance'" :formInput="form.guide_insurance" :label="'Proof of guiding insurance'"/>
                </div>
                <div class="form-row column">
                    <span class="gray fs-09">Optional</span>
                    <doc-upload-input @add-to-formArr="addToFormArr" @del-file="delFile" :id="'guide_certificate'" :formInput="form.guide_certificate" :label="'Guide certifications (i.e certificates from  PCGI, CMGE etc.)'" />
                </div>
                <div class="form-row column">
                    <label for="award">Awards</label>
                    <div class="input-wrapper">
                        <input v-model="form.guide_awards" type="text" name="award" id="award" class="form-control" placeholder="List Awards (Add a comma to differentiate)" :class="{ 'error-border': validation.errors.guide_awards }">
                    </div>
                    <span class="input-error" v-if="validation.error && validation.errors.guide_awards">
                        {{ validation.errors.guide_awards[0] }}
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
import inputValidation from '@/mixins/inputValidation';
import DocUploadInput from '@/components/includes/DocUploadInput.vue';
import { mapState } from 'vuex';
export default {
    components: { DocUploadInput },
    name: 'GuideDocuments',
    mixins: [inputValidation],
    computed: {
        ...mapState({
            newGUide: (state) => state.data.newGuide
        })
    },
    data() {
        return {
            form: {
                guide_insurance: [],
                guide_certificate: [],
                guide_terms: '',
                guide_awards: ''
            }
        }
    },
    methods: {
        async updateNewGuide() {
            let errors = { guide_awards: ''}
            if(this.form.guide_awards == '' || this.form.guide_terms == '') {
                if(this.form.guide_awards == '') {
                    errors.guide_awards = ['The awards field is required']
                }if(this.form.guide_terms == '') {
                    errors.guide_terms = ['The terms and conditions field is required']
                }
                this.showErr(errors)
            }else {
                await this.$store.commit('updateGuideDoc', this.form)
                this.$router.push({ name: 'GuideReviews' })
            }  
        },
        presetForm() {
            this.newGUide.guide_insurance ? this.form.guide_insurance = this.newGUide.guide_insurance : ''
            this.newGUide.guide_certificate ? this.form.guide_certificate = this.newGUide.guide_certificate : ''
            this.newGUide.guide_terms ? this.form.guide_terms = this.newGUide.guide_terms : ''

            if(this.newGUide.guide_awards) {
                this.form.guide_awards = this.newGUide.guide_awards.join(',')
            }
        },
        addToFormArr(payload) {
            if(payload.key === 'guide_insurance') {
                this.form.guide_insurance.push(payload)
            }else if( payload.key === 'guide_certificate') {
                this.form.guide_certificate.push(payload)
            } else if( payload.key === 'guide_terms') {
                this.form.guide_terms = payload
            } 
            this.$store.commit('updateGuideDoc', this.form)
        },
        delFile(payload) {
            if(payload.key === 'guide_insurance') {
                this.form.guide_insurance = this.form.guide_insurance.filter(data => data.url != payload.file)
            }else if( payload.key === 'guide_certificate')  {
                this.form.guide_certificate = this.form.guide_certificate.filter(data => data.url != payload.file)
            }else if( payload.key === 'guide_terms') {
                this.form.guide_terms = ''
            }
            this.$store.commit('updateGuideDoc', this.form)
        }
    },
    mounted() {
        this.presetForm()
    }
}
</script>

<style lang="scss" scoped>
.upload {
    color: #e27a30;
}
.div-input {
    cursor: pointer;
}
</style>