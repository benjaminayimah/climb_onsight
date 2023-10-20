<template>
    <router-link :to="is_climber ? { name: 'Events', query: { type: eventType, current: event.id, origin: $route.name } } : { name: 'UpcomingEvents', query: { current: event.id, origin: $route.name} } " class="flx-1 evt-card shadow-sm bg-white br-16 flx column gap-16" :class="{'list-is-active' : $route.query.current == event.id}">
        <div class="evt-card-wrapper flx column gap-4">
            <div class="bg-img" :style="{ backgroundImage: 'url('+s3bucket+'/'+JSON.parse(event.gallery)[0]+')'}"></div>
            <div class="foot flx column gap-4">
                <div class="flx jc-sb">
                    <h4 class="fs-09">{{ event.event_name }}</h4>
                    <div class="fs-09">${{ event.price }}</div>
                </div>
                <div class="flx gap-8">
                    <div class="flx column">
                        <div class="label">Date</div>
                        <span class="wrap-text wrap-line-1" title="Jun 20">{{ format_date_short3(event.date) }}</span>
                    </div>
                    <div class="flx column">
                        <div class="label">Time</div>
                        <span class="wrap-text wrap-line-1" title="02:00 PM">{{ format_time(event.start_time) }}</span>
                    </div>
                    <div class="flx column">
                        <div class="label">Location</div>
                        <span class="wrap-text wrap-line-1" title="23 victoria avenue">{{ event.address }}</span>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import userRolesMixin from '@/mixins/userRolesMixin';
import formatDateTime from '@/mixins/formatDateTime';
import { mapState } from 'vuex'
export default {
    name: 'EventList',
    mixins: [formatDateTime, userRolesMixin],
    props: {
        event: Object
    },
    computed: {
        ...mapState({
            s3bucket: (state) => state.s3bucket
        }),
        eventType() {
            const today = new Date().toLocaleDateString()
            const eventDate = new Date(this.event.date).toLocaleDateString()
            return today > eventDate ? 'past' : 'registered'
        }
    }
}
</script>

<style lang="scss" scoped>
.evt-card {
    min-height: 190px;
    .bg-img {
        height: 60%;
        border-radius: 8px;
    }
    .label, span {
        font-size: 0.8rem;
    }
    .label {
        font-size: 0.9rem;
        color: var(--gray);
    }
    &:hover {
        box-shadow: 0 4px 12px 0 rgba(15,41,77,.08);
    }
}
.evt-card-wrapper {
    height: 100%;
}
.foot {
    // line-height: 1.2;
    height: 100%;
}
</style>