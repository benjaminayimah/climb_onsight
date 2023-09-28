<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="computedData"
        :height="200"

    />
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        title: String,
        xAxis: String
    },
    computed: {
        computedData() {
            const chartData = {
                labels: ['John', 'Mary', 'Sarah', 'Andre', 'Stephanie', 'Sane', 'Cole', 'August', 'Kelly', 'Walter', 'Sam', 'David'],
                datasets: [ 
                    {
                        label: this.title,
                        data: [40, 20, 12, 20, 32, 50, 34, 22, 19, 25, 30, 45],
                        backgroundColor: '#B58563',
                        borderRadius: 40,
                        borderSkipped: false,
                    }
                ]
            }
            return chartData
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: this.xAxis,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Events',
                        },
                        
                    }
                }
            }
        }
    }
}
</script>