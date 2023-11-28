<template>
    <a href="#" @click.prevent="handleClick" class="flx jc-sb ai-c">
        <div class="flx gap-8 ai-c">
            <profile-avatar :name="event.event_name" :avatar="JSON.parse(event.gallery)[0]" />
            <div>
                <div class="fs-09 flx gap-4">
                    <span class="wrap-text wrap-line-1">
                        {{ event.event_name }}
                    </span>
                    <span>
                        <booking-status v-if="is_climber" :status="bookingStatus" />
                    </span>
                </div>
                <div class="fs-09 gray">{{ event.category }}</div>
            </div>
        </div>
        <div class="text-right">
            <strong class="fs-09">{{ format_date_short3(event.start_date) }}</strong>
            <div class="fs-09 gray">{{ event.address }}</div>
        </div>
    </a>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime';
import ProfileAvatar from './ProfileAvatar.vue';
import BookingStatus from './BookingStatus.vue';
export default {
    components: { ProfileAvatar, BookingStatus },
    name: 'DashTodayList',
    mixins: [formatDateTime],
    props: {
        event: Object,
        bookings: Array,
        is_climber: Boolean
    },
    computed: {
        bookingStatus() {
            return this.bookings.find(event => event.event_id === this.event.id)
        },
    },
    methods: {
        handleClick() {
            if(this.is_climber) {
                this.$store.commit('preSetTempData', { data: this.event, modal: 'search_result'})
            }else {
                this.$router.push({name: 'UpcomingEvents', query: { type: 'all', current: this.event.id, origin: this.$route.name} } )
            }
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    height: 60px;
    width: 60px;
}
a {
    padding: 8px;
    border-radius: 16px;
    &:hover {
        background-color: var(--list-hover);
    }
}
</style>