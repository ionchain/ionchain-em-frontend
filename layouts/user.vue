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
					.header-name_t
						label {{$t('number_of_launched_device')}}：
						span 12
					.header-name_h
						label {{$t('number_of_launched_praise')}}：
						span 10k
			.user-content
				.user-nav
					ul
						li
							a(:class="{active: $route.name == 'user-release'}" href="/user/release") {{$t('my_publish')}}
						li 
							a(:class="{active: $route.name=='user-collect'}" href="/user/collect") {{$t('my_collect')}}
						li 
							a(:class="{active: $route.name=='user-message'}" href="/user/message") {{$t('message_center')}}
						li 
							a(:class="{active: $route.name=='user-feedback'}" href="/user/feedback") {{$t('complain_feedback')}}
						li 
							a(:class="{active: $route.name=='user-account'}" href="/user/account") {{$t('account_set')}}
				nuxt
	my-footer
</template>
<script>
import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'

export default {
	head () {
		return {
			title: "IONPartnership",
			meta: [
			// { hid: 'description', name: 'description', content: 'My custom description' }
			]
		}
	},
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