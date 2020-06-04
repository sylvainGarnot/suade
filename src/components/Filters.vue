<template>
    <div class="data-bloc">
        <h1>{{ title }}</h1>
        <p>click on legend to filter elements</p>
        <span v-for="type in types" :key="type.id">
            <v-btn
                class="btn"
                v-for="filter in filter[type]"
                :key="filter.id"
                small
                @click="updateFilter([type, filter]); $emit('update')"
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
    props: {
        title: {
            type: String,
            default: null
        }
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