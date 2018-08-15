<template>
  <div class="ly-main">
      <div class="login_left"></div>
      <div class="login_right login-box">
          <div class="login_right_logo">
              <div><img src="../static/icon/logo.svg" alt=""></div>
              <div>IONChain</div>
          </div>
          <div class="login_right_hint">
              <span><img src="../static/icon/error.svg" alt=""></span>
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
                </p-check>
              </div>
              <div>注册 ION Chain ID</div>
          </div>
          <div class="login_right_log">登录</div>
      </div>
  </div>
</template>
<script>
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
  }
}
</script>

<style scoped>

</style>
