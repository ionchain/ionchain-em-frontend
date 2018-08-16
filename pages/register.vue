<template>
    <div class="page-register">
        <div class="register_verify">
            <div class="register_active"><span>1</span><label>手机验证</label></div>
            <div><b></b><span>2</span><label>填写企业信息</label></div>
            <div><b></b><span>3</span><label>注册成功</label></div>
        </div>
        <!-- 手机验证 -->
        <div class="register_cont_yz">
            <div class="login_right_hint login_right_w">
              <span><img src="/icon/error.svg" alt=""></span>
              <span>账户名不存在，请重新输入</span>
            </div>
            <div class="register_cont_number">
                <input type="text" placeholder="请输入手机号">
            </div>
            <div class="register_cont_click">
                    <button @click="showCheckRobotBox">点击按钮进行验证</button>
                    <div class="register_cont_click_yz">
                        <div class="click_yz_yz">
                            <div><input type="text" placeholder="手机验证码"></div>
                            <div class="click_yz_active"><button>120s后重新获取</button></div> 
                        </div>
                        <div class="click_yz_text">校验码短信已发送到你的手机上，有效时间为10分钟，请及时查收。</div>
                    </div>
             
            </div>
            <prevent-robot :isVisible="isVisible" @robot-check="robotCheck" />
            <!-- 输入密码 -->
            <div class="register_cont_pw">
                <p><input type="text" placeholder="请输入密码"></p>
                <p><input type="text"  placeholder="确定密码"></p>
            </div>
            
        </div>
        <!-- 填写企业信息 -->
        <div class="register_cont_xx">
            <p><input type="text" placeholder="请输入企业名称"></p>
            <p><input type="text" placeholder="请输入组织机构代码"></p>
            <p><textarea name="" id="" cols="30" rows="10">请输入您的icon地址</textarea></p>
        </div>
        <!-- 下一步按钮 -->

        <div class="register_next">
            <a href="">下一步</a>
        </div>
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
      isVisible: false
    }
  },
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  },
  methods: {
    Login() {
      api.Login().then((res) => {
      })
    },
    robotCheck(test) {
      console.log('robotCheck', test)
    },
    showCheckRobotBox() {
      this.isVisible = true
    }
  }
}
</script>

<style scoped>

</style>
