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
import * as types from '../store/mutation-types'

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
    $route(to, from) {
      if (_.isEmpty(this.$store.state.userinfo) && (to.name === 'index')) {
        this.$router.push('/login')
      }
      if (to.name === 'login') {
        this.$store.commit(types.SET_IS_LOGING_PAGE, true)
      } else {
        this.$store.commit(types.SET_IS_LOGING_PAGE, false)
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
        if (res.success === 0) {
          this.$snotify.success(res.message)
          this.$store.commit(types.SET_USERINFO, {})
          setTimeout(() => {
            this.$router.push('/login')
            location.refresh()
          }, 200)
        }
      })
    }
  }
}
</script>
