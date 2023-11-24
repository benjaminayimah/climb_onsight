<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="computedData"
        :height="200"

    />
</template>
<script>
import moment from "moment"
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        data: Array,
        title: String,
        xAxis: String,
        yAxis: String
    },
    computed: {
        computedData() {
            const chartData = {
                labels: [],
                datasets: [ 
                    {
                        label: this.title,
                        data: [],
                        backgroundColor: '#B58563',
                        borderRadius: 40,
                        borderSkipped: false,
                    }
                ]
            }
            this.data.forEach(element => {
                let dateLabel = moment(element.created_at).format('MMM DD, YYYY')
                let check = chartData.labels.find(data => data == dateLabel)
                if(!check) {
                    chartData.labels.push(dateLabel)
                    let filterVal = this.data.filter(date => moment(date.created_at).format('MMM DD, YYYY') == moment(element.created_at).format('MMM DD, YYYY'))
                    chartData.datasets[0].data.push(filterVal.length)
                }
            })
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