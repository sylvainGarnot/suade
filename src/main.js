import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false


Vue.use(VueResource)
Vue.http.options.root = 'https://updates.suade.org/files/'

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (request.after) {
      request.after.call(this, response)
    }
  })
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   components: {
//     App
//   },
//   template: '<App/>'
// })