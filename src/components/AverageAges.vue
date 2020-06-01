<template>
    <div class="data-bloc">
        <h1>{{title}}</h1>
    </div>
</template>

<script>

export default {
    name: "GlobalChart",
    data() {
        return {}
    },
    props: {
        data: {
            type: Object,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    }
};
</script>