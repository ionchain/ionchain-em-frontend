<template>
    <div class="s-input-wrapper">
        <input />
    </div>
</template>
<script>
export default {
  name: 's-input',
  data() {
    return {}
  },
  props: {
    size: {
      type: String,
      default() {
        return 'normal'
      }
    }
  },
  mounted() {
    jigsaw.init(
      document.getElementById('captcha'),
      () => {
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
