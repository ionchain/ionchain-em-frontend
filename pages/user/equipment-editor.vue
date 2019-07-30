<template lang="pug">
    .ly-thin#page-equ-add
        h2.page-title-I {{$t("launch_device")}}
        .page-content
            .ic-form.clearfix#equipment-form
                .ic-form-item
                    label {{$t("device_name")}}
                        span.tip-words  ({{$t('example')}} iphone 8) 
                    .input-wrap
                        input.ic-input-big(:placeholder="$t('please_enter_device_number')" name="name" v-model='formData.name' v-validate="'required'" :data-vv-as="$t('device_name')")
                        p.error(v-show="errors.has('name')") {{errors.first('name')}}
                        //- span.input-append.tip-status 0/38
                .ic-form-item
                    label {{$t("system")}}
                        span.tip-words
                    .input-wrap
                        input.ic-input-big(:placeholder="$t('please_enter_system_version')" name="system" v-model='formData.system' v-validate="'required'" :data-vv-as="$t('system')")
                        p.error(v-show="errors.has('system')") {{errors.first('system')}}
                .ic-form-item
                    label {{$t("device_amount")}}
                    .input-wrap
                        input.ic-input-big(:placeholder="$t('please_enter_device_amount')" name="counts" v-model='formData.counts' v-validate="'required|numeric'" :data-vv-as="$t('counts')")
                        p.error(v-show="errors.has('counts')") {{errors.first('counts')}}
                //- .ic-form-item
                //-     label 设备说明书
                //-     .input-wrap
                //-         input.ic-input-big(placeholder="请输入设备说明书" name="specification_name" required)
                .ic-form-item
                    label {{$t("device_description")}}
                        span.tip-words
                        //-  | (描述例子 下载)
                    .textarea-wrap
                        textarea.ic-textarea(row="5" style="height:226px;resize:none" :placeholder="$t('please_enter_device_info')" name="description" v-model='formData.description' v-validate="'required'" :data-vv-as="$t('description')")
                        p.error(v-show="errors.has('description')") {{errors.first('description')}}
                        span.textarea-append.tip-status 0/1000
                .ic-form-item
                    label {{$t("device_cat")}}
                    //- .row
                    //-     .col-lg-6
                    //-         .input-wrap
                    //-             select.ic-input-big#websites1(placeholder=一级类目 name="cat_L1")
                    //-     .col-lg-6
                    //-         .input-wrap
                    //-              select.ic-input-big#websites2(name="device_category_id", placeholder=二级类目 required)
                    .row
                        .col-lg-6
                            no-ssr
                                .input-wrap
                                    v-select(v-model='catSelect.cat_L1', :onChange="catChangeL1" :options='cat1_options' :clearSearchOnSelect="false" v-validate="'required'" :data-vv-as="$t('first_category')" name="cat_L1")
                                    p.error(v-show="errors.has('cat_L1')") {{errors.first('cat_L1')}}
                        .col-lg-6
                            no-ssr
                                .input-wrap
                                    v-select(v-model='catSelect.device_category_id', :onChange="catChangeL2" :options='cat2_options' :clearSearchOnSelect="false" v-validate="'required'" :data-vv-as="$t('second_category')" name="device_category_id")
                                    p.error(v-show="errors.has('device_category_id')") {{errors.first('device_category_id')}}
                .ic-form-item
                    label {{$t("device_picture")}}
                    ul.gallery-E(v-if="false")
                        li.plus-btn
                            input(name='device_photo' id='equipment-pic-upload' type="file"  data-url="http://localhost/jQuery-File-Upload/server/php/")
                        li.ga-item
                    .input-wrap
                        input.ic-input-big(name="device_photo" v-validate="'required'" v-model="formData.device_photo" :data-vv-as="$t('device_photo')" )
                        p.error(v-show="errors.has('device_photo')") {{errors.first('device_photo')}}
                .ic-form-item
                    ul.gallery-E
                        li.ga-item(style="display:none;" data-bind="visible: equPic()")
                            img(data-bind="attr:{src: equPic}")
                .ic-form-item.hide
                    label {{$t("equipment_instructions_uploaded")}}
                    div
                        input.ic-input-big.wid-col2-A(placeholder="" readonly="readonly")
                        button.right.ic-btn-big.i-outline-primary.wid-col2-B.btn-upload(id="notice-book-upload") {{$t("upload")}}
                            input(type="file")
                .ic-form-item.hide
                    label {{$t("equipment_instructions_uploaded")}}
                    div
                        input.ic-input-big.wid-col2-A(placeholder="" readonly="readonly" )
                        button.right.ic-btn-big.i-outline-primary.wid-col2-B.btn-upload(id="data-sample-upload" data-url="http://localhost/jQuery-File-Upload/server/php/") {{$t("upload")}}
                            input(type="file")
            .c-tool-bar
                button.ic-btn.i-primary(@click="doSubmit") {{$t('submit')}}
                button.ic-btn.i-outline {{$t('cancel')}}
        #tipBoxA.tip-box-A(data-options='{"trigger":".plus-btn","x_align":"rl","y_align":"cc","x_offset":48}')
            .arrow-left
            .tip-text
                span.l-tit.f-16 {{$t('example')}}:
                img(src="")
                span.l-tip-words {{$t('recommended_size')}}：{{$t('size_recommended')}}
                    br
                    span {{$t('recommended_format')}}：JPG, JPEG, PNG
</template>
<script>
import * as API from '@/api'
import { _axios } from '@/api/config'

function form_tpl(){
    return {
        cat_L1:'',
        device_category_id: '',
        name:'',
        system: '',
        counts: '',
        description: '',
        device_photo:''
    }
}

export default {
	data (){
		return {
            collectLists: [],
            catSelect: {
                cat_L1:'',
                device_category_id: ''
            },
            cat1_options: [],
            cat2_options: [],
            formData: form_tpl(),
        }
    },
    async asyncData (context) {
        let deviceData=null
        let id = context.route.query.id
        
        return {
            deviceData
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
        },
    },
	created() {
		if (process.client) {
			window.vm = this
        }
        this.deviceRootCats()
        this.deviceSubCats(1)
        if(process.client){
            if(this.$route.query.id){
                this.getDetail()
            }
            
        }
    },
    watch: {
        'catSelect.cat_L1'(val){
            console.log(val);
            this.deviceSubCats(val.value)
        }
    },
    methods: {
        getDetail(){
            console.log("this.context",this.$context)
            let id = this.$route.query.id
            API.getDeviceDesc({deviceId:id}).then(({data})=>{
                if(data.success==0){
                    Object.assign(this.formData,{
                        cat_L1: data.data.cat_L1,
                        device_category_id: data.data.device_category_id,
                        name: data.data.name,
                        system: data.data.system,
                        counts: data.data.counts,
                        description: data.data.description,
                        device_photo: data.data.image_url,
                    })
                }
            }).catch((err)=>{
                console.log(err,"eeeeeee")
            })
        },
        catChangeL1(item){
            this.formData.cat_L1 = item.value
            this.catSelect.cat_L1 = item
        },
        catChangeL2(item){
            this.formData.device_category_id = item.value
            this.catSelect.device_category_id = item
        },
        doSubmit(){
            console.log(this.userinfo, 'userinfo')
            let params = _.clone(this.formData)
            $.extend(params,{
                user_id: this.userinfo.id,
                specification_file: '@',
                data_demo_file: '@'
            })
            let id = this.$route.query.id
            if(id){
                params.id = id
            }
            console.log(params, "params")
            console.log("catSelect", this.catSelect)
            this.$validator.validateAll().then((check_res) => {
                console.log("check_res", check_res, this.errors)
                if(!check_res)return
                this.$snotify.info(this.$t('please_wait'), {
                    title: '',
                    type: 'async',
                    backdrop: 0.3,
                    id: 'loading'
                })
                params.cat_L1 += ''
                params.device_category_id += ''
                API.deviceAdd(params).then(({data}) => {
                    if (data.success === 0) {
                        this.$router.push('/user/release')
                    } else {
                        this.$snotify.error(data.message)
                    }
                }).catch().then(() => {
                    this.$snotify.remove('loading')
                })
            }).catch((err)=>{
                console.log(err)
            })
        },
        //一级分类
        deviceRootCats(){
            API.deviceCats({language: this.$store.state.locale}).then(({data})=>{
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
            console.log("this.$store.state.locale", this.$store.state.locale)
            API.deviceSubCats(pid, this.$store.state.locale).then(({data})=>{
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
        cat_L1Change(){
            this.deviceSubCats(this.formData.cat_L1)
        }
    }
    
}
</script>