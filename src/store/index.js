import Vue from 'vue'
import vuex from 'vuex'
import actions from './action'
import mutations from './mutations'
Vue.use(vuex)
// 状态管理
let state={
  username:'',
  cartnum:0,
  isshow:1,
}
export default new vuex.Store({
  state,
  actions,
  mutations
})