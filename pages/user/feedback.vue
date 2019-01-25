<template lang="pug">
    .comp.release 
        .comp_text
            textarea(row="5" style="height:400px;resize:none" placeholder="请输入您的反馈对我们非常重要，如果您的建议被系统采用认可，将会获得10枚ION奖励...")
            span 0/1000
        .comp_tj
            button.ic-btn.i-primary(@click="feedbackCommit") 提交
</template>
<script>
import * as API from '@/api'
export default {
    data (){
		return {
        }
	},
    computed: {
    },
	created() {
    },
    methods: {
        feedbackCommit(){
            API.feedbackCode({content: feedback}).then(({data})=>{
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
