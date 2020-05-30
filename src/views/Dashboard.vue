<template>
    <div class="app">
        <input v-model="genderData[0]" @keyup.enter="fillChart()" />
        <button @click="fillChart()">Update Male number</button>
        <pie-chart :chart-data="eyeColorChartData" :options="options" />
        <pie-chart :chart-data="genderChartData" :options="options" />
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";

export default {
    name: "Dashboard",
    data() {
        return {
            eyeColorLabels: ["brown", "blue", "green"],
            eyeColorBackgroundColor: ["brown", "blue", "green"],
            eyeColorData: [0, 0, 0],
            eyeColorChartData: null,
            genderLabels: ["male", "female"],
            genderBackgroundColor: ["orange", "cyan"],
            genderData: [0, 0],
            genderChartData: null,
            loading: true,
            options: {
                legend: {
                    display: true,
                    labels: {
                        padding: 20
                    }
                },
                maintainAspectRatio: false,
                responsive: true
            },
            people: null
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
                    this.people = response.data
                    this.countGender()
                    this.countEyeColor()
                    this.fillChart()
                },
                response => {
                    console.log("error !", response)
                }
            );
        },
        fillChart() {
            this.genderChartData = {
                labels: this.genderLabels,
                datasets: [
                    {
                        backgroundColor: this.genderBackgroundColor,
                        data: this.genderData
                    }
                ]
            };
            this.eyeColorChartData = {
                labels: this.eyeColorLabels,
                datasets: [
                    {
                        backgroundColor: this.eyeColorBackgroundColor,
                        data: this.eyeColorData
                    }
                ]
            };
        },
        countEyeColor() {
            this.eyeColorData = [0, 0, 0]
            for (const person of this.people) {
                if (person.eyeColor === "brown") {
                    this.eyeColorData[0]++
                } else if (person.eyeColor === "blue") {
                    this.eyeColorData[1]++
                } else if (person.eyeColor === "green") {
                    this.eyeColorData[2]++
                }
            }
        },
        countGender() {
            this.genderData = [0, 0]
            for (const person of this.people) {
                if (person.gender === "male") {
                    this.genderData[0]++
                } else if (person.gender === "female") {
                    this.genderData[1]++
                }
            }
        }
    }
};
</script>
