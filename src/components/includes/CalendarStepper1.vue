<template>
    <form @submit.prevent="" class="flx column gap-24" id="cal_stepper_1_form">
        <div class="form-row column">
            <label for="event_name">Event name</label>
            <div class="input-wrapper">
                <input v-model="form.event_name" class="br-16 w-100" type="text" id="event_name" name="event_name"  :class="[{ 'error-border': validation.errors.event_name }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter your event name" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.event_name">
                {{ validation.errors.event_name[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="event_duration">Duration</label>
            <div class="input-wrapper">
                <input v-model="form.event_duration" @input="sliceInput" class="br-16 w-100" type="text" maxlength="10" id="event_duration" name="event_duration"  :class="[{ 'error-border': validation.errors.event_duration }, input2 ? 'form-control2' : 'form-control']" placeholder="E.g 4 hours, half day, 2 days..." />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.event_duration">
                {{ validation.errors.event_duration[0] }}
            </span>
        </div>
        <div class="form-row flx jc-sb">
            <div>
                Repeat this event?
            </div>
            <div class="flx gap-8 ai-c">
                <label for="repeat_yes" class="flx gap-4" data-type="input-wapper">
                    <input v-model="form.repeat" type="radio" id="repeat_yes" :value="true">
                    <span>
                        Yes
                    </span>
                </label>
                <label for="repeat_no" class="flx gap-4" data-type="input-wapper">
                    <input v-model="form.repeat" type="radio" id="repeat_no" :value="false">
                    <span>
                        No
                    </span>
                </label>
            </div>
        </div>
        <div class="form-row column">
            <label for="start_date">{{ form.repeat ? 'Start date' : 'Select date' }}</label>
            <div class="input-wrapper">
                <input v-model="form.start_date" class="br-16 w-100" type="datetime-local" id="start_date" name="start_date" :class="[{'error-border': validation.errors.start_date }, input2 ? 'form-control2' : 'form-control']" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.start_date">
                {{ validation.errors.start_date[0] }}
            </span>
        </div>
        <div v-if="form.repeat" class="form-row column">
            <label for="end_date">End date</label>
            <div class="input-wrapper">
                <input v-model="form.end_date" class="br-16 w-100" type="datetime-local" id="end_date" name="end_date" :class="[{'error-border': validation.errors.end_date }, input2 ? 'form-control2' : 'form-control']" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.end_date">
                {{ validation.errors.end_date[0] }}
            </span>
        </div>
        <div v-if="form.repeat" class="form-row column">
            <label for="repeat_at">Frequency</label>
            <div class="input-wrapper">
                <select v-model="form.repeat_at" name="repeat_at" id="repeat_at" class="w-100 br-16" :class="input2 ? 'form-control2' : 'form-control'">
                    <option v-for="(repeat, index) in repeat_at" :key="index" :value="repeat.value">{{ repeat.label }}</option>
                </select>
            </div>
        </div>
        <error-display-card v-if="validation.error" :errors="validation.errors"/>
        <div class="calendar-btn-wrapper">
            <button @click.prevent="nextPage" class="button-primary btn-lg w-100" :class="{ 'button-disabled2' : !user.details_submitted && !user.payouts_enabled }" :disabled="!user.details_submitted && !user.payouts_enabled ? true : false">
                Next
            </button>
            <div class="mt-8 fs-09 text-center" v-if="!user.details_submitted && !user.payouts_enabled">
                In order to get started with listing events, accepting payment and receiving payouts, you will need to setup your payout account. <router-link class="a-link ft-secondary" :to="{ name: 'Payout'}">Setup account now.</router-link>
            </div>
        </div>
    </form>
</template>

<script>
import inputValidationMixin from '@/mixins/inputValidation'
import ErrorDisplayCard from './ErrorDisplayCard.vue'
import { mapState } from 'vuex'
export default {
    components: { ErrorDisplayCard },
    name: 'CalendarStepper1',
    mixins: [inputValidationMixin],
    computed: {
        ...mapState({
            repeat_at: (state) => state.data.repeat_at
        })
    },
    props: {
        newEvent: Object,
        input2: Boolean,
        editMode: String,
        user: Object
    },
    data() {
        return {
            form: {
                event_name: '',
                event_duration: '',
                start_date: '',
                end_date: '',
                repeat: false,
                repeat_at: 'daily'
            }
        }
    },
    methods: {
        sliceInput() {
            let input = this.form.event_duration
            if (input.length > 10) {
                this.form.event_duration = input.slice(0, 10);
            }
        },
        async nextPage() {
            this.validation.error ? this.clearErrs() : ''
            let errors = {}
            if(this.form.event_name == '' || this.form.start_date == '' || (this.form.repeat && this.form.end_date == '') || this.form.event_duration == '') {
                if(this.form.event_name == '') {
                    errors.event_name = ['The event name field is required.']
                }
                if(this.form.start_date == '') {
                    errors.start_date = ['Please select a date.']
                }
                if(this.form.repeat && this.form.end_date == '') {
                    errors.end_date = ['Please select an end date.']
                }
                if(this.form.event_duration == '') {
                    errors.event_duration = ['Please enter event duration.']
                }
                this.showErr(errors)
            }else {
                this.editMode === 'event_edit' ? await this.$store.commit('updateTempStorage1', this.form) : await this.$store.commit('saveEventForm1', this.form)
                this.$router.push({ query: { stepper: '2', current: this.$route.query.current, origin: this.$route.query.origin }})
            }
        },
        presetForm() {
            this.newEvent && this.newEvent.event_name ? this.form.event_name = this.newEvent.event_name : ''
            this.newEvent && this.newEvent.event_duration ? this.form.event_duration = this.newEvent.event_duration : ''
            this.newEvent && this.newEvent.start_date ? this.form.start_date = this.newEvent.start_date : ''
            this.newEvent && this.newEvent.end_date ? this.form.end_date = this.newEvent.end_date : ''
            this.newEvent && this.newEvent.repeat ? this.form.repeat = this.newEvent.repeat : this.form.repeat = false
            this.newEvent && this.newEvent.repeat_at ? this.form.repeat_at = this.newEvent.repeat_at : ''
            if(this.editMode === 'event_edit' && this.newEvent.repeat_at) {
                this.form.repeat = true
            }
        }, 
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
    }
}
.cal-picker-wrapper {
    overflow: hidden;
}
</style>