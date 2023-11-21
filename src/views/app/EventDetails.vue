<template>
    <div class="br-16 bg-white main-details-wrapper">
        <div class="flx jc-sb ai-c mb-16">
            <div class="flx gap-8 ai-c">
                <h4>Event details</h4>
                <div v-if="bookingStatus">
                    <booking-status v-if="is_climber" :status="bookingStatus" />
                </div>
            </div>
            <div class="flx gap-8">
                <button @click="$store.commit('preSetTempData', { data: event, modal: 'event_edit'})" v-if="is_guide" class="button-primary btn-sm btn-rounded">Edit trip details</button>
                <button @click="$store.commit('setDeleteModal', {id: event.id, type: 'event'})"  class="button-danger btn-sm btn-rounded" v-if="is_guide">Delete trip</button>
            </div>
        </div>
        <div class="gap-24 flx col-row">
            <div class="flx gap-16 column w-50 flx-grow-1">
                <img class="br-16 profile-img" :src="event.gallery && event.gallery.length ? s3bucket+'/'+ JSON.parse(event.gallery)[0] : ''" :alt="event.event_name">
                <h4>{{ event.event_name }}</h4>
                <div v-if="event.event_description">
                    <div class="gray">Event details</div>
                    <div>
                        {{ event.event_description }}
                    </div>
                </div>
                <div class="flx gap-16 flx-wrap" :class="is_guide ? 'column' : 'jc-sb'">
                    <div>
                        <div class="gray">Event pricing</div>
                        <div><strong>${{event.price}}</strong></div>
                    </div>
                    <div>
                        <div class="gray">Date</div>
                        <div v-if="event.start_date !== event.end_date">
                            <i class="gray">from: </i><span id="date">{{ format_date(event.start_date) }}</span><br />
                            <i class="gray">to: </i><span>{{ format_date(event.end_date) }}</span>
                        </div>
                        <div v-else>
                            <span id="date">{{ format_date(event.start_date) }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="gray">Time</div>
                        <div>{{ format_time(event.start_time)+'(EST)' }}</div>
                    </div>
                    <div>
                        <div class="gray">Max. attendance</div>
                        <div>{{ event.attendance_limit }}</div>
                    </div>
                    <div>
                        <div class="gray">Event location</div>
                        <div>{{ event.address }}</div>
                    </div>
                </div>
                <div class="flx column gap-16">
                    <div v-if="event.itinerary">
                        <div class="gray">Itinerary</div>
                        <div>{{ event.itinerary }}</div>
                    </div>
                    <div v-if="computedGears.length">
                        <div class="gray">Gears</div>
                        <div>
                            <li v-for="(gear, index) in computedGears" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedFaqs.length">
                        <div class="gray">FAQ's</div>
                        <div class="flx gap-16 column">
                            <li v-for="faq in computedFaqs" :key="faq.id">
                                <div>
                                    <i class="gray">Question: </i>
                                    <span>{{ faq.question }}</span>
                                </div>
                                <div>
                                    <i class="gray">Answer: </i>
                                    <span>{{ faq.answer }}</span>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
                <div class="flx column gap-8 mb-16">
                    <div class="gray">Gallery</div>
                    <div  class="flx gap-16 flx-wrap gallery" v-if="event.gallery && event.gallery.length">
                        <img v-for="(image, index) in JSON.parse(event.gallery)" :key="index" :src="image ? s3bucket+'/'+ image: ''" :alt="'Gallary image '+index" class="br-16" />
                    </div>
                </div>
                <div v-if="guide && !is_guide" class="flx column gap-8 guide">
                    <div class="gray">Guide for event</div>
                    <user-list :user="guide" :climber="true" :redirect="false" />
                </div>
                <div v-if="is_climber" class="sticky flx jc-fe">
                    <booking-trigger-button :eventStatus="bookingStatus" :resultType="'event'" @booking-trigger="bookingTrigger" />
                </div>
            </div>
            <div class="w-50" v-if="is_guide">
                <div class="mb-24">
                    <strong>Registered climbers</strong>
                </div>
                <div v-if="computedBookings.length" class="flx column gap-4">
                   <event-atendees-list v-for="booking in computedBookings" :key="booking.id" :booking="booking" />
                </div>
                <div v-else>
                    <div>No climber is registered for this event yet</div>
                    <span class="gray">Registered climber will appear here</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import userRolesMixin from '@/mixins/userRolesMixin'
import { mapState, mapGetters } from 'vuex'
import BookingTriggerButton from '@/components/includes/BookingTriggerButton.vue'
import UserList from '@/components/includes/UserList.vue'
import BookingStatus from '@/components/includes/BookingStatus.vue'
import EventAtendeesList from '@/components/includes/EventAtendeesList.vue'
export default {
    components: { BookingTriggerButton, UserList, BookingStatus, EventAtendeesList },
    name: 'EventDetails',
    props: {
        event: Object
    },
    mixins: [userRolesMixin, formatDateTime],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            bookings: (state) => state.bookings,
        }),
        computedFaqs() {
            if(this.event.faqs) {
                return JSON.parse(this.event.faqs).filter(data => data.question || data.answer)
            }
            else
            return []
        },
        computedGears() {
            if(this.event.gears && Array.isArray(JSON.parse(this.event.gears))) {
                return JSON.parse(this.event.gears)
            }
            else
            return []
        },
        bookingStatus() {
            return this.bookings.find(event => event.event_id === this.event.id)
        },
        computedBookings() {
            return this.bookings.length ? this.bookings.filter(booking => booking.event_id === this.event.id ) : []
        }
    },
    data() {
        return {
            guide: {}
        }
    },
    watch: {
        event(newEvent) {
            this.getThisGuide(newEvent.user_id)
        }
    },
    methods: {
        bookingTrigger() {
            this.$store.commit('triggerBooking', this.bookingStatus)
        },
        getThisGuide(guide) {
            if(guide) {
                this.$store.dispatch('getThisGuide', guide)
                .then((res) => {
                    this.guide = res.data
                })
            }
            
        }
    },
    mounted() {
        this.getDevice == 'mobile' ? document.body.classList.add('fixed-body') : ''
        this.event.user_id ? this.getThisGuide(this.event.user_id) : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>

<style lang="scss" scoped>
.gallery img {
    width: calc(33.33% - 16px);
    max-width: 33.33%;
    max-height: 155px;
}
.bg-img {
    width: 180px;
    height: 210px;
}
.guide img {
    height: 150px;
    width: 150px;
}
.sticky {
    bottom: -60px;
}
</style>