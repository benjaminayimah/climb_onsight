<template>
    <div class="br-16 bg-white main-details-wrapper">
        <div class="flx jc-sb ai-c mb-16">
            <div class="flx gap-8 ai-c">
                <h4>Event details</h4>
                <div v-if="bookingStatus">
                    <booking-status :status="bookingStatus" />
                </div>
            </div>
            <!-- <button @click="$store.commit('preloadEventEdit', event)" v-if="is_guide" class="button-primary btn-sm btn-rounded">Edit Trip Details</button> -->
        </div>
        <div class="gap-24 flx col-row">
            <div class="flx gap-16 column w-50 flx-grow-1">
                <img class="br-16 profile-img" :src="event.gallery && event.gallery.length ? s3bucket+'/'+ JSON.parse(event.gallery)[0] : ''" :alt="event.event_name">
                <h4>{{ event.event_name }}</h4>
                <div v-if="event.event_description">
                    <label for="details">Event details</label>
                    <div id="details">
                        {{ event.event_description }}
                    </div>
                </div>
                <div class="flx gap-16 flx-wrap" :class="is_guide ? 'column' : 'jc-sb'">
                    <div>
                        <label for="price">Event pricing</label>
                        <div id="price"><strong>${{event.price}}</strong></div>
                    </div>
                    <div>
                        <label for="date">Date</label>
                        <div v-if="event.start_date !== event.end_date">
                            <i class="gray">from: </i><span id="date">{{ format_date(event.start_date) }}</span><br />
                            <i class="gray">to: </i><span>{{ format_date(event.end_date) }}</span>
                        </div>
                        <div v-else>
                            <span id="date">{{ format_date(event.start_date) }}</span>
                        </div>
                    </div>
                    <div>
                        <label for="time">Time</label>
                        <div id="time">{{ format_time(event.start_time)+'(EST)' }}</div>
                    </div>
                    <div>
                        <label for="time">Max. attendance</label>
                        <div id="time">{{ event.attendance_limit }}</div>
                    </div>
                    <div>
                        <label for="time">Event location</label>
                        <div id="time">{{ event.address }}</div>
                    </div>
                </div>
                <div class="flx column gap-16">
                    <div v-if="event.itinerary">
                        <label for="time">Itinerary</label>
                        <div id="time">{{ event.itinerary }}</div>
                    </div>
                    <div v-if="event.gears">
                        <label for="time">Gears</label>
                        <div id="time">
                            <li v-for="(gear, index) in JSON.parse(event.gears)" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedFaqs.length">
                        <label for="faq">FAQ's</label>
                        <div id="faq" class="flx gap-16 column">
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
                    <label for="guide">Gallery</label>
                    <div class="flx gap-16 flx-wrap gallery" v-if="event.gallery && event.gallery.length">
                        <img v-for="(image, index) in JSON.parse(event.gallery)" :key="index" :src="image ? s3bucket+'/'+ image: ''" :alt="'Gallary image '+index" class="br-16" />
                    </div>
                </div>
                <div v-if="guide && !is_guide" class="flx column gap-8 guide">
                    <label for="guide">Guide for event</label>
                    <!-- <profile-avatar :avatar="guide.profile_picture" /> -->
                    <user-list :user="guide" :climber="true" :redirect="false" />
                    <!-- <div class="fs-102rem">{{ guide.name }}</div> -->
                </div>
                <div v-if="is_climber" class="sticky flx jc-fe">
                    <booking-trigger-button :eventStatus="bookingStatus" :resultType="'event'" @booking-trigger="bookingTrigger" />
                </div>
            </div>
            <div class="w-50" v-if="is_guide">
                <div class="mb-32">
                    Registered climbers
                </div>
                <div>
                    No climber is registered for this event yet
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
// import ProfileAvatar from '@/components/includes/ProfileAvatar.vue'
import UserList from '@/components/includes/UserList.vue'
import BookingStatus from '@/components/includes/BookingStatus.vue'
export default {
    components: { BookingTriggerButton, UserList, BookingStatus },
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
        bookingStatus() {
            return this.bookings.find(event => event.event_id === this.event.id)
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
            this.$store.dispatch('getThisGuide', guide)
            .then((res) => {
                this.guide = res.data
            })
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
    bottom: 0;
}
</style>