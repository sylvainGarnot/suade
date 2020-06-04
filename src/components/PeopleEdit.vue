<template>
    <div class="data-bloc">
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
                        @click:clear="cancel('name')"
                        @keyup.esc="cancel('name')"
                        @keyup.enter="validate('name')"
                        @click:append-outer="validate('name')"
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
                        @click:clear="cancel('gender')"
                        @keyup.esc="cancel('gender')"
                        @keyup.enter="validate('gender')"
                        @click:append-outer="validate('gender')"
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
                        @click:clear="cancel('eyeColor')"
                        @keyup.esc="cancel('eyeColor')"
                        @keyup.enter="validate('eyeColor')"
                        @click:append-outer="validate('eyeColor')"
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
                        @click:clear="cancel('preferences', 'pet')"
                        @keyup.esc="cancel('preferences', 'pet')"
                        @keyup.enter="validate('preferences', 'pet')"
                        @click:append-outer="validate('preferences', 'pet')"
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
                        @click:clear="cancel('preferences', 'fruit')"
                        @keyup.esc="cancel('preferences', 'fruit')"
                        @keyup.enter="validate('preferences', 'fruit')"
                        @click:append-outer="validate('preferences', 'fruit')"
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
        }),
    },
    watch: {
        peopleSelected: function () {
            Object.assign(this.peopleSelectedLocal, this.peopleSelected)
        }
    },
    methods: {
        ...mapActions("people", ["setPeopleSelected", "updatePeopleLocal"]),
        cancel(property, propertyBis) {
            if (typeof propertyBis !== 'undefined') {
                this.editMode[property][propertyBis] = false
                this.peopleSelectedLocal[property][propertyBis] = this.peopleSelected[property][propertyBis]
            } else {
                this.editMode[property] = false
                this.peopleSelectedLocal[property] = this.peopleSelected[property]
            }
        },
        edit(property, propertyBis) {
            this.editMode.name = this.editMode.gender = this.editMode.eyeColor = false
            typeof propertyBis !== 'undefined' ? this.editMode[property][propertyBis] = true : this.editMode[property] = true
        },
        validate(property, propertyBis) {
            typeof propertyBis !== 'undefined' ? this.editMode[property][propertyBis] = false : this.editMode[property]
            this.setPeopleSelected(this.peopleSelectedLocal)
            this.updatePeopleLocal()
            this.$emit("update")
        }
    }
};
</script>