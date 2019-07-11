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
    return {
      defender: ""
    }
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
    this.defender = jigsaw.init(
      document.getElementById('captcha'),
      () => {
        // document.getElementById('msg').innerHTML = '登录成功！'
        this.$emit('robot-check', true)
      },
      () => {
        this.$emit('robot-check', false)
      },
      {useTip: this.$t('slide_to_fix_picture')}
    )
  },
  methods: {
    reset(){
      this.defender.reset()
    }
  }
}
</script>

<style >
@import './jigsaw.css';

</style>
