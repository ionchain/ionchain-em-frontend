<template>
    <div class="page-register">
        <div class="register_verify register_active">
            <div><span>1</span><label>手机验证</label></div>
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
                    <button>点击按钮进行验证</button>
                    <div class="register_cont_click_yz">
                        <div class="click_yz_yz click_yz_active">
                            <div><input type="text" placeholder="手机验证码"></div>
                            <div><button>120s后重新获取</button></div> 
                        </div>
                        <div class="click_yz_text">校验码短信已发送到你的手机上，有效时间为10分钟，请及时查收。</div>
                    </div>
            </div>
            <!-- 输入密码 -->
            <div class="register_cont_pw">

            </div>
            <div class="register_cont_next">
                <a href="">下一步</a>
            </div>
        </div>
        
    </div>
</template>
<script>
import * as api from '@/api'
export default {
  layout: 'default',
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  data() {
    return {
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
    }
  }
}
</script>

<style scoped>

</style>
