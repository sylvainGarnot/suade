<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <line-chart
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"
import LineChart from '../components/LineChart.vue'


export default {
  name: "Home",
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
    HelloWorld,
    LineChart
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.result = this.$resource(
        "people.json",
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
