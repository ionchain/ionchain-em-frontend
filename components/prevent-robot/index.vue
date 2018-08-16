<template>
    <div v-show="isVisible" class="prevent-robot-wrapper">
        <div id="captcha" style="position: relative"></div>
        <div id="msg"></div>
    </div>
</template>
<script>
import jigsaw from './jigsaw'
export default {
  name: 'prevent-robot',
  data() {
    return {}
  },
  props: {
    isVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  mounted() {
    jigsaw.init(
      document.getElementById('captcha'),
      () => {
        // document.getElementById('msg').innerHTML = '登录成功！'
        this.$emit('robot-check', true)
      },
      () => {
        this.$emit('robot-check', false)
      }
    )
  },
  methods: {

  }
}
</script>

<style >
@import './jigsaw.css';

</style>
