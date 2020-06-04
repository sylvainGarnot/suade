<template>
    <div class="data-bloc">
        <h1>Search</h1>

        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="mb-2"
            label="Search"
            outlined
            single-line
            hide-details
        ></v-text-field>

        <v-data-table
            class="elevation-1"
            dark
            dense
            hide-default-footer
            :headers="headers"
            :items="peopleLocal"
            :items-per-page="5"
            :page.sync="page"
            :search="search"
            @click:row="setPeopleSelected($event)"
            @page-count="pageCount = $event"
        ></v-data-table>

        <div class="text-center pt-4">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "PeopleSearch",
    data() {
        return {
            headers: [
                { text: "Name", align: "start", value: "name" },
                { text: "Gender", value: "gender" },
                { text: "Age", value: "age" }
            ],
            page: 1,
            pageCount: 0,
            search: ""
        };
    },
    computed: {
        ...mapState({
            peopleLocal: state => state.people.local
        })
    },
    watch: {
        peopleLocal: {
            handler() {
            // handler(val, oldVal) {
                console.log('The list of colours has changed!');
            },
            deep: true,
        }
    },
    methods: {
        ...mapActions("people", [
            "setPeopleSelected"
        ])
    }
};
</script>

<style lang="scss" scoped>
.v-data-table {
    min-height: 152px;
}
</style>