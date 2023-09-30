<template>
    <section class="flx gap-24 column main">
        <h1 class="title">Events</h1>
        <div class="flx section-main-wrapper">
            <div class="section-main-left">
                <div class="flx tap-height pd-r-24">
                    <div>
                        <ul class="flx bg-white pd-8 br-32 tab">
                            <li>
                                <router-link :to="{ name: 'Events', query: { type: 'registered'} }" :class="{'active' : $route.query.type === 'registered'}">Registered</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'Events', query: { type: 'past'} }" :class="{'active' : $route.query.type === 'past'}">Past</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flx gap-16 flx-wrap body-content pd-r-24 overflow-y-scroll">
                    <event-list v-for="event in filteredEvents" :key="event.id" :event="event" />
                </div>
            </div>
            <transition name="slide-from-right">
                <div v-if="$route.query.current" class="flx-grow-1 section-main-right">
                    <div class="flx jc-sb ai-c tap-height pd-l-24 bd-l-1">
                        <div>Selected Event</div>
                        <div>
                            <a href="#" @click="goBack" class="btn-close scale-in a-button bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                                    <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="body-content pd-l-24 bd-l-1 overflow-y-scroll">
                        <event-details :event="computedEvent" />
                    </div>
                </div>
            </transition>
        </div>
    </section>
</template>

<script>
import EventList from '@/components/includes/EventList.vue';
import EventDetails from '../app/EventDetails.vue';
import { mapState } from 'vuex';
export default {
    components: { EventList, EventDetails },
    name: 'EventsView',
    computed: {
        ...mapState({
            events: (state) => state.events
        }),
        computedEvent() {
            if(this.filteredEvents.length) {
                const event = this.filteredEvents.find(event => event.id == this.$route.query.current)
                if(event)
                return event
                else
                return {}
            }
            return {}
        }
    },
    watch: {
        '$route.query.type'(newType) {
            this.filterEvent(newType);
        }
    },
    data() {
        return {
            filteredEvents: []
        }
    },
    methods: {
        filterEvent(payload) {
            this.filteredEvents = this.events.filter(data => data.type == payload)
        },
        goBack() {
            if(this.$route.query.origin === this.$route.name) {
                this.$router.push({ name: 'Events', query: {type: this.$route.query.type}})
            }
            else {
                return this.$router.go(-1)
            }
        }
    },
    mounted() {
        this.filterEvent(this.$route.query.type)
    }
}
</script>

<style lang="scss" scoped>
section {
    --tap-height: 68px;
}
.tap-height {
    height: var(--tap-height);
}
.section-main-left {
    flex-basis: 60%;
    min-width: 60%;
}
.body-content {
    border-top: 1px solid #e4e4e4;
    padding-top: 20px;
    padding-bottom: 100px;
    height: calc(100dvh - 218px);
}

.evt-card {
    flex-basis: calc(33.33% - 16px);
    height: 260px;
}

</style>