import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'
import M from './plugins'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(M)
Vue.use(Toasted)

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
        this.$toasted.show(err.message, {
          position: 'top-right',
          duration: 5000
        })
      })
  },
  render: h => h(App)
}).$mount('#app')
