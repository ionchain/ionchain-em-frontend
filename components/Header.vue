<template>
  <header class="ly-header">
    <section class="h-main">
      <a class="logo" href="#">
        <img src="/icon/IONC_store_bule.svg" />
      </a>
     
      <a class="logo_gw" href="http://www.ionchain.org/index_CN.html" target="_blank">离子链官网</a>
       <div class="h-info">
        <span v-if="mobile_num">当前登录 </span><span>{{get(userinfo, 'mobile_num')}}</span>
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
    this.mobile_num = this.$cookies.get('mobile_num')
    if (this.mobile_num) {
      let userinfo = localStorage.getItem('userinfo')
      if (userinfo && userinfo !== 'undefined' && userinfo !== 'null') {
        userinfo = JSON.parse(userinfo)
        this.$store.commit(types.SET_USERINFO, userinfo)
      }
    }
    console.log('mobile_num', this.mobile_num)
  },
  computed: {
    userinfo() {
      console.log(this.$store)
      return this.$store.state.userinfo
    }
  },
  methods: {
    get(obj, path) {
      return _.get(obj, path)
    }
  }
}
</script>
