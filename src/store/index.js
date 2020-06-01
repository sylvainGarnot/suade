import Vue from 'vue'
import Vuex from 'vuex'

import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    modules: {
        product
    },
    mutations: {},
    action: {},
    strict: process.env.NODE_ENV !== 'production',
    plugins: []
})