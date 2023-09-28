<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
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
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [ 
                    {
                        label: 'Stats',
                        data: [40, 20, 12, 20, 32, 50, 34, 22, 19, 25, 30, 45],
                        backgroundColor: '#B58563',
                        borderRadius: 40,
                        borderSkipped: false,
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Climbers',
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