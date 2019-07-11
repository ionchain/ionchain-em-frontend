<template lang="pug">
.page-login
    .ly-main
        .login_left
            img(src='../static/login_img.png', alt='')
        .login_right.login-box
            .login_right_logo
                div
                    img(src='/icon/logo.svg', alt='')
                div IONPartnership
            .login_right_hint(v-show="errors.has('mobile') || errors.has('password')")
                span
                    img(src='/icon/error.svg', alt='')
                span {{ errors.first('mobile') }}{{ errors.first('password') }}
            .login_right_name
                input.ic-input-lg(v-validate="'required'", :data-vv-as="$t('mobile')", name='mobile', :placeholder="$t('please_enter_mobile')", v-model='form.mobile', type='text')
            .login_right_pw
                input.ic-input-lg(@keyup.enter='Login', v-validate="'required'", v-model='form.password', :data-vv-as="$t('password')", name='password', :placeholder="$t('please_enter_pwd')", type='password')
                div
                    nuxt-link(to='/retrieve') {{$t('forget_pwd_')}}
            .login_right_select
                div
                    p-check.p-svg.p-curve(name='check', color='success', v-model='isLoginAuto')
                        svg.svg.svg-icon(slot='extra', viewBox='0 0 20 20')
                            path(d='M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z', style="{stroke: 'white',fill:'white'}")
                            | {{$t('auto_login')}}
                nuxt-link.link(to='/register') {{$t('register_ionchain_id')}}
            .login_right_log.cursor-hand(@click='Login')
                a(href='javascript:;') {{$t('login')}}
</template>

<script>
import * as api from '@/api'
import * as types from '@/store/mutation-types'
// import { setTimeout } from 'timers'
// import _ from 'lodash'
export default {
    layout: 'default',
    asyncData({
        req
    }) {
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
            title: `Login - IONPartnership`
        }
    },
    mounted(){
        console.log(this.$store)
    },
    methods: {
        Login() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.$snotify.info('请稍后...', {
                        title: '',
                        type: 'async',
                        backdrop: 0.3,
                        id: 'Login'
                    })
                    api.Login(this.form).then(({
                        data
                    }) => {
                        if (data.success === 0) {
                            this.$snotify.success('登录成功')
                            this.$router.push('/user/account')
                            this.$store.commit(types.SET_USERINFO, data.data)
                            if (this.isLoginAuto) {}
                        } else {
                            this.$snotify.error(data.message)
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

<style lang="less">
    @import "../less/login.less";
</style>
