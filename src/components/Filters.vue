<template>
    <div class="data-bloc">
        <h1>{{ title }}</h1>

        <div v-for="filter in filter.gender" :key="filter.id">
            <span @click="updateFilter(['gender', filter]); $emit('update')">{{ filter }}</span>
        </div>
        <div v-for="filter in filter.eyeColor" :key="filter.id">
            <span @click="updateFilter(['eyeColor', filter]); $emit('update')">{{ filter }}</span>
        </div>
        <div v-for="filter in filter.preferencesFruit" :key="filter.id">
            <span @click="updateFilter(['preferencesFruit', filter]); $emit('update')">{{ filter }}</span>
        </div>
        <div v-for="filter in filter.preferencesPet" :key="filter.id">
            <span @click="updateFilter(['preferencesPet', filter]); $emit('update')">{{ filter }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "Filters",
    data() {
        return {};
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
        ...mapActions("people", [
            "updateFilter"
        ])
    }
};
</script>