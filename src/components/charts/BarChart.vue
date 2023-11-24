<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="data"
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
        data: Object,
        title: String,
        xAxis: String,
        yAxis: String
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
                            text: this.yAxis,
                        },
                        
                    }
                }
            }
        }
    }
}
</script>


<!-- computed: {
    computedStats() {
        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Earnings',
                    data: [],
                    backgroundColor: '#566ff4',
                }
            ],
        }
        this.results.forEach(element => {
            let dateLabel = moment(element.created_at).format('MMM DD, YYYY')
            let check = chartData.labels.find(data => data == dateLabel)
            if(!check) {
                chartData.labels.push(dateLabel)
                let filterVal = this.results.filter(date => moment(date.created_at).format('MMM DD, YYYY') == moment(element.created_at).format('MMM DD, YYYY'))
                let totalVal = filterVal.reduce((acc, item) => acc + Number(item.total_paid), 0)
                chartData.datasets[0].data.push(totalVal)
            }
        })
        return chartData
    }
},
data() {
    return {
        chartOptions: {
            responsive: true
        }
    }
} -->