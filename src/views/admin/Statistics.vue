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
                    <h1>Stats</h1>
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
                    <bar-chart :xAxis="'Climbers'" :title="'Climbers stats'" v-if="$route.query.state !== 'guides'" />
                    <bar-chart :xAxis="'Guides'" :title="'Guides stats'" v-else/>
                </div>
            </div>
            <div class="bg-white br-16 pd-32">
                <h1>Location stats</h1>
                <bar-chart :xAxis="'Locations'" :title="'Location stats'" />
            </div>
        </div>
    </section>
</template>

<script>
import statsMixin from '@/mixins/statsMixin';
import DashboardStatList from '@/components/includes/DashboardStatList.vue'
import BarChart from '@/components/charts/BarChart.vue'
export default {
    name: 'StatisticsView',
    components: { DashboardStatList, BarChart },
    mixins: [statsMixin]
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