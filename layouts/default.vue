<template>
    <div class="ly-root">
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

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
