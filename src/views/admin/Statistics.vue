<template>
    <section class="flx column gap-40 main">
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
        <div class="grid grid-col-2 gap-24 flx-1">
            <div class="bg-white br-16 pd-32">
                <div class="flx jc-sb ai-c">
                    <h1>New users</h1>
                    <ul class="flx bg-color pd-8 br-32 tab">
                        <li>
                            <router-link :to="{ name: 'Statistics'}" :class="{'active': $route.query.state !== 'guides'}">Climbers</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Statistics', query: { state: 'guides'} }" :class="{'active': $route.query.state === 'guides'}">Guides</router-link>
                        </li>
                    </ul>
                </div>
                <div>
                    <bar-chart :data="computedClimbers" :yAxis="'No. of Climbers'" :xAxis="'Time period'" v-if="$route.query.state !== 'guides'" />
                    <bar-chart :data="computedGuides" :yAxis="'No. of Guides'" :xAxis="'Time period'" v-else/>
                </div>
            </div>
            <div class="bg-white br-16 pd-32">
                <h1>Locations</h1>
                <bar-chart :data="computedBookings" :yAxis="'No. of events'" :xAxis="'Locations'" />
            </div>
        </div>
    </section>
</template>

<script>
import moment from "moment"
import statsMixin from '@/mixins/statsMixin';
import DashboardStatList from '@/components/includes/DashboardStatList.vue'
import BarChart from '@/components/charts/BarChart.vue'
import { mapState } from 'vuex';
export default {
    name: 'StatisticsView',
    components: { DashboardStatList, BarChart },
    mixins: [statsMixin],
    computed: {
        ...mapState({
            bookings: (state) => state.bookings,
            climbers: (state) => state.climbers,
            guides: (state) => state.guides,
            events: (state) => state.events
        }),
        computedClimbers() {
            const chartData = {
                labels: [],
                datasets: [ 
                    {
                        label: 'Climbers',
                        data: [],
                        backgroundColor: '#B58563',
                        borderRadius: 40,
                        borderSkipped: false,
                    }
                ]
            }
            this.climbers.forEach(element => {
                let dateLabel = moment(element.created_at).format('MMM DD, YYYY')
                let check = chartData.labels.find(data => data == dateLabel)
                if(!check) {
                    chartData.labels.push(dateLabel)
                    let filterVal = this.climbers.filter(date => moment(date.created_at).format('MMM DD, YYYY') == moment(element.created_at).format('MMM DD, YYYY'))
                    chartData.datasets[0].data.push(filterVal.length)
                }
            })
            return chartData
        },
        computedGuides() {
            const chartData = {
                labels: [],
                datasets: [ 
                    {
                        label: 'Guides',
                        data: [],
                        backgroundColor: '#B58563',
                        borderRadius: 40,
                        borderSkipped: false,
                    }
                ]
            }
            this.guides.forEach(element => {
                let dateLabel = moment(element.created_at).format('MMM DD, YYYY')
                let check = chartData.labels.find(data => data == dateLabel)
                if(!check) {
                    chartData.labels.push(dateLabel)
                    let filterVal = this.guides.filter(date => moment(date.created_at).format('MMM DD, YYYY') == moment(element.created_at).format('MMM DD, YYYY'))
                    chartData.datasets[0].data.push(filterVal.length)
                }
            })
            return chartData
        },
        computedBookings() {
            const chartData = {
                labels: [],
                datasets: [ 
                    {
                        label: 'Event locations',
                        data: [],
                        backgroundColor: '#B58563',
                        borderRadius: 40,
                        borderSkipped: false,
                    }
                ]
            }
            this.events.forEach(element => {
                let dateLabel = element.address
                let check = chartData.labels.find(data => data == dateLabel)
                if(!check) {
                    chartData.labels.push(dateLabel)
                    let filterVal = this.events.filter(data => data.address  == element.address)
                    chartData.datasets[0].data.push(filterVal.length)
                }
            })
            return chartData
        }
    }
}
</script>

<style lang="scss" scoped>
section.main {
    height: calc(100dvh - 128px);
}
.stats-wrapper  {
    width: 70%;
}
ul.tab {
    a {
        padding: 4px 12px;
    }
}
</style>