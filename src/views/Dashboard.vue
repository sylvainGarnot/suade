<template>
    <v-row no-gutters>
        <v-col cols="12" sm="3">
            <chart-container
                :chart-data="chartData.gender"
                :chart-data-type="'gender'"
                :pie-mode="true"
                :title="'Gender'"
                @update="fillCharts()"
            />

            <chart-container
                :chart-data="chartData.eyeColor"
                :chart-data-type="'eyeColor'"
                :pie-mode="false"
                :title="'Eyes Color'"
                @update="fillCharts()"
            />
        </v-col>

        <v-col cols="12" sm="3">
            <chart-container
                :chart-data="chartData.preferences.pet"
                :chart-data-type="'preferencesPet'"
                :pie-mode="false"
                :title="'Favorite Pet'"
                @update="fillCharts()"
            />

            <chart-container
                :chart-data="chartData.preferences.fruit"
                :chart-data-type="'preferencesFruit'"
                :pie-mode="true"
                :title="'Favorite Fruit'"
                @update="fillCharts()"
            />
        </v-col>

        <v-col cols="12" sm="6">
            <people-edit />
            <people-list />
            <average-ages :people="peopleLocal" :title="'Average Age'" />
            <filters :title="'Filters'" @update="fillCharts()" />
        </v-col>
    </v-row>
</template>

<script>
import ChartContainer from "../components/ChartContainer.vue";
import AverageAges from "../components/AverageAges.vue";
import Filters from "../components/Filters.vue";
import PeopleEdit from "../components/PeopleEdit.vue";
import PeopleList from "../components/PeopleList.vue";
import { mapState, mapActions } from "vuex";

export default {
    name: "Dashboard",
    components: {
        AverageAges,
        ChartContainer,
        Filters,
        PeopleEdit,
        PeopleList
    },
    computed: {
        ...mapState({
            people: state => state.people.all,
            peopleLocal: state => state.people.local
        })
    },
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

            color: {
                red: {
                    dark: "rgba(255, 99, 132, 0.55)",
                    light: "rgba(255, 99, 132, 0.99)"
                },
                blue: {
                    dark: "rgba(54, 162, 235, 0.55)",
                    light: "rgba(54, 162, 235, 0.99)"
                },
                green: {
                    dark: "rgba(75, 192, 192, 0.55)",
                    light: "rgba(75, 192, 192, 0.99)"
                },
                orange: {
                    dark: "rgba(255, 159, 64, 0.55)",
                    light: "rgba(255, 159, 64, 0.99)"
                },
                purple: {
                    dark: "rgba(153, 102, 255, 0.55)",
                    light: "rgba(153, 102, 255, 0.99)"
                }
            },
            chartBackground: {
                eyeColor: null,
                gender: null,
                preferences: {
                    fruit: null,
                    pet: null
                }
            },
            chartBorderColor: {
                eyeColor: null,
                gender: null,
                preferences: {
                    fruit: null,
                    pet: null
                }
            },
            chartData: {
                eyeColor: null,
                gender: null,
                preferences: {
                    fruit: null,
                    pet: null
                }
            },
            chartDataCount: {
                eyeColor: [0, 0, 0],
                gender: [0, 0],
                preferences: {
                    fruit: [0, 0, 0, 0],
                    pet: [0, 0, 0, 0]
                }
            },
            chartLabels: {
                eyeColor: ["brown", "blue", "green"],
                gender: ["male", "female"],
                preferences: {
                    fruit: ["apple", "mango", "strawberry", "banana"],
                    pet: ["cat", "dog", "bird", "none"]
                }
            }
        };
    },
    mounted() {
        this.fetchData();
        this.chartBackground.eyeColor = [
            this.color.orange.dark,
            this.color.blue.dark,
            this.color.green.dark
        ];
        this.chartBorderColor.eyeColor = [
            this.color.orange.light,
            this.color.blue.light,
            this.color.green.light
        ];
        this.chartBackground.gender = [
            this.color.blue.dark,
            this.color.red.dark
        ];
        this.chartBorderColor.gender = [
            this.color.blue.light,
            this.color.red.light
        ];
        this.chartBackground.preferences.fruit = [
            this.color.blue.dark,
            this.color.orange.dark,
            this.color.red.dark,
            this.color.purple.dark
        ];
        this.chartBorderColor.preferences.fruit = [
            this.color.blue.light,
            this.color.orange.light,
            this.color.red.light,
            this.color.purple.light
        ];
        this.chartBackground.preferences.pet = [
            this.color.red.dark,
            this.color.green.dark,
            this.color.purple.dark,
            this.color.orange.dark
        ];
        this.chartBorderColor.preferences.pet = [
            this.color.red.light,
            this.color.green.light,
            this.color.purple.light,
            this.color.orange.light
        ];
    },
    methods: {
        ...mapActions("people", [
            "setPeople",
            "updatePeopleLocal",
            "updateFilter"
        ]),
        fetchData() {
            this.$http.get("files/people.json").then(
                response => {
                    this.setPeople(response.body);
                    this.fillCharts();
                },
                response => {
                    console.log("error", response);
                }
            );
        },
        fillCharts() {
            this.updatePeopleLocal();
            this.fillChart("eyeColor");
            this.fillChart("gender");
            this.fillChartPreferences("fruit");
            this.fillChartPreferences("pet");
        },
        fillChart(property) {
            this.countData(property);
            this.chartData[property] = {
                labels: this.chartLabels[property],
                datasets: [
                    {
                        data: this.chartDataCount[property],
                        backgroundColor: this.chartBackground[property],
                        borderColor: this.chartBorderColor[property],
                        borderWidth: 2
                    }
                ]
            };
        },
        fillChartPreferences(property) {
            this.countDataPreferences(property);
            this.chartData.preferences[property] = {
                labels: this.chartLabels.preferences[property],
                datasets: [
                    {
                        data: this.chartDataCount.preferences[property],
                        backgroundColor: this.chartBackground.preferences[
                            property
                        ],
                        borderColor: this.chartBorderColor.preferences[
                            property
                        ],
                        borderWidth: 2
                    }
                ]
            };
        },
        countData(property) {
            for (
                let index = 0;
                index < this.chartDataCount[property].length;
                index++
            ) {
                this.chartDataCount[property][index] = 0;
            }
            for (const person of this.peopleLocal) {
                for (
                    let index = 0;
                    index < this.chartLabels[property].length;
                    index++
                ) {
                    if (
                        this.chartLabels[property][index] &&
                        person[property] === this.chartLabels[property][index]
                    ) {
                        this.chartDataCount[property][index]++;
                    }
                }
            }
        },
        countDataPreferences(property) {
            for (
                let index = 0;
                index < this.chartDataCount.preferences[property].length;
                index++
            ) {
                this.chartDataCount.preferences[property][index] = 0;
            }
            for (const person of this.peopleLocal) {
                for (
                    let index = 0;
                    index < this.chartLabels.preferences[property].length;
                    index++
                ) {
                    if (
                        this.chartLabels.preferences[property][index] &&
                        person.preferences[property] ===
                            this.chartLabels.preferences[property][index]
                    ) {
                        this.chartDataCount.preferences[property][index]++;
                    }
                }
            }
        }
    }
};
</script>
