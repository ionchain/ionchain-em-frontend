<template>
    <div class="ly-root">
        <vue-snotify></vue-snotify>
        <my-header />
        <div class="ly-body">
          <nuxt />
        </div>
        <my-footer/>
    </div>
</template>
<script>

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
// import _ from 'lodash'

export default {
  head () {
    return {
      title: "IONPartnership",
      meta: [
        // { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
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
