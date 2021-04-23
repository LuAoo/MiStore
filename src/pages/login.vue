/* 登录 */
<template>
  <div class="login-container">
    <div class="login_header">
      <img @click="gotoindex()" src="/imgs/milogo.png" alt="" />
    </div>
    <div class="login_content">
      <div class="container">
        <div class="login_box">
          <div class="loginorregister">
            <p
              class="loginorregister_login"
              :class="{ activit: isshow == 1 }"
              @click="isshowwich(1)"
            >
              米粉登录
            </p>
            <span class="loginorregister_line"></span>
            <p
              class="loginorregister_rigister"
              :class="{ activit: isshow == 2 }"
              @click="isshowwich(2)"
            >
              米粉注册
            </p>
          </div>
          <div class="dologin" v-if="isshow == 1">
            <input
              class="one"
              type="text"
              placeholder="小米账号"
              v-model="username"
            />
            <input type="password" placeholder="密码" v-model="password" />
            <button @click="loginin()">登录</button>
            <div class="addmtwechat">
              <p>你可以加我的微信我们一起交流丫</p>
              <img src="/imgs/wechat.jpg" alt="" />
            </div>
          </div>
          <div class="doregister" v-else>
            <input
              class="one"
              type="text"
              placeholder="小米账号"
              v-model="registerusername"
            />
            <input type="text" placeholder="您的邮箱" v-model="registeremail" />
            <input
              type="password"
              placeholder="设置密码"
              v-model="registerpassword"
            />
            <button @click="registerin()">注册</button>
            <div class="milogo">
              <img
                src="https://account.xiaomi.com/static/res/094919e/account-static/respassport/images/logo.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login_footer">
      <div class="login_footer_top">
        <ul>
          <li><a href="/index">主页</a></li>
          <li>
            <a href="https://juejin.cn/user/2568097069536599">我的掘金</a>
          </li>
          <li><a href="https://blog.csdn.net/M_Edison">我的博客</a></li>
          <li><a href="https://github.com/LuAoo">我的github</a></li>
        </ul>
      </div>
      <div class="login_footer_bottom">
        小米公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      //登录页面tab
      isshow: this.$store.state.isshow,
      //设置表单双向绑定
      username: "",
      password: "",
      registerusername: "",
      registerpassword: "",
      registeremail: "",
    };
  },
  methods: {
    gotoindex(){
      this.$router.push('/index')
    },
    //登录页面Tab设置
    isshowwich(id) {
      if (id == 1) {
        this.isshow = 1;
        return true;
      } else {
        this.isshow = 2;
        return false;
      }
    },
    //  登录的点击事件
    loginin() {
      var { username, password } = this;
      this.axios({
        method: "post",
        url: "/user/login",
        data: {
          username,
          password,
        },
      })
        .then((result) => {
          // 将id存入cookie
          this.$cookie.set("useId", result.id, { expires: "1M" });
          // 使用vuex将用户名存入，然后在首页等地方展示
          this.$store.dispatch("setUsername", result.username);
          this.$router.push("/index");
        })
        .catch(() => {
          (this.username = ""), (this.password = "");
        });
    },
    //注册的点击事件
    registerin() {
      var { registerusername, registerpassword, registeremail } = this;
      this.axios({
        method: "post",
        url: "/user/register",
        data: {
          username: registerusername,
          password: registerpassword,
          email: registeremail,
        },
      })
        .then((result) => {
          alert(result);
        })
        .catch(() => {
          (this.registerusername = ""),
            (this.registerpassword = ""),
            (this.registeremail = "");
        });
    },
  },
};
</script>
<style lang='scss'>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
@import "../assets/scss/base.scss";
@import "../assets/scss/login.scss";
</style>
