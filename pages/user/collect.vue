<template lang="pug">
    .release 
        .release_nav 
            a(href="#").active {{$t('device')}}
        ul.release_content
            li.card-I(v-for="(item,index) in collectLists" :class="index % 2 == 0 ? 'second' : ''" )
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
                .cont_f2 {{$t('sample_integrity')}}
                .cont_f3 
                .scheduleX(data-progress="40")
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
                    .look.collect_look
                        i.icon-eye
                        span 20
                    .down.collect_down
                        a(:href="'/download_can/'+ item.id")
                            i.icon-download
                            span 20
</template>
<script>
import * as API from '@/api'
export default {
    layout: 'user',
	data (){
		return {
            collectLists: [],
        }
	},
    computed: {
        userinfo(){
            return Object.assign({}, {
                id: '',
                name: '',
                position: ''
            }, this.$store.state.userinfo)
        }
    },
	created() {
		if (process.client) {
			window.vm = this
        }
        this.getCollectList()
    },
    methods: {
        getCollectList(){
            API.getCollectList({userId: this.userinfo.id}).then(({data})=>{
                if(data.success){
                    this.collectLists =  data.data
                }else{
                    this.$notify.error(data.message)
                }
            })
        }
    }
}
</script>