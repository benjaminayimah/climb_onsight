<template>
    <section class="flx gap-32 main">
        <div class="left flx column gap-24">
            <h3 class="show-tab-mob title">Latest</h3>
            <div class="grid gap-24 grid-col-4 stats-wrapper">
                <dashboard-stat-list v-for="(stat, index) in statsArray" :key="index"
                    :title="stat.title"
                    :value="stat.value || 0"
                    :color="stat.color"
                    :period="stat.period"
                    :amount="stat.amount"
                    :currency="stat.currency"
                />
            </div>
            <div class="flx column flx-grow-1 gap-16">
                <div class="flx md-top gap-24">
                    <div v-if="is_super || is_climber || is_admin" class="flx-b-60 flx column gap-8 flx-1">
                        <h3 class="title flx jc-sb ai-c">
                            <div>
                                {{ is_super ? 'Top events across the country' : 'Confirmed Events' }}
                            </div>
                            <a href="#" class="fs-1rem a-link">See all</a>
                        </h3>
                        <div class="flx flx-1 gap-16 flx-wrap">
                            <event-list v-for="event in computedBooking.slice(0, 6)" :key="event.id" :event="event" :event_id="event.event_id" :redirect="true" />
                            <div v-if="computedBooking.length < 6" class="flx-1 evt-card pd-16 bg-white br-16 centered">
                                <router-link v-if="is_climber" :to="{ name: 'ExploreEvents' }" class="button-primary btn-rounded btn-sm-lng"><span class="wrap-text wrap-line-1">Explore more</span></router-link>
                                <router-link v-else :to="{ name: 'UpcomingEvents' }" class="button-primary btn-rounded btn-sm-lng"><span class="wrap-text wrap-line-1">See all</span></router-link>
                            </div>
                        </div>
                    </div>
                    <div v-if="is_guide" class="flx-b-60 bg-white pd-24 br-16 flx column gap-8 flx-1">
                        <vue-cal
                            small
                            :startWeekOnSunday="true"
                            :disable-views="['day', 'week', 'years', 'year']"
                            :active-view="'month'"
                            events-on-month-view="short"
                            :events="computedEvents"
                            hide-view-selector
                            hide-title-bar
                            ref="vuecal"
                            class="event-cal-theme ov-hidden br-16"
                        />
                    </div>
                    <dash-notification-card v-if="getDevice !== 'mobile'" :notifications="notifications" />
                </div>
                <div v-if="getDevice !== 'mobile'" class="flx flx-grow-1 gap-24">
                    <div class="flx-b-60 gap-8 flx column">
                        <dash-message-card />
                    </div>
                    <div class="flx-grow-1 flx column gap-8">
                        <h3 class="title">Climbing Merchandise</h3>
                        <div class="bg-white flx-1 br-16 centered pd-16">
                            <a href="https://climbonsight.ca/marketplace" target="_blank" class="gray a-link">Explore merchandise</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dash-today-section :is_super="is_super" :is_guide="is_guide" :is_climber="is_climber" :bookings="bookings" :events="events" />
    </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import statsMixin from '@/mixins/statsMixin'
import DashboardStatList from '@/components/includes/DashboardStatList.vue'
import EventList from '@/components/includes/EventList.vue'
import DashNotificationCard from '@/components/includes/DashNotificationCard.vue'
import DashMessageCard from '@/components/includes/DashMessageCard.vue'
import DashTodaySection from '@/components/includes/DashTodaySection.vue'
export default {
    components: { DashboardStatList, EventList, DashNotificationCard, DashMessageCard, DashTodaySection, VueCal },
    name: 'HomeView',
    mixins: [statsMixin],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            notifications: (state) => state.notifications
        }),
        computedEvents() {
            return this.bookings.map(element => {
                return {
                    id: element.id,
                    start: new Date(element.date_selected).toISOString().slice(0, 10),
                    end: new Date(element.date_selected).toISOString().slice(0, 10),
                    title: element.event_name,
                    color: element.color_class,
                    class: element.color_class
                };
            });
        },
        computedBooking() {
            return this.is_climber ? this.bookings : this.events
        }
    },
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
    min-height: calc(100dvh - 467px);
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
.mobile {
    .pd-24 {
        padding: 16px;
    }
}

</style>