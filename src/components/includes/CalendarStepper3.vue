<template>
    <form id="cal_stepper_3_form" @submit.prevent="" class="flx column gap-24">
        <div class="form-row flx jc-sb">
            <div>
                Public or private event?
            </div>
            <div class="flx gap-8 ai-c">
                <label for="public_event" class="flx gap-4" data-type="input-wapper">
                    <input v-model="form.event_type" type="radio" id="public_event" value="public">
                    <span>
                        Public
                    </span>
                </label>
                <label for="private_event" class="flx gap-4" data-type="input-wapper">
                    <input v-model="form.event_type" type="radio" id="private_event" value="private">
                    <span>
                        Private
                    </span>
                </label>
            </div>
        </div>
        <div class="fs-09 notice">
            <strong>NOTE: </strong>Public trips will automatically be relisted at the same price per person until trip fills up.
        </div>
        <div class="form-row column mt-16">
            <label for="attendance_limit">Attendance range</label>
            <input v-model="form.attendance_limit" type="range" min="1" max="30" id="attendance_limit" name="attendance_limit" step="1" class="w-100" :class="{ 'gray-bg' : editMode === 'event_edit'}" />
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
            <div class="label">Price{{ form.event_type === 'public' ? ' per person' : 's'}}(CAD)</div>
            <div v-if="form.event_type === 'public'"  class="input-wrapper">
                <input v-model="form.price" @input="checkNumberInput" class="br-16 w-100" type="number" min="1" id="price" name="price"  :class="[{'error-border': validation.errors.price }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter event price" />
            </div>
            <div v-if="form.event_type === 'private'">
            <div class="fs-09 mb-8">
                <strong>NOTE: </strong>Amount of persons depends on attendance range.
            </div>
            <div class="flx column gap-4">
                <price-input v-for="(price, index) in computedPriceRange" :key="index" :index="index" @add-price-input="addPriceInput" :prices="form.price_range" />
            </div>
        </div>
            <span class="input-error" v-if="validation.error && validation.errors.price">
                {{ validation.errors.price[0] }}
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
        <error-display-card v-if="validation.error" :errors="validation.errors"/>
        <div class="flx column gap-8 calendar-btn-wrapper">
            <button @click.prevent="nextPage" class="button-primary btn-lg w-100">Next</button>
            <button v-if="editMode === ''" @click.prevent="previousPage" class="bg-transparent btn-sm w-100">Back</button>
        </div>
    </form>
</template>

<script>
import inputValidationMixin from '@/mixins/inputValidation'
import alertMixin from '@/mixins/alertMixin'
import PriceInput from './PriceInput.vue'
import ErrorDisplayCard from './ErrorDisplayCard.vue'
export default {
    components: { PriceInput, ErrorDisplayCard },
    name: 'CalendarStepper3',
    mixins: [inputValidationMixin, alertMixin],
    props: {
        newEvent: Object,
        input2: Boolean,
        editMode: String
    },
    computed: {
        computedPriceRange() {
            let length = Number(this.form.attendance_limit)
            return Array.from({ length }, (_, index) => index);
        }
    },
    data() {
        return {
            form: {
                event_type: 'public',
                attendance_limit: 4,
                price: '',
                price_range: [],
                event_description: ''
            },
        }
    },
    methods: {
        addPriceInput(payload) {
            const i = this.form.price_range.findIndex(x => x.id === payload.id)
            if(i > -1) {
                this.form.price_range.splice(i, 1, payload)
            }else {
                this.form.price_range.push(payload)
            }
        },
        async nextPage() {
            this.validation.error ? this.clearErrs() : ''
            let errors = { price: ''}
            if(this.form.event_type === 'private') {
                this.form.price_range = this.form.price_range.slice(0, Number(this.form.attendance_limit))
            }
            if((this.form.price == '' && this.form.event_type === 'public') || (this.form.event_type === 'private' && (!this.validatePriceRange() || this.form.attendance_limit != this.form.price_range.length)) ) {
                if(this.form.price == '') {
                    errors.price = ['The Price field is required.']
                }if (!this.validatePriceRange() || this.form.attendance_limit != this.form.price_range.length) {
                    errors.price = ['Please specify the price for all persons.']
                }
                this.showErr(errors)
            }else {
                this.editMode === 'event_edit' ? await this.$store.commit('updateTempStorage3', this.form) : await this.$store.commit('saveEventForm3', this.form)
                this.$router.push({ query: { stepper: '4', current: this.$route.query.current, origin: this.$route.query.origin }})
            }
        },
        validatePriceRange() {
            return this.form.price_range.every(item => item.price && item.price !== undefined && item.price !== '' && item.price !== null)
        },
        previousPage() {
            this.$router.push({ query: { stepper: '2', current: this.$route.query.current, origin: this.$route.query.origin }})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.event_type ? this.form.event_type = this.newEvent.event_type : ''
                this.newEvent.attendance_limit ? this.form.attendance_limit = this.newEvent.attendance_limit : ''
                this.newEvent.event_description ? this.form.event_description = this.newEvent.event_description : ''
                if(this.editMode === 'event_edit') {
                    if(this.newEvent.event_type === 'private') {
                        this.form.price_range = JSON.parse(this.newEvent.price)
                    }else {
                        this.form.price = this.newEvent.price
                    }
                }else {
                    this.newEvent.price ? this.form.price = this.newEvent.price : ''
                    this.newEvent.price_range ? this.form.price_range = this.newEvent.price_range : ''
                }
            }
        }
    },
    mounted() {
        this.presetForm()
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
    padding-bottom: 20px;
    border-bottom: 1px solid #d9d9d9;
}
.gray-bg.gray-bg {
    background-color: #F1F1F1;
}
</style>