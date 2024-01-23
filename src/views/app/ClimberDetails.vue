<template>
    <div class="br-16 bg-white main-details-wrapper details-padding flx column gap-16">
        <div class="flx jc-sb ai-c">
            <h4>Climber Details</h4>
            <button @click="$store.commit('setDeleteModal', {id: climber.id, type: 'climber'})" class="button-danger btn-sm">Delete Climber</button>
        </div>
        <img class="br-16 profile-img" :class="{'custom-color' : !climber.profile_picture}" :src="climber.profile_picture ? s3bucket+'/'+climber.profile_picture : default_avatar" :alt="climber.name">
        <h3>{{ climber.name }}</h3>
        <user-body :user="climber" />
        <send-message-button :user="climber" />
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime'
import SendMessageButton from '@/components/includes/SendMessageButton.vue'
import { mapState, mapGetters } from 'vuex'
import UserBody from '@/components/layouts/UserBody.vue'
export default {
    name: 'ClimberDetails',
    components: { UserBody, SendMessageButton },
    mixins: [formatDateTime],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar
        }),
        computedColor() {
            return this.climber.color
        }
    },
    props: {
        climber: Object
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
img.custom-color {
    background-color: v-bind(computedColor);
}
</style>