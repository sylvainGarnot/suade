<template>
    <div class="data-bloc" id="people-edit">
        <h1>Edit</h1>

        <v-simple-table dense dark>
            <tbody>
                <!-- NAME -->
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
                        @click:clear="cancel"
                        @keyup.esc="cancel"
                        @keyup.enter="validate"
                        @click:append-outer="validate"
                    ></v-text-field>
                </tr>

                <!-- GENDER -->
                <tr>
                    <td class="text-left">gender</td>
                    <td
                        v-if="!editMode['gender']"
                        class="text-left"
                        @dblclick="edit('gender')"
                    >{{ peopleSelected['gender'] }}</td>

                    <v-select
                        v-if="editMode['gender']"
                        class="mr-2"
                        v-model="peopleSelectedLocal['gender']"
                        :items="['male', 'female']"
                        append-outer-icon="mdi-pencil"
                        autofocus
                        clearable
                        dark
                        dense
                        filled
                        full-width
                        hide-details
                        rounded
                        single-line
                        @click:clear="cancel"
                        @keyup.esc="cancel"
                        @keyup.enter="validate"
                        @click:append-outer="validate"
                        @change="validate"
                    ></v-select>
                </tr>

                <!-- EYES COLOR -->
                <tr>
                    <td class="text-left">eyes color</td>
                    <td
                        v-if="!editMode['eyeColor']"
                        class="text-left"
                        @dblclick="edit('eyeColor')"
                    >{{ peopleSelected['eyeColor'] }}</td>

                    <v-select
                        v-if="editMode['eyeColor']"
                        class="mr-2"
                        v-model="peopleSelectedLocal['eyeColor']"
                        :items="['brown', 'blue', 'green']"
                        append-outer-icon="mdi-pencil"
                        autofocus
                        clearable
                        dark
                        dense
                        filled
                        full-width
                        hide-details
                        rounded
                        single-line
                        @click:clear="cancel"
                        @keyup.esc="cancel"
                        @keyup.enter="validate"
                        @click:append-outer="validate"
                        @change="validate"
                    ></v-select>
                </tr>

                <!-- Pet Preference -->
                <tr>
                    <td class="text-left">Favorite Pet</td>
                    <td
                        v-if="!editMode.preferences.pet"
                        class="text-left"
                        @dblclick="edit('preferences', 'pet')"
                    >{{ typeof peopleSelected.preferences !== 'undefined' ? peopleSelected.preferences.pet : "" }}</td>

                    <v-select
                        v-if="editMode.preferences.pet"
                        class="mr-2"
                        v-model="peopleSelectedLocal.preferences.pet"
                        :items="['cat', 'dog', 'bird', 'none']"
                        append-outer-icon="mdi-pencil"
                        autofocus
                        clearable
                        dark
                        dense
                        filled
                        full-width
                        hide-details
                        rounded
                        single-line
                        @click:clear="cancel"
                        @keyup.esc="cancel"
                        @keyup.enter="validate"
                        @click:append-outer="validate"
                        @change="validate"
                    ></v-select>
                </tr>

                <!-- Fruit Preference -->
                <tr>
                    <td class="text-left">Favorite Fruit</td>
                    <td
                        v-if="!editMode.preferences.fruit"
                        class="text-left"
                        @dblclick="edit('preferences', 'fruit')"
                    >{{ typeof peopleSelected.preferences !== 'undefined' ? peopleSelected.preferences.fruit : "" }}</td>

                    <v-select
                        v-if="editMode.preferences.fruit"
                        class="mr-2"
                        v-model="peopleSelectedLocal.preferences.fruit"
                        :items="['apple', 'mango', 'strawberry', 'banana']"
                        append-outer-icon="mdi-pencil"
                        autofocus
                        clearable
                        dark
                        dense
                        filled
                        full-width
                        hide-details
                        rounded
                        single-line
                        @click:clear="cancel"
                        @keyup.esc="cancel"
                        @keyup.enter="validate"
                        @click:append-outer="validate"
                        @change="validate"
                    ></v-select>
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
                name: false,
                eyeColor: false,
                preferences: {
                    fruit: false,
                    pet: false
                }
            },
            peopleSelectedLocal: {
                gender: null,
                name: null,
                eyeColor: null,
                preferences: {
                    fruit: null,
                    pet: null
                }
            }
        };
    },
    computed: {
        ...mapState({
            peopleSelected: state => state.people.selected
        })
    },
    watch: {
        peopleSelected: function() {
            Object.assign(this.peopleSelectedLocal, this.peopleSelected)
            this.editModeDisable()
        }
    },
    methods: {
        ...mapActions("people", ["setPeopleSelected", "updatePeopleFiltered"]),
        cancel() {
            Object.assign(this.peopleSelectedLocal, this.peopleSelected)
            this.editModeDisable()
        },
        editModeDisable() {
            this.editMode.name = this.editMode.gender = this.editMode.eyeColor = this.editMode.preferences.fruit = this.editMode.preferences.pet = false
        },
        edit(property, propertyBis) {
            this.editModeDisable()
            typeof propertyBis !== "undefined"
                ? (this.editMode[property][propertyBis] = true)
                : (this.editMode[property] = true)
        },
        validate() {
            this.editModeDisable()
            let newValue = {}
            Object.assign(newValue, this.peopleSelectedLocal)
            this.setPeopleSelected(newValue)
            this.updatePeopleFiltered()
        }
    }
};
</script>

<style lang="scss">
#people-edit {
    .v-text-field, .v-select {
        height: 24px;
        .v-input__slot {
            min-height: 24px !important;
        }
        .v-input__append-inner, .v-input__append-outer {
            margin-top: 0 !important;
        }
    }
}
</style>