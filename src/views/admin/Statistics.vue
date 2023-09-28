<template>
    <section class="flx column gap-40 main">
        <div class="grid gap-24 grid-col-4 dash-stats">
            <dashboard-stat-list :color="'#E8E2FF'" />
            <dashboard-stat-list :color="'#d5ffd5'" />
            <dashboard-stat-list :color="'#e0f2fe'" />
            <dashboard-stat-list :color="'#ffe4e6'" />
        </div>
        <div class="grid grid-col-2 gap-24 flx-1">
            <div class="bg-white br-16 pd-32">
                <h1>Stats</h1>
                <div>
                    <bar-chart />
                </div>
            </div>
            <div class="bg-white br-16 pd-32">
                <h1>Location stats</h1>
                <bar-chart />
            </div>
        </div>
    </section>
</template>

<script>
import DashboardStatList from '@/components/includes/DashboardStatList.vue'
import BarChart from '@/components/charts/BarChart.vue'
export default {
  components: { DashboardStatList, BarChart },
    name: 'StatisticsView'
}
</script>

<style lang="scss" scoped>
section.main {
    height: calc(100dvh - 128px);
}
</style>