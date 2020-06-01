// import shop from '../../api/shop'
// import { mapState } from 'vuex'

// initial state
// const state = {
//     count: 0
// }
const state = () => ({
    all: []
  })

// getters
const getters = {}

// actions
const actions = {
    // getAllProducts({
    //     commit
    // }) {
    // shop.getProducts(products => {
    //     commit('setProducts', products)
    // })
    // }
}

// mutations
const mutations = {
    // setProducts(state, products) {
    //     state.all = products
    // },

    // decrementProductInventory(state, {
    //     id
    // }) {
    //     const product = state.all.find(product => product.id === id)
    //     product.inventory--
    // }
    increment(state) {
        state.count++
    }
}

export default {
    // computed: mapState({
    //     count: state => state.count,
    //     countAlias: 'count',
    //     countPlusLocalState (state) {
    //         return state.count * 10
    //     }
    // }),
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}