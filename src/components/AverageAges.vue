<template>
    <div class="data-bloc">
        <h1>{{ title }}</h1>
        <span>{{ averageAge }}</span>
    </div>
</template>

<script>
export default {
    name: "AverageAges",
    data() {
        return {};
    },
    props: {
        people: {
            type: Array,
            default: Array
        },
        title: {
            type: String,
            default: null
        }
    },
    computed: {
        averageAge() {
            let result = 0
            for (const p of this.people) {
                result += p.age;
            }
            return (result / this.people.length).toFixed(0);
        }
    }
};
</script>