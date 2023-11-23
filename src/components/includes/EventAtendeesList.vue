<template>
     <a href="#" @click.prevent="$store.commit('preSetTempData', { data: computedClimber, modal: 'view_user'})" class="flx jc-sb ai-c gap-8 pd-16 br-16 attendees-list">
        <div class="flx gap-8">
            <profile-avatar :avatar="computedClimber.profile_picture" :name="computedClimber.name" />
            <div>
                <div class="flx gap-4">
                    <span>{{ computedClimber.name }}</span>
                    <span>
                        <booking-status :guideView="true" :status="bookingStatus" />
                    </span>
                </div>
                <div class="gray">{{ calculateAge(computedClimber.dob) }}</div>
            </div>
        </div>
        <div>
            <button class="br-50 bg-black centered send-msg-button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="11.389" viewBox="0 0 12.324 11.389">
                    <path d="M14.007,3.546a2.161,2.161,0,0,1,.176,1.388,6.829,6.829,0,0,1-.392,1.375,18.349,18.349,0,0,1-1.607,3.1,16.961,16.961,0,0,1-2.17,2.8,6.306,6.306,0,0,1-1.172.953,2.382,2.382,0,0,1-1.432.391h0a1.949,1.949,0,0,1-.234-.04l-.007,0a1.7,1.7,0,0,1-.78-.439,3.3,3.3,0,0,1-.482-.588,6.2,6.2,0,0,1-.682-1.447A5.834,5.834,0,0,1,5,10.142a1.234,1.234,0,0,1,.527-1.159l2.174-1.5a.26.26,0,0,0-.26-.449L5.051,8.154a1.288,1.288,0,0,1-1.343-.147,5.89,5.89,0,0,1-.654-.658,5.836,5.836,0,0,1-.91-1.423,2.985,2.985,0,0,1-.229-.79,1.643,1.643,0,0,1,.149-.97h0a2.444,2.444,0,0,1,1.07-.984,6.666,6.666,0,0,1,1.41-.517,17.615,17.615,0,0,1,3.5-.475,18.274,18.274,0,0,1,3.469.148,6.664,6.664,0,0,1,1.382.347A2.131,2.131,0,0,1,14.007,3.546Z" transform="translate(-1.898 -2.167)" fill="#fff"/>
                </svg>
            </button>
        </div>
    </a>
</template>

<script>
import { mapState } from 'vuex'
import ProfileAvatar from './ProfileAvatar.vue'
import formatDateTime from '@/mixins/formatDateTime'
import BookingStatus from './BookingStatus.vue'
export default {
    name: 'EventAttendeesList',
    components: { ProfileAvatar, BookingStatus },
    mixins: [formatDateTime],
    props: {
        booking: Object
    },
    computed: {
        ...mapState({
            climbers: (state) => state.climbers,
            bookings: (state) => state.bookings
        }),
        computedClimber() {
            return this.climbers.flat().find(data => data.id === this.booking.user_id)
        },
        bookingStatus() {
            return this.bookings.find(event => event.id === this.booking.id)
        }
    }
    
}
</script>

<style lang="scss" scoped>
img {
    height: 50px;
    width: 50px;
}
.attendees-list{
    border: 1px solid #eee;
}
</style>