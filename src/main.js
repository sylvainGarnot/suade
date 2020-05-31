import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.http.options.root = 'https://updates.suade.org/'

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (request.after) {
      request.after.call(this, response)
    }
  })
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')