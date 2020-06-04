<template>
    <div class="data-bloc">
        <h1>Search</h1>

        <v-data-table
            :headers="headers"
            :items="peopleLocal"
            :items-per-page="5"
            class="elevation-1"
            :page.sync="page"
            hide-default-footer
            @page-count="pageCount = $event"
        ></v-data-table>

        <div class="text-center pt-4">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "PeopleList",
    data() {
        return {
            page: 1,
            pageCount: 0,
            headers: [
                { text: "Name", align: "start", value: "name" },
                { text: "Gender", value: "gender" },
                { text: "Age", value: "age" },
            ]
        };
    },
    computed: {
        ...mapState({
            people: state => state.people.all,
            peopleLocal: state => state.people.local
        })
    }
};
</script>