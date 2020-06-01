// init state
const state = () => ({
    eyeColor: [],
    gender: [],
    preferencesPet: [],
    preferencesFruit: []
})

// getters
const getters = {
    getGender: (state) => {
        return state.gender
    }
}

// actions
const actions = {
    setGender({
        commit
    }, gender) {
        commit('setGender', { gender: gender } )
    }
}

// mutations
const mutations = {
    setGender(state, { gender } ) {
        state.gender = gender
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}