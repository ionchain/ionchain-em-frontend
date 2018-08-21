<template>
  <div class="page-login">
      <div class="login_left">
        <img src="../static/login_img.png" alt="">
      </div>
      <div class="login_right login-box">
          <div class="login_right_logo">
              <div><img src="/icon/logo.svg" alt=""></div>
              <div>IONChain</div>
          </div>
          <div class="login_right_hint" v-show="errors.has('mobile') || errors.has('password')">
              <span><img src="/icon/error.svg" alt=""></span>
              <span>{{ errors.first('mobile') }}{{ errors.first('password') }}</span>
          </div>
          <div class="login_right_name">
            <input v-validate="'required'" data-vv-as="手机号" name="mobile" placeholder="请输入手机号" v-model="form.mobile" class="i-input-bg" type="text" />
          </div>
          <div class="login_right_pw">
            <input v-validate="'required'" v-model="form.password" data-vv-as="密码" name="password" placeholder="请输入密码" class="i-input-bg" type="password" />
          </div>
          <div class="login_right_select">
              <div>
                <p-check class="p-svg p-curve" name="check" color="success" v-model="isLoginAuto">
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                      <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            style="stroke: white;fill:white"></path>
                    </svg>
                    自动登录
                </p-check>
              </div>
              <div>注册 ION Chain ID</div>
          </div>
          <div class="login_right_log cursor-hand"  @click="Login"><a href="javascript:;">登录</a></div>
      </div>
  </div>
</template>
<script>
import * as api from '@/api'
import * as types from '@/store/mutation-types'
export default {
  layout: 'default',
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  data() {
    return {
      isLoginAuto: false,
      form: {
        mobile: '',
        password: ''
      }
    }
  },
  head() {
    return {
      title: `Login - IONC Store`
    }
  },
  mounted() {
    this.$cookies.set('mobile_num')
  },
  methods: {
    Login() {
      // let loadingkey = this.$vDialog.mask('请稍后...')
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$snotify.info('请稍后...', {
            title: '',
            type: 'async',
            backdrop: 0.3,
            id: 'Login'
          })
          api.Login(this.form).then((res) => {
            if (res.success === 0) {
              this.$snotify.success('登录成功')
              this.$router.push('/')
              this.$store.commit(types.SET_USERINFO, res.data)
              // localStorage.setItem('userinfo', JSON.stringify(res.data))
              if (this.isLoginAuto) {
                this.$cookies.set('userinfo', JSON.stringify(res.data), 60 * 60 * 24 * 30) // 一个月
              } else {
                this.$cookies.set('userinfo', JSON.stringify(res.data), 60 * 60)
              }
            } else {
              this.$snotify.error(res.message)
            }
          }).catch().then(() => {
            this.$snotify.remove('Login')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
