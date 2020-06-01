<template>
    <div class="data-bloc">
        <h1>{{ title }}</h1>
        <!-- <h1>{{ title }} {{ count }}</h1> -->
        <chart-pie v-if="localPieMode" :chart-data="chartData" :options="optionsPie" />
        <chart-bar v-else :chart-data="chartData" :options="optionsBar" />
        <button @click="localPieMode = !localPieMode">{{ localPieMode ? 'Chart Bar' : 'Chart Pie'}}</button>
    </div>
</template>

<script>
import ChartPie from "../components/ChartPie.vue";
import ChartBar from "../components/ChartBar.vue";
// import filterStore from "../store/index.js";
import { mapState } from "vuex";

export default {
    name: "ChartContainer",
    data() {
        return {
            optionsPie: {
                legend: {
                    display: true,
                    onClick: this.legendOnClick,
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
            localPieMode: this.pieMode
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
    },
    computed: mapState({
        products: state => state.products.all
    }),
    methods: {
        legendOnClick(e, legendItem) {
            console.log("legend item", legendItem);
            console.log(this.chartData.labels[legendItem.index]);
        }
    }
};
</script>