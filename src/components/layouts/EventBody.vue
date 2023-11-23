<template>
    <div class="br-16 bg-white main-details-wrapper details-padding">
        <div class="gap-24 flx col-row">
            <div class="flx gap-24 column w-50 flx-grow-1">
                <img class="br-16 profile-img" :src="event.gallery && event.gallery.length ? s3bucket+'/'+ JSON.parse(event.gallery)[0] : ''" :alt="event.event_name">
                <h4>{{ event.event_name }}</h4>
                <div v-if="event.event_description">
                    <div class="gray">Event details</div>
                    <div>
                        {{ event.event_description }}
                    </div>
                </div>
                <div class="flx gap-24 collapsible">
                    <div>
                        <div class="gray">Event pricing</div>
                        <div><strong>${{event.price}}</strong></div>
                    </div>
                    <div>
                        <div class="gray">Date</div>
                        <div>{{ format_date(event.start_date) }}</div>
                    </div>
                    <div>
                        <div class="gray">Time</div>
                        <div>{{ format_time(event.start_time)+ '(EST)' }}</div>
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
                    <div class="flx gap-16 flx-wrap gallery" v-if="event.gallery && event.gallery.length">
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
export default {
    components: { UserList },
    name: 'EventBody',
    props: {
        event: Object,
        guide: Object
    },
    mixins: [ formatDateTime, userRolesMixin],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket
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
</style>