<template lang="pug">
    .ly-thin#page-equ-add
        h2.page-title-I 发布设备
        .page-content
            .ic-form.clearfix#equipment-form
                .ic-form-item
                    label 设备名称
                        span.tip-words (例：iphone 8) 
                    .input-wrap
                        input.ic-input-big(placeholder=请输入设备编号 name="name" required)
                        //- span.input-append.tip-status 0/38
                .ic-form-item
                    label 系统
                        span.tip-words
                    .input-wrap
                        input.ic-input-big(placeholder=请输入设备系统版本 name="system" required)
                .ic-form-item
                    label 设备数量
                    .input-wrap
                        input.ic-input-big(placeholder=请输入设备数量 name="counts" required)
                //- .ic-form-item
                //-     label 设备说明书
                //-     .input-wrap
                //-         input.ic-input-big(placeholder="请输入设备说明书" name="specification_name" required)
                .ic-form-item
                    label 设备组描述
                        span.tip-words
                        //-  | (描述例子 下载)
                    .textarea-wrap
                        textarea.ic-textarea(row="5" style="height:226px;resize:none" placeholder=请输入设备信息 name="description" required)
                        span.textarea-append.tip-status 0/1000
                .ic-form-item
                    label 设备类目
                    //- .row
                    //-     .col-lg-6
                    //-         .input-wrap
                    //-             select.ic-input-big#websites1(placeholder=一级类目 name="catL1")
                    //-     .col-lg-6
                    //-         .input-wrap
                    //-              select.ic-input-big#websites2(name="device_category_id", placeholder=二级类目 required)
                    .row
                        .col-lg-6
                            .input-wrap
                                no-ssr
                                    v-select(v-model='catSelect.catL1', :options='cat1_options' :clearSearchOnSelect="false")
                        .col-lg-6
                            .input-wrap
                                no-ssr
                                    v-select(v-model='catSelect.catL2', :options='cat2_options' :clearSearchOnSelect="false")
                .ic-form-item
                    label 设备图片
                    ul.gallery-E.hide
                        li.plus-btn
                            input(name='device_photo' id='equipment-pic-upload' type="file" data-url="http://localhost/jQuery-File-Upload/server/php/")
                        li.ga-item
                    .input-wrap
                        input.ic-input-big(required data-bind="textInput: equPic" name="device_photo")
                .ic-form-item
                    ul.gallery-E
                        li.ga-item(style="display:none;" data-bind="visible: equPic()")
                            img(data-bind="attr:{src: equPic}")
                .ic-form-item.hide
                    label 设备说明书上传
                    div
                        input.ic-input-big.wid-col2-A(placeholder="" readonly="readonly")
                        button.right.ic-btn-big.i-outline-primary.wid-col2-B.btn-upload(id="notice-book-upload") 上传
                            input(type="file")
                .ic-form-item.hide
                    label 设备说明书上传
                    div
                        input.ic-input-big.wid-col2-A(placeholder="" readonly="readonly" )
                        button.right.ic-btn-big.i-outline-primary.wid-col2-B.btn-upload(id="data-sample-upload" data-url="http://localhost/jQuery-File-Upload/server/php/") 上传
                            input(type="file")
            .c-tool-bar
                button.ic-btn.i-primary(data-bind="click: submit") 提交
                button.ic-btn.i-outline 取消
        #tipBoxA.tip-box-A(data-options='{"trigger":".plus-btn","x_align":"rl","y_align":"cc","x_offset":48}')
            .arrow-left
            .tip-text
                span.l-tit.f-16 示例:
                img(src="")
                span.l-tip-words 建议尺寸：不小于 400×400px，并且为正方形
                    br
                    span 建议格式：JPG, JPEG, PNG
</template>
<script>
import * as API from '@/api'
export default {
	data (){
		return {
            collectLists: [],
            catSelect: {
                catL1:'',
                catL2: ''
            },
            formData: {
                catL1:'',
                catL2: ''
            },
            cat1_options: [],
            cat2_options: []
        }
	},
    computed: {
        userinfo(){
            return Object.assign({
                name: '',
                company_name: '',
                org_code: '',
                position: ''
            }, this._userinfo, this.$store.state.userinfo)
        }
    },
	created() {
		if (process.client) {
			window.vm = this
        }
        this.deviceRootCats()
        this.deviceSubCats(1)
    },
    watch: {
        'catSelect.catL1'(val){
            console.log(val);
            this.deviceSubCats(val.value)
        },
        catSelect(val){
            this.formData.catL1 = val.catL1.value
            this.formData.catL2 = val.catL2.value
        }
    },
    methods: {
            //一级分类
        deviceRootCats(){
            API.deviceCats().then(({data})=>{
                console.log("deviceCats", data);
                if(data.success==0){
                    let list = []
                    data.data.forEach((item)=>{
                        list.push({
                            label: item.name,
                            value: item.id
                        })
                    })
                    this.cat1_options = list
                }else{
                    // this.$
                }
            })
        },
        //二级分类
        deviceSubCats(pid){
            API.deviceSubCats(pid).then(({data})=>{
                if(data.success==0){
                    let list = []
                    data.data.forEach((item)=>{
                        list.push({
                            label: item.name,
                            value: item.id
                        })
                    })
                    this.cat2_options = list
                }else{
                    // this.$
                }
            })
        },
        catL1Change(){
            this.deviceSubCats(this.formData.catL1)
        }
    }
    
}
</script>