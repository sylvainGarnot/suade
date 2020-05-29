<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Dashboard</router-link> |
            <router-link to="/editor">Editor</router-link> |
            <router-link to="/search">Search</router-link>
        </div>
    </div>
</template>


<script>
export default {
    name: "Header"
};
</script>

<style>
#nav {
    padding: 30px;
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
