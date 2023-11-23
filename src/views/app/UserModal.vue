<template>
    <teleport to="#modal_title">
        <div class="flx gap-4 ai-c">
            <span>{{ user.name }}</span>
            <span>
                <booking-status v-if="bookingStatus && is_guide" :guideView="true" :status="bookingStatus" />
            </span>
        </div>
    </teleport>
    <teleport to="#modal_content">
        <div class="modal-width flx column gap-16 main-details-wrapper">
            <div class="flx jc-c">
                <img class="br-50 profile-img" :src="user.profile_picture ? s3bucket+'/'+user.profile_picture : default_avatar" :alt="user.name">
            </div>
            <user-body :user="user" />
        </div>
    </teleport>
    <teleport to="#modal_footer">
        <div class="text-center flx jc-c">
            <button @click="$store.commit('closeModal')" class="button-primary btn-rounded btn-md-lng ">
                <span>Close</span>
            </button>
        </div>
    </teleport>
</template>

<script>
import userRolesMixin from '@/mixins/userRolesMixin'
import UserBody from '@/components/layouts/UserBody.vue'
import { mapState } from 'vuex'
import BookingStatus from '@/components/includes/BookingStatus.vue'
export default {
    name: 'UserModal',
    components: { UserBody, BookingStatus },
    mixins: [userRolesMixin],
    computed: {
        ...mapState({
            user: (state) => state.forms.tempStorage,
            s3bucket: (state) => state.s3bucket,
            default_avatar: (state) => state.data.default_avatar,
            bookings: (state) => state.bookings
        }),
        bookingStatus() {
            return this.bookings.length && this.$route.query.current ? this.bookings.find(event => event.event_id == this.$route.query.current && event.user_id === this.user.id) : ''
        }
    },
    mounted() {
        this.$store.commit('stopFormLoader')
    }
}
</script>

<style lang="scss" scoped>
.modal-width {
    width: 560px;
}
.profile-img {
    width: 250px;
}
</style>