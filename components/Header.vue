<template>
  <header class="ly-header">
    <section class="h-main">
      <nuxt-link class="logo" to="/">
        <img src="/icon/IONC_store_bule.svg" />
      </nuxt-link>
      <a class="logo_gw" href="http://www.ionchain.org/index_CN.html" target="_blank">离子链官网</a>
      <div class="h-info" v-if="!isEmpty(userinfo) && !isLoginPage">
        <span>当前登录 </span><span>{{get(userinfo, 'mobile_num')}}</span>
        <span @click="logOut" class="quit"> 退出</span>
      </div>
      <div class="h-have" v-if="isEmpty(userinfo) && !isLoginPage">
        <nuxt-link to="/register" class="z_d"><span>注册</span></nuxt-link>&nbsp;&nbsp;
        已有账号？<nuxt-link to="/login" class="z_d"><span>请登录</span></nuxt-link>
      </div>
    </section>
  </header>
</template>
<script>
import _ from 'lodash'
import * as api from '@/api'
// import * as types from '../store/mutation-types'

export default {
  computed: {
    userinfo() {
      return this.$store.state.userinfo
    },
    isLoginPage() {
      return this.$store.state.isLoginPage
    }
  },
  watch: {
    $route(to) {
      if (_.isEmpty(this.$store.userinfo) && (to.path === '/' || to.path === '/index')) {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    get(obj, path) {
      return _.get(obj, path)
    },
    isEmpty(obj) {
      return _.isEmpty(obj)
    },
    logOut() {
      api.Logout().then((res) => {
        this.$snotify.success(res.message)
        setTimeout(() => {
          this.$router.push('/login')
        }, 200)
      })
    }
  }
}
</script>
