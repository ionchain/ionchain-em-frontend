<template>
  <div class="ly-main">
      <div class="login_left"></div>
      <div class="login_right">
          <div class="login_right_logo">
              <div><img src="enterprises/img/logo.svg" alt=""></div>
              <div>IONChain</div>
          </div>
          <div class="login_right_hint">
              <span><img src="enterprises/img/error.svg" alt=""></span>
              <span>账户名不存在，请重新输入</span>
          </div>
          <div class="login_right_name"></div>
          <div class="login_right_pw"></div>
          <div class="login_right_select">
              
          </div>
          <div class="login_right_log"></div>
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
