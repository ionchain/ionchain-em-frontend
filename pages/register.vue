<template>
<div class="page-register">
    <div class="i-step">
        <div :class="{active:formStatus[0],finish:(step > 0)}"><span>1</span><label>{{$t('mobile_verify')}}</label></div>
        <div :class="{active:formStatus[1],finish:(step > 1)}"><b></b><span>2</span><label>{{$t('enter_the_enterprise_information')}}</label></div>
        <div :class="{active:formStatus[2],finish:(step > 2)}"><b></b><span>3</span><label>{{$t('register_complete')}}</label></div>
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
                    <div class="register_cont_number">
                        <input v-validate="'required|mobile'" name="mobile" :data-vv-as="$t('mobile')" data-vv-validate-on="input" type="text" v-model="form.mobile" :placeholder="$t('please_enter_mobile')">
                    </div>
                    <div class="register_cont_click"><button @click="showCheckRobotBox">{{$t('click_to_verify')}}</button></div>
                </div>
                <div :class="{active:stepA==2,finish:stepA>2}" class="stepA-item">
                    <prevent-robot ref="prevent-robot" :isVisible="true" @robot-check="robotCheck" />
                </div>
                <div :class="{active:stepA==3,finish:stepA>3}" class="stepA-item register_cont_click">
                    <div v-if="isShowErrorMsg" class="login_right_hint login_right_w">
                        <span><img src="/icon/error.svg" alt=""></span>
                        <span>{{ smsCodeFailMessage }}</span>
                    </div>
                    <div class="error-msg" v-show="errors.has('code')">
                        <span class="icon"><img src="/img/icon/error.svg" /></span>
                        <span>{{errors.first('code')}}</span>
                    </div>
                    <div class="register_cont_number">
                        <input type="text" :placeholder="$t('please_enter_mobile')" readonly v-model="form.mobile">
                        </div>
                    <div class="register_cont_click_yz">
                        <div v-if="isShowSMScodeInput" class="click_yz_yz">
                            <div>
                                <input v-validate="'required'" v-model="code" name="code" :data-vv-as="$t('verify_code')" type="text" :placeholder="$t('verify_code')">
                            </div>
                          
                            <div>
                                <button v-if="!reGetEnable && secondsLeft>0">{{secondsLeft}}s</button><button @click="getSmsCode" v-else class="click_yz_cx">{{$t('re_get')}}</button>
                            </div>
                        </div>
                        <div v-if="isSmsSendSuccess" class="click_yz_text">{{$t('verify_code_send_msg')}}</div>
                    </div>
                    <button class="i-button" @click="verifySMScode">{{$t('next')}}</button>
                </div>
                <!-- 输入密码 -->
                <div :class="{active:stepA==4,finish:stepA>4}" class="stepA-item register_cont_pw">
                    <div class="login_right_hint login_right_w" v-show="errors.has('password') || errors.has('password_confirmation')">
                        <span><img src="/icon/error.svg" alt=""></span>
                        <span>{{ errors.first('password') }}</span>
                    </div>
                    <p><input v-validate="'required|confirmed:pw_confirm|min:6'" name="password" :data-vv-as="$t('password')" type="password" v-model="form.password" :placeholder="$t('please_enter_pwd')"></p>
                    <p>
                        <input name="password_confirmation" ref="pw_confirm" :data-vv-as="$t('confirm_pwd')" type="password" v-model="form.password_confirmation" :placeholder="$t('confirm_pwd')">
                    </p>
                    <!-- 下一步按钮 -->
                    <button class="i-button" @click="checkPwd">
                        {{$t('next')}}
                    </button>
                </div>
            </div>
        </li>
        <!-- 填写企业信息 -->
        <li class="register-step2 register_cont_xx" :class="{active:formStatus[1]}">
            <p>
                <input type="text" v-validate="'required'" :data-vv-as="$t('company_name')" v-model="form.company_name" name="company_name"  :placeholder="$t('please_enter_enp_name')">
                
            </p>
            <div class="error-msg" v-show="errors.has('company_name')">
                <span class="icon"><img src="/img/icon/error.svg" /></span>
                <span>{{errors.first('company_name')}}</span>
            </div>
            <p>
                <input type="text" v-model="form.company_org_code" name="company_org_code" :placeholder="$t('please_enter_org_code')">
            </p>
            <p><textarea class="ic-textarea" name="eth_address" :data-vv-as="$t('company_name')" v-validate="'required'" v-model="form.eth_address" cols="30" rows="6" :placeholder="$t('please_enter_ionc_address')"></textarea></p>
            <div class="error-msg" v-show="errors.has('eth_address')">
                <span class="icon"><img src="/img/icon/error.svg" /></span>
                <span>{{errors.first('eth_address')}}</span>
            </div>
            <!-- 下一步按钮 -->
            <button class="i-button" @click="createUser">
                {{$t('next')}}
            </button>
        </li>
        <!-- 注册完成 -->
        <li class="register-step3 register_cont_wc" :class="{active:formStatus[2]}">
            <div><img src="/icon/succeed.svg" alt=""></div>
                <div>{{$t('con_register_success')}}</div>
                <div class="register_next">
                    <nuxt-link to="/login">
                        <button class="i-button">{{$t('finish')}}</button>
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
    asyncData({
        req
    }) {
        return {
            name: req ? 'server' : 'client'
        }
    },
    data() {
        return {
            isShowErrorMsg: false,
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
            title: `Register - IONPartnership`
        }
    },
    created() {
        this.secondsLeft = this.interval
    },
    mounted() {},
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
            this.$snotify.info(this.$t('please_wait'), {
                title: '',
                type: 'async',
                backdrop: 0.3,
                id: 'getSmsCode'
            })
            api.getSmsCode({
                mobile: this.form.mobile
            }).then(({
                data
            }) => {
                if (data.success == 0) { // 短信发送成功
                    this.isSmsSendSuccess = true
                    this.isShowErrorMsg = false
                    // this.$snotify.success(data.message)
                } else {
                    this.$snotify.error(this.$t('手机号码已注册') ,{
                        timeout: 2600,
                        closeOnClick: false,
                        backdrop: 0
                    })
                    // this.smsCodeFailMessage = this.$t('手机号码已注册')
                    // this.isShowErrorMsg = true
                    setTimeout(()=>{
                        this.$refs['prevent-robot'].reset()
                        this.step = 0
                        this.stepA = 1
                    },2500)
                    if (data.success == 2001) {
                        // this.isShowSMScodeInput = false
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
            this.$validator.validateAll({code: this.code}).then((c_res)=>{
                if(!c_res) return
                this.$snotify.info(this.$t('please_wait'), {
                    title: '',
                    type: 'async',
                    backdrop: 0.3,
                    id: 'verifySMScode'
                })
                api.verifySMScode({
                    mobile: this.form.mobile,
                    code: this.code
                }).then(({
                    data
                }) => {
                    if (data.success === 0) {
                        this.$snotify.success(data.message)
                        this.stepA += 1 // 切换到下一界面
                    } else {
                        this.$snotify.error(data.message)
                    }
                }).catch().then(() => {
                    this.$snotify.remove('verifySMScode')
                })
            })
            
        },
        // 创建用户
        createUser() {
            this.$validator.validateAll(this.form).then((ck_res)=>{
                console.log("ck_res", ck_res)
                if(!ck_res) return
                api.createUser(this.form).then(({
                    data
                }) => {
                    if (data.success === 0) {
                        this.$snotify.success(data.message)
                        this.nextStep() // 切换到下一界面
                    } else {
                        this.$snotify.error(data.message)
                    }
                })
            })
            
        }
    }
}
</script>

<style scoped>

</style>
