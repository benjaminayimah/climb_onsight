<template>
    <section class="main">
        <div class="bg-white flx br-24 explore-section-wrapper pd-24 gap-24">
            <div class="search-result-section overflow-y-scroll scroll-hidden">
                <div class="top-row mb-16 flx jc-sb gap-16 flx-wrap">
                    <div class="flx gap-8 flx-1">
                        <div class="input-wrapper search flx-1">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 19.658 19.661">
                                    <path d="M10.248,19.051a9.373,9.373,0,1,1,9.373-9.373A9.386,9.386,0,0,1,10.248,19.051Zm0-17.374a8,8,0,1,0,8,8A8.01,8.01,0,0,0,10.248,1.676Zm9.6,18.29a.678.678,0,0,1-.485-.2l-1.829-1.829a.685.685,0,0,1,.969-.969L20.334,18.8a.69.69,0,0,1,0,.969A.678.678,0,0,1,19.85,19.966Z" transform="translate(-0.875 -0.305)"/>
                                </svg>
                            </i>
                            <input v-model="form.searchInput" class="form-control" type="search" id="search" placeholder="Search by location, event name or guide">
                        </div>
                        <button v-if="getDevice !== 'desktop'" @click="toggleFilter" class="button-outline btn-rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 27 18">
                                <path d="M15,27h6V24H15ZM4.5,9v3h27V9ZM9,19.5H27v-3H9Z" transform="translate(-4.5 -9)"/>
                            </svg>
                        </button>
                        <button @click="submitSearch"  class="button-primary btn-sm-lng btn-rounded" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">Go</button>
                    </div>
                    
                    <button @click="fetchNearByEvents" class="button-secondary btn-sm btn-rounded gap-4" :class="{ 'button-disabled' : submiting }" :disabled="submiting ? true : false">
                        <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 21.01 21.013">
                            <path d="M-1980.365,20.138v-3.5c-3.99-.133-5.142-1.285-5.275-5.276h-3.486a.875.875,0,0,1-.875-.875.875.875,0,0,1,.875-.875h3.486c.133-3.987,1.286-5.138,5.275-5.271V.875A.875.875,0,0,1-1979.49,0a.875.875,0,0,1,.875.875V4.345c3.987.133,5.14,1.285,5.273,5.271h3.478a.875.875,0,0,1,.875.875.875.875,0,0,1-.875.875h-3.478c-.133,3.99-1.285,5.142-5.273,5.276v3.5a.875.875,0,0,1-.875.875A.875.875,0,0,1-1980.365,20.138Zm-2.846-13.365c-.473.472-.692,1.654-.692,3.72s.22,3.248.692,3.721,1.654.692,3.72.692,3.247-.22,3.72-.692.692-1.654.692-3.721-.22-3.247-.692-3.72-1.654-.692-3.72-.692S-1982.738,6.3-1983.21,6.773Zm1.1,3.719a2.627,2.627,0,0,1,2.624-2.624,2.628,2.628,0,0,1,2.625,2.624,2.629,2.629,0,0,1-2.625,2.625A2.628,2.628,0,0,1-1982.114,10.492Zm1.75,0a.876.876,0,0,0,.875.875.876.876,0,0,0,.875-.875.876.876,0,0,0-.875-.875A.876.876,0,0,0-1980.365,10.492Z" transform="translate(1990)" fill="#fff"/>
                        </svg>
                        Events near me
                    </button>
                </div>
                <!-- {{ computedFilters }} -->

                <div class="ft-danger" v-if="systemErr.error">{{ systemErr.message }}</div>
                <div v-if="completed && !submiting">
                    <div v-if="locationSearch ">
                        <div>Events near your current location: <strong>{{ $route.query.addr }}</strong></div>
                    </div>
                    <div v-else>
                        <div>Search results for: <strong>{{ $route.query.query }}</strong></div>
                    </div>
                </div>
                <div v-if="submiting" class="centered empty">
                    <spinner v-if="submiting" :size="24" />
                </div>
                <div v-else-if="computedResults.length">
                    <div class="title">Events</div>
                    <div class="flx-wrap flx gap-24">
                        <event-list v-for="event in computedResults" :key="event.id" :event="event" :redirect="false" @open-modal="openModal" />
                    </div>
                </div>
                <div v-else class="centered empty">
                    <div class="flx column gap-4 ai-c">
                        <svg class="mb-16" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 0 342.943 283.808">
                            <path d="M34.17,203.762c-7.082-5.553-9.146-16.957-9.23-17.44L11.719,95.371a3.161,3.161,0,1,1,6.256-.91l13.208,90.861s1.729,9.418,6.889,13.464c4.291,3.365,11.96,3.534,14.553,3.316l231.908-.012c.284.013,9.09.509,14.564-2.587,5.26-2.975,8.019-9.781,8.045-9.85l.248-1.185a3.161,3.161,0,1,1,6.153,1.452l-.378,1.6c-.271.782-3.668,9.361-10.956,13.482-7.125,4.03-17.441,3.428-17.878,3.4l-231.441.006c-.054.007-.814.069-2.035.069C47.219,208.482,39.491,207.933,34.17,203.762Zm298.679-10.38-55.417-54.808a63.178,63.178,0,1,1,8.073-8.687l55.679,55.067a5.927,5.927,0,0,1-8.336,8.428ZM183.985,91.391a51.367,51.367,0,1,0,51.367-51.367A51.424,51.424,0,0,0,183.985,91.391ZM75.278,171.79a15.2,15.2,0,0,1-10.172-6.6c-3.843-5.45-3.393-9.237-3.264-9.941a3.161,3.161,0,0,1,6.219,1.136h0c.014,0-.044,1.963,2.212,5.163a9.361,9.361,0,0,0,5.525,3.961l55.052.476a10.768,10.768,0,0,0,4.936-2.667,12.378,12.378,0,0,0,2.44-5.913l-.489-18.261a6.761,6.761,0,0,0-1.448-2.9,5.548,5.548,0,0,0-4.154-2.667c-2.013-.167-33.527-.265-54.2-.288-.923.054-4.1.517-5.774,1.953a9.957,9.957,0,0,0-2.759,4.562,3.161,3.161,0,0,1-6.15-1.464,16.061,16.061,0,0,1,4.792-7.9c3.617-3.1,9.131-3.445,9.748-3.473,12.567.011,53.23.076,55.188.341a11.765,11.765,0,0,1,8.43,5.227c2.622,3.625,2.683,6.069,2.639,6.731l.477,18.409a18.41,18.41,0,0,1-4.01,9.829c-3.385,3.82-8.655,4.679-9.245,4.764Zm243.011-28.972a3.161,3.161,0,0,1-2.746-3.528l17.1-137.422c-.335-1.778-2.111-9.609-8.15-14.411-6.89-5.477-16.51-4.8-16.607-4.79l-285.943.009c.1.016-7.015,1.076-11.237,6.34C7.032-6.395,6.276,2.067,6.3,4.941L16.981,79.189a3.161,3.161,0,0,1-6.259.9L.005,5.412c-.036-.942-.05-13.088,5.774-20.35,5.922-7.386,15.37-8.633,15.769-8.683l286.095-.023c.249-.029,11.973-.854,20.788,6.154C337.266-10.467,338.908.89,338.972,1.371l.057.409-.051.409L321.817,140.072a3.162,3.162,0,0,1-3.133,2.77A3.252,3.252,0,0,1,318.289,142.818ZM24.691-36.1s.2-6.416,2.808-10.277c2.051-3.038,6.458-6.279,8.866-7.013a16.145,16.145,0,0,1,3.237-.77l151.551-.165s4.146-9.949,9.432-15.349,10.029-5.653,10.029-5.653h91.011a16.263,16.263,0,0,1,7.934,2.38,11.857,11.857,0,0,1,4.616,6.341V-36.1Z" transform="translate(0 75.325)" fill="#2d74ff"/>
                        </svg>
                        <h3>Not found</h3>
                        <div>Sorry, no event was found</div>
                    </div>
                </div>
            </div>
            <div class="search-filter bg-color br-16 pd-24 flx column gap-16 overflow-y-scroll scroll-hidden" :class="showFilter ? 'show-filter' : 'hide-filter'">
                <h4 class="text-center">Filters</h4>
                <button v-if="getDevice !== 'desktop'" @click="toggleFilter" class="btn-close scale-in bg-transparent absolute right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 13.587 13.587">
                        <path d="M7.163,19.188,5.8,17.83,11.239,12.4,5.8,6.96,7.163,5.6,12.6,11.036,18.033,5.6,19.392,6.96,13.957,12.4l5.435,5.435-1.359,1.359L12.6,13.754Z" transform="translate(-5.805 -5.602)" fill="#1c1b1f"/>
                    </svg>
                </button>
                <div class="pd-24 br-16 bg-white">
                    <h5 class="mb-8">What type of events are you interested in?</h5>
                    <div class="mb-8">Select event type</div>
                    <div class="flx flx-wrap gap-8">
                        <category-list v-for="category in categories" :key="category.id" :category="category" :selected="filter.category" @select-category="selectCategory" :color="'#F1F1F1'"/>
                    </div>
                </div>
                <div class="pd-24 br-16 bg-white">
                    <h5 class="mb-8">What's your preferred time?</h5>
                    <div class="mb-8">Select date</div>
                    <div class="input-wrapper">
                        <input v-model="filter.date" type="date" class="w-100 form-control">
                    </div>
                </div>
                <button @click="applyFilter" class="button-primary btn-md w-100">Apply</button>
            </div>
        </div>
    </section>
</template>


<script>
import axios from 'axios'
import inputValidation from '@/mixins/inputValidation'
import EventList from '@/components/includes/EventList.vue'
import { mapState, mapGetters } from 'vuex'
import CategoryList from '@/components/includes/CategoryList.vue'
import Spinner from '@/components/includes/Spinner.vue'
export default {
    components: { EventList, CategoryList, Spinner },
    name: 'ExploreEvents',
    mixins: [inputValidation],
    computed: {
        ...mapGetters(['getDevice']),
        ...mapState({
            events: (state) => state.searchResults,
            categories: (state) => state.data.categories,
            hostname: (state) => state.hostname,
            token: (state) => state.token,
            current_location: (state) => state.current_location
        }),
        computedResults() {
            const query = this.$route.query
            let result = this.events || []
            if(query.query || (query.lat && query.lng)) {
                result = this.searchResultEvents
            }
            return result
        },
        computedFilters() {
            const query = this.$route.query
            let result = this.computedResults
            if(result.length) {
                if(query === 'filter_category') {
                    result = 'filter_category'
                }
                if(query === 'filter_date') {
                    result = 'filter_date'
                }
            }
            return result
        }
    },
    data() {
        return {
            form: {
                searchInput: ''
            },
            filter: {
                category: '',
                date: '',
            },
            searchResultEvents: [],
            radius: 10,
            locationSearch: false,
            completed: false,
            showFilter: false
        }
    },
    methods: {
        openModal(result) {
            this.$store.commit('preSetTempData', { data: result, modal: 'search_result'})
        },
        selectCategory(category) {
            if(this.filter.category && this.filter.category === category.name) {
                this.filter.category = ''
            }else {
                this.filter.category = category.name
            }
        },
        submitSearch() {
            if(!this.form.searchInput == '') {
                this.searchEvents(this.form.searchInput)
            }else {
                this.showSysErr(this.errMsg())
            }
        },
        searchEvents: function(input) {
            this.systemErr.error ? this.clearErrs() : ''
            this.locationSearch = false
            this.startSpinner()
            axios.post(this.hostname+'/api/search-events/' + input + '?token='+this.token)
            .then((res) => {
                this.$router.push({ name: 'ExploreEvents', query: { status: 'search', query: input}})
                this.searchCompleted(res.data)
            }).catch((e) => {
                this.errorResponse(e)
                this.stopSpinner()
            })
        },
        fetchNearByEvents: async function() {
            this.locationSearch = true;
            const vm = this;
            const vms = this.$store;
            this.startSpinner();
            if ("geolocation" in navigator) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    if (!vm.current_location) {
                        await vms.dispatch('getCucrrentLocation', { lat: userLat, lng: userLng });
                    }
                    vm.searchEventsByLocation(userLat, userLng);
                } catch (error) {
                    console.error("Error getting geolocation:", error);
                }
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        },
        searchEventsByLocation: function(userLat, userLng) {
            if(this.current_location) {
                this.systemErr.error ? this.clearErrs() : ''
                axios.post(this.hostname+'/api/get-nearby-events?token='+this.token, {lat: userLat, lng: userLng, rad: this.radius})
                .then((res) => {
                    this.$router.push({ name: 'ExploreEvents', query: { status: 'location', addr: this.current_location, lat: userLat, lng: userLng}})
                    this.searchCompleted(res.data)
                }).catch((e) => {
                    this.errorResponse(e)
                    this.stopSpinner()
                })
            }else {
                setTimeout(() => {
                    this.fetchNearByEvents()
                }, 1000);
            }
        },
        searchCompleted(res) {
            this.stopSpinner()
            this.completed = true
            this.searchResultEvents = res.events
        },
        errMsg() {
            return 'Please input a search parameter'
        },
        checkSearch() {
            const query = this.$route.query
            if(query) {
                if(query.status === 'location') {
                    this.searchEventsByLocation(this.$route.query.lat, this.$route.query.lng)
                }else if(query.status === 'search') {
                    this.searchEvents(this.$route.query.query)
                }
            }else {
                this.$store.commit('setSomeEvents')
            }
        },
        toggleFilter() {
            this.showFilter = !this.showFilter
        },
        applyFilter() {
            let newQuery = {}
            if(this.filter.category) {
                newQuery = { filter_category: this.filter.category }
            }if(this.filter.date) {
                newQuery = { filter_date: this.filter.date }
            }
            this.$router.push({ query: newQuery });
            this.toggleFilter()
        }
    },
    mounted() {
        this.checkSearch()
    }
    
}
</script>

<style lang="scss" scoped>
section {
    height: calc(100dvh - 116px);
}
.empty {
    height: calc(100% - 100px);
}
.explore-section-wrapper{
    height: 100%;
}
.search-result-section {
    width: 70%;
}
.search-filter {
    width: 30%;
}
.evt-card {
    flex-basis: calc(33.33% - 16px);
    height: 250px;
    padding: 20px;
}
.desktop, .tablet {
    .evt-card {
        max-width: 310px;
    }
}
.flx-wrap {
    .bg-img {
        max-width: 25%;
    }
}
.input-wrapper.search {
    max-width: 400px;
    min-width: 100px;
    input[type=search] {
        background-color: #f3f3f3;
        &:hover {
            background-color: #f4f3f2;
        }
        &:focus {
            background-color: transparent;
        }
    }
}
.title {
    padding: 16px 0;
    margin-top: 12px;
    font-size: 1.3rem;
}
.btn-close {
    right: 20px;
}
.button-outline{
    padding: 10px 15px;
}
</style>