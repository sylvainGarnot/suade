// init state
const state = () => ({
    all: [],
    filtered: [],
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
        state,
        dispatch
    }, value) {
        commit('setPeopleSelected', {
            value: value
        })
        for (let index = 0; index < state.all.length; index++) {
            if (state.all[index]._id === value._id) {
                commit('setPeopleById', { index: index, value: value } )
                dispatch('updatePeopleFiltered');
            }
        }
    },
    updatePeopleFiltered({
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
        commit('setPeopleFiltered', {
            value: result
        })
    },
    updateFilter({
        commit,
        state,
        dispatch
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
        dispatch('updatePeopleFiltered');
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
        index,
        value
    }) {
        state.all.splice(index, 1, value)
    },
    setPeopleFiltered(state, {
        value
    }) {
        state.filtered = value
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