<template>
    <div class="app">
        <bar-chart v-if="!Pie" :chart-data="chartData" :options="options" />
        <pie-chart v-if="Pie" :chart-data="chartData" :options="options" />
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
import BarChart from "../components/BarChart.vue";

export default {
    name: "GlobalChart",
    props: {
        Pie: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
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