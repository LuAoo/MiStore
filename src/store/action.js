import axios from 'axios'
export default {
  // 登录时将username存入vuex状态中
  setUsername(context, username) {
    context.commit('setUsername', username)
  },
  setCartnum(context, cartnum) {
    context.commit('setCartnum', cartnum)
  },

  // 每次刷新界面时拉去数据（将耗时的操作放在actions数据可以成功更新）
  frashIndexUpdataUsername(context) {
    axios.get("/user").then((res) => {
      if (res) {
        context.commit('setUsername', res.username);
        console.log(res);
      }
    });
  },
  frashIndexUpdataUpdata(context) {
    axios.get("/carts/products/sum").then((res) => {
      if (res) {
        context.commit('setCartnum', res)
        console.log(res);
      }
    });
  },
}