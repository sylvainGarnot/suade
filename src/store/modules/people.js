// init state
const state = () => ({
    all: [],
    local: [],
    filterEyeColor: [],
    filterGender: [],
    filterPreferencesPet: [],
    filterPreferencesFruit: []
})

// getters
const getters = {}

// actions
const actions = {
    setPeople({
        commit
    }, all) {
        commit('setPeople', { all: all } )
    },
    setPeopleLocal({
        commit
    }, local) {
        commit('setPeopleLocal', { local: local } )
    },
    updateFilterEyeColor({
        commit,
        state
    }, value) {
        if (!state.filterEyeColor.includes(value)) {
            commit('addToFilterEyeColor', { value: value } )
        } else {
            for (
                let index = 0;
                index < state.filterEyeColor.length;
                index++
            ) {
                if (state.filterEyeColor[index] === value) {
                    commit('removeFromFilterEyeColor', { index: index } )
                }
            }
        }
    },
    updateFilterGender({
        commit,
        state
    }, value) {
        if (!state.filterGender.includes(value)) {
            commit('addToFilterGender', { value: value } )
        } else {
            for (
                let index = 0;
                index < state.filterGender.length;
                index++
            ) {
                if (state.filterGender[index] === value) {
                    commit('removeFromFilterGender', { index: index } )
                }
            }
        }
    },
    updateFilterPreferencesFruit({
        commit,
        state
    }, value) {
        if (!state.filterPreferencesFruit.includes(value)) {
            commit('addToFilterPreferencesFruit', { value: value } )
        } else {
            for (
                let index = 0;
                index < state.filterPreferencesFruit.length;
                index++
            ) {
                if (state.filterPreferencesFruit[index] === value) {
                    commit('removeFromFilterPreferencesFruit', { index: index } )
                }
            }
        }
    },
    updateFilterPreferencesPet({
        commit,
        state
    }, value) {
        if (!state.filterPreferencesPet.includes(value)) {
            commit('addToFilterPreferencesPet', { value: value } )
        } else {
            for (
                let index = 0;
                index < state.filterPreferencesPet.length;
                index++
            ) {
                if (state.filterPreferencesPet[index] === value) {
                    commit('removeFromFilterPreferencesPet', { index: index } )
                }
            }
        }
    },
}

// mutations
const mutations = {
    setPeople(state, { all } ) {
        state.all = all
    },
    setPeopleLocal(state, { local } ) {
        state.local = local
    },
    addToFilterEyeColor(state, { value } ) {
        state.filterEyeColor.push(value)
    },
    addToFilterGender(state, { value } ) {
        state.filterGender.push(value)
    },
    addToFilterPreferencesFruit(state, { value } ) {
        state.filterPreferencesFruit.push(value)
    },
    addToFilterPreferencesPet(state, { value } ) {
        state.filterPreferencesPet.push(value)
    },
    removeFromFilterEyeColor(state, { index } ) {
        state.filterEyeColor.splice(index, 1)
    },
    removeFromFilterGender(state, { index } ) {
        state.filterGender.splice(index, 1)
    },
    removeFromFilterPreferencesFruit(state, { index } ) {
        state.filterPreferencesFruit.splice(index, 1)
    },
    removeFromFilterPreferencesPet(state, { index } ) {
        state.filterPreferencesPet.splice(index, 1)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}