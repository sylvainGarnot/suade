<template>
  <div class="app">
    <canvas ref="canvas" width="900" height="400"></canvas>
  </div>
</template>

<script>
// import { Bar, Line } from "vue-chartjs";
// import LineChart from './Chart.vue'
import VueCharts from "vue-chartjs";

export default {
  extends: VueCharts.Line,
  name: "LineChart",
  data() {
    return {
      loaded: false
    };
  },
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.loaded = true;
    this.renderChart(this.chartdata, this.options);
  }
};
</script>