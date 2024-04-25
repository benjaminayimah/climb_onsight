<template>
    <div class="stepper-wrapper w-100 flx column gap-32">
        <div class="stepper-title">Guide insurance, Certificates & Awards.</div>
        <form @submit.prevent="" id="guide_doc_form">
            <div class="form-wrapper flx column gap-24">
                <div class="form-row column">
                    <span class="gray fs-09">Optional</span>
                    <doc-upload-input @add-to-formArr="addToFormArr" @del-file="delFile"  :id="'guide_insurance'" :formInput="form.guide_insurance" :label="'Proof of guiding insurance'"/>
                </div>
                <div class="form-row column">
                    <span class="gray fs-09">Optional</span>
                    <doc-upload-input @add-to-formArr="addToFormArr" @del-file="delFile" :id="'guide_certificate'" :formInput="form.guide_certificate" :label="'Guide certifications (i.e certificates from  PCGI, ACMG etc.)'" />
                </div>
                <div class="form-row column">
                    <span class="gray fs-09">Optional</span>
                    <doc-upload-input @add-to-formArr="addToFormArr" @del-file="delFile" :id="'guide_license'" :formInput="form.guide_license" :label="'Permit or license'" />
                </div>
                <div class="form-row column">
                    <div class="flx jc-sb">
                        <label for="award">Awards</label>
                        <span class="gray fs-08">Optional (Separate with comma ",")</span>
                    </div>
                    <div class="input-wrapper">
                        <input v-model="form.guide_awards" type="text" name="award" id="award" class="form-control" placeholder="List Awards (Add a comma to differentiate)">
                    </div>
                </div>
                <button @click.prevent="updateNewGuide" class="button-primary gap-8 w-100 btn-lg ai-c">
                    <span>Continue</span>
                </button>
                <router-link :to="{ name: 'GuideCompanyInfo'}" class="w-100 a-button">Back</router-link>
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
                guide_license: [],
                guide_awards: ''
            }
        }
    },
    methods: {
        async updateNewGuide() {
            await this.$store.commit('updateGuideDoc', this.form)
            this.$router.push({ name: 'GuideReviews' }) 
        },
        presetForm() {
            this.newGUide.guide_insurance ? this.form.guide_insurance = this.newGUide.guide_insurance : ''
            this.newGUide.guide_certificate ? this.form.guide_certificate = this.newGUide.guide_certificate : ''
            this.newGUide.guide_license ? this.form.guide_license = this.newGUide.guide_license : ''
            if(this.newGUide.guide_awards) {
                this.form.guide_awards = this.newGUide.guide_awards.join(',')
            }
        },
        addToFormArr(payload) {
            if(payload.key === 'guide_insurance') {
                this.form.guide_insurance.push(payload)
            }else if( payload.key === 'guide_certificate') {
                this.form.guide_certificate.push(payload)
            }else if( payload.key === 'guide_license') {
                this.form.guide_license.push(payload)
            }
            this.$store.commit('updateGuideDoc', this.form)
        },
        delFile(payload) {
            if(payload.key === 'guide_insurance') {
                this.form.guide_insurance = this.form.guide_insurance.filter(data => data.url != payload.file)
            }else if(payload.key === 'guide_certificate')  {
                this.form.guide_certificate = this.form.guide_certificate.filter(data => data.url != payload.file)
            }
            else if(payload.key === 'guide_license')  {
                this.form.guide_license = this.form.guide_license.filter(data => data.url != payload.file)
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