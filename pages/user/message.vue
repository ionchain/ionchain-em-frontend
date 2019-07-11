<template lang="pug">
.release.page-message 
    .release_nav.message_nav
        a(href="javascript:;" @click="tabClick(1)" :class="{active: tabIndex==1}" v-html="$t('downloaded')") 被下载
        a(href="javascript:;" @click="tabClick(2)" :class="{active: tabIndex==2}" v-html="$t('system_message')") 系统消息
    .message_content
        //- 被下载    
        ul.release_content.message_down.message_on(v-show="tabIndex==1")
            li.card-I(v-for="(item,index) in downloadedList")
                .cont_f1
                    .cont_f1_img
                        img(src="/img/product/product_1.jpg")
                    .cont_f1_text 
                        .f1_name 荣耀手环3 标准版
                        p
                            label {{$t('system')}}：
                            span  Android 6.23
                        p
                            label {{$t('device_number')}}：
                            span 1578698
                        p
                            label {{$t('amount')}}：
                            span 157
                        p
                            label {{$t('download_times')}}：
                            span 30
        //- 系统消息
        ul(v-show="tabIndex==2")
            li(style="margin-top:20px;") {{$t('under_development')}}!    
</template>
<script>
import * as API from '@/api'
export default {
    layout: 'user',
	data (){
		return {
            downloadedList: [],
            tabIndex: 1
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
	created() {
		if (process.client) {
			window.vm = this
        }
        this.getDownloadedList()
    },
    methods: {
        tabClick(i){
            this.tabIndex = i
        },
        getDownloadedList(){
            /* API.xxxx({userId: this.userinfo.id}).then(({data})=>{
                if(data.success == 0){
                    this.downloadedList = data.data
                }else{
                    this.$snotify.error(data.message)
                }
            }) */
        }
    }
}
</script>