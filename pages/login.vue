<template>
  <div class="ly-main">
      <div class="login_left"></div>
      <div class="login_right">
          <div class="login_right_logo">
              <div><img src="../static/icon/logo.svg" alt=""></div>
              <div>IONChain</div>
          </div>
          <div class="login_right_hint">
              <span><img src="../static/icon/error.svg" alt=""></span>
              <span>账户名不存在，请重新输入</span>
          </div>
          <div class="login_right_name">
            <input type="text" />
          </div>
          <div class="login_right_pw">
            <input type="text" />
          </div>
          <div class="login_right_select">
              <div><input type="text"></div>
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
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>

<style scoped>

</style>
