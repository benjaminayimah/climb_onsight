<template>
    <form id="cal_stepper_3_form" @submit.prevent="" class="flx column gap-16">
        <div class="form-row column">
            <label for="attendance_limit">Attendance range</label>
            <input v-model="form.attendance_limit" type="range" min="1" max="30" id="attendance_limit" name="attendance_limit" step="1" class="w-100 custom-range" />
            <div class="flx jc-sb">
                <span class="fs-09 gray">Min(1)</span>
                <span class="bg-white br-16 counter">{{ form.attendance_limit }}</span>
                <span class="fs-09 gray">Max(30)</span>
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.attendance_limit">
                {{ validation.errors.attendance_limit[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="price">Price(USD)</label>
            <div class="input-wrapper">
                <input v-model="form.price" @input="checkNumberInput" class="br-16 w-100" type="number" min="1" id="price" name="price"  :class="[{'error-border': validation.errors.price }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter event price" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.price">
                {{ validation.errors.price[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Gears</div>
                <span class="gray fs-08">Separate with a comma</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.gears" class="br-16 w-100" type="text" id="gears" name="gears"  :class="[{'error-border': validation.errors.gears }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter Gears" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.gears">
                {{ validation.errors.gears[0] }}
            </span>
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
            <label for="event_description">Event description</label>
            <div class="input-wrapper">
                <textarea v-model="form.event_description" class="br-16 w-100" id="event_description" name="event_description"  :class="[{'error-border': validation.errors.event_description }, input2 ? 'form-control2' : 'form-control']" rows="2"></textarea>
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.event_description">
                {{ validation.errors.event_description[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <div class="label">Add Q & A</div>
                <span class="gray fs-08">Optional</span>
            </div>
            <faq-input-row v-for="(faq, index) in form.faqs" 
                :key="faq.id"
                :index="index"
                :form="faq"
                :length="form.faqs.length"
                :input2="input2"
                @remove-row="removeRow"
                @add-form-input="addFormInput"
            />
            <a href="#" @click.prevent="addNewRow" class="a-link flx gap-4 ai-c">
                <i class="br-50 centered">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11.521 11.521">
                        <path  d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#000"/>
                    </svg>
                </i>
                Add more
            </a>
        </div>
        <div class="flx column gap-8">
            <button @click.prevent="saveForm3" class="button-primary gap-8 btn-md w-100" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submiting...' : 'Submit'}}</span>
            </button>
            <button @click.prevent="previousPage" class="bg-transparent btn-sm w-100">Back</button>
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
export default {
    components: { Spinner, FaqInputRow },
    name: 'CalendarStepper3',
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
            colors: (state) => state.color.colors
        }),
    },
    data() {
        return {
            form: {
                price: '',
                attendance_limit: 10,
                gears: '',
                faqs: [],
                itinerary: '',
                event_description: '',
                color: ''
            },
        }
    },
    methods: {
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
        selectCategory(category) {
            if(this.form.category && this.form.category === category.name) {
                this.form.category = ''
            }else {
                this.form.category = category.name
            }
        },
        async saveForm3() {
            let errors = { category: ''}
            if(this.form.price == '') {
                if(this.form.price == '') {
                    errors.price = ['The Price field is required']
                }
                this.showErr(errors)
            }else {
                this.validation.error ? this.clearErrs() : ''
                this.editMode === 'event_edit' ? await this.$store.commit('updateTempStorage3', this.form) : await this.$store.commit('saveEventForm3', this.form)
                this.editMode === 'event_edit' ? this.submitUpdate() : this.submitForm()
            }
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
            this.$router.push({ name: this.$route.name, query: { stepper: '2', current: this.$route.query.current, origin: this.$route.query.origin }})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.price ? this.form.price = this.newEvent.price : ''
                this.newEvent.attendance_limit ? this.form.attendance_limit = this.newEvent.attendance_limit : ''
                this.newEvent.itinerary ? this.form.itinerary = this.newEvent.itinerary : ''
                this.newEvent.event_description ? this.form.event_description = this.newEvent.event_description : ''
                if(this.newEvent.gears) {
                    if(this.editMode === 'event_edit') {
                        this.form.gears = JSON.parse(this.newEvent.gears).join(',')
                    }else {
                        this.form.gears = this.newEvent.gears.join(',')
                    }
                }
                if (this.newEvent.faqs ) {
                    if(this.editMode === 'event_edit') {
                        this.form.faqs = JSON.parse(this.newEvent.faqs )
                    }else {
                        this.form.faqs = this.newEvent.faqs 
                    }
                }else {
                    this.form.faqs.push({ id: 1, question: '', answer: ''})
                }
            }

        }
    },
    mounted() {
        this.presetForm()
        this.form.color = this.colors[Math.floor(Math.random() * this.colors.length)];
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
</style>