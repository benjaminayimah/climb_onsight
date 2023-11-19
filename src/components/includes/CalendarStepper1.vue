<template>
    <form @submit.prevent="" class="flx column gap-24">
        <div class="form-row column">
            <label for="event_name">Event name</label>
            <div class="input-wrapper">
                <input v-model="form.event_name" class="br-16 w-100 form-control" type="text" id="event_name" name="event_name"  :class="[{ 'error-border': validation.errors.event_name }, input2 ? 'form-control2' : 'form-control']" placeholder="Enter your event name" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.event_name">
                {{ validation.errors.event_name[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="start_date">Start date</label>
            <div class="input-wrapper">
                <input v-model="form.start_date" class="br-16 w-100" type="date" id="start_date" name="start_date" :class="[{'error-border': validation.errors.start_date }, input2 ? 'form-control2' : 'form-control']" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.start_date">
                {{ validation.errors.start_date[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="end_date">End date</label>
            <div class="input-wrapper">
                <input v-model="form.end_date" class="br-16 w-100" type="date" id="end_date" name="end_date" :class="[{'error-border': validation.errors.end_date }, input2 ? 'form-control2' : 'form-control']" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.end_date">
                {{ validation.errors.end_date[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="start_time">Event time (EST)</label>
            <div class="input-wrapper">
                <input v-model="form.start_time" class="br-16 w-100" type="time" id="start_time" name="start_time" :class="[{'error-border': validation.errors.start_time }, input2 ? 'form-control2' : 'form-control']" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.start_time">
                {{ validation.errors.start_time[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="repeat" class="flx gap-8 ai-fs" data-type="input-wapper">
                <input v-model="form.repeat" type="checkbox" id="repeat">
                <span>
                    Repeat this event?
                </span>
            </label>
        </div>
        <div v-if="form.repeat" class="form-row column">
            <label for="repeat_at">Select repeat range</label>
            <div class="input-wrapper">
                <select v-model="form.repeat_at" name="repeat_at" id="repeat_at" class="form-control">
                    <option>weekly</option>
                    <option>monthly</option>
                    <option>daily</option>
                </select>
            </div>
        </div>
        <div>
            <button @click="nextPage" class="button-primary btn-md w-100" :class="{ 'button-disabled2' : !user.details_submitted && !user.payouts_enabled }" :disabled="!user.details_submitted && !user.payouts_enabled ? true : false">
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
export default {
    name: 'CalendarStepper1',
    mixins: [inputValidationMixin],
    props: {
        newEvent: Object,
        input2: Boolean,
        editMode: Boolean,
        user: Object
    },
    data() {
        return {
            form: {
                event_name: '',
                start_date: new Date().toISOString().slice(0, 10),
                end_date: new Date().toISOString().slice(0, 10),
                start_time: '',
                repeat: false,
                repeat_at: 'weekly'
            }
        }
    },
    methods: {
        dateInput(date) {
            this.form.date = new Date(date).toISOString().slice(0, 10)
        },
        async nextPage() {
            let errors = { event_name: '', start_date: '', end_date: '', start_time: '',}
            if(this.form.event_name == '' || this.form.start_date == '' || this.form.end_date == '' || this.form.start_time == '') {
                if(this.form.event_name == '') {
                    errors.event_name = ['The Event name field is required']
                }
                if(this.form.start_date == '') {
                    errors.start_date = ['Please select a start date']
                }
                if(this.form.end_date == '') {
                    errors.end_date = ['Please select an end date']
                }
                if(this.form.start_time == '') {
                    errors.start_time = ['Please select event start time']
                }
                this.showErr(errors)
            }else {
                this.validation.error ? this.clearErrs() : ''
                this.editMode ? await this.$store.commit('updateTempStorage1', this.form) : await this.$store.commit('saveEventForm1', this.form)
                this.$router.push({ name: this.$route.name, query: { stepper: '2', current: this.$route.query.current, origin: this.$route.query.origin }})
            }
        },
        presetForm() {
            this.newEvent && this.newEvent.event_name ? this.form.event_name = this.newEvent.event_name : ''
            this.newEvent && this.newEvent.start_date ? this.form.start_date = this.newEvent.start_date : new Date().toISOString().slice(0, 10)
            this.newEvent && this.newEvent.end_date ? this.form.end_date = this.newEvent.end_date : new Date().toISOString().slice(0, 10)
            this.newEvent && this.newEvent.start_time ? this.form.start_time = this.newEvent.start_time : ''
            this.newEvent && this.newEvent.repeat ? this.form.repeat = this.newEvent.repeat : false
            this.newEvent && this.newEvent.repeat_at ? this.form.repeat_at = this.newEvent.repeat_at : ''
            if(this.editMode && this.newEvent.repeat_at) {
                this.form.repeat = true
            }else {
                this.form.repeat = false
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