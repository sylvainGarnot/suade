<template>
    <div class="app">
        <h1>{{title}}</h1>
        <pie-chart v-if="localPieMode" :chart-data="chartData" :options="optionsPie" />
        <bar-chart v-else :chart-data="chartData" :options="optionsBar" />
        <button @click="localPieMode = !localPieMode">{{ localPieMode ? 'Chart Bar' : 'Chart Pie'}}</button>
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
                responsive: true
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
            },
            localPieMode: this.pieMode,
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
.app {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    background: #394264;
}
</style>