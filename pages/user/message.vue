<template lang="pug">
.release.page-message 
    .release_nav.message_nav
        a(href="javascript:;" @click="tabClick(1)" :class="{active: tabIndex==1}") 被下载
        a(href="javascript:;" @click="tabClick(2)" :class="{active: tabIndex==2}") 系统消息
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
                            label 系统：
                            span Android 6.23
                        p
                            label 设备编号：
                            span 1578698
                        p
                            label 数量：
                            span 157
                        p
                            label 下载次数：
                            span 30
        //- 系统消息
        ul(v-show="tabIndex==2")
            li(style="margin-top:20px;") 正在开发中请等待!    
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