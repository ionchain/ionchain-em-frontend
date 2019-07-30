<template lang="pug">
    .release 
        .release_nav 
            a(href="#").active {{$t('device')}}
        ul.release_content
            li.card-I(v-for="(item,index) in deviceLists" :class="{second: index % 2 == 0 }")
                .cont_f1
                    .cont_f1_img 
                        img(:src="item.image_url")
                    .cont_f1_text
                        .f1_name {{item.name}}
                        p
                            label {{$t('system')}}：
                            span {{item.system}}
                        p
                            label {{$t('device_number')}}：
                            span 1578698
                        p
                            label {{$t('amount')}}：
                            span {{item.counts}}
                        p
                            label {{$t('submit_date')}}：
                            span {{item.created_at}}
                .cont_f2 {{$t('sample_integrity')}}：
                .cont_f3
                .scheduleX(data-progress="90")
                .cont_f4
                    span.cont_f4_o {{$t('smart_wear')}}
                    span {{$t('it_technology')}}
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
                        a(href="#") {{$t('delete')}}
                    .compile
                        a(:href="`/user/equipment-editor?id=${item.id}`") {{$t('edit')}}
            li.plus.cursor-hand(@click="$router.push('/user/equipment-editor')")
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
        this.getDeviceLists()
    },
    methods: {
        getDeviceLists(){
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