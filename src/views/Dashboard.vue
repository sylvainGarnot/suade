<template>
    <div class="app">
        <!-- <input v-model="genderData[0]" @keyup.enter="fillChart()" /> -->
        <!-- <button @click="fillChart()">Update Male number</button> -->
        <!-- <bar-chart :chart-data="genderChartData" :options="options" /> -->
        <pie-chart :chart-data="genderChartData" :options="options" />
        <pie-chart :chart-data="eyeColorChartData" :options="options" />
        <pie-chart :chart-data="preferencesPetChartData" :options="options" />
        <pie-chart :chart-data="preferencesFruitChartData" :options="options" />
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
// import BarChart from "../components/BarChart.vue";

export default {
    name: "Dashboard",
    data() {
        return {

            // Base color
            backgroundColorRed: 'rgba(255, 99, 132, 0.2)',
            backgroundColorBlue: 'rgba(54, 162, 235, 0.2)',
            backgroundColorGreen: 'rgba(75, 192, 192, 0.2)',
            backgroundColorPurple: 'rgba(153, 102, 255, 0.2)',
            backgroundColorOrange: 'rgba(255, 159, 64, 0.2)',
            borderColorRed: 'rgba(255, 99, 132, 0.9)',
            borderColorBlue: 'rgba(54, 162, 235, 0.9)',
            borderColorGreen: 'rgba(75, 192, 192, 0.9)',
            borderColorPurple: 'rgba(153, 102, 255, 0.9)',
            borderColorOrange: 'rgba(255, 159, 64, 0.9)',

            // EyeColor
            eyeColorLabels: ["brown", "blue", "green"],
            eyeColorData: null,
            eyeColorChartData: null,

            // Gender
            genderLabels: ["male", "female"],
            genderData: null,
            genderChartData: null,

            // Preferences Fruit
            preferencesFruitLabels: ["apple", "mango", "strawberry"],
            preferencesFruitData: null,
            preferencesFruitChartData: null,

            // Preference Pet
            preferencesPetLabels: ["cat", "dog", "bird", "none"],
            preferencesPetData: [0, 0, 0, 0],
            preferencesPetChartData: null,
            loading: true,

            // Options
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
        PieChart,
        // BarChart
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
                    this.countPreferencesFruit()
                    this.countPreferencesPet()
                    this.fillChart()
                },
                response => {
                    console.log("error !", response)
                }
            );
        },
        fillChart() {
            this.eyeColorChartData = {
                labels: this.eyeColorLabels,
                datasets: [
                    {
                        data: this.eyeColorData,
                        backgroundColor: [this.backgroundColorOrange, this.backgroundColorBlue, this.backgroundColorGreen]
                    }
                ]
            };
            this.genderChartData = {
                labels: this.genderLabels,
                datasets: [
                    {
                        data: this.genderData,
                        backgroundColor: [this.backgroundColorBlue, this.backgroundColorRed]
                    }
                ]
            };
            this.preferencesFruitChartData = {
                labels: this.preferencesFruitLabels,
                datasets: [
                    {
                        data: this.preferencesFruitData,
                        backgroundColor: [this.backgroundColorGreen, this.backgroundColorOrange, this.backgroundColorRed]
                    }
                ]
            };
            this.preferencesPetChartData = {
                labels: this.preferencesPetLabels,
                datasets: [
                    {
                        data: this.preferencesPetData,
                        backgroundColor: [this.backgroundColorBlue, this.backgroundColorGreen, this.backgroundColorOrange, this.backgroundColorPurple]
                    }
                ]
            };
        },
        countEyeColor() {
            this.eyeColorData = [0, 0, 0]
            for (const person of this.people) {
                if (person.eyeColor === this.eyeColorLabels[0]) {
                    this.eyeColorData[0]++
                } else if (person.eyeColor === this.eyeColorLabels[1]) {
                    this.eyeColorData[1]++
                } else if (person.eyeColor === this.eyeColorLabels[2]) {
                    this.eyeColorData[2]++
                }
            }
        },
        countGender() {
            this.genderData = [0, 0]
            for (const person of this.people) {
                if (person.gender === this.genderLabels[0]) {
                    this.genderData[0]++
                } else if (person.gender === this.genderLabels[1]) {
                    this.genderData[1]++
                }
            }
        },
        countPreferencesFruit() {
            this.preferencesFruitData = [0, 0, 0]
            for (const person of this.people) {
                if (person.preferences.fruit === this.preferencesFruitLabels[0]) {
                    this.preferencesFruitData[0]++
                } else if (person.preferences.fruit === this.preferencesFruitLabels[1]) {
                    this.preferencesFruitData[1]++
                } else if (person.preferences.fruit === this.preferencesFruitLabels[2]) {
                    this.preferencesFruitData[2]++
                }
            }
        },
        countPreferencesPet() {
            this.preferencesPetData = [0, 0, 0, 0]
            for (const person of this.people) {
                if (person.preferences.pet === this.preferencesPetLabels[0]) {
                    this.preferencesPetData[0]++
                } else if (person.preferences.pet === this.preferencesPetLabels[1]) {
                    this.preferencesPetData[1]++
                } else if (person.preferences.pet === this.preferencesPetLabels[2]) {
                    this.preferencesPetData[2]++
                } else if (person.preferences.pet ===this.preferencesPetLabels[3]) {
                    this.preferencesPetData[3]++
                }
            }
        }
    }
};
</script>
