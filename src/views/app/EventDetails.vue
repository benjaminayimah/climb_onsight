<template>
    <div class="br-16 bg-white main-details-wrapper">
        <div class="flx jc-sb ai-c mb-16">
            <h4>Event details</h4>
            <button v-if="is_guide" class="button-primary btn-sm btn-rounded">Edit Trip Details</button>
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
                <div class="flx gap-24" :class="is_guide ? 'column' : 'jc-sb'">
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
// import axios from 'axios'
import formatDateTime from '@/mixins/formatDateTime'
import userRolesMixin from '@/mixins/userRolesMixin'
import { mapState, mapGetters } from 'vuex'
// import UserList from '@/components/includes/UserList.vue'
export default {
    // components: { UserList },
    name: 'EventDetails',
    props: {
        event: Object
    },
    mixins: [userRolesMixin, formatDateTime],
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            hostname: (state) => state.hostname,
            token: (state) => state.token
        }),
        ...mapGetters(['getDevice'])
    },
    // watch: {
    //     '$route.query.current'(newValue) {
    //         this.fetchThisGuide(newValue);
    //     }
    // },
    // data() {
    //     return {
    //         user: {}
    //     }
    // },
    // methods: {
    //     async fetchThisGuide() {
    //         try {
    //             const res = await axios.get(this.hostname + '/api/get-this-guide/'+this.event.user_id+'?token=' + this.token)
    //             this.user = res.data
    //         } catch (e) {
    //             console.error(e)
    //         }
    //     }
    // },
    mounted() {
        this.getDevice == 'mobile' ? document.body.classList.add('fixed-body') : ''
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
</style>