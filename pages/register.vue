<template>
    <div class="page-register">
        <div class="i-step">
            <div :class="{active:formStatus[0],finish:(step > 0)}"><span>1</span><label>手机验证</label></div>
            <div :class="{active:formStatus[1],finish:(step > 1)}"><b></b><span>2</span><label>填写企业信息</label></div>
            <div :class="{active:formStatus[2],finish:(step > 2)}"><b></b><span>3</span><label>注册成功</label></div>
        </div>
        <ul class="register-form-box">
            <!-- 手机验证 -->
            <li class="register-step1 register_cont_yz" :class="{active:formStatus[0]}">
              <div class="stepA-box">
                <div :class="{active:stepA==1,finish:stepA>1}" class="stepA-item register_cont_number">
                  <div class="login_right_hint login_right_w" v-show="errors.has('mobile')">
                    <span><img src="/icon/error.svg" alt=""></span>
                    <span>{{ errors.first('mobile') }}</span>
                  </div>
                  <div class="register_cont_number"><input v-validate="'required|mobile'" name="mobile" data-vv-as="手机号码" data-vv-validate-on="input" type="text" v-model="form.mobile" placeholder="请输入手机号"></div>
                  <div class="register_cont_click"><button  class="i-button" @click="showCheckRobotBox">点击按钮进行验证</button></div>
                </div>
                <div :class="{active:stepA==2,finish:stepA>2}" class="stepA-item">
                  <prevent-robot :isVisible="true" @robot-check="robotCheck" />
                </div>
                <div :class="{active:stepA==3,finish:stepA>3}" class="stepA-item register_cont_click">
                  <div class="register_cont_number">
                        <input type="text" placeholder="请输入手机号" readonly v-model="form.mobile">
                  </div>
                  <div class="register_cont_click_yz">
                    <div v-if="isShowSMScodeInput" class="click_yz_yz">
                        <div><input  v-validate="'required'" v-model="code" name="code" data-vv-as="手机验证码" type="text" placeholder="手机验证码"></div>
                        <div><button v-if="!reGetEnable && secondsLeft>0">{{secondsLeft}}s后重新获取</button><button @click="getSmsCode" v-else class="click_yz_cx">重新获取</button></div> 
                    </div>
                    <div v-if="isShowMessage" class="login_right_hint login_right_w">
                      <span><img src="/icon/error.svg" alt=""></span>
                      <span>{{ smsCodeFailMessage }}</span>
                    </div>
                    <div v-if="isSmsSendSuccess" class="click_yz_text">校验码短信已发送到你的手机上，有效时间为10分钟，请及时查收。</div>
                  </div>
                  <button class="i-button" @click="verifySMScode">下一步</button>
                </div>
                <!-- 输入密码 -->
                <div :class="{active:stepA==4,finish:stepA>4}" class="stepA-item register_cont_pw">
                  <div class="login_right_hint login_right_w" v-show="errors.has('password')">
                    <span><img src="/icon/error.svg" alt=""></span>
                    <span>{{ errors.first('password') }}</span>
                  </div>
                  <p><input v-validate="'required|confirmed:pw_confirm|min:6'" name="password" data-vv-as="密码" type="password" v-model="form.password" placeholder="请输入密码"></p>
                  <p><input name="pw_confirm" ref="pw_confirm" data-vv-as="确认密码" type="password" v-model="form.password_confirmation" placeholder="确定密码"></p>
                  <!-- 下一步按钮 -->
                  <button class="i-button" @click="checkPwd">
                      下一步
                  </button>
                </div>
              </div>
            </li>
            <!-- 填写企业信息 -->
            <li class="register-step2 register_cont_xx" :class="{active:formStatus[1]}">
                <p><input type="text" v-validate="'required'" v-model="form.company_name" placeholder="请输入企业名称"></p>
                <p><input type="text" v-model="form.company_org_code" placeholder="请输入组织机构代码"></p>
                <p><textarea name="" v-validate="'required'" v-model="form.eth_address" cols="30" rows="6" placeholder="请输入您的icon地址"></textarea></p>
                <!-- 下一步按钮 -->
                <button class="i-button" @click="createUser">
                   下一步
                </button>
            </li>
            <!-- 注册完成 -->
            <li class="register-step3 register_cont_wc" :class="{active:formStatus[2]}">
              <div><img src="/icon/succeed.svg" alt=""></div>
              <div>恭喜您，注册成功！</div>
              <div class="register_next">
                  <nuxt-link to="/login">
                    <button class="i-button">完成</button>
                  </nuxt-link>
              </div>
            </li>
        </ul>
    </div>
</template>
<script>
import * as api from '@/api'
import PreventRobot from '@/components/prevent-robot'
import moment from 'moment'
export default {
  layout: 'default',
  components: {
    PreventRobot
  },
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  data() {
    return {
      isShowMessage: false,
      isShowSMScodeInput: true,
      isSmsSendSuccess: false,
      smsCodeFailMessage: '',
      interval: 120, // 短信发送时间间隔
      secondsLeft: 0, // 剩余读秒
      reGetEnable: false,
      isVisible: false,
      step: 0, // 从0开始
      stepMax: 2,
      formStatus: [true, false, false],
      stepA: 1, // 从1开始
      code: '', // 短信验证码
      form: {
        mobile: '',
        password: '',
        password_confirmation: '',
        company_name: '',
        company_org_code: '',
        eth_address: ''
      },
      showErrorTip: false
    }
  },
  head() {
    return {
      title: `Register - IONC Store`
    }
  },
  created() {
    this.secondsLeft = this.interval
  },
  mounted() {
  },
  methods: {
    checkPwd() {
      this.$validator.validate('password', this.form.password).then((result) => {
        if (result) {
          this.nextStep()
        }
      })
    },
    // 滑动拼图-高级生物验证
    robotCheck(test) {
      if (test) {
        this.getSmsCode()
        this.stepA += 1 // 不管发送成功与否切换到下一界面
      }
    },
    showCheckRobotBox() {
      this.$validator.validate('mobile', this.form.mobile).then((result) => {
        if (result) {
          this.stepA += 1
        }
      })
    },
    // 注册步骤控制---3步
    nextStep() {
      if (this.step < this.stepMax) {
        this.step += 1
        for (let i = 0; i < this.formStatus.length; i++) {
          if (i === this.step) {
            this.$set(this.formStatus, i, true)
          } else {
            this.$set(this.formStatus, i, false)
          }
        }
      }
    },
    // 数秒
    timerTick(timeOld) {
      var secondsPast = moment().diff(moment('2018-08-17 12:15:00'), 'seconds')
      this.secondsLeft = secondsPast > this.interval ? this.interval : secondsPast
      setInterval(() => {
        this.secondsLeft -= 1
      }, 1000)
    },
    // 获取短信验证码
    getSmsCode() {
      this.$snotify.info('请稍后...', {
        title: '',
        type: 'async',
        backdrop: 0.3,
        id: 'getSmsCode'
      })
      api.getSmsCode({mobile: this.form.mobile}).then((res) => {
        if (res.success === 0) { // 短信发送成功
          this.isSmsSendSuccess = true
          this.isShowMessage = false
          // this.$snotify.success(res.message)
        } else {
          this.smsCodeFailMessage = res.message
          this.isShowMessage = true
          if (res.success === 2001) {
            this.isShowSMScodeInput = false
          }
        }
      }).catch().then(() => {
        this.$snotify.remove('getSmsCode')
      })
      this.reGetEnable = false
      var sentTime = moment().toString('YYYY-MM-DD HH:mm:ss')
      sessionStorage.setItem('sent-time', sentTime)
      this.timerTick(sentTime)
    },
    // 校验验短信证码
    verifySMScode() {
      this.$snotify.info('请稍后...', {
        title: '',
        type: 'async',
        backdrop: 0.3,
        id: 'verifySMScode'
      })
      api.verifySMScode({
        mobile: this.form.mobile,
        code: this.code
      }).then((res) => {
        if (res.success === 0) {
          this.$snotify.success(res.message)
          this.stepA += 1 // 切换到下一界面
        } else {
          this.$snotify.error(res.message)
        }
      }).catch().then(() => {
        this.$snotify.remove('verifySMScode')
      })
    },
    // 创建用户
    createUser() {
      api.createUser(this.form).then((res) => {
        if (res.success === 0) {
          this.$snotify.success(res.message)
          this.nextStep() // 切换到下一界面
        } else {
          this.$snotify.error(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
