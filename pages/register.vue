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
                  <div><input v-validate="'required|mobile'" name="mobile" data-vv-as="手机号码" data-vv-validate-on="input" type="text" v-model="mobile" placeholder="请输入手机号"></div>
                  <div><button class="i-button" @click="showCheckRobotBox">点击按钮进行验证</button></div>
                </div>
                <div :class="{active:stepA==2,finish:stepA>2}" class="stepA-item">
                  <prevent-robot :isVisible="true" @robot-check="robotCheck" />
                </div>
                <div :class="{active:stepA==3,finish:stepA>3}" class="stepA-item register_cont_click">
                  <div class="register_cont_click_yz">
                    <div class="click_yz_yz">
                        <div><input type="text" placeholder="手机验证码"></div>
                        <div ><button>120s后重新获取</button><button class="click_yz_cx">重新获取</button></div> 
                    </div>
                    <div class="click_yz_text">校验码短信已发送到你的手机上，有效时间为10分钟，请及时查收。</div>
                  </div>
                </div>
                <!-- 输入密码 -->
                <div :class="{active:stepA==4,finish:stepA>4}" class="stepA-item register_cont_pw">
                  <p><input type="text" placeholder="请输入密码"></p>
                  <p><input type="text"  placeholder="确定密码"></p>
                  <!-- 下一步按钮 -->
                  <button class="i-button" @click="nextStep">
                      下一步
                  </button>
                </div>
              </div>
              
            </li>
            <!-- 填写企业信息 -->
            <li class="register-step2 register_cont_xx" :class="{active:formStatus[1]}">
                <p><input type="text" placeholder="请输入企业名称"></p>
                <p><input type="text" placeholder="请输入组织机构代码"></p>
                <p><textarea name="" id="" cols="30" rows="6" placeholder="请输入您的icon地址"></textarea></p>
                <!-- 下一步按钮 -->
                <button class="i-button" @click="nextStep">
                   下一步
                </button>
            </li>
            <!-- 注册完成 -->
            <li class="register-step3 register_cont_wc" :class="{active:formStatus[2]}">
                    <div><img src="/icon/succeed.svg" alt=""></div>
                    <div>恭喜您，注册成功！</div>
                    <div class="register_next">
                        <a href="javascript:;">完成</a>
                    </div>
            </li>
        </ul>
       
    </div>
</template>
<script>
import * as api from '@/api'
import PreventRobot from '@/components/prevent-robot'
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
      isVisible: false,
      step: 0, // 从0开始
      stepMax: 2,
      formStatus: [true, false, false],
      stepA: 1,
      mobile: '',
      showErrorTip: false
    }
  },
  head() {
    return {
      title: `register - ${this.name}`
    }
  },
  created() {
    api.DATA_TEST().then((res) => {
    })
  },
  methods: {
    Login() {
      api.Login().then((res) => {
      })
    },
    robotCheck(test) {
      if (test) {
        this.getSmsCode(this.mobile)
      }
    },
    showCheckRobotBox() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.stepA += 1
        }
      })
    },
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
    getSmsCode(_mobile) {
      api.getSmsCode({mobile: _mobile}).then((res) => {
      })
    }
  }
}
</script>

<style scoped>

</style>
