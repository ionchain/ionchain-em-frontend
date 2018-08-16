<template>
  <div class="page-login">
      <div class="login_left">
        <img src="../static/login_img.png" alt="">
      </div>
      <div class="login_right login-box">
          <div class="login_right_logo">
              <div><img src="/icon/logo.svg" alt=""></div>
              <div>IONChain</div>
          </div>
          <div class="login_right_hint">
              <span><img src="/icon/error.svg" alt=""></span>
              <span>账户名不存在，请重新输入</span>
          </div>
          <div class="login_right_name">
            <input class="i-input-bg" type="text" />
          </div>
          <div class="login_right_pw">
            <input class="i-input-bg" type="text" />
          </div>
          <div class="login_right_select">
              <div>
                <p-check class="p-svg p-curve" name="check" color="success" v-model="isLoginAuto">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                              style="stroke: white;fill:white"></path>
                    </svg>
                    自动登录
                </p-check>
              </div>
              <div>注册 ION Chain ID</div>
          </div>
<<<<<<< HEAD
          <div class="login_right_log"><a href="">登录</a></div>
=======
          <div class="login_right_log" @click="Login">登录</div>
>>>>>>> b0a05c1cf13c16f86b4356de7efa6a2e1a736f15
      </div>
  </div>
</template>
<script>
import * as api from '@/api'
export default {
  layout: 'simple',
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  data() {
    return {
      isLoginAuto: false
    }
  },
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  methods: {
    Login() {
      api.Login().then((res) => {
      })
    }
  }
}
</script>

<style scoped>

</style>
