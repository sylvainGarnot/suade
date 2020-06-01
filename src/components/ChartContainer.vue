<template>
    <div class="data-bloc">
        <h1>{{title}}</h1>
        <chart-pie v-if="localPieMode" :chart-data="chartData" :options="optionsPie" />
        <chart-bar v-else :chart-data="chartData" :options="optionsBar" />
        <button @click="localPieMode = !localPieMode">{{ localPieMode ? 'Chart Bar' : 'Chart Pie'}}</button>
    </div>
</template>

<script>
import ChartPie from "../components/ChartPie.vue";
import ChartBar from "../components/ChartBar.vue";

export default {
    name: "ChartContainer",
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
        ChartPie,
        ChartBar
    }
};
</script>