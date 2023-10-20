<template>
    <div class="br-16 bg-white main-details-wrapper flx column gap-16" v-if="event.event_name">
        <div class="text-center">
            <h4>Event details</h4>
        </div>
        <img class="br-8 profile-img" :src="s3bucket+'/'+JSON.parse(event.gallery)[0]" :alt="event.event_name">
        <h4>{{ event.event_name }}</h4>
        <div>
            <label for="details">Event details</label>
            <div id="details">
                Lorem ipsum dolor sit amet consectetur. Molestie erat vel suscipit lacinia vulputate. Viverra pulvinar sed nibh facilisi nisl mattis neque aliquam volutpat. Malesuada lacinia justo nisi et laoreet ac leo eget auctor. Eget elit nunc sit nam. In tellus laoreet nibh vestibulum.
            </div>
        </div>
        <div class="flx jc-sb">
            <div>
                <label for="price">Event pricing</label>
                <div id="price"><strong>$243</strong></div>
            </div>
            <div>
                <label for="date">Date</label>
                <div id="date">June 19</div>
            </div>
            <div>
                <label for="time">Time</label>
                <div id="time">02:00 PM</div>
            </div>
            <div>
                <label for="time">Event location</label>
                <div id="time">23 victoria avenue</div>
            </div>
        </div>
        <div class="flx column gap-8">
            <label for="guide">Guide for event</label>
            <div class="bg-img br-16" id="guide"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'EventDetails',
    props: {
        event: Object
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket
        }),
        ...mapGetters(['getDevice'])
    },
    mounted() {
        this.getDevice == 'mobile' ? document.body.classList.add('fixed-body') : ''
    },
    unmounted() {
        document.body.classList.remove('fixed-body')
    }
}
</script>

<style lang="scss" scoped>

</style>