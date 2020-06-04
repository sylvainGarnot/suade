<template>
    <v-text-field
        class="mr-2"
        v-model="value"
        append-outer-icon="mdi-pencil"
        clearable
        dense
        filled
        full-width
        hide-details
        rounded
        single-line
        @click:append-outer="edit(property)"
        @click:clear="edit(property)"
        @keyup.enter="edit(property)"
    ></v-text-field>
</template>

<script>
export default {
    name: "PeopleEdit",
    data() {
        return {
            // editMode: {
            //     age: false,
            //     gender: false,
            //     name: false
            // },
            // peopleProperties: ['name', 'age', 'gender']
        };
    },
    props: {
        value: {
            type: String,
            default: null
        }
    },
    // updated: function() {
    //     console.log(this.peopleSelected)
    // },
    // computed: {
    //     ...mapState({
    //         peopleSelected: state => state.people.selected
    //     })
    // },
    methods: {
        edit() {
            // this.editMode[value] = !this.editMode[value];
            console.log("edit mode");
        }
    }
};
</script>