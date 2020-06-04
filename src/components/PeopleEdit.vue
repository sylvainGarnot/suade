<template>
    <div class="data-bloc">
        <h1>Edit</h1>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "PeopleEdit",
    data() {
        return {
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