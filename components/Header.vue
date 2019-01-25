<template lang="pug">
div.ly-header#header
    div.h-main
        a.logo(href='/')
            i.icon-site-logo
        if userinfo && routeName!='login'
            .h-info
                span 当前登录
                a.dis-normal(href="/user/account") #{userinfo.mobile_num}
                span.quit(data-bind='click: logout')  退出
        if userinfo && routeName!="login"
            .h-have
                a.z_d(href='/register')
                    span 注册  {{routeName}}
                span.xc_x |
                a.z_d(href='/login')
                    span 登录
        if  !userinfo && routeName=='login' || currentPage == 'register' || currentPage == 'retrieve'
            ul.navitems
                li
                    a.active(href="#") 贡献统计
                li.navitems_t 
                    a(href="#") 现有设备
                li 
                    a(href="#") 参与投票
            .nav-search
                .search-input
                    input()
                    i.search-btn.icon-search
</template>

<script>
import _ from 'lodash'
import * as api from '@/api'
import * as types from '../store/mutation-types'


export default {
    computed: {
        userinfo() {
            return this.$store.state.userinfo
        },
        isLoginPage() {
            return this.$store.state.isLoginPage
        },
        routeName() {
            return this.$store.state.routeName
        }

    },
    watch: {
        $route(to, from) {
            if (_.isEmpty(this.$store.state.userinfo) && (to.name === 'index')) {
                this.$router.push('/login')
            }
            this.$store.commit(types.SET_routeName, to.name)
        }
    },
    created() {
        this.$store.commit(types.SET_routeName, this.$route.name)
    },
    methods: {
        get(obj, path) {
            return _.get(obj, path)
        },
        isEmpty(obj) {
            return _.isEmpty(obj)
        },
        logOut() {
            api.Logout().then(({
                data
            }) => {
                if (data.success === 0) {
                    this.$snotify.success(data.message)
                    this.$store.commit(types.SET_USERINFO, {})
                    setTimeout(() => {
                        this.$router.push('/login')
                        location.reload()
                    }, 200)
                }
            })
        }
    }
}
</script>
