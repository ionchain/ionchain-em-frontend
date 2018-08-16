<template>
    <div class="ly-root">
        <my-header />
        <nuxt class="ly-main" />
    </div>
</template>
<script>

import MyHeader from '../components/Header.vue'

export default {
  components: {
    MyHeader
  }
}
</script>
