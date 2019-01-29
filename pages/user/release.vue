<template lang="pug">
    .release 
        .release_nav 
            a(href="#").active 设备
        ul.release_content
            li.card-I(v-for="(item,index) in deviceLists" :class="{second: index % 2 == 0 }")
                .cont_f1
                    .cont_f1_img 
                        img(:src="item.image_url")
                    .cont_f1_text
                        .f1_name {{item.name}}
                        p
                            label 系统：
                            span {{item.system}}
                        p
                            label 设备编号：
                            span 1578698
                        p
                            label 数量：
                            span {{item.counts}}
                        p
                            label 提交日期：
                            span {{item.created_at}}
                .cont_f2 样例完整度：
                .cont_f3
                .scheduleX(data-progress="90")
                .cont_f4
                    span.cont_f4_o 智能穿戴
                    span IT科技
                .cont_f5
                    .good
                        i.icon-light-star
                        i.icon-gray-star
                        i.icon-gray-star
                        i.icon-gray-star
                        i.icon-gray-star
                    
                    .down
                        a(:href='"/download_can/" + item.id')
                            i.icon-download
                            span 20
                    .look
                        i.icon-eye
                        span 20
                    .del 
                        a(href="#") 删除
                    .compile
                        a(href="#") 编辑
            a(href="/equipment-add")    
                li.plus
                    i
                    span
</template>
<script>
import * as API from '@/api'
export default {
    layout: 'user',
	data (){
		return {
            deviceLists: []
        }
	},
    computed: {
        userinfo(){
            return Object.assign({}, this._userinfo, this.$store.state.userinfo)
        }
    },
	created() {
    },
    methods: {
        getDeviceLists(){
            console.log("userinfo", this.userinfo);
            API.getDeviceList({userId: this.userinfo.id}).then(({data})=>{
                if(data.success == 0){
                    this.deviceLists = data.data
                }else{
                    this.$snotify.error(data.message)
                }
            })
        }
    }
}
</script>