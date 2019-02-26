<template lang="pug">
.account.release
    form.ic-form.of-hide.account_form#account_from
        .account_photo.hide
            img(src="/img/product/product_1.jpg")
            input.hide(name='' id='equipment-pic-photo' type="file" )
        button.hide.account_select.ic-btn-big(id="data-sample-photo") {{$t('select_image')}} 
        .account_text.hide {{$t('account_image_tip')}} 
        .ic-form-item
            label {{$t('name')}} 
            .input-wrap
                input.ic-input-big(:placeholder="$t('please_enter_your_name')" name="nickname" required :value="userinfo.name")
                //- span.input-append.tip-status 0/10
        .ic-form-item
            label {{$t('company')}}
            .input-wrap
                input.ic-input-big(:placeholder="$t('please_enter_your_company')" name="company_name" required :value="userinfo.company_name")
                //- span.input-append.tip-status 0/80
        .ic-form-item
            label {{$t('company_code')}}
            .input-wrap
                input.ic-input-big(:placeholder="$t('please_enter_your_company_code')" name="company_org_code" required :value="userinfo.org_code")
                //- span.input-append.tip-status 0/80
        .ic-form-item
            label {{$t('position')}} 
            .input-wrap
                input.ic-input-big(:placeholder="$t('please_enter_your_position')" name="position" required :value="userinfo.position")
                //- span.input-append.tip-status 0/80
    .c-tool-bar
        button.ic-btn.i-primary(data-bind="click: ac_submit" ) {{$t('submit')}} 
        button.ic-btn.i-outline {{$t('cancel')}} 
</template>
<script>
import * as API from '@/api'
export default {
    layout: 'user',
	data (){
		return {
            userInfoAll: {
                name: '',
                company_name: '',
                org_code: '',
                position: ''
            }
        }
	},
    computed: {
        userinfo(){
            return Object.assign({
                name: '',
                company_name: '',
                org_code: '',
                position: ''
            }, this.$store.state.userinfo, this.userInfoAll)
        }
    },
    watch: {
        userinfo(val){
            // console.log("userinfo", val);
        }
    },
	created() {
        // console.log("userinfo", this.$store.state.userinfo)
		if (process.client) {
			window.vm = this
        }
        this.getUserInfoAll()
    },
    methods: {
        getUserInfoAll(){
            API.userInfo({userId:this.userinfo.id}).then(({data})=>{
                if(data.success == 0){
                    Object.assign(this.userInfoAll, data.data)
                }else{
                    this.$snotify.error(data.message)
                }
            })
        }
    }
}
</script>
    