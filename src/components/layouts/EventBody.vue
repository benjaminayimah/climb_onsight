<template>
    <div class="br-16 bg-white main-details-wrapper">
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
                <div class="flx gap-24">
                    <div>
                        <label for="price">Event pricing</label>
                        <div id="price"><strong>${{event.price}}</strong></div>
                    </div>
                    <div>
                        <label for="date">Date</label>
                        <div id="date">{{ format_date(event.date) }}</div>
                    </div>
                    <div>
                        <label for="time">Time</label>
                        <div id="time">{{ format_time(event.start_time) }} - {{ format_time(event.end_time) }}</div>
                    </div>
                    <div>
                        <label for="time">Event location</label>
                        <div id="time">{{ event.address }}</div>
                    </div>
                </div>
                <div class="flx column gap-8">
                    <label for="guide">Gallery</label>
                    <div class="flx gap-16 flx-wrap gallery" v-if="event.gallery && event.gallery.length">
                        <img v-for="(image, index) in JSON.parse(event.gallery)" :key="index" :src="image ? s3bucket+'/'+ image: ''" :alt="'Gallary image '+index" class="br-16" />
                    </div>
                </div>
                <!-- <div v-if="!is_guide" class="flx column gap-8">
                    <label for="guide">Guide for event</label>
                    <user-list :user="user" :climber="true" />
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'EventBody',
    props: {
        event: Object
    },
    mixins: [ formatDateTime],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket
        }),
        ...mapGetters(['getDevice'])
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