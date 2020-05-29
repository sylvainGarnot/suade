<template>
  <div class="app">
    <line-chart
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from '../components/LineChart.vue'

export default {
  name: "Dashboard",
  data() {
    return {
      loading: true,
      chartdata: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  components: {
    LineChart
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.result = this.$resource(
        "files/people.json",
        {},
        {},
        {
          before: () => {
            this.loading = true;
          },
          after: () => {
            this.loading = false;
          }
        }
      );
      this.result.query().then(
        response => {
          console.log("json response", response.data);
        },
        response => {
          console.log("error !", response);
        }
      );
    }
  }
};
</script>
