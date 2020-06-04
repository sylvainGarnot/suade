<template>
    <div class="data-bloc">
        <h1>Edit</h1>

        <v-simple-table dense dark>
            <tbody>
                <tr>
                    <td class="text-left">name</td>
                    <td
                        v-if="!editMode['name']"
                        class="text-left"
                        @dblclick="edit('name')"
                    >{{ peopleSelected['name'] }}</td>

                    <v-text-field
                        v-if="editMode['name']"
                        class="mr-2"
                        v-model="peopleSelectedLocal['name']"
                        append-outer-icon="mdi-pencil"
                        autofocus
                        clearable
                        dense
                        filled
                        full-width
                        hide-details
                        rounded
                        single-line
                        @click:clear="cancel('name')"
                        @keyup.esc="cancel('name')"
                        @keyup.enter="validate('name')"
                        @click:append-outer="validate('name')"
                    ></v-text-field>
                </tr>
                <tr>
                    <td class="text-left">gender</td>
                    <td
                        v-if="!editMode['gender']"
                        class="text-left"
                        @dblclick="edit('gender')"
                    >{{ peopleSelected['gender'] }}</td>

                    <v-text-field
                        v-if="editMode['gender']"
                        class="mr-2"
                        v-model="peopleSelectedLocal['gender']"
                        append-outer-icon="mdi-pencil"
                        autofocus
                        clearable
                        dense
                        filled
                        full-width
                        hide-details
                        rounded
                        single-line
                        @click:clear="cancel('gender')"
                        @keyup.esc="cancel('gender')"
                        @keyup.enter="validate('gender')"
                        @click:append-outer="validate('gender')"
                    ></v-text-field>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "PeopleEdit",
    data() {
        return {
            editMode: {
                gender: false,
                name: false
            },
            peopleProperties: ["name", "gender"],
            peopleSelectedLocal: {}
        };
    },
    computed: {
        ...mapState({
            peopleSelected: state => state.people.selected
        }),
    },
    watch: {
        peopleSelected: function () {
            Object.assign(this.peopleSelectedLocal, this.peopleSelected)
        }
    },
    methods: {
        ...mapActions("people", ["setPeopleSelected", "updatePeopleLocal"]),
        cancel(property) {
            this.editMode[property] = false
            this.peopleSelectedLocal[property] = this.peopleSelected[property]
            // console.log("cancel");
        },
        edit(property) {
            this.editMode.age = this.editMode.gender = this.editMode.name = false
            this.editMode[property] = true
            // console.log("edit");
        },
        validate(property) {
            this.editMode[property] = false
            this.setPeopleSelected(this.peopleSelectedLocal)
            this.updatePeopleLocal()
            this.$emit("update")
            // console.log("validate");
        }
    }
};
</script>