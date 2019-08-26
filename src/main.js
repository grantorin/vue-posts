import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  created () {
    this.$http.get('https://jsonplaceholder.typicode.com/posts')
      .then(posts => {
        this.$store.dispatch('fetchPosts', posts.data)
      })
      .catch(err => {
        console.log(err)
        // eslint-disable-next-line no-undef
        Materialize.toast(err.message, 6000)
      })
  },
  render: h => h(App)
}).$mount('#app')
