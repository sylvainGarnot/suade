<template>
    <div id="app">
        <v-app id="inspire">
            <!-- <Header></Header> -->
            <router-view />
        </v-app>
    </div>
</template>


<script>
// import Header from "@/components/Header.vue";

export default {
    data() {
        return {};
    },
    components: {
        // Header
    }
};
</script>

<style lang="scss">
#inspire, body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background-color: #1f253d;
}

.data-bloc {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    background: #394264;

    .btn {
        margin: 5px;
    }
}
</style>
