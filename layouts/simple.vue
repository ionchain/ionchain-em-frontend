<template>
    <div>
        <my-header />
        <nuxt/>
    </div>
</template>
<script>

import MyHeader from '../components/Header.vue'
import '../less/public.less'

export default {
  components: {
    MyHeader
  }
}
</script>
