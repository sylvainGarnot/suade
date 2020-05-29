<template>
    <div class="app">
        <pie-chart :data="chartdata" :options="options" />
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";

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
                        data: [40, 39, 10, 40, 39]
                    }
                ]
            },
            options: {
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
        };
    },
    components: {
        PieChart
    },
    mounted() {
        this.fetchData();
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
