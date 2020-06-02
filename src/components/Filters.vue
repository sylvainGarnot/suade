<template>
    <div class="data-bloc">
        <h1>{{ title }}</h1>
    </div>
</template>

<script>
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
    }
};
</script>