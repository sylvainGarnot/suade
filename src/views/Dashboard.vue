<template>
    <div class="app">
        <input v-model="values[0]" />
        <button @click="fillChart()">Update</button>
        <pie-chart :chart-data="chartdata" :options="options" />
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";

export default {
    name: "Dashboard",
    data() {
        return {
            loading: true,
            chartdata: null,
            options: null,
            values: [40, 39, 10, 40, 39]
        };
    },
    components: {
        PieChart
    },
    mounted() {
        // this.fetchData();
        this.fillChart();
    },
    methods: {
        fillChart() {
            console.log('fill')
            this.chartdata = {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May"
                ],
                datasets: [
                    {
                        backgroundColor: [
                            'red',
                            'orange',
                            'yellow',
                            'green',
                            'blue'
                        ],
                        data: this.values
                    }
                ]
            },
            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    labels: {
                        padding: 20
                    }
                },
                tooltips: {
                    enabled: false
                }
            }
        }
        // fetchData() {
        // this.result = this.$resource(
        //     "files/people.json",
        //     {},
        //     {},
        //     {
        //         before: () => {
        //             this.loading = true;
        //         },
        //         after: () => {
        //             this.loading = false;
        //         }
        //     }
        // );
        // this.result.query().then(
        //     response => {
        //         console.log("json response", response.data);
        //     },
        //     response => {
        //         console.log("error !", response);
        //     }
        // );
        // }
    }
};
</script>
