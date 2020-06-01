<template>
    <div class="app">
        <!-- test 1 -->
        <input v-model="genderData[0]" @keyup.enter="fillChart()" />
        <button @click="fillChart()">Update Male number</button>

        <!-- test 2 -->
        <button @click="updateFilter('gender', 'male')">male</button>
        <button @click="updateFilter('preferencesFruit', 'apple')">female</button>

        <v-row no-gutters>
            <v-col cols="12" sm="4">
                <global-chart :chart-data="genderChartData" :pie-mode="true" :title="'Genre'" />

                <global-chart
                    :chart-data="eyeColorChartData"
                    :pie-mode="false"
                    :title="'Couleur des yeux'"
                />
            </v-col>

            <v-col cols="12" sm="4">
                <global-chart
                    :chart-data="preferencesPetChartData"
                    :pie-mode="false"
                    :title="'Animal de compagnie préféré'"
                />
                
                <global-chart
                    :chart-data="preferencesFruitChartData"
                    :pie-mode="true"
                    :title="'Fruit préféré'"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import GlobalChart from "../components/GlobalChart.vue";

export default {
    name: "Dashboard",
    data() {
        return {
            // Base color
            backgroundColor: "black",
            colorRed: "rgba(255, 99, 132, 0.99)",
            colorBlue: "rgba(54, 162, 235, 0.99)",
            colorGreen: "rgba(75, 192, 192, 0.99)",
            colorOrange: "rgba(255, 159, 64, 0.99)",
            colorPurple: "rgba(153, 102, 255, 0.99)",
            colorDarkRed: "rgba(255, 99, 132, 0.55)",
            colorDarkBlue: "rgba(54, 162, 235, 0.55)",
            colorDarkGreen: "rgba(75, 192, 192, 0.55)",
            colorDarkOrange: "rgba(255, 159, 64, 0.55)",
            colorDarkPurple: "rgba(153, 102, 255, 0.55)",

            // EyeColor
            eyeColorLabels: ["brown", "blue", "green"],
            eyeColorData: [0, 0, 0],
            eyeColorChartData: null,

            // Gender
            genderLabels: ["male", "female"],
            genderData: [0, 0],
            genderChartData: null,

            // Preferences Fruit
            preferencesFruitLabels: ["apple", "mango", "strawberry", "banana"],
            preferencesFruitData: [0, 0, 0, 0],
            preferencesFruitChartData: null,

            // Preference Pet
            preferencesPetLabels: ["cat", "dog", "bird", "none"],
            preferencesPetData: [0, 0, 0, 0],
            preferencesPetChartData: null,
            loading: true,

            // Filter
            filter: {
                eyeColor: [],
                gender: [],
                preferencesPet: [],
                preferencesFruit: []
            },
            people: []
        };
    },
    components: {
        GlobalChart
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
                    this.people = this.toFilter(response.data);
                    this.fillCharts();
                },
                response => {
                    console.log("error !", response);
                }
            );
        },
        fillCharts() {
            this.fillChartEyeColor();
            this.fillChartGender();
            this.fillChartPreferencesFruit();
            this.fillChartPreferencesPet();
        },
        fillChartEyeColor() {
            this.countEyeColorData();
            this.eyeColorChartData = {
                labels: this.eyeColorLabels,
                datasets: [
                    {
                        data: this.eyeColorData,
                        backgroundColor: [
                            this.colorDarkOrange,
                            this.colorDarkBlue,
                            this.colorDarkGreen
                        ],
                        borderColor: [
                            this.colorOrange,
                            this.colorBlue,
                            this.colorGreen
                        ],
                        borderWidth: 2
                    }
                ]
            };
        },
        fillChartGender() {
            this.countGenderData();
            this.genderChartData = {
                labels: this.genderLabels,
                datasets: [
                    {
                        data: this.genderData,
                        backgroundColor: [this.colorDarkBlue, this.colorDarkRed],
                        borderColor: [this.colorBlue, this.colorRed],
                        borderWidth: 2
                    }
                ]
            };
        },
        fillChartPreferencesFruit() {
            this.countPreferencesFruitData();
            this.preferencesFruitChartData = {
                labels: this.preferencesFruitLabels,
                datasets: [
                    {
                        data: this.preferencesFruitData,
                        backgroundColor: [
                            this.colorDarkGreen,
                            this.colorDarkOrange,
                            this.colorDarkRed,
                            this.colorDarkBlue
                        ],
                        borderColor: [
                            this.colorGreen,
                            this.colorOrange,
                            this.colorRed,
                            this.colorBlue
                        ],
                        borderWidth: 2
                    }
                ]
            };
        },
        fillChartPreferencesPet() {
            this.countPreferencesPetData();
            this.preferencesPetChartData = {
                labels: this.preferencesPetLabels,
                datasets: [
                    {
                        data: this.preferencesPetData,
                        backgroundColor: [
                            this.colorDarkBlue,
                            this.colorDarkGreen,
                            this.colorDarkOrange,
                            this.colorDarkPurple
                        ],
                        borderColor: [
                            this.colorBlue,
                            this.colorGreen,
                            this.colorOrange,
                            this.colorPurple
                        ],
                        borderWidth: 2
                    }
                ]
            };
        },
        countEyeColorData() {
            this.eyeColorData = [0, 0, 0];
            for (const person of this.people) {
                for (
                    let index = 0;
                    index < this.eyeColorLabels.length;
                    index++
                ) {
                    if (
                        this.eyeColorLabels[index] &&
                        person.eyeColor === this.eyeColorLabels[index]
                    ) {
                        this.eyeColorData[index]++;
                    }
                }
            }
        },
        countGenderData() {
            this.genderData = [0, 0];
            for (const person of this.people) {
                for (let index = 0; index < this.genderLabels.length; index++) {
                    if (
                        this.genderLabels[index] &&
                        person.gender === this.genderLabels[index]
                    ) {
                        this.genderData[index]++;
                    }
                }
            }
        },
        countPreferencesFruitData() {
            this.preferencesFruitData = [0, 0, 0, 0];
            for (const person of this.people) {
                for (
                    let index = 0;
                    index < this.preferencesFruitLabels.length;
                    index++
                ) {
                    if (
                        this.preferencesFruitLabels[index] &&
                        person.preferences.fruit ===
                            this.preferencesFruitLabels[index]
                    ) {
                        this.preferencesFruitData[index]++;
                    }
                }
            }
        },
        countPreferencesPetData() {
            this.preferencesPetData = [0, 0, 0, 0];
            for (const person of this.people) {
                for (
                    let index = 0;
                    index < this.preferencesPetLabels.length;
                    index++
                ) {
                    if (
                        this.preferencesPetLabels[index] &&
                        person.preferences.pet ===
                            this.preferencesPetLabels[index]
                    ) {
                        this.preferencesPetData[index]++;
                    }
                }
            }
        },
        toFilter(list) {
            let result = [];
            for (const p of list) {
                if (
                    !this.filter.gender.includes(p.gender) &&
                    !this.filter.eyeColor.includes(p.eyeColor) &&
                    !this.filter.preferencesFruit.includes(
                        p.preferences.fruit
                    ) &&
                    !this.filter.preferencesPet.includes(p.preferences.pet)
                ) {
                    result.push(p);
                }
            }
            return result;
        },
        updateFilter(property, value) {
            if (!this.filter[property].includes(value)) {
                this.filter[property].push(value);
            } else {
                for (
                    let index = 0;
                    index < this.filter[property].length;
                    index++
                ) {
                    if (this.filter[property][index] === value) {
                        this.filter[property].splice(index, 1);
                    }
                }
            }
            this.fetchData();
        }
    }
};
</script>
