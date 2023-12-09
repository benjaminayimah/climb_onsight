<template>
    <a href="#" @click.prevent="doClick" class="flx-1 evt-card bg-white br-16 flx column gap-16 transition-sm" :class=" $route.query.current == event.id || $route.query.current && $route.query.current == event.event_id ? 'list-is-active' : ''">
        <div class="evt-card-wrapper flx column gap-4">
            <div class="bg-img relative" :style="{ backgroundImage: 'url('+s3bucket+'/'+JSON.parse(event.gallery)[0]+')'}">
                <div v-if="bookingStatus && is_climber" class="absolute status-wrapper">
                    <booking-status :status="bookingStatus" />
                </div>
            </div>
            <div class="foot flx column gap-4">
                <div class="flx jc-sb">
                    <h4 class="fs-09">
                        <div class="wrap-text wrap-line-1">
                            {{ event.event_name }}
                        </div>
                    </h4>
                    <div v-if="event.event_type === 'public'" class="fs-09 no-wrap"><strong>CA${{ event.price }}</strong></div>
                    <div v-else class="fs-09 no-wrap"><span class="gray">From </span><strong>CA${{ computedPriceRange }}</strong></div>
                </div>
                <div class="flx jc-sb ai-fe gap-8">
                    <div class="flx gap-8">
                        <div class="flx column">
                            <div v-if="!event.repeat_at" class="label flx gap-4 ai-c">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 26">
                                    <path d="M-3300-660c0-.707.011-1.372.035-2q.019-.516.051-1,.034-.518.083-1c.5-4.965,2.267-7.018,6.832-7.707V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.085c.911-.059,1.908-.086,3-.086s2.09.026,3,.086V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.293c4.566.688,6.327,2.741,6.832,7.707.033.321.06.654.083,1,.022.322.038.655.052,1,.023.629.034,1.3.034,2,0,9.882-2.118,12-12,12S-3300-650.118-3300-660Zm2,0a26.907,26.907,0,0,0,.438,5.61,5.206,5.206,0,0,0,1.271,2.681,5.214,5.214,0,0,0,2.681,1.271A26.852,26.852,0,0,0-3288-650a26.842,26.842,0,0,0,5.61-.438,5.214,5.214,0,0,0,2.682-1.271,5.214,5.214,0,0,0,1.27-2.681A26.831,26.831,0,0,0-3278-660c0-.716-.011-1.381-.036-2h-19.928C-3297.989-661.38-3298-660.715-3298-660Zm2.108-8.634c-.944.692-1.625,1.908-1.929,4.633h19.642c-.3-2.725-.985-3.941-1.93-4.633a6.7,6.7,0,0,0-2.892-1.048V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.909c-.869-.061-1.861-.091-3-.091s-2.132.03-3,.091V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.681A6.7,6.7,0,0,0-3295.892-668.633Zm10.5,14.27a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm-8.61,0a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3300 674)" fill="#a7a7a7"/>
                                </svg>
                                Date
                            </div>
                            <div v-else class="label flx gap-4 ai-c">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 21.137 21.137">
                                    <path d="M-3539.018-766.128a10.581,10.581,0,0,1,10.569-10.569,10.581,10.581,0,0,1,10.569,10.569,10.58,10.58,0,0,1-10.569,10.569A10.58,10.58,0,0,1-3539.018-766.128Zm2,0a8.579,8.579,0,0,0,8.569,8.569,8.578,8.578,0,0,0,8.569-8.569,8.578,8.578,0,0,0-8.569-8.569A8.579,8.579,0,0,0-3537.018-766.128Zm10.74,4.4-3.307-2.146a1,1,0,0,1-.455-.839v-5.869a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.325l2.852,1.85a1,1,0,0,1,.294,1.382,1,1,0,0,1-.84.456A1,1,0,0,1-3526.278-761.729Z" transform="translate(3539.018 776.696)" fill="#a7a7a7"/>
                                </svg>
                                <span class="wrap-text wrap-line-1">Duration</span>
                            </div>
                            <span class="wrap-text wrap-line-1" title="Jun 20">{{ !event.repeat_at ? format_date_short3(event.start_date) : event.event_duration }}</span>
                        </div>
                        <div class="flx column">
                            <div class="label flx gap-4 ai-c">
                                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 20.101 19.821">
                                    <path d="M-3280.074-712.862a22.722,22.722,0,0,1-4.877-3.317,11.435,11.435,0,0,1-3.8-6.158,8.244,8.244,0,0,1,1.584-6.6c1.235-1.576,3.682-3.454,8.318-3.454s7.083,1.878,8.319,3.454a8.245,8.245,0,0,1,1.584,6.6,11.436,11.436,0,0,1-3.8,6.158,22.725,22.725,0,0,1-4.878,3.317,2.694,2.694,0,0,1-1.222.3A2.7,2.7,0,0,1-3280.074-712.862Zm-5.778-15.036a6.543,6.543,0,0,0-1.258,5.237,9.809,9.809,0,0,0,3.287,5.243,21.039,21.039,0,0,0,4.511,3.065,1.013,1.013,0,0,0,.461.112,1.015,1.015,0,0,0,.462-.112,21.039,21.039,0,0,0,4.511-3.065,9.818,9.818,0,0,0,3.287-5.243,6.547,6.547,0,0,0-1.258-5.237c-1.443-1.84-3.864-2.813-7-2.813S-3284.41-729.739-3285.852-727.9Zm3.651,3.886a3.353,3.353,0,0,1,3.349-3.35,3.353,3.353,0,0,1,3.35,3.35,3.353,3.353,0,0,1-3.35,3.349A3.352,3.352,0,0,1-3282.2-724.012Zm1.675,0a1.676,1.676,0,0,0,1.674,1.675,1.676,1.676,0,0,0,1.675-1.675,1.677,1.677,0,0,0-1.675-1.675A1.676,1.676,0,0,0-3280.526-724.012Z" transform="translate(3288.902 732.387)" fill="#a7a7a7"/>
                                </svg>
                                <span>Location</span>
                            </div>
                            <span class="wrap-text wrap-line-1" title="23 victoria avenue">{{ event.address }}</span>
                        </div>
                    </div>
                    <div>
                        <event-type :eventType="event.event_type" />
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
import userRolesMixin from '@/mixins/userRolesMixin';
import formatDateTime from '@/mixins/formatDateTime';
import { mapState } from 'vuex'
import BookingStatus from './BookingStatus.vue';
import EventType from './EventType.vue';
export default {
    components: { BookingStatus, EventType },
    name: 'EventList',
    mixins: [formatDateTime, userRolesMixin],
    props: {
        event: Object,
        event_id: Number,
        redirect: Boolean
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            bookings: (state) => state.bookings
        }),
        eventType() {
            const today = new Date()
            const eventDate = new Date(this.event.end_date)
            return today > eventDate ? 'past' : 'registered'

        },
        bookingStatus() {
            return this.bookings.find(event => event.event_id === this.event_id)
        },
        computedPriceRange() {
            if(this.event && this.event.price && JSON.parse(this.event.price).length) {
                const priceArray = JSON.parse(this.event.price)
                return priceArray[priceArray.length - 1].price
            }
            else
            return null
        },
    },
    methods: {
        doClick() {
            if(this.redirect) {
                let route_name = 'UpcomingEvents'
                let id = this.event.id
                if(this.is_climber) {
                    route_name = 'MyEvents'
                    id = this.event.event_id
                }else {
                    route_name = 'UpcomingEvents';
                }
                if (this.$route.name === route_name && this.$route.query.type !== 'all') {
                    this.$router.push({ name: route_name, query: { type: this.eventType, current: id, origin: this.$route.name } } )
                }else {
                    this.$router.push({ name: route_name, query: { current:id, origin: this.$route.name } } )
                }
            }else {
                this.$emit('open-modal', this.event)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.evt-card {
    min-height: 190px;
    .bg-img {
        height: 60%;
        border-radius: 8px;
    }
    .label, span {
        font-size: 0.8rem;
    }
    .label {
        font-size: 0.9rem;
        color: var(--gray);
    }
    &:hover:not(.list-is-active) {
        box-shadow: 0 4px 12px 0 rgba(15,41,77,.08);
    }
}
.evt-card-wrapper {
    height: 100%;
}
.foot {
    height: 100%;
}
.status-wrapper {
    inset: auto auto 8px 8px;
}
</style>