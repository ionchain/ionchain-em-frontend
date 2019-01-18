<template lang="pug">
  div.ly-header#header
    div.h-main
        a.logo(href='/')
            i.icon-site-logo
        if userinfo && currentPage != 'login'
            .h-info
                span 当前登录
                a.dis-normal(href="/user/account") #{userinfo.mobile_num}
                span.quit(data-bind='click: logout')  退出
        if !userinfo && currentPage != 'login'
            .h-have(v-if='isEmpty(userinfo) && !isLoginPage')
                a.z_d(href='/register')
                    span 注册
                span.xc_x |
                a.z_d(href='/login')
                    span 登录
        if  !userinfo && currentPage != 'login' && currentPage != 'register' && currentPage != 'retrieve'
            ul.navitems
                li
                    a.active(href="#") 贡献统计
                li.navitems_t 
                    a(href="#") 现有设备
                li 
                    a(href="#") 参与投票
            .nav-search
                .search-input
                    input()
                    i.search-btn.icon-search
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
            location.reload()
          }, 200)
        }
      })
    }
  }
}
</script>
