<template lang="pug">
    .comp.release 
        .comp_text
            textarea(row="5" v-model="form.content" style="height:400px;resize:none" :placeholder="$t('please_enter_feekback_may_have_award')")
            span 0/1000
        .comp_tj
            button.ic-btn.i-primary(@click="feedbackCommit") 提交
</template>
<script>
import * as API from '@/api'
export default {
    layout:'user',
    data (){
		return {
            form: {
                content: ''
            }
        }
	},
    computed: {
    },
	created() {
    },
    methods: {
        feedbackCommit(){
            API.feedbackCode(this.form).then(({data})=>{
                if(data.success == 0){
                    this.$snotify.success("提交成功")
                }else{
                    this.$snotify.error(data.message)
                }
            })
        }
        
    }
}
</script>
