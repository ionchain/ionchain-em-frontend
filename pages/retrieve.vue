<template>
    <div class="page-retrieve">
        <div class="i-step">
            <div :class="{active:(step==1),finish:(step>1)}"><span>1</span><label>填写账号</label></div>
            <div :class="{active:(step==2),finish:(step>2)}"><b></b><span>2</span><label>账号验证</label></div>
            <div :class="{active:(step==3),finish:(step>3)}"><b></b><span>3</span><label>设置新密码</label></div>
            <div :class="{active:(step==4),finish:(step>4)}"><b></b><span>4</span><label>完成</label></div>
        </div>
          <ul class="retrieve-form-box">
            <li class="retrieve-step1 retrieve_cont_zh" v-if="step==1">
              <div v-if="stepOne==1">
                <div class="login_right_hint login_right_w"  v-show="errors.has('mobile')">
                  <span><img src="/icon/error.svg" alt=""></span>
                  <span>{{ errors.first('mobile') }}</span>
                </div>
                <!-- 请输入手机号 -->
                <div class="register_cont_number">
                     <input v-validate="'required|mobile'" name="mobile" data-vv-as="手机号码" data-vv-validate-on="input" type="text" v-model="form.mobile" placeholder="请输入手机号">
                </div>
                <div class="register_cont_click">
                    <button @click="showCheckRobotBox">点击按钮进行验证</button>
                </div>
              </div>
              <div v-if="stepOne==2" class="stepA-item">
                <prevent-robot :isVisible="true" @robot-check="robotCheck" />
              </div>
            </li>
            <li class="retrieve-step2 retrieve_cont_yz" v-if="step==2">
                <div class="login_right_hint login_right_w" v-show="errors.has('code')">
                    <span><img src="/icon/error.svg" alt=""></span>
                    <span>{{ errors.first('code') }}</span>
                </div>
                 <!-- 请输入手机号 -->
                <div class="register_cont_number">
                    <input v-validate="'required|mobile'" name="mobile" data-vv-as="手机号码" data-vv-validate-on="input" type="text" v-model="form.mobile" placeholder="请输入手机号">
                </div>
                <div class="register_cont_click_yz">
                    <div class="click_yz_yz">
                        <div><input  v-validate="'required'" name="code" data-vv-as="手机验证码" type="text" v-model="code" placeholder="手机验证码"></div>
                        <div ><button v-if="!reGetEnable && secondsLeft>0">{{secondsLeft}}s后重新获取</button><button @click="getSmsCode" v-else class="click_yz_cx">重新获取</button></div> 
                    </div>
                    <div class="click_yz_text">校验码短信已发送到你的手机上，有效时间为10分钟，请及时查收。</div>
                </div>
                <!-- 下一步按钮 -->
                <button class="i-button" @click="verifySMScode">
                   下一步
                </button>
            </li>
             <li class="retrieve-step3 retrieve_cont_sz" v-if="step==3">
                <!-- 输入密码 -->
                <div class="register_cont_pw">
                  <div class="login_right_hint login_right_w" v-show="errors.has('password')">
                    <span><img src="/icon/error.svg" alt=""></span>
                    <span>{{ errors.first('password') }}</span>
                  </div>
                  <p><input v-validate="'required|confirmed:pw_confirm|min:6'" name="password" data-vv-as="密码" type="password" v-model="form.password" placeholder="请输入密码"></p>
                  <p><input name="pw_confirm" ref="pw_confirm" data-vv-as="确认密码" type="password" v-model="form.password_confirmation" placeholder="确定密码"></p>
                </div>
                <!-- 下一步按钮 -->
                <button class="i-button" @click="checkPwd">
                    下一步
                </button>
             </li>
             <li class="retrieve-step4 register_cont_wc" v-if="step==4">
                    <div><img src="/icon/succeed.svg" alt=""></div>
                    <div>密码设置成功!</div>
                    <div class="register_next">
                      <button class="i-button" @click="logOut">完成</button>
                    </div>
            </li>
          </ul>
    </div>
</template>
<script>
import * as api from '@/api' // import引入包或者模块
import PreventRobot from '@/components/prevent-robot'// 滑动图片组件
import moment from 'moment' // 时间库
export default {
  components: { // 局部注册
    PreventRobot
  },
  data() {
    return {
      step: 1, // 设置初始值为1
      stepOne: 1,
      reGetEnable: false,
      secondsLeft: 0, // 剩余读秒
      code: '',
      interval: 120, // 短信发送时间间隔
      password_confirmation: '',
      form: {
        mobile: ''
      }
    }
  },
  created() {
    this.secondsLeft = this.interval
  },
  methods: {
    showCheckRobotBox() {
      this.$validator.validate('mobile', this.form.mobile).then((result) => {
        if (result) {
          this.stepOne += 1
        }
      })
    },
    // 滑动拼图-高级生物验证
    robotCheck(test) {
      if (test) {
        this.getSmsCode()
        this.step += 1 // 不管发送成功与否切换到下一界面
      }
    },
    // 获取短信验证码
    getSmsCode() {
      this.$snotify.info('请稍后...', {
        title: '',
        type: 'async',
        backdrop: 0.3,
        id: 'getSmsCode'
      })
      api.getSmsCode({mobile: this.form.mobile, source: 'reset_password'}).then((res) => {
        if (res.success === 0) { // 短信发送成功
        } else {
        }
      }).catch().then(() => {
        this.$snotify.remove('getSmsCode')
      })
      this.reGetEnable = false
      var sentTime = moment().toString('YYYY-MM-DD HH:mm:ss')
      sessionStorage.setItem('sent-time', sentTime)
      this.timerTick(sentTime)
    },
    // 数秒
    timerTick(timeOld) {
      var secondsPast = moment().diff(moment('2018-08-17 12:15:00'), 'seconds')
      this.secondsLeft = secondsPast > this.interval ? this.interval : secondsPast
      setInterval(() => {
        this.secondsLeft -= 1
      }, 1000)
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
          this.step += 1 // 切换到下一界面
        } else {
          this.$snotify.error(res.message)
        }
      }).catch().then(() => {
        this.$snotify.remove('verifySMScode')
      })
    },
    // 检查两次输入的密码是否一致
    checkPwd() {
      this.$validator.validate('password', this.form.password).then((result) => {
        if (result) {
          api.resetSmsCode({
            mobile: this.form.mobile,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation
          }).then((res) => {
            if (res.success === 0) {
              this.$snotify.success(res.message)
              this.step += 1
              // this.nextStep()
            } else {
              this.$snotify.error(res.message)
            }
          })
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
    logOut() {
      api.Logout().then((res) => {
        this.$snotify.success(res.message)
        setTimeout(() => {
          this.$router.push('/login')
        }, 200)
      })
    }
  }
}
</script>
