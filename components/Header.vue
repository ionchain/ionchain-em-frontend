<template>
  <header class="ly-header">
    <section class="h-main">
      <nuxt-link class="logo" to="/">
        <img src="/icon/IONC_store_bule.svg" />
      </nuxt-link>
      <a class="logo_gw" href="http://www.ionchain.org/index_CN.html" target="_blank">离子链官网</a>
      <div class="h-info" v-if="!isEmpty(userinfo)">
        <span>当前登录 </span><span>{{get(userinfo, 'mobile_num')}}</span>
        <span @click="logOut" class="quit"> 退出</span>
      </div>
      <div class="h-have" v-if="isEmpty(userinfo)">
      <!-- <nuxt-link to='/sldfs/sdfs'></nuxt-link> -->
        <!-- <a v-if="!mobile_num" href="">已有账号？<span>请登录</span></a> -->
        <nuxt-link to="/register" class="z_d"><span>注册</span></nuxt-link>&nbsp;&nbsp;
        已有账号？<nuxt-link to="/login" class="z_d"><span>请登录</span></nuxt-link>
      </div>
      <!-- <nav></nav>
      <div></div> -->
    </section>
  </header>
</template>
<script>
import _ from 'lodash'
import * as types from '../store/mutation-types'

export default {
  data() {
    return {
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo
    }
  },
  beforeMount() {
    console.log('@@===@@')
    var userinfo = this.$cookies.get('userinfo')
    userinfo = userinfo !== 'undefined' && userinfo !== 'null' ? userinfo : '{}'
    userinfo = JSON.parse(userinfo)
    this.$store.commit(types.SET_USERINFO, userinfo)
    if ((this.$route.path === '/' || this.$route.path === '/login') && _.isEmpty(userinfo)) {
      this.$router.push('/login')
    }
  },
  watch: {
    $route() {
      // 每次router 变化都更新登录状态cookie
      try {
        this.$cookies.set('userinfo', JSON.stringify(this.$store.state.userinfo), 60 * 60)
      } catch (e) {
        console.log(e)
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
      this.$cookies.remove('userinfo')
      this.$store.commit(types.SET_USERINFO, {})
      // localStorage.setItem('userinfo', JSON.stringify({}))
      this.$router.push('/login')
    }
  }
}
</script>
