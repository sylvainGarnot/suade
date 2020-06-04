// init state
const state = () => ({
    all: [],
    local: [],
    filter: {
        eyeColor: [],
        gender: [],
        preferencesPet: [],
        preferencesFruit: []
    },
    selected: {}
})

// getters
const getters = {}

// actions
const actions = {
    setPeople({
        commit
    }, value) {
        commit('setPeople', {
            value: value
        })
    },
    setPeopleSelected({
        commit,
        state
    }, value) {
        commit('setPeopleSelected', {
            value: value
        })
        for (let index = 0; index < state.local.length; index++) {
            if (state.local[index]._id === value._id) {
                commit('setPeopleById', { id: index, value: value } )
            }
        }
    },
    updatePeopleLocal({
        commit,
        state
    }) {
        let result = [];
        for (const p of state.all) {
            if (
                !state.filter.eyeColor.includes(p.eyeColor) &&
                !state.filter.gender.includes(p.gender) &&
                !state.filter.preferencesFruit.includes(
                    p.preferences.fruit
                ) &&
                !state.filter.preferencesPet.includes(p.preferences.pet)
            ) {
                result.push(p);
            }
        }
        commit('setPeopleLocal', {
            value: result
        })
    },
    updateFilter({
        commit,
        state
    }, value) {
        const property = value[0]
        const content = value[1]
        if (!state.filter[property].includes(content)) {
            commit('addToFilter', {
                property: property,
                value: content
            })
        } else {
            for (
                let index = 0; index < state.filter[property].length; index++
            ) {
                if (state.filter[property][index] === content) {
                    commit('removeFromFilter', {
                        property: property,
                        index: index
                    })
                }
            }
        }
    },
}

// mutations
const mutations = {
    setPeople(state, {
        value
    }) {
        state.all = value
    },
    setPeopleById(state, {
        id,
        value
    }) {
        state.all.splice(id, 1, value)
    },
    setPeopleLocal(state, {
        value
    }) {
        state.local = value
    },
    setPeopleSelected(state, {
        value
    }) {
        state.selected = value
    },
    addToFilter(state, {
        property,
        value
    }) {
        state.filter[property].push(value)
    },
    removeFromFilter(state, {
        property,
        index
    }) {
        state.filter[property].splice(index, 1)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}