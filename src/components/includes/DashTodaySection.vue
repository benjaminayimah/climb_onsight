<template>
    <div class="right bg-white br-16 flx-grow-1 flx column gap-32">
        <div class="flx jc-sb ai-c">
            <div>
                <strong>Today</strong>
                <div>{{ format_date(new Date()) }}</div>
            </div>
            <div v-if="is_guide && computedRegistered.length">
                <router-link :to="{ name: 'Calendar'}" class="button-primary br-50 centered add">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11.521 11.521">
                        <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                    </svg>
                </router-link>
            </div>
        </div>
        <div  v-if="computedRegistered.length || events.length" class="flx column gap-32">
            <strong v-if="is_super">All locations</strong>
            <strong v-else-if="is_guide">All booked trips coming up this week</strong>
            <strong v-else-if="is_climber">Top events around you</strong>
            <div v-if="computedRegistered.length" class="flx jc-sb">
                <div class="stack-cards">
                    <profile-avatar v-for="climber in computedRegistered.slice(0, 5)" :key="climber.id" :avatar="climber.profile_picture" :name="climber.name" />
                    <div v-if="computedRegistered.length > 5" class="fw-700 counter centered br-24">+{{ computedRegistered.length - 5 }}</div>
                </div>
                <div class="flx gap-16 ai-c booked">
                    <div>
                        <strong v-if="is_super" class="fs-09">View all locations</strong>
                        <strong v-else-if="is_guide" class="fs-09">All climbers registered</strong>
                        <strong v-else-if="is_climber" class="fs-09">All booked guides</strong>
                        <div class="gray">{{ computedRegistered.length }}</div>
                    </div>
                    <!-- <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 11.775 20">
                            <path d="M8.228,22,6.453,20.225,14.678,12,6.453,3.775,8.228,2l10,10Z" transform="translate(-6.453 -2)" fill="#555555"/>
                        </svg>
                    </div> -->
                </div>
            </div>
            <ul>
                <dash-today-list v-for="event in events.slice(0, 5)" :key="event.id" :event="event" :bookings="bookings" :is_climber="is_climber" />
            </ul>
            <button v-if="events.length > 5" @click="showAll" class="button-primary btn-md w-100">Show all</button>
        </div>
        <div v-else class="flx-1 centered">
            <div class="flx column ai-c text-center gap-8">
                <div>No upcoming event</div>
                <span class="gray">Upcoming events will appear here together with their locations</span>
                <router-link :to="{ name: 'Calendar'}" class="button-primary a-button gap-8 btn-rounded btn-sm-lng">
                    <svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11.521 11.521">
                        <path d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)" fill="#fff"/>
                    </svg>
                    Add event
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import formatDateTime from '@/mixins/formatDateTime';
import DashTodayList from './DashTodayList.vue'
import ProfileAvatar from './ProfileAvatar.vue';
import { mapState } from 'vuex';
export default {
    name: 'DashToday',
    components: { DashTodayList, ProfileAvatar },
    mixins: [formatDateTime],
    computed: {
        ...mapState({
            climbers: (state) => state.climbers,
            guides: (state) => state.guides
        }),
        computedRegistered() {
            let data = ''
            if(this.is_guide) {
                data = this.climbers.flat()
            }
            else if(this.is_climber) {
                data = this.guides.flat()
            }
            return data
        }
    },
    props: {
        is_super: Boolean,
        is_guide: Boolean,
        is_climber: Boolean,
        bookings: Array,
        events: Array
    },
    methods: {
        showAll() {
            this.is_climber ? this.$router.push({ name: 'ExploreEvents'})  : this.$router.push({ name: 'UpcomingEvents'})
        }
    }
}
</script>

<style lang="scss" scoped>
.right {
    flex-grow: 1;
    padding: 32px 20px;
}
img, .counter {
    height: 50px;
    width: 50px;
    border: 2px solid #fff;
    background-color: var(--gray-light);

}
.booked {
    border-left: 1px solid #eee;
    padding-left: 16px;
}
a.add {
    height: 35px;
    width: 35px;
}
ul {
    margin: 0 -8px;
}
</style>