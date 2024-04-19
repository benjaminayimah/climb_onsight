<template>
    <div class="br-16 bg-white main-details-wrapper" :class="is_climber || is_super ? 'dynamic-padding' : 'details-padding'">
        <div class="flx jc-sb ai-c mb-16">
            <div class="flx gap-8 ai-c">
                <h3>Event details</h3>
                <div>
                    <booking-status v-if="is_climber" :status="event" />
                </div>
            </div>
            <div class="flx gap-8">
                <button @click="$store.commit('preSetTempData', { data: event, modal: 'event_edit'})" v-if="is_guide" class="button-primary btn-sm">Edit event</button>
                <button @click="$store.commit('setDeleteModal', {id: event.id, type: 'event'})"  class="button-danger btn-sm" v-if="is_guide">Delete</button>
            </div>
        </div>
        <div class="gap-24 flx col-row">
            <div class="flx gap-16 column w-50 flx-grow-1">
                <img class="br-16 profile-img" :src="event.gallery && event.gallery.length ? s3bucket+'/'+ JSON.parse(event.gallery)[0] : ''" :alt="event.event_name">
                <div class="flx jc-sb">
                    <div class="flx gap-8">
                        <h3>{{ event.event_name }}</h3>
                        <div>
                            <event-type :eventType="event.event_type" />
                        </div>
                    </div>
                    <div>
                        <span class="fs-09 badge badge-cyan br-24 wrap-text wrap-line-1">{{ event.category }}</span>
                    </div>
                </div>
                <div class="list-row-shading" v-if="event.event_description">
                    <div class="gray">Event description</div>
                    <div>
                        <div v-if="!showMore && event.event_description.length > limit">{{ event.event_description.slice(0, limit) }}... <span @click="toggleShow" class="fw-600 show-more">{{ showMore ? 'Show Less' : 'Show More' }}</span></div>
                        <div v-else>{{ event.event_description }} <span @click="toggleShow" class="fw-600 show-more">{{ showMore ? 'Show Less' : 'Show More' }}</span></div>
                    </div>
                </div>
                <div class="flx gap-16 flx-wrap column">
                    <div v-if="event.accepted" class="list-row-shading">
                        <div class="gray">{{ event.paid ? 'Amount paid' : 'Amount to be paid'}}</div>
                        <div><strong>{{ formatAmount(Number(this.event.total_price))   }}</strong></div>
                    </div>
                    <div v-else class="list-row-shading">
                        <div class="gray">Event pricing</div>
                        <div v-if="event.event_type === 'public'"><strong>{{ formatAmount(Number(event.price)) }}</strong></div>
                        <div v-else><span class="gray">From </span><strong>{{ formatAmount(Number(computedPriceRange))  }}</strong></div>
                    </div>
                    <div class="list-row-shading">
                        <div class="gray">Date</div>
                        <div v-if="event.accepted">
                            <span v-if="event.event_type === 'public'">{{ format_date(event.start_date) }}</span>
                            <span v-else>{{ format_date(event.date_selected) }}</span>
                        </div>
                        <div v-else>
                            <div v-if="event.start_date !== event.end_date">
                                <i class="gray">From: </i><span>{{ format_date(event.start_date) }}</span><br />
                                <i class="gray">To: </i><span>{{ format_date(event.end_date) }}</span>
                            </div>
                            <div v-else>
                                <span>{{ format_date(event.start_date) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-row-shading">
                        <div class="gray">Event duration</div>
                        <div>{{ event.event_duration }}</div>
                    </div>
                    <div v-if="is_guide" class="list-row-shading">
                        <div class="gray">Max. attendance</div>
                        <div>{{ event.attendance_limit }}</div>
                    </div>
                    <div class="list-row-shading">
                        <div class="gray">Event location</div>
                        <div>{{ event.address }}</div>
                    </div>
                </div>
                <div class="flx column gap-16">
                    <div v-if="event.itinerary" class="list-row-shading">
                        <div class="gray">Itinerary</div>
                        <div>{{ event.itinerary }}</div>
                    </div>
                    <div v-if="computedClimberGears.length" class="list-row-shading">
                        <div class="gray">Gears required for trip</div>
                        <div>
                            <li class="list-style" v-for="(gear, index) in computedClimberGears" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedGuideGears.length" class="list-row-shading">
                        <div class="gray">Gears provided by Guide</div>
                        <div>
                            <li class="list-style" v-for="(gear, index) in computedGuideGears" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedExperienceLevel.length" class="list-row-shading">
                        <div class="gray">Experience level required</div>
                        <div>
                            <li class="list-style" v-for="(experience, index) in computedExperienceLevel" :key="index">{{ experience }}</li>
                        </div>
                    </div>
                    <div v-if="computedFaqs.length" class="list-row-shading">
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
                    <div class="grid gap-16 gallery" v-if="event.gallery && event.gallery.length">
                        <img v-for="(image, index) in JSON.parse(event.gallery)" :key="index" :src="image ? s3bucket+'/'+ image: ''" :alt="'Gallary image '+index" class="br-16" />
                    </div>
                </div>
                <div v-if="guide && !is_guide" class="flx column gap-8 guide">
                    <div class="gray">Guide for event</div>
                    <user-list :user="guide" :climber="true" :redirect="false" />
                </div>
                <div v-if="is_climber" class="sticky booking-trigger-wrapper flx jc-fe">
                    <booking-trigger-button :eventStatus="event" :resultType="'event'" @booking-trigger="bookingTrigger" />
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
import amountFormatter from '@/mixins/amountFormatter'
import { mapState, mapGetters } from 'vuex'
import BookingTriggerButton from '@/components/includes/BookingTriggerButton.vue'
import UserList from '@/components/includes/UserList.vue'
import BookingStatus from '@/components/includes/BookingStatus.vue'
import EventAtendeesList from '@/components/includes/EventAtendeesList.vue'
import EventType from '@/components/includes/EventType.vue'
import textLimitMixin from '@/mixins/textLimitMixin'
export default {
    components: { BookingTriggerButton, UserList, BookingStatus, EventAtendeesList, EventType },
    name: 'EventDetails',
    props: {
        event: Object
    },
    mixins: [userRolesMixin, formatDateTime, amountFormatter, textLimitMixin],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            bookings: (state) => state.bookings,
        }),
        computedPriceRange() {
            if(this.event && this.event.price && JSON.parse(this.event.price).length) {
                const priceArray = JSON.parse(this.event.price)
                return priceArray[priceArray.length - 1].price
            }
            else
            return null
        },
        computedFaqs() {
            if(this.event.faqs) {
                return JSON.parse(this.event.faqs).filter(data => data.question || data.answer)
            }
            else
            return []
        },
        computedClimberGears() {
            if(this.event.climber_gears && Array.isArray(JSON.parse(this.event.climber_gears))) {
                return JSON.parse(this.event.climber_gears)
            }
            else
            return []
        },
        computedGuideGears() {
            if(this.event.guide_gears && Array.isArray(JSON.parse(this.event.guide_gears))) {
                return JSON.parse(this.event.guide_gears)
            }
            else
            return []
        },
        computedExperienceLevel() {
            if(this.event.experience_required && Array.isArray(JSON.parse(this.event.experience_required))) {
                return JSON.parse(this.event.experience_required)
            }
            else
            return []
        },
        computedBookings() {
            return this.bookings.length ? this.bookings.filter(booking => booking.event_id === this.event.id ) : []
        },
        computedGuideId() {
            return this.is_super ? this.event.user_id : this.event.guide_id
        }
    },
    data() {
        return {
            guide: {}
        }
    },
    watch: {
        event(newEvent) {
            this.getThisGuide(this.is_super ? newEvent.user_id : newEvent.guide_id)
        }
    },
    methods: {
        bookingTrigger() {
            this.$store.commit('triggerBooking', this.event)
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
        this.event.user_id ? this.getThisGuide(this.computedGuideId) : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>

<style lang="scss" scoped>
.gallery img {
    max-height: 155px;
}
.grid {
    grid-template-columns: 1fr 1fr 1fr;
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
    bottom: 0px;
}
.dynamic-padding {
    padding: 32px calc(12vw - 29px);
}
</style>