<template>
    <section class="flx gap-32 main">
        <div class="left flx column gap-24">
            <h3 class="show-tab-mob title">Latest</h3>
            <div class="grid gap-24 grid-col-4 stats-wrapper">
                <dashboard-stat-list :color="'#E8E2FF'" />
                <dashboard-stat-list :color="'#d5ffd5'" />
                <dashboard-stat-list :color="'#e0f2fe'" />
                <dashboard-stat-list :color="'#ffe4e6'" />
            </div>
            <div class="flx column flx-grow-1 gap-16">
                <div class="flx md-top gap-24">
                    <div v-if="is_super || is_climber" class="flx-b-60 flx column gap-8">
                        <h3 class="title flx jc-sb ai-c">
                            <div>
                                {{ is_super ? 'Top events across the country' : 'Confirmed Events' }}
                            </div>
                            <a href="#" class="fs-1rem a-link">See all</a>
                        </h3>
                        <div class="flx flx-1 gap-16 flx-wrap">
                            <event-list v-for="event in events.slice(0, 6)" :key="event.id" :event="event" />
                        </div>
                    </div>
                    <div v-if="is_guide" class="flx-b-60 bg-white pd-24 br-16 flx column gap-8">
                        <vue-cal
                            :disable-views="['years', 'year']"
                            :selected-date="selectedDate"
                            :active-view="'month'"
                            events-on-month-view="short"
                            :events="eventss"
                            hide-view-selector
                            hide-title-bar
                            @view-change="calChange"
                            ref="vuecal"
                            class="event-cal-theme ov-hidden br-16"
                        />
                    </div>
                    <dash-notification-card v-if="getDevice !== 'mobile'" />
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
        <dash-today-section :is_super="is_super" :is_guide="is_guide" :is_climber="is_climber" />
    </section>
</template>

<script>
import VueCal from 'vue-cal'
import userRolesMixin from '@/mixins/userRolesMixin'
import { mapGetters, mapState } from 'vuex'
import DashboardStatList from '@/components/includes/DashboardStatList.vue'
import EventList from '@/components/includes/EventList.vue'
import DashNotificationCard from '@/components/includes/DashNotificationCard.vue'
import DashMessageCard from '@/components/includes/DashMessageCard.vue'
import DashTodaySection from '@/components/includes/DashTodaySection.vue'
export default {
    components: { DashboardStatList, EventList, DashNotificationCard, DashMessageCard, DashTodaySection, VueCal },
    name: 'HomeView',
    mixins: [userRolesMixin],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            events: (state) => state.events
        })
    },
    data() {
        return {
            eventss: [
                {
                    start: '2023-09-21',
                    end: '2023-09-21',
                    title: 'Bouldering',
                    content: '<i class="icon material-icons">Califonia</i>',
                    class: 'leisure',
                    color: 'bg-purple'
                },
                {
                    start: '2023-09-21',
                    end: '2023-09-21',
                    title: 'MT Everest Exploration',
                    content: '<i class="icon material-icons">Everest</i>',
                    class: 'sport',
                    color: 'bg-green'
                },
                {
                    start: '2023-10-22',
                    end: '2023-10-22',
                    title: 'Ice Climbing',
                    content: '<i class="icon material-icons">Alaska</i>',
                    class: 'ball',
                    color: 'bg-blue'
                },
                {
                    start: '2023-10-02',
                    end: '2023-10-02',
                    title: 'Rock Climbing',
                    content: '<i class="icon material-icons">New York</i>',
                    class: 'volley',
                    color: 'bg-red'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
section.main {
    height: calc(100dvh - 128px);
}
.left {
    flex-basis: 70%;
}
.md-top {
    min-height: 350px;
}
.flx-b-60 {
    flex-basis: 65%;
    min-width: 65%;
}
.gray {
    &:hover {
        color: #000;
    }
}
.evt-card {
    flex-basis: calc(33.33% - 16px);
}

</style>