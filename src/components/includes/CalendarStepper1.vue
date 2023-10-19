<template>
    <form @submit.prevent="" class="flx column gap-16">
        <div class="form-row column">
            <label>Pick a date</label>
            <div class="bg-white br-16 cal-picker-wrapper">
                <vue-cal
                    class="vuecal--rounded-theme cal-dark-theme"
                    xsmall
                    hide-view-selector
                    :time="false"
                    :selected-date="form.date"
                    active-view="month"
                    :disable-views="['week', 'day']"
                    @cell-click="dateInput"
                    v-model="form.date"
                    style="width:100%;height:300px;box-shadow:unset;"
                />
            </div>
        </div>
        <div class="form-row column">
            <label for="start_time">Start time</label>
            <div class="input-wrapper">
                <input v-model="form.start_time" class="br-16 w-100 bd-trans" type="time" id="start_time" name="start_time"  :class="{ 'error-border': validation.errors.start_time }" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.start_time">
                {{ validation.errors.start_time[0] }}
            </span>
        </div>
        <div class="form-row column">
            <label for="end_time">End time</label>
            <div class="input-wrapper">
                <input v-model="form.end_time" class="br-16 w-100" type="time" id="end_time" name="end_time" :class="{ 'error-border': validation.errors.end_time }" />
            </div>
            <span class="input-error" v-if="validation.error && validation.errors.end_time">
                {{ validation.errors.end_time[0] }}
            </span>
        </div>
        <div>
            <button @click="nextPage" class="button-primary btn-md w-100">Next</button>
        </div>
    </form>
</template>

<script>
import inputValidationMixin from '@/mixins/inputValidation'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
    name: 'CalendarStepper1',
    components: { VueCal },
    mixins: [inputValidationMixin],
    props: {
        newEvent: Object
    },
    data() {
        return {
            form: {
                date: '',
                start_time: '',
                end_time: ''
            }
        }
    },
    methods: {
        dateInput(date) {
            this.form.date = new Date(date).toISOString().slice(0, 10)
        },
        async nextPage() {
            let errors = { start_time: '', end_time: ''}
            if(this.form.start_time == '' || this.form.end_time == '') {
                if(this.form.start_time == '') {
                    errors.start_time = ['Please select event Start Time']
                }
                if(this.form.end_time == '') {
                    errors.end_time = ['Please select event End Time']
                }
                this.showErr(errors)
            }else {
                this.validation.error ? this.clearErrs() : ''
                await this.$store.commit('saveEventForm1', this.form)
                this.$router.push({ name: 'Calendar', query: { stepper: '2'}})
            }
        },
        presetForm() {
            this.newEvent && this.newEvent.date ? this.form.date = this.newEvent.date : this.form.date = new Date().toISOString().slice(0, 10)
            this.newEvent && this.newEvent.start_time ? this.form.start_time = this.newEvent.start_time : ''
            this.newEvent && this.newEvent.end_time ? this.form.end_time = this.newEvent.end_time : ''
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
        border: 1px solid transparent;
        background-color: #fff;
    }
}
.cal-picker-wrapper {
    overflow: hidden;
}
</style>