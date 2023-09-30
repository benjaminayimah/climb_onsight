<template>
    <section class="main" id="add-calendar">
        <div class="bg-white br-24 flx section-main-wrapper pd-16 gap-16">
            <div class="calendar-left bg-color br-8 pd-32">
                <h4 class="text-center mb-24">Add to your calender</h4>
                <div class="flx column gap-24">
                    <div class="bg-white br-16 cal-picker-wrapper">
                        <vue-cal
                        class="vuecal--rounded-theme cal-dark-theme"
                        xsmall
                        hide-view-selector
                        :time="false"
                        active-view="month"
                        :disable-views="['week']"
                        @cell-click="dateInput"
                        style="width: 100%;height: 300px; box-shadow: unset;">
                    </vue-cal>
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
                        <button @click="saveDate" class="button-primary btn-md w-100">Next</button>
                    </div>
                </div>
            </div>
            <div class="calendar-right flx bg-color br-8 flx-1 pd-24 gap-24">
                <div class="right-col-1 relative">
                    <div class="flx jc-sb mb-16">
                        <div class="fs-2rem">{{ format_date_short2(eventCalDate)}}</div>
                        <ul class="flx bg-white pd-8 br-32 tab">
                            <li>
                                <router-link :to="{ name: 'Calendar'}" :class="{'active' : $route.query.status !== 'daily'}">Monthly</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'Calendar', query: { status: 'daily'} }" :class="{'active' : $route.query.status === 'daily'}">Daily</router-link>
                            </li>
                        </ul>
                    </div>
                    <vue-cal
                        :disable-views="['years', 'year']"
                        :active-view="$route.query.status !== 'daily' ? 'month': 'day'"
                        events-on-month-view="short"
                        :events="events"
                        hide-view-selector
                        hide-title-bar
                        @cell-click="eventDateClick"
                        ref="vuecal"
                        class="event-cal-theme ov-hidden br-16"
                    />
                    <div class="jc-sb flx mt-32">
                        <button class="btn-sm btn-rounded bg-white gap-4" @click="$refs.vuecal.previous()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.086 15.086">
                                <path d="M4.421,12.09l7.543,7.543,1.344-1.32-5.28-5.28H19.507V11.147H8.028l5.28-5.28-1.344-1.32Z" transform="translate(-4.421 -4.547)" fill="#1c1b1f"/>
                            </svg>
                            Previous
                        </button>
                        <button class="btn-sm btn-rounded bg-white gap-4" @click="$refs.vuecal.next()">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15 15">
                                <path id="Path_2364" data-name="Path 2364" d="M4.421,12.047l7.5,7.5,1.336-1.313-5.25-5.25H19.421V11.11H8.007l5.25-5.25L11.921,4.547Z" transform="translate(19.421 19.547) rotate(180)" fill="#1c1b1f"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="right-col-2 flx-1 flx column gap-16">
                    <div v-for="event in events" :key="event.title" class="pd-16 br-16 bg-white">
                        <div class="flx gap-8 ai-c">
                            <h1>{{ format_date_day(event.start) }}</h1>
                            <h4 class="uppercase wrap-text wrap-line-1">{{event.title}}</h4>
                        </div>
                        <div>Wednesday,10th, 2023</div>
                        <div class="fs-09 gray">
                            <div>{{ format_time(event.start) }} - {{ format_time(event.end) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import inputValidationMixin from '@/mixins/inputValidation'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
    name: 'CalendarView',
    components: { VueCal },
    mixins: [inputValidationMixin, formatDateTime],
    data() {
        return {
            form: {
                date: new Date().toISOString().slice(0, 10),
                start_time: '',
                end_time: ''
            },
            eventCalDate: new Date().toISOString().slice(0, 10),
            events: [
                {
                start: '2023-09-21',
                end: '2023-09-21',
                title: 'Need to go shopping',
                content: '<i class="icon material-icons">shopping_cart</i>',
                class: 'leisure'
                },
                {
                start: '2023-09-21',
                end: '2023-09-21',
                title: 'Golf with John',
                content: '<i class="icon material-icons">golf_course</i>',
                class: 'sport'
                },
                {
                start: '2023-09-22',
                end: '2023-09-22',
                title: 'Dad\'s birthday!',
                content: '<i class="icon material-icons">cake</i>',
                class: 'sport'
                }
            ]
        }
    },
    methods: {
        dateInput(date) {
            this.form.date = new Date(date).toISOString().slice(0, 10)
        },
        eventDateClick(date) {
            // console.log(date)
            this.eventCalDate = new Date(date).toISOString().slice(0, 10)
        },
        saveDate() {
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
                console.log(this.form)
            }
        },
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
        },

    }
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100dvh - 116px);
}
.section-main-wrapper{
    height: 100%;
}
.calendar-left {
    flex-basis: 400px;
}
.input-wrapper {
    select, input {
        padding: 10px 20px;
        border: 1px solid transparent;
    }
}
.cal-picker-wrapper {
    overflow: hidden;
}
.right-col-1 {
    flex-basis: 75%;
}



</style>