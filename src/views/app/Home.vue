<template>
    <section class="flx gap-32 main">
        <div class="left flx column gap-24">
            <h3 class="show-tab-mob title">Latest</h3>
            <div class="grid gap-24 grid-col-4 dash-stats">
                <dashboard-stat-list :color="'#E8E2FF'" />
                <dashboard-stat-list :color="'#d6ffd6'" />
                <dashboard-stat-list :color="'#e0f2fe'" />
                <dashboard-stat-list :color="'#ffe4e6'" />
            </div>
            <div class="flx column flx-grow-1 gap-16">
                <div class="flx md-top gap-24">
                    <div class="flx-b-60 flx column gap-8">
                        <h3 class="title">Confirmed Events</h3>
                        <div class="flx flx-1 gap-16 flx-wrap">
                            <dash-event-list />
                            <dash-event-list />
                            <dash-event-list />
                            <dash-event-list />
                            <dash-event-list />
                            <dash-event-list />
                        </div>
                    </div>
                    <notification-card v-if="getDevice !== 'mobile'" />
                </div>
                <div class="flx flx-grow-1 gap-24">
                    <div v-if="getDevice !== 'mobile'" class="flx-b-60 gap-8 flx column">
                        <dash-message-card />
                    </div>
                    <div v-if="getDevice !== 'mobile'" class="flx-grow-1 flx column merch-card gap-8">
                        <h3 class="title">Climbing Merchandise</h3>
                        <div class="bg-white flx-1 br-16 centered">
                            <a href="" target="_blank" class="gray a-link">Explore merchandise</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dash-today-section />
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardStatList from '@/components/includes/DashboardStatList.vue'
import DashEventList from '@/components/includes/DashEventList.vue'
import NotificationCard from '@/components/includes/DashNotificationCard.vue'
import DashMessageCard from '@/components/includes/DashMessageCard.vue'
import DashTodaySection from '@/components/includes/DashTodaySection.vue'
export default {
    components: { DashboardStatList, DashEventList, NotificationCard, DashMessageCard, DashTodaySection },
    name: 'HomeView',
    computed: {
        ...mapGetters(['getDevice'])
    }
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100dvh - 128px);
}
.left {
    flex-basis: 70%;
}
.md-top {
    min-height: 350px;
}
.flx-b-60 {
    flex-basis: 60%;
}
.gray {
    &:hover {
        color: #000;
    }
}

</style>