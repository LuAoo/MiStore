import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
axios({
  url:'/api/data'
}).then((result) => {
  console.log(result);
})
 


