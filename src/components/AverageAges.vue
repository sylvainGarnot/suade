<template>
    <div class="data-bloc">
        <h1>Average Age</h1>
        <span>{{ averageAge }}</span>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "AverageAges",
    data() {
        return {};
    },
    computed: {
        ...mapState({
            peopleFiltered: state => state.people.filtered
        }),
        averageAge() {
            let result = 0
            for (const p of this.peopleFiltered) {
                result += p.age;
            }
            return (result / this.peopleFiltered.length).toFixed(0);
        }
    }
};
</script>