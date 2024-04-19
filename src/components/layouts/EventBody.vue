<template>
    <div class="br-16 bg-white main-details-wrapper details-padding">
        <div class="gap-24 flx col-row">
            <div class="flx gap-24 column w-50 flx-grow-1">
                <img class="br-16 profile-img" :src="event.gallery && event.gallery.length ? s3bucket+'/'+ JSON.parse(event.gallery)[0] : ''" :alt="event.event_name">
                <div class="flx gap-8">
                    <h3>{{ event.event_name }}</h3>
                    <div>
                        <event-type :eventType="event.event_type" />
                    </div>
                </div>
                <div v-if="event.event_description">
                    <div class="gray">Event description</div>
                    <div>
                        <div>
                            {{ !showMore && event.event_description.length > limit ? event.event_description.slice(0, limit) + '...' : event.event_description  }}
                            <span v-if="event.event_description.length > limit" @click="toggleShow" class="fw-600 show-more">{{ showMore ? 'Show Less' : 'Show More' }}</span>
                        </div>
                    </div>
                </div>
                <div class="flx gap-24 collapsible">
                    <div>
                        <div class="gray">Event pricing</div>
                        <div v-if="event.event_type === 'public'"><strong>CA${{ event.price }}</strong></div>
                        <div v-else><span class="gray">From </span><strong>CA${{ computedPriceRange }}</strong></div>
                    </div>
                    <div>
                        <div class="gray">Date</div>
                        <div v-if="event.start_date !== event.end_date">
                            <i class="gray">From: </i><span>{{ format_date(event.start_date) }}</span><br />
                            <i class="gray">To: </i><span>{{ format_date(event.end_date) }}</span>
                        </div>
                        <div v-else>
                            <span>{{ format_date(event.start_date) }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="gray">Event duration</div>
                        <div>{{ event.event_duration }}</div>
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
                    <div v-if="computedClimberGears.length">
                        <div class="gray">Gears required for trip</div>
                        <div>
                            <li class="list-style" v-for="(gear, index) in computedClimberGears" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedGuideGears.length">
                        <div class="gray">Gears provided by Guide</div>
                        <div>
                            <li class="list-style" v-for="(gear, index) in computedGuideGears" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedExperienceLevel.length">
                        <div class="gray">Experience level required</div>
                        <div>
                            <li class="list-style" v-for="(experience, index) in computedExperienceLevel" :key="index">{{ experience }}</li>
                        </div>
                    </div>
                    <div v-if="computedFaqs.length">
                        <div class="gray">FAQ's</div>
                        <div>
                            <li v-for="faq in computedFaqs" :key="faq.id">
                                <div>
                                    <i class="gray">Question: </i>
                                    <span>{{ faq.question }}</span>
                                </div>
                                <div class="mb-16">
                                    <i class="gray">Answer: </i>
                                    <span>{{ faq.answer }}</span>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
                <div class="flx column gap-8">
                    <div class="gray">Gallery</div>
                    <div class="grid gap-16 gallery" v-if="event.gallery && event.gallery.length">
                        <img v-for="(image, index) in JSON.parse(event.gallery)" :key="index" :src="image ? s3bucket+'/'+ image: ''" :alt="'Gallary image '+index" class="br-16" />
                    </div>
                </div>
                <div v-if="!is_guide" class="flx column gap-8">
                    <div class="gray">Guide for event</div>
                    <user-list :user="guide" :climber="true" :redirect="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userRolesMixin from '@/mixins/userRolesMixin'
import formatDateTime from '@/mixins/formatDateTime'
import { mapState, mapGetters } from 'vuex'
import UserList from '../includes/UserList.vue'
import EventType from '../includes/EventType.vue'
import textLimitMixin from '@/mixins/textLimitMixin'
export default {
    components: { UserList, EventType },
    name: 'EventBody',
    props: {
        event: Object,
        guide: Object
    },
    mixins: [ formatDateTime, userRolesMixin, textLimitMixin],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket
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
        }
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
</style>