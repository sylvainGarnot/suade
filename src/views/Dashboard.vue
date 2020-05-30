<template>
    <div class="app">
        <!-- test update -->
        <input v-model="genderData[0]" @keyup.enter="fillChart()" />
        <button @click="fillChart()">Update Male number</button>

        <bar-chart v-if="!genderChartPie" :chart-data="genderChartData" :options="optionsBarChart" />
        <pie-chart v-if="genderChartPie" :chart-data="genderChartData" :options="optionsPieChart"/>
        <button @click="genderChartPie = !genderChartPie">{{ genderChartPie ? 'Chart Bar' : 'Chart Pie'}}</button>

        <bar-chart v-if="!eyeColorChartPie" :chart-data="eyeColorChartData" :options="optionsBarChart" />
        <pie-chart v-if="eyeColorChartPie" :chart-data="eyeColorChartData" :options="optionsPieChart" />
        <button @click="eyeColorChartPie = !eyeColorChartPie">{{ eyeColorChartPie ? 'Chart Bar' : 'Chart Pie'}}</button>

        <bar-chart v-if="!preferencesPetChartPie" :chart-data="preferencesPetChartData" :options="optionsBarChart" />
        <pie-chart v-if="preferencesPetChartPie" :chart-data="preferencesPetChartData" :options="optionsPieChart" />
        <button @click="preferencesPetChartPie = !preferencesPetChartPie">{{ preferencesPetChartPie ? 'Chart Bar' : 'Chart Pie'}}</button>

        <bar-chart v-if="!preferencesFruitChartPie" :chart-data="preferencesFruitChartData" :options="optionsBarChart" />
        <pie-chart v-if="preferencesFruitChartPie" :chart-data="preferencesFruitChartData" :options="optionsPieChart" />
        <button @click="preferencesFruitChartPie = !preferencesFruitChartPie">{{ preferencesFruitChartPie ? 'Chart Bar' : 'Chart Pie'}}</button>
    </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
import BarChart from "../components/BarChart.vue";

export default {
    name: "Dashboard",
    data() {
        return {
            // Base color
            backgroundColor: "black",
            colorRed: "rgba(255, 99, 132, 0.2)",
            colorBlue: "rgba(54, 162, 235, 0.2)",
            colorGreen: "rgba(75, 192, 192, 0.2)",
            colorOrange: "rgba(255, 159, 64, 0.2)",
            colorPurple: "rgba(153, 102, 255, 0.2)",


            // EyeColor
            eyeColorChartPie: true,
            eyeColorLabels: ["brown", "blue", "green"],
            eyeColorData: [0, 0, 0],
            eyeColorChartData: null,

            // Gender
            genderChartPie: true,
            genderLabels: ["male", "female"],
            genderData: [0, 0],
            genderChartData: null,

            // Preferences Fruit
            preferencesPetChartPie: true,
            preferencesFruitLabels: ["apple", "mango", "strawberry"],
            preferencesFruitData: [0, 0, 0],
            preferencesFruitChartData: null,

            // Preference Pet
            preferencesFruitChartPie: true,
            preferencesPetLabels: ["cat", "dog", "bird", "none"],
            preferencesPetData: [0, 0, 0, 0],
            preferencesPetChartData: null,
            loading: true,

            // Options
            optionsPieChart: {
                legend: {
                    display: true,
                    labels: { padding: 20 }
                },
                maintainAspectRatio: false,
                responsive: true
            },
            optionsBarChart: {
                legend: {
                    display: false,
                },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            },
            people: null
        };
    },
    components: {
        PieChart,
        BarChart
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
                    this.people = response.data;
                    this.countGender();
                    this.countEyeColor();
                    this.countPreferencesFruit();
                    this.countPreferencesPet();
                    this.fillChart();
                },
                response => {
                    console.log("error !", response);
                }
            );
        },
        fillChart() {
            this.eyeColorChartData = {
                labels: this.eyeColorLabels,
                datasets: [
                    {
                        data: this.eyeColorData,
                        backgroundColor: [
                            this.colorOrange,
                            this.colorBlue,
                            this.colorGreen
                        ],
                        borderColor: this.backgroundColor
                    }
                ]
            };
            this.genderChartData = {
                labels: this.genderLabels,
                datasets: [
                    {
                        data: this.genderData,
                        backgroundColor: [
                            this.colorBlue,
                            this.colorRed
                        ],
                        borderColor: this.backgroundColor
                    }
                ]
            };
            this.preferencesFruitChartData = {
                labels: this.preferencesFruitLabels,
                datasets: [
                    {
                        data: this.preferencesFruitData,
                        backgroundColor: [
                            this.colorGreen,
                            this.colorOrange,
                            this.colorRed
                        ],
                        borderColor: this.backgroundColor
                    }
                ]
            };
            this.preferencesPetChartData = {
                labels: this.preferencesPetLabels,
                datasets: [
                    {
                        data: this.preferencesPetData,
                        backgroundColor: [
                            this.colorBlue,
                            this.colorGreen,
                            this.colorOrange,
                            this.colorPurple
                        ],
                        borderColor: this.backgroundColor
                    }
                ]
            };
        },
        countEyeColor() {
            this.eyeColorData = [0, 0, 0];
            for (const person of this.people) {
                if (person.eyeColor === this.eyeColorLabels[0]) {
                    this.eyeColorData[0]++;
                } else if (person.eyeColor === this.eyeColorLabels[1]) {
                    this.eyeColorData[1]++;
                } else if (person.eyeColor === this.eyeColorLabels[2]) {
                    this.eyeColorData[2]++;
                }
            }
        },
        countGender() {
            this.genderData = [0, 0];
            for (const person of this.people) {
                if (person.gender === this.genderLabels[0]) {
                    this.genderData[0]++;
                } else if (person.gender === this.genderLabels[1]) {
                    this.genderData[1]++;
                }
            }
        },
        countPreferencesFruit() {
            this.preferencesFruitData = [0, 0, 0];
            for (const person of this.people) {
                if (
                    person.preferences.fruit === this.preferencesFruitLabels[0]
                ) {
                    this.preferencesFruitData[0]++;
                } else if (
                    person.preferences.fruit === this.preferencesFruitLabels[1]
                ) {
                    this.preferencesFruitData[1]++;
                } else if (
                    person.preferences.fruit === this.preferencesFruitLabels[2]
                ) {
                    this.preferencesFruitData[2]++;
                }
            }
        },
        countPreferencesPet() {
            this.preferencesPetData = [0, 0, 0, 0];
            for (const person of this.people) {
                if (person.preferences.pet === this.preferencesPetLabels[0]) {
                    this.preferencesPetData[0]++;
                } else if (
                    person.preferences.pet === this.preferencesPetLabels[1]
                ) {
                    this.preferencesPetData[1]++;
                } else if (
                    person.preferences.pet === this.preferencesPetLabels[2]
                ) {
                    this.preferencesPetData[2]++;
                } else if (
                    person.preferences.pet === this.preferencesPetLabels[3]
                ) {
                    this.preferencesPetData[3]++;
                }
            }
        }
    }
};
</script>
