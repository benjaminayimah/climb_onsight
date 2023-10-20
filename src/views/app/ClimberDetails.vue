<template>
    <div class="br-16 bg-white main-details-wrapper flx column gap-16">
        <div class="flx jc-sb ai-c">
            <h4>Climber Details</h4>
            <button class="button-danger btn-rounded btn-sm">Delete Climber</button>
        </div>
        <img class="br-16 profile-img" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name">
        <div class="flx jc-sb ai-c">
            <h3>{{ user.name }}</h3>
            <div class="pill pill-neutral">234 Completed Events</div>
        </div>
        <div class="flx jc-sb ai-c">
            <div>
                <label for="interest">Interest</label>
                <div id="interest">Mountain climbing</div>
            </div>
            <div>
                <button  class="pill pill-black">See All Events</button>
            </div>
        </div>
        <div>
            <label for="bio">Guide Bio</label>
            <div id="bio">
                Lorem ipsum dolor sit amet consectetur. Molestie erat vel suscipit lacinia vulputate. Viverra pulvinar sed nibh facilisi nisl mattis neque aliquam volutpat. Malesuada lacinia justo nisi et laoreet ac leo eget auctor. Eget elit nunc sit nam. In tellus laoreet nibh vestibulum.
            </div>
        </div>
        <div>
            <label for="experience">Experiences</label>
            <div id="experience">
                <div><span>6 years experience</span> in ice climbing</div>
                <div><span>2 years experience</span> in mountain climbing</div>
            </div>
        </div>
        <send-message-button />
    </div>
</template>

<script>
import SendMessageButton from '@/components/includes/SendMessageButton.vue'
import { mapState, mapGetters } from 'vuex'
export default {
    components: { SendMessageButton },
    name: 'ClimberDetails',
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        }),
        ...mapGetters(['getDevice'])
    },
    props: {
        user: Object
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