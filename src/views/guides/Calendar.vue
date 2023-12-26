<template>
    <section class="main" id="add_calendar">
        <div class="bg-white br-24 flx section-main-wrapper pd-16 gap-16">
            <div class="calendar-left bg-color br-8 pd-32 overflow-y-scroll relative">
                <add-calendar-event @go-to-event="goToEvent" :input2="true" />
            </div>
            <div class="calendar-right flx bg-color br-8 flx-1 pd-24 gap-24">
                <div class="right-col-1 relative flx-1">
                    <div class="flx jc-sb mb-16 ai-c">
                        <div class="fs-108rem calendar-title wrap-text wrap-line-1">{{ format_date2(current_start_date)}}</div>
                        <div>
                            <ul class="flx bg-white pd-8 br-32 tab">
                                <li>
                                    <router-link :to="{ name: 'Calendar'}" :class="{'active' : $route.query.status !== 'day'}">Month</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'Calendar', query: { status: 'day'} }" :class="{'active' : $route.query.status === 'day'}">Day</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <vue-cal
                        :disable-views="['years', 'year']"
                        :selected-date="selectedDate"
                        :active-view="$route.query.status !== 'day' ? 'month': 'day'"
                        events-on-month-view="short"
                        :events="computedEvents"
                        hide-view-selector
                        hide-title-bar
                        @view-change="calChange"
                        ref="vuecal"
                        class="event-cal-theme ov-hidden br-16"
                    />
                    <div class="jc-sb flx mt-32">
                        <button class="btn-sm bg-white gap-4" @click="$refs.vuecal.previous()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.086 15.086">
                                <path d="M4.421,12.09l7.543,7.543,1.344-1.32-5.28-5.28H19.507V11.147H8.028l5.28-5.28-1.344-1.32Z" transform="translate(-4.421 -4.547)" fill="#1c1b1f"/>
                            </svg>
                            {{ previous_month }}
                        </button>
                        <button class="btn-sm bg-white gap-4" @click="$refs.vuecal.next()">
                            {{ next_month }}
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15 15">
                                <path id="Path_2364" data-name="Path 2364" d="M4.421,12.047l7.5,7.5,1.336-1.313-5.25-5.25H19.421V11.11H8.007l5.25-5.25L11.921,4.547Z" transform="translate(19.421 19.547) rotate(180)" fill="#1c1b1f"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div v-if="events.length" class="right-col-2 flx-1 flx column gap-16 overflow-y-scroll">
                    <div class="bg-white pd-12 br-16 flx ai-c gap-16">
                        <span class="wrap-text wrap-line-1">Total events</span>
                        <div class="centered count br-50 flx-shrink-0 fs-09">{{ events.length }}</div>
                    </div>
                    <event-vertical-items v-for="event in computedEvents" :key="event.title" :event="event" @go-to-event="goToEvent"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import EventVerticalItems from '@/components/includes/EventVerticalItems.vue'
import { mapState } from 'vuex'
import AddCalendarEvent from './AddCalendarEvent.vue'
export default {
    name: 'CalendarView',
    components: { VueCal, EventVerticalItems, AddCalendarEvent },
    mixins: [formatDateTime],
    computed: {
        ...mapState({
            events: (state) => state.events
        }),
        computeEmptyGal() {
            return 6 - this.form.gallery.length
        },
        computedEvents() {
            return this.events.map(element => {
                return {
                    id: element.id,
                    start: element.start_date,
                    end: element.end_date,
                    duration: element.event_duration,
                    title: element.event_name,
                    color: element.color_class,
                    class: element.color_class
                };
            });
        },
    },
    data() {
        return {
            selectedDate: '',
            current_start_date: new Date().toISOString().slice(0, 10),
            previous_month: '',
            next_month: ''
        }
    },
    methods: {
        calChange(date) {
            const newDate = new Date(date.startDate).toISOString().slice(0, 10)
            this.current_start_date = newDate
            this.computeMonth(newDate)
        },
        goToEvent(date) {
            this.selectedDate = date
        },
        computeMonth(today) {
            const currentMonth = new Date(today).getMonth()
            const previousMonth = (currentMonth - 1 + 12) % 12;
            const nextMonth = (currentMonth + 1) % 12;
            const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
            ];
            this.previous_month = monthNames[previousMonth];
            this.next_month = monthNames[nextMonth];
        }
    },
    mounted() {
        this.computeMonth(new Date())
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
.right-col-1 {
    flex-basis: 75%;
}
.right-col-2 {
    min-width: 220px;
}
</style>