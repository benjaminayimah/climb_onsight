<template>
     <a href="#" @click.prevent="$store.commit('preSetTempData', { data: computedClimber, modal: 'view_user'})" class="flx jc-sb ai-c gap-8 pd-16 br-16 attendees-list transition-sm">
        <div class="flx gap-8">
            <profile-avatar :avatar="computedClimber.profile_picture" :name="computedClimber.name" :color="computedClimber.color" />
            <div>
                <div class="flx gap-4">
                    <span class="wrap-text wrap-line-1">{{ computedClimber.name }}</span>
                    <span>
                        <booking-status :guideView="true" :status="bookingStatus" />
                    </span>
                </div>
                <div v-if="computedClimber.quantity > 1">
                    <span class="gray inline-block mr-4">with</span>
                    <span class="inline-block">{{ computedClimber.quantity - 1 }} others</span>
                </div>
                <div v-else class="gray">{{ calculateAge(computedClimber.dob) }}</div>
                <span v-if="computedClimber.date_selected" class="fs-08 flx gap-4 ai-c">
                    <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 26">
                        <path d="M-3300-660c0-.707.011-1.372.035-2q.019-.516.051-1,.034-.518.083-1c.5-4.965,2.267-7.018,6.832-7.707V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.085c.911-.059,1.908-.086,3-.086s2.09.026,3,.086V-673a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1.293c4.566.688,6.327,2.741,6.832,7.707.033.321.06.654.083,1,.022.322.038.655.052,1,.023.629.034,1.3.034,2,0,9.882-2.118,12-12,12S-3300-650.118-3300-660Zm2,0a26.907,26.907,0,0,0,.438,5.61,5.206,5.206,0,0,0,1.271,2.681,5.214,5.214,0,0,0,2.681,1.271A26.852,26.852,0,0,0-3288-650a26.842,26.842,0,0,0,5.61-.438,5.214,5.214,0,0,0,2.682-1.271,5.214,5.214,0,0,0,1.27-2.681A26.831,26.831,0,0,0-3278-660c0-.716-.011-1.381-.036-2h-19.928C-3297.989-661.38-3298-660.715-3298-660Zm2.108-8.634c-.944.692-1.625,1.908-1.929,4.633h19.642c-.3-2.725-.985-3.941-1.93-4.633a6.7,6.7,0,0,0-2.892-1.048V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.909c-.869-.061-1.861-.091-3-.091s-2.132.03-3,.091V-669a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-.681A6.7,6.7,0,0,0-3295.892-668.633Zm10.5,14.27a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm-8.61,0a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3300 674)" fill="#a7a7a7"/>
                    </svg>
                    {{ format_date_short(computedClimber.date_selected) }}
                </span>
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
            bookings: (state) => state.bookings
        }),
        computedClimber() {
            return this.bookings.flat().find(data => data.id === this.booking.id)
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
a {
    &:hover {
        background-color: #f7f7f7;
    }
}
</style>