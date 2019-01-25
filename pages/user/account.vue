<template lang="pug">
.account.release 
    form.ic-form.of-hide.account_form#account_from
        .account_photo.hide
            img(src="/img/product/product_1.jpg")
            input.hide(name='' id='equipment-pic-photo' type="file" )
        button.hide.account_select.ic-btn-big(id="data-sample-photo")  选择图片
        .account_text.hide 选择你喜欢的图片：格式为JPG,PNG,GIF, 大小不超过5MB
        .ic-form-item
            label 姓名
            .input-wrap
                input.ic-input-big(placeholder="请输入您的姓名" name="nickname" required :value="userinfo.name")
                //- span.input-append.tip-status 0/10
        .ic-form-item
            label 公司
            .input-wrap
                input.ic-input-big(placeholder="请输入您所在的公司" name="company_name" required :value="userinfo.company_name")
                //- span.input-append.tip-status 0/80
        .ic-form-item
            label 公司组织代码
            .input-wrap
                input.ic-input-big(placeholder="请输入您的公司组织代码" name="company_org_code" required :value="userinfo.org_code")
                //- span.input-append.tip-status 0/80
        .ic-form-item
            label 职位
            .input-wrap
                input.ic-input-big(placeholder="请输入您的职位" name="position" required :value="userinfo.position")
                //- span.input-append.tip-status 0/80
    .c-tool-bar
        button.ic-btn.i-primary(data-bind="click: ac_submit") 提交
        button.ic-btn.i-outline 取消
</template>
<script>
export default {
	data (){
		return {
            _userinfo: {
                name: '',
                company_name: '',
                org_code: '',
                position: ''
            }
        }
	},
    computed: {
        userinfo(){
            return Object.assign({}, this._userinfo, this.$store.state.userinfo)
        }
    },
	created() {
		if (process.client) {
			window.vm = this
		}
	}
}
</script>
    