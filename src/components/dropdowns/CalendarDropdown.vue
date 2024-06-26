<template>
    <div class="input-wrapper">
        <button :id="id" @click.prevent="!fetchingBookingDates ? openDropdown(id) : ''" class="div-input flx jc-sb ai-c bg-transparent" :class="[{ 'error-border': validation.errors.date }, toggleMenu ? 'active' : '', fetchingBookingDates ? 'disabled-input' : '']">
            <div class="flx gap-8 ai-c">
                <span>{{ date || 'Pick a date' }}</span>
                <span v-if="date" class="gray">|</span>
                <spinner v-if="fetching_slots" :size="16" :color="'#0c59ed'" />
                <span v-else-if="date" :class="limit > 0 ? 'ft-vuecal' : 'ft-danger'" class="slots-pill">
                    <strong>{{ limit > 0 ? limit : 'No' }}</strong> slots available
                </span>
            </div>
            <span class="hide-show-pass absolute centered br-50">
                <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 24 26">
                    <path d="M-3300-660c0-.707.011-1.372.035-2q.019-.516.051-1,.034-.518.083-1c.5-4.965,2.267-7.018,6.832-7.707V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.085c.911-.059,1.908-.086,3-.086s2.09.026,3,.086V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.293c4.566.688,6.327,2.741,6.832,7.707.033.321.06.654.083,1,.022.322.038.655.052,1,.023.629.034,1.3.034,2,0,9.882-2.118,12-12,12S-3300-650.118-3300-660Zm2,0a26.907,26.907,0,0,0,.438,5.61,5.206,5.206,0,0,0,1.271,2.681,5.214,5.214,0,0,0,2.681,1.271A26.852,26.852,0,0,0-3288-650a26.842,26.842,0,0,0,5.61-.438,5.214,5.214,0,0,0,2.682-1.271,5.214,5.214,0,0,0,1.27-2.681A26.831,26.831,0,0,0-3278-660c0-.716-.011-1.381-.036-2h-19.928C-3297.989-661.38-3298-660.715-3298-660Zm2.108-8.634c-.944.692-1.625,1.908-1.929,4.633h19.642c-.3-2.725-.985-3.941-1.93-4.633a6.7,6.7,0,0,0-2.892-1.048V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.909c-.869-.061-1.861-.091-3-.091s-2.132.03-3,.091V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.681A6.7,6.7,0,0,0-3295.892-668.633Zm10.5,14.27a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm-8.61,0a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3300 674)" fill="#000"/>
                </svg>
            </span>
        </button>
    </div>
    <span class="input-error" v-if="validation.error && validation.errors.date">
        {{ validation.errors.date[0] }}
    </span>
    <teleport to="body">
        <backdrop v-if="toggleMenu" @click="closeDropdown(id)" :index="500" :opacity="0" />
        <vue-cal v-if="toggleMenu"
            class="vuecal--rounded-theme vuecal--white-theme vuecal-small absolute bg-white"
            xsmall
            hide-view-selector
            active-view="month"
            :time="false"
            :startWeekOnSunday="true"
            :selected-date="computedSelectedDate"
            :disable-views="['week', 'day', 'year', 'years']"
            :disable-days="disableDays"
            :min-date="event.start_date"
            :max-date="event.end_date"
            @cell-click="handleDate"
            style="max-width: 320px;height: 320px" :style="{ top: dynamicFloatingDiv.top+60 + 'px', right: dynamicFloatingDiv.left + 'px' }">
        </vue-cal>
    </teleport>
</template>

<script>
import axios from 'axios'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import Backdrop from '../includes/Backdrop.vue'
import dropdownToggleMixin from '@/mixins/dropdownToggleMixin'
import { mapState } from 'vuex'
import Spinner from '../includes/Spinner.vue'
export default {
    inheritAttrs: false,
    name: 'CalendarDropdown',
    components: { Backdrop, VueCal, Spinner },
    mixins: [dropdownToggleMixin],
    props: {
        id: String,
        validation: Object,
        date: String,
        limit: Number,
        event: Object,
        fetching_slots: Boolean
    },
    computed: {
        ...mapState({
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            dynamicFloatingDiv: (state) => state.dropdown.dynamicFloatingDiv,
        }),
        disableDays() {
            if(this.event.repeat_at) {
                const dateArray = []
                const today = new Date()
                let currentDate = new Date(this.event.start_date);
                let endDate = new Date(this.event.end_date)
                if(this.event.repeat_at === 'weekly') {
                    while (currentDate <= endDate) {
                        if (currentDate < today) {
                            dateArray.push(currentDate.format());
                        }
                        if (currentDate.getDay() !== new Date(this.event.start_date).getDay()) {
                            dateArray.push(currentDate.format());
                        }
                        if(this.eventIsClosed(currentDate)) {
                            dateArray.push(currentDate.format());
                        }
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                }else if(this.event.repeat_at === 'weekdays') {
                    while (currentDate <= endDate) {
                        if (currentDate < today) {
                            dateArray.push(currentDate.format());
                        }
                        if (this.isWeekend(currentDate)) {
                            dateArray.push(currentDate.format()); // Add weekend date to the list
                        }
                        if(this.eventIsClosed(currentDate)) {
                            dateArray.push(currentDate.format());
                        }
                        currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
                    }
                }else if(this.event.repeat_at === 'weekends') {
                    while (currentDate <= endDate) {
                        if (currentDate < today) {
                            dateArray.push(currentDate.format());
                        }
                        if (!this.isWeekend(currentDate)) {
                            dateArray.push(currentDate.format()); // Add weekend date to the list
                        }
                        if(this.eventIsClosed(currentDate)) {
                            dateArray.push(currentDate.format());
                        }
                        currentDate.setDate(currentDate.getDate() + 1); 
                    }
                }
                else if(this.event.repeat_at === 'monthly') {
                    while (currentDate <= endDate) {
                        if (currentDate < today) {
                            dateArray.push(currentDate.format());
                        }
                        if (currentDate.getDate() !== new Date(this.event.start_date).getDay()) {
                            dateArray.push(new Date(currentDate).format());
                        }
                        if(this.eventIsClosed(currentDate)) {
                            dateArray.push(currentDate.format());
                        }
                        currentDate.setDate(currentDate.getDate() + 1); 
                    }
                }else if(this.event.repeat_at === 'daily') {
                    while (currentDate <= endDate) {
                        if (currentDate < today) {
                            dateArray.push(currentDate.format());
                        }
                        if(this.eventIsClosed(currentDate)) {
                            dateArray.push(currentDate.format());
                        }
                        currentDate.setDate(currentDate.getDate() + 1); 
                    }
                }
                return dateArray
            }
            else
            return []
        },
        computedSelectedDate() {
            if(new Date(this.event.start_date) > new Date()) {
                return this.event.start_date
            }else {
                return new Date()
            }
        }
    },
    data() {
        return {
            fetchingBookingDates: true,
            bookingDates: []
        }
    },
    methods: { 
        handleDate(date) {
            this.$emit('cal-change', date)
        },
        isWeekend(date) {
            const day = date.getDay();
            return day === 0 || day === 6;
        },
        eventIsClosed(date) {
            const newDate = new Date(date).toISOString().slice(0, 10)
            const isclosed = this.bookingDates.filter(booking => newDate == new Date(booking.date_selected).toISOString().slice(0, 10) && !booking.relist)
            const bookedArr = this.bookingDates.filter(booking => newDate == new Date(booking.date_selected).toISOString().slice(0, 10))
            const totalBooked = bookedArr.reduce((acc, item) => acc + Number(item.quantity), 0)
            return totalBooked == this.event.attendance_limit || isclosed.length ? true : false
        },
        async getBookingDate() {
            try {
                const res = await axios.post(this.hostname+'/api/get-booking-dates/'+this.event.id+'?token='+this.token)
                this.fetchingBookingDates = false
                this.bookingDates = res.data
            } catch (e) {
                console.error(e)
            }
        }
    },
    mounted() {
        this.getBookingDate()
    }

}
</script>

<style lang="scss" scoped>
.vuecal-small {
    z-index: 501;
    inset: 85px 0 auto auto;
    padding: 18px 15px;
}
.div-input {
    height: 58px;
}
.div-input:not(.disabled-input) {
    cursor: pointer;
}
.active {
    border-color: var(--black);
}
.slots-pill {
    padding: 8px 14px;
    border-radius: 24px;
}
.ft-vuecal {
    background-color: #dfeaff;
    border: #c5d6f4 1px solid;
}
.ft-danger {
    background-color: #ffe0e0;
    border: #ffcdcd 1px solid;
}
</style>