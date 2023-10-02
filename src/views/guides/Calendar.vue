<template>
    <section class="main" id="add-calendar">
        <div class="bg-white br-24 flx section-main-wrapper pd-16 gap-16">
            <div class="calendar-left bg-color br-8 pd-32 overflow-y-scroll">
                <h4 class="text-center mb-24">Add to your calendar</h4>
                <div v-if="stepper === 1">
                    <form @submit.prevent="" class="flx column gap-24">
                        <div class="bg-white br-16 cal-picker-wrapper">
                            <vue-cal
                                class="vuecal--rounded-theme cal-dark-theme"
                                xsmall
                                hide-view-selector
                                :time="false"
                                active-view="month"
                                :disable-views="['week', 'day']"
                                @cell-click="dateInput"
                                style="width: 100%;height: 300px; box-shadow: unset;"
                            />
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
                            <button @click="saveDate(2)" class="button-primary btn-md w-100">Next</button>
                        </div>
                    </form>
                </div>
                <div v-else-if="stepper === 2">
                    <form @submit.prevent="" class="flx column gap-24">
                        <div class="form-row column">
                            <label for="event_name">Event name</label>
                            <div class="input-wrapper">
                                <input v-model="form.event_name" class="br-16 w-100 bd-trans" type="text" id="event_name" name="event_name"  :class="{ 'error-border': validation.errors.event_name }" placeholder="Enter your event name" />
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.event_name">
                                {{ validation.errors.event_name[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="gallery">Add event images</label>
                            <div class="gallery">
                                <div class="gallery-wrapper grid grid-col-3 gap-8 mb-8">
                                    <div v-for="image in form.gallery" :key="image" class="bg-img br-16 grid-item centered">
                                        <img src="" alt="">
                                    </div>
                                    <gallery-uploader v-for="image in computeEmptyGal" :key="image" />
                                </div>
                                <span class="flx gap-4 ai-c fs-09"><i class="br-50"></i>First image would be used as trip cover</span>
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.event_name">
                                {{ validation.errors.event_name[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="price">Price</label>
                            <div class="input-wrapper">
                                <input v-model="form.price" class="br-16 w-100 bd-trans" type="number" id="price" name="price"  :class="{ 'error-border': validation.errors.price }" placeholder="Enter event price" />
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.price">
                                {{ validation.errors.price[0] }}
                            </span>
                        </div>
                        <div class="form-row column">
                            <label for="address">Event location</label>
                            <div class="input-wrapper">
                                <input v-model="form.address" autocomplete="off" class="br-16 w-100 bd-trans" type="search" ref="address" id="address" name="address"  :class="{ 'error-border': validation.errors.address }" placeholder="Enter location then pick from dropdown list" />
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.location">
                                {{ validation.errors.address[0] }}
                            </span>
                        </div>
                        <div>
                            <button @click="saveDate(3)" class="button-primary btn-md w-100">Next</button>
                        </div>
                    </form>
                </div>
                <div v-else-if="stepper === 3">
                    <form @submit.prevent="" class="flx column gap-24">
                        <div class="form-row column">
                            <label for="category">Event Category</label>
                            <div class="input-wrapper">
                                <ul class="flx gap-8 flx-wrap">
                                    <category-list v-for="category in categories" :key="category.id" :hostname="hostname" :category="category" :selected="form.category" @select-category="selectCategory"/>
                                </ul>
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.gears">
                                {{ validation.errors.gears[0] }}
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
                                <textarea v-model="form.event_description" class="br-16 w-100 bd-trans" id="event_description" name="event_description"  :class="{ 'error-border': validation.errors.event_description }" cols="3"></textarea>
                            </div>
                            <span class="input-error" v-if="validation.error && validation.errors.event_description">
                                {{ validation.errors.event_description[0] }}
                            </span>
                        </div>
                        <div>
                            <button class="button-primary btn-md w-100">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="calendar-right flx bg-color br-8 flx-1 pd-24 gap-24">
                <div class="right-col-1 relative">
                    <div class="flx jc-sb mb-16 ai-c">
                        <div class="fs-2rem calendar-title wrap-text wrap-line-1">{{ format_date_short2(current_start_date)}}</div>
                        <div>
                            <ul class="flx bg-white pd-8 br-32 tab">
                                <li>
                                    <router-link :to="{ name: 'Calendar'}" :class="{'active' : $route.query.status !== 'daily'}">Monthly</router-link>
                                </li>
                                <li>
                                    <router-link :to="{ name: 'Calendar', query: { status: 'daily'} }" :class="{'active' : $route.query.status === 'daily'}">Daily</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <vue-cal
                        :disable-views="['years', 'year']"
                        :selected-date="selectedDate"
                        :active-view="$route.query.status !== 'daily' ? 'month': 'day'"
                        events-on-month-view="short"
                        :events="events"
                        hide-view-selector
                        hide-title-bar
                        @view-change="calChange"
                        ref="vuecal"
                        class="event-cal-theme ov-hidden br-16"
                    />
                    <div class="jc-sb flx mt-32">
                        <button class="btn-sm btn-rounded bg-white gap-4" @click="$refs.vuecal.previous()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15.086 15.086">
                                <path d="M4.421,12.09l7.543,7.543,1.344-1.32-5.28-5.28H19.507V11.147H8.028l5.28-5.28-1.344-1.32Z" transform="translate(-4.421 -4.547)" fill="#1c1b1f"/>
                            </svg>
                            {{ previous_month }}
                        </button>
                        <button class="btn-sm btn-rounded bg-white gap-4" @click="$refs.vuecal.next()">
                            {{ next_month }}
                            <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 15 15">
                                <path id="Path_2364" data-name="Path 2364" d="M4.421,12.047l7.5,7.5,1.336-1.313-5.25-5.25H19.421V11.11H8.007l5.25-5.25L11.921,4.547Z" transform="translate(19.421 19.547) rotate(180)" fill="#1c1b1f"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="right-col-2 flx-1 flx column gap-16 overflow-y-scroll">
                    <div class="bg-white pd-12 br-16 flx ai-c gap-16">
                        <span class="wrap-text wrap-line-1">Events Total amount</span>
                        <div class="centered count br-50 flx-shrink-0">{{ events.length }}</div>
                    </div>
                    <event-vertical-items v-for="event in events" :key="event.title" :event="event" @go-to-event="goToEvent"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import autoCompleteMixin from '@/mixins/autoCompleMixin'
import formatDateTime from '@/mixins/formatDateTime'
import inputValidationMixin from '@/mixins/inputValidation'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import GalleryUploader from '@/components/includes/GalleryUploader.vue'
import CategoryList from '@/components/includes/CategoryList.vue'
import { mapState } from 'vuex'
import EventVerticalItems from '@/components/includes/EventVerticalItems.vue'
export default {
    name: 'CalendarView',
    components: { VueCal, GalleryUploader, CategoryList, EventVerticalItems },
    mixins: [inputValidationMixin, formatDateTime, autoCompleteMixin],
    computed: {
        ...mapState({
            categories: (state) => state.data.categories
        }),
        computeEmptyGal() {
            return 6 - this.form.gallery.length
        }
    },
    data() {
        return {
            form: {
                date: new Date().toISOString().slice(0, 10),
                start_time: '',
                end_time: '',
                event_name: '',
                price: '',
                event_description: '',
                latitude: null,
                longitude: null,
                address: '',
                gallery: [],
                gears: [],
                itinerary: '',
                category: ''

            },
            stepper: 1,
            selectedDate: '',
            current_start_date: new Date().toISOString().slice(0, 10),
            previous_month: '',
            next_month: '',
            events: [
                {
                    start: '2023-09-21',
                    end: '2023-09-21',
                    title: 'Bouldering',
                    content: '<i class="icon material-icons">Califonia</i>',
                    class: 'leisure',
                    color: 'bg-purple'
                },
                {
                    start: '2023-09-21',
                    end: '2023-09-21',
                    title: 'MT Everest Exploration',
                    content: '<i class="icon material-icons">Everest</i>',
                    class: 'sport',
                    color: 'bg-green'
                },
                {
                    start: '2023-10-22',
                    end: '2023-10-22',
                    title: 'Ice Climbing',
                    content: '<i class="icon material-icons">Alaska</i>',
                    class: 'ball',
                    color: 'bg-blue'
                },
                {
                    start: '2023-10-02',
                    end: '2023-10-02',
                    title: 'Rock Climbing',
                    content: '<i class="icon material-icons">New York</i>',
                    class: 'volley',
                    color: 'bg-red'
                }
            ]
        }
    },
    methods: {
        dateInput(date) {
            this.form.date = new Date(date).toISOString().slice(0, 10)
        },
        calChange(date) {
            const newDate = new Date(date.startDate).toISOString().slice(0, 10)
            this.current_start_date = newDate
            this.computeMonth(newDate)
        },
        goToEvent(date) {
            this.selectedDate = date
        },
        saveDate(step) {
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
                this.stepper = step
            }
        },
        selectCategory(category) {
            if(this.form.category && this.form.category === category) {
                this.form.category = ''
            }else {
                this.form.category = category
            }
        },
        showErr(payload) {
            this.validation.error = true
            this.validation.errors = payload
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
.right-col-1 {
    flex-basis: 75%;
}
.event-item {
    &:hover a{
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
    }
}
.gallery i {
    height: 10px;
    width: 10px;
    background-color: #7AFC96;
}
.grid-item {
    height: 80px;
}

</style>