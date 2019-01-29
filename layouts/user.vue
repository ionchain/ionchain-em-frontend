// extends ../layout/default.pug
<template lang="pug">
.ly-root
	vue-snotify
	my-header
	.ly-body
		.user-main.ly-main
			.user-header
				.header-photo.icon-people
					span.path1
					span.path2
					//- img(src="/img/product/product_1.jpg")
				.header-name 
					.header-name_o
						b {{userinfo.nickname}}
						//- a(href="#")
						//-     span.icon-member 企业认证
						//- a.high_rz(href="#")
						//-     span.icon-member 企业认证
					.header-name_t
						label 发布设备数：
						span 12
					.header-name_h
						label 获赞数：
						span 10k
			.user-content
				.user-nav
					ul
						li
							a(:class="{active: $route.name == 'user-release'}" href="/user/release") 我的发布
						li 
							a(:class="{active: $route.name=='user-collect'}" href="/user/collect") 我的收藏
						li 
							a(:class="{active: $route.name=='user-message'}" href="/user/message") 消息中心
						li 
							a(:class="{active: $route.name=='user-comp'}" href="/user/feedback") 投诉与反馈
						li 
							a(:class="{active: $route.name=='user-account'}" href="/user/account") 账号设置
				nuxt
	my-footer
</template>
<script>
import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'

export default {
	computed: {
        userinfo(){
            return Object.assign({
				name: '',
                company_name: '',
                org_code: '',
                position: ''
			}, this.$store.state.userinfo)
        }
    },
	components: {
		MyHeader,
		MyFooter
	},
	created() {
		if (process.client) {
			window.vm = this
		}
	}
}
</script>