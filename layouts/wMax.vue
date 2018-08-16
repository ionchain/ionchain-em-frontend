<template>
  <div class="ly-root">
    <my-header />
    <div class="ly-body">
      <nuxt />
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '../components/Footer.vue'
import MyHeader from '../components/Header.vue'

export default {
  components: {
    MyFooter,
    MyHeader
  }
}
</script>

<style>
</style>
