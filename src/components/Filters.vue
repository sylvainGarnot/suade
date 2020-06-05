<template>
    <div class="data-bloc">
        <h1>Filters</h1>
        <p>click on legend to filter elements</p>
        <span v-for="type in types" :key="type.id">
            <v-btn
                class="btn"
                v-for="filter in filter[type]"
                :key="filter.id"
                small
                @click="updateFilter([type, filter])"
            >
                <v-icon left>mdi-close</v-icon>
                <span>{{ filter }}</span>
            </v-btn>
        </span>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "Filters",
    data() {
        return {
            types: ["gender", "eyeColor", "preferencesFruit", "preferencesPet"]
        };
    },
    computed: {
        ...mapState({
            filter: state => state.people.filter
        })
    },
    methods: {
        ...mapActions("people", ["updateFilter"])
    }
};
</script>