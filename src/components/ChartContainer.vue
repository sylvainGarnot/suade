<template>
    <div class="data-bloc" data-app>
        <h1>{{ title }}</h1>

        <chart-pie v-if="localPieMode" :chart-data="chartData" :options="optionsPie" />
        <chart-bar v-else :chart-data="chartData" :options="optionsBar" />

        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn
                    color="primary mt-5"
                    @click="localPieMode = !localPieMode"
                    class="btn"
                    small
                    v-on="on"
                >{{ localPieMode ? 'Chart Bar' : 'Chart Pie'}}</v-btn>
            </template>
            <span>Change chart mode</span>
        </v-tooltip>
    </div>
</template>

<script>
import ChartPie from "../components/ChartPie.vue";
import ChartBar from "../components/ChartBar.vue";
import { mapActions } from "vuex";

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
        chartDataType: {
            type: String,
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
    methods: {
        ...mapActions("people", ["updateFilter"]),
        legendOnClick(e, legendItem) {
            if (this.chartDataType) {
                this.updateFilter([this.chartDataType, legendItem.text]);
            }
        }
    }
};
</script>

<style lang="scss">
    .data-bloc canvas {
        height: 30vh !important;
    }
</style>