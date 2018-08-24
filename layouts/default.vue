<template>
    <div class="ly-root">
        <vue-snotify></vue-snotify>
        <my-header />
        <div class="ly-body">
          <nuxt class="ly-main" />
        </div>
        <my-footer/>
    </div>
</template>
<script>

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
// import _ from 'lodash'

export default {
  components: {
    MyHeader,
    MyFooter
  },
  created() {
    if (process.client) {
      window.vm = this
    }
  }
}
</script>
