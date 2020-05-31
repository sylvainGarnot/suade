<template>
    <div class="app">
        <h1>{{title}}</h1>
        <pie-chart v-if="pieMode" :chart-data="chartData" :options="optionsPie" />
        <bar-chart v-else :chart-data="chartData" :options="optionsBar" />
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
import BarChart from "../components/BarChart.vue";

export default {
    name: "GlobalChart",
    data() {
        return {
            optionsPie: {
                legend: {
                    display: true,
                    onClick: null,
                    labels: { padding: 20 }
                },
                maintainAspectRatio: false,
                responsive: false
            },
            optionsBar: {
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        };
    },
    props: {
        chartData: {
            type: Object,
            default: null
        },
        pieMode: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: null
        }
    },
    components: {
        PieChart,
        BarChart
    }
};
</script>

<style lang="scss" scoped>
canvas {
    padding: 15px;
    border-radius: 5px;
    background: #111;
}
</style>