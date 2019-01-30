<template lang="pug">
div.ly-header#header
    div.h-main
        a.logo(href='/')
            i.icon-site-logo
        .h-info(v-if="!isEmpty(userinfo) && routeName!='login'")
            span 当前登录
            a.dis-normal(href="/user/account") {{userinfo.mobile_num}}
            span.quit(@click="logOut")  退出
        .h-have(v-if='isEmpty(userinfo) && routeName!="login"')
            a.z_d(href='/register')
                span 注册
            span.xc_x |
            a.z_d(href='/login')
                span 登录
        ul.navitems(v-if="!userinfo && routeName=='login' || routeName == 'register' || routeName == 'retrieve'")
            li
                a.active(href="#") 贡献统计
            li.navitems_t 
                a(href="#") 现有设备
            li 
                a(href="#") 参与投票
        .nav-search(v-if="!userinfo && routeName=='login' || routeName == 'register' || routeName == 'retrieve'")
            .search-input
                input()
                i.search-btn.icon-search
</template>

<script>
import _ from 'lodash'
import * as api from '@/api'
import * as types from '../store/mutation-types'


export default {
    data(){
        return {
            _: _
        }
    },
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
