<template>
    <form @submit.prevent="" class="flx column gap-16">
        <div class="form-row column">
            <label for="category">Event Category(Choose one)</label>
            <div class="input-wrapper">
                <ul class="flx gap-8 flx-wrap">
                    <category-list v-for="category in categories" :key="category.id" :category="category" :selected="form.category" @select-category="selectCategory" :color="'#fff'"/>
                </ul>
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.category">
                {{ validation.errors.category[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="attendance_limit">Attendance range</label>
            <input v-model="form.attendance_limit" type="range" min="1" max="30" step="1" class="w-100 custom-range" />
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
                <input v-model="form.price" @input="checkNumberInput" class="br-16 w-100 bd-trans" type="number" min="1" id="price" name="price"  :class="{ 'error-border': validation.errors.price }" placeholder="Enter event price" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.price">
                {{ validation.errors.price[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <label for="gears">Gears</label>
                <span class="gray fs-08">Separate with a comma</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.gears" class="br-16 w-100 bd-trans" type="text" id="gears" name="gears"  :class="{ 'error-border': validation.errors.gears }" placeholder="Enter Gears" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.gears">
                {{ validation.errors.gears[0] }}
            </span>
        </div>
        <div class="form-row column">
            <div class="flx jc-sb ai-c">
                <label for="itinerary">Itinerary</label>
                <span class="gray fs-08">Optional</span>
            </div>
            <div class="input-wrapper">
                <input v-model="form.itinerary" class="br-16 w-100 bd-trans" type="text" id="itinerary" name="itinerary"  :class="{ 'error-border': validation.errors.itinerary }" placeholder="Enter itinerary" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.itinerary">
                {{ validation.errors.itinerary[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="event_description">Event description</label>
            <div class="input-wrapper">
                <textarea v-model="form.event_description" class="br-16 w-100 bd-trans" id="event_description" name="event_description"  :class="{ 'error-border': validation.errors.event_description }" rows="2"></textarea>
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.event_description">
                {{ validation.errors.event_description[0] }}
            </span>
        </div>
        <div class="flx column gap-8">
            <button @click="saveForm3" class="button-primary gap-8 btn-md w-100" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                <spinner v-if="submiting" :size="18" />
                <span>{{ submiting ? 'Submiting...' : 'Submit'}}</span>
            </button>
            <button @click="previousPage" class="bg-transparent btn-sm w-100">Back</button>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import inputValidationMixin from '@/mixins/inputValidation'
import alertMixin from '@/mixins/alertMixin'
import CategoryList from './CategoryList.vue'
import Spinner from './Spinner.vue'
export default {
    components: { CategoryList, Spinner },
    name: 'CalendarStepper3',
    mixins: [inputValidationMixin, alertMixin],
    props: {
        newEvent: Object
    },
    computed: {
        ...mapState({
            categories: (state) => state.data.categories,
            token: (state) => state.token,
            hostname: (state) => state.hostname
        }),
    },
    data() {
        return {
            form: {
                category: '',
                price: '',
                attendance_limit: 10,
                gears: [],
                itinerary: '',
                event_description: '',
            },
        }
    },
    methods: {
        selectCategory(category) {
            if(this.form.category && this.form.category === category.name) {
                this.form.category = ''
            }else {
                this.form.category = category.name
            }
        },
        async saveForm3() {
            let errors = { category: ''}
            if(this.form.category == '') {
                if(this.form.category == '') {
                    errors.category = ['The Category field is required']
                }
                this.showErr(errors)
            }else {
                this.validation.error ? this.clearErrs() : ''
                await this.$store.commit('saveEventForm3', this.form)
                this.submitForm()
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
            await this.$store.commit('addToEvent', res.data)
            await this.$store.commit('clearNewEvent')
            this.$router.push({ name: 'Calendar'})
            this.$emit('go-to-event', res.data.date)
        },
        previousPage() {
            this.$router.push({ name: 'Calendar', query: { stepper: '2'}})
        },
        presetForm() {
            if(this.newEvent) {
                this.newEvent.category ? this.form.category = this.newEvent.category : ''
                this.newEvent.attendance_limit ? this.form.attendance_limit = this.newEvent.attendance_limit : ''
                this.newEvent.itinerary ? this.form.itinerary = this.newEvent.itinerary : ''
                this.newEvent.event_description ? this.form.event_description = this.newEvent.event_description : ''
                if(this.newEvent.gears) {
                    this.form.gears = this.newEvent.gears.join(',')
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
        padding: 10px 20px;
        border: 1px solid transparent;
        background-color: #fff;
    }
}
.counter {
    padding: 2px 16px;
}
</style>