<template>
    <div class="br-16 bg-white main-details-wrapper">
        <div class="gap-24 flx col-row">
            <div class="flx gap-24 column w-50 flx-grow-1">
                <img class="br-16 profile-img" :src="event.gallery && event.gallery.length ? s3bucket+'/'+ JSON.parse(event.gallery)[0] : ''" :alt="event.event_name">
                <h4>{{ event.event_name }}</h4>
                <div v-if="event.event_description">
                    <label for="details">Event details</label>
                    <div id="details">
                        {{ event.event_description }}
                    </div>
                </div>
                <div class="flx gap-24">
                    <div>
                        <label for="price">Event pricing</label>
                        <div id="price"><strong>${{event.price}}</strong></div>
                    </div>
                    <div>
                        <label for="date">Date</label>
                        <div id="date">{{ format_date(event.start_date) }}</div>
                    </div>
                    <div>
                        <label for="time">Time</label>
                        <div id="time">{{ format_time(event.start_time)+ '(EST)' }}</div>
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
                    <div v-if="computedGears.length">
                        <label for="time">Gears</label>
                        <div id="time">
                            <li v-for="(gear, index) in computedGears" :key="index">{{ gear }}</li>
                        </div>
                    </div>
                    <div v-if="computedFaqs.length">
                        <label for="time">FAQ's</label>
                        <div id="time">
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
                    <label for="guide">Gallery</label>
                    <div class="flx gap-16 flx-wrap gallery" v-if="event.gallery && event.gallery.length">
                        <img v-for="(image, index) in JSON.parse(event.gallery)" :key="index" :src="image ? s3bucket+'/'+ image: ''" :alt="'Gallary image '+index" class="br-16" />
                    </div>
                </div>
                <div v-if="!is_guide" class="flx column gap-8">
                    <label for="guide">Guide for event</label>
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