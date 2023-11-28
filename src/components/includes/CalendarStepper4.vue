<template>
    <form id="cal_stepper_4_form" @submit.prevent="" class="flx column gap-24">
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Experience required</div>
                <span class="gray fs-08">Select at least one</span>
            </div>
            <ul class="flx flx-wrap gap-8">
                <experience-required v-for="(experience, index) in experience_required"
                    :key="index" :experience="experience"
                    :selections="form.experience_required"
                    @select-experience="selectExperience"
                    />
            </ul>
            <span class="input-error" v-if="validation.error && validation.errors.experience_required">
                {{ validation.errors.experience_required[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Climber responsibilities</div>
                <span class="gray fs-08">Separate with a comma</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.climber_gears" class="br-16 w-100" type="text" id="climber_gears" name="climber_gears"  :class="input2 ? 'form-control2' : 'form-control'" placeholder="Gears they are required to have..." />
            </div>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Gears you will provide</div>
                <span class="gray fs-08">Separate with a comma</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.guide_gears" class="br-16 w-100" type="text" id="guide_gears" name="guide_gears"  :class="input2 ? 'form-control2' : 'form-control'" placeholder="Enter Gears" />
            </div>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Itinerary</div>
                <span class="gray fs-08">Optional</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.itinerary" class="br-16 w-100" type="text" id="itinerary" name="itinerary"  :class="[{'error-border': validation.errors.itinerary }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter itinerary" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.itinerary">
                {{ validation.errors.itinerary[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="label">Terms & conditions or waiver</div>
            <doc-upload-input @add-to-formArr="addEventTerms" @del-file="delFile"  :id="'event_terms'" :formInput2="form.event_terms" :label="'Upload as PDF'" :validationError="validation.errors.event_terms"/>
            <span class="input-error" v-if="validation.error && validation.errors.event_terms">
                {{ validation.errors.event_terms[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Add Q & A</div>
                <span class="gray fs-08">Optional</span>
            </div>
            <div class="flx column gap-16">
                <faq-input-row v-for="(faq, index) in form.faqs" 
                    :key="faq.id"
                    :index="index"
                    :form="faq"
                    :length="form.faqs.length"
                    :input2="input2"
                    @remove-row="removeRow"
                    @add-form-input="addFormInput"
                />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.faq">
                {{ validation.errors.faq[0] }}
            </span>
            <a href="#" @click.prevent="addNewRow" class="a-link flx gap-4 ai-c mt-8 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18">
                    <path d="M12.375,3.375a9,9,0,1,0,9,9A9,9,0,0,0,12.375,3.375Zm3.916,9.692H13.067v3.224a.692.692,0,0,1-1.385,0V13.067H8.459a.692.692,0,1,1,0-1.385h3.224V8.459a.692.692,0,1,1,1.385,0v3.224h3.224a.692.692,0,1,1,0,1.385Z" transform="translate(-3.375 -3.375)"/>
                </svg>
                Add more
            </a>
        </div>
        <error-display-card v-if="validation.error" :errors="validation.errors"/>
        <div class="flx column gap-8 calendar-btn-wrapper">
            <button @click.prevent="saveForm4" class="button-primary gap-8 btn-lg w-100" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submiting...' : 'Submit'}}</span>
            </button>
            <button v-if="editMode === ''" @click.prevent="previousPage" class="bg-transparent btn-sm w-100">Back</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import inputValidationMixin from '@/mixins/inputValidation'
import alertMixin from '@/mixins/alertMixin'
import Spinner from './Spinner.vue'
import FaqInputRow from './FaqInputRow.vue'
import DocUploadInput from './DocUploadInput.vue'
import ExperienceRequired from './ExperienceRequired.vue'
import ErrorDisplayCard from './ErrorDisplayCard.vue'
export default {
    components: { Spinner, FaqInputRow, DocUploadInput, ExperienceRequired, ErrorDisplayCard },
    name: 'CalendarStepper4',
    mixins: [inputValidationMixin, alertMixin],
    props: {
        newEvent: Object,
        input2: Boolean,
        editMode: String
    },
    computed: {
        ...mapState({
            categories: (state) => state.data.categories,
            token: (state) => state.token,
            hostname: (state) => state.hostname,
            updateForm: (state) => state.updateForm,
            colors: (state) => state.color.colors,
            experience_required: (state) => state.data.experience_required
        }),
        computedPriceRange() {
            let length = Number(this.form.attendance_limit)
            return Array.from({ length }, (_, index) => index);
        }
    },
    data() {
        return {
            form: {
                experience_required: [],
                guide_gears: '',
                climber_gears: '',
                itinerary: '',
                event_terms: {},
                faqs: [],
                color: ''
            },
        }
    },
    methods: {
        selectExperience(payload) {
            const experience = this.form.experience_required.find(data => data === payload)
            if(experience) {
                this.form.experience_required = this.form.experience_required.filter(data => data !== payload)
            }else {
                this.form.experience_required.push(payload)
            }
        },
        addNewRow() {
            const data = { id: new Date().getTime(), question: '', answer: ''}
            this.form.faqs.push(data)
        },
        removeRow(index) {
            const i = index
            this.form.faqs.splice(i, 1);
        },
        addFormInput(payload) {
            const i = this.form.faqs.findIndex(x => x.id == payload.id)
            this.form.faqs.splice(i, 1, payload)
        },
        addEventTerms(payload) {
            this.validation.error ? this.clearErrs() : ''
            this.form.event_terms = payload
            this.$store.commit('updateEventTerms', payload)
        },
        delFile() {
            this.form.event_terms = {}
            this.$store.commit('updateEventTerms', {})
        },
        async saveForm4() {
            this.validation.error ? this.clearErrs() : ''
            let errors = { category: '', faq: '', experience_required: ''}
            if(!this.form.event_terms.name || !this.validateQnA() || !this.form.experience_required.length) {
                if(!this.form.event_terms.name) {
                    errors.event_terms = ['The terms and conditions field is required.']
                }
                if(!this.validateQnA()) {
                    errors.faq = ['Please fill out all the Question & Answer fields.']
                }
                if(!this.form.experience_required.length) {
                    errors.experience_required = ['Select at least one experience required.']
                }
                this.showErr(errors)
            }else {
                this.editMode === 'event_edit' ? await this.$store.commit('updateTempStorage4', this.form) : await this.$store.commit('saveEventForm4', this.form)
                this.editMode === 'event_edit' ? this.submitUpdate() : this.submitForm()
            }
        },
        validateQnA() {
            let array = this.form.faqs
            for (let i = 0; i < array.length; i++) {
                const obj = array[i];
                if (!obj.question && obj.answer || obj.question && !obj.answer  && !(obj.question === '' && obj.answer === '')) {
                    return false;
                }
            }
            return true;
        },
        async submitForm() {
            try {
                this.startSpinner()
                const res = await axios.post(this.hostname+'/api/event?token='+this.token, this.newEvent)
                this.successResponse(res.data)
                this.stopSpinner()
            } catch (e) {
                this.stopSpinner()
                this.errorResponse(e)
                this.showAlert('danger', e.response.message || e.message)
            }
        },
        async successResponse(res) {
            this.showAlert('success', res.message)
            await this.$store.commit('addToEvent', res.event)
            await this.$store.commit('clearNewEvent')
            this.$router.push({ name: 'Calendar'})
            this.$emit('go-to-event', res.event.start_date)
        },
        async submitUpdate() {
            try {
                this.startSpinner()
                const res = await axios.put(this.hostname+'/api/event/'+this.newEvent.id+'?token='+this.token, this.updateForm)
                this.stopSpinner()
                this.$store.commit('updateEvent', res.data.event)
                this.$store.commit('closeModal')
                this.$router.push({ name: this.$route.name, query: { current: this.newEvent.id, origin: this.$route.query.origin }})
                this.showAlert('success', res.data.message)
            } catch (e) {
                this.stopSpinner()
                this.errorResponse(e)
                this.showAlert('danger', e.response.message || e.message)
            }
        },
        previousPage() {
            this.$router.push({ query: { stepper: '3', current: this.$route.query.current, origin: this.$route.query.origin }})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.itinerary ? this.form.itinerary = this.newEvent.itinerary : ''
                if(this.newEvent.climber_gears) {
                    if(this.editMode === 'event_edit') {
                        this.form.climber_gears = JSON.parse(this.newEvent.climber_gears).join(',')
                    }else {
                        this.form.climber_gears = this.newEvent.climber_gears.join(',')
                    }
                }
                if(this.newEvent.guide_gears) {
                    if(this.editMode === 'event_edit') {
                        this.form.guide_gears = JSON.parse(this.newEvent.guide_gears).join(',')
                    }else {
                        this.form.guide_gears = this.newEvent.guide_gears.join(',')
                    }
                }
                if (this.newEvent.faqs) {
                    if(this.editMode === 'event_edit') {
                        this.form.faqs = JSON.parse(this.newEvent.faqs )
                    }else {
                        this.form.faqs = this.newEvent.faqs 
                    }
                }else {
                    this.form.faqs.push({ id: 1, question: '', answer: ''})
                }
                if(this.newEvent.experience_required) {
                    if(this.editMode === 'event_edit') {
                        this.form.experience_required = JSON.parse(this.newEvent.experience_required)
                    }else {
                        this.form.experience_required = this.newEvent.experience_required 
                    }
                }
                if(this.newEvent.event_terms) {
                    if(this.editMode === 'event_edit') {
                        this.form.event_terms = JSON.parse(this.newEvent.event_terms)
                    }else {
                        this.form.event_terms = this.newEvent.event_terms 
                    }
                }
            }

        }
    },
    mounted() {
        this.presetForm()
        this.form.color = this.colors[Math.floor(Math.random() * this.colors.length)]
    }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
    select, input, textarea {
        padding: 10px 20px
    }
}
.counter {
    padding: 2px 16px;
}
.notice {
    padding-bottom: 16px;
    border-bottom: 1px solid #d9d9d9;
}
</style>