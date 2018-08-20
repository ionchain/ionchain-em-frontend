<template>
  <header class="ly-header">
    <section class="h-main">
      <a class="logo" href="#">
        <img src="/icon/IONC_store_bule.svg" />
      </a>
     
      <a class="logo_gw" href="http://www.ionchain.org/index_CN.html" target="_blank">离子链官网</a>
       <div class="h-info" v-if="mobile_num">
        <span>当前登录 </span><span>{{get(userinfo, 'mobile_num')}}</span>
        <span>退出</span>
      </div>
      <div class="h-have" v-if="!mobile_num">
      <!-- <nuxt-link to='/sldfs/sdfs'></nuxt-link> -->
        <!-- <a v-if="!mobile_num" href="">已有账号？<span>请登录</span></a> -->
        <nuxt-link to="/register" class="z_d"><span>注册 </span></nuxt-link>
        <nuxt-link to="/login" class="z_d">已有账号？<span>请登录</span></nuxt-link>

        
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
      mobile_num: ''
    }
  },
  mounted() {
    this.setGlobalInfo()
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo
    }
  },
  watch: {
    $route(to, from) {
      this.setGlobalInfo()
    }
  },
  methods: {
    get(obj, path) {
      return _.get(obj, path)
    },
    setGlobalInfo() {
      this.mobile_num = this.$cookies.get('mobile_num')
      if (this.mobile_num) {
        let userinfo = localStorage.getItem('userinfo')
        if (userinfo && userinfo !== 'undefined' && userinfo !== 'null') {
          userinfo = JSON.parse(userinfo)
          this.$store.commit(types.SET_USERINFO, userinfo)
        }
      }
    }
  }
}
</script>
