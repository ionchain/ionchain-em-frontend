<template lang="pug">
    .download_can.ly-main 
        .download_can_f1  
            .f1_left 
                .f1_left_l 
                    img(:src="desc.image_url")
                .f1_left_r
                    b {{desc.name}}
                    .r_first
                        label {{$t('author')}}：
                        b {{userinfo.nickname}}
                    .r_second
                        i.icon-light-star
                        i.icon-gray-star
                        i.icon-gray-star
                        i.icon-gray-star
                        i.icon-gray-star
                    .r_third
                        span.third_one {{$t('smart_wear')}}
                        span {{$t('it_technology')}}
            .f1_right  
                .f1_right_t
                    .t_first
                        i.icon-download
                        span 20
                    .t_second
                        i.icon-eye
                        span 20 
                    .t_third
                        button(@click="collectClick") {{$t('collect')}}
                    //- if  desc.has_favorite != true
                    //-     .t_third
                    //-         button(data-bind="click: collectClick" data-param=`{"user_id":"${userinfo.id}","device_id":"${desc.id}"}`) 收藏  
                    //- else
                    //-     .t_third.active
                    //-         button(data-bind="click: cancelClik" data-param=`{"id":"${desc.favorite_id}"}`) 收藏
                .f1_right_b
                    button {{$t('cownload_call')}}
                //- div=JSON.stringify(desc)
        .download_can_f2
            .f2_name {{$t('device_description')}}
            div  
                .f3_xs 
                    div
                        label {{$t('system')}}：
                        span {{desc.system}}
                    .f3_mt
                        label {{$t('device_number')}}：
                        span 1578698
                   
                .f3_st 
                    div
                        label {{$t('amount')}}：
                        span {{desc.counts}}
                    .f3_mt
                        label {{$t('submit_date')}}：
                        span {{desc.created_at}}
        .download_can_f3
            div {{$t('device_picture')}}
            ul
                li(v-if="(item,index) in desc.photos" :class="{thethird:(index + 1) % 3 == 0}")
                    img(:src="desc.photos[index]")
        .download_can_f4
            .f4_t {{$t('information_sample')}}
            .f4_b Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。Iconfont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。
</template>
<script>
import * as API from '@/api'
export default {
    data (){
		return {
            desc: {
                name:'',
                photos: []
            }
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
        collectClick(){
            if(!this.desc.has_favorite){
                var collect = $(event.target).data('collect');
                API.collectCode(collect).then(function(data){
                    // console.log(data)
                    if(data.success == 0){
                        $(event.target).data('whether', true);
                        $(event.target).data('cancel',{id: data.data.id});
                        // canel_id.id = data.data.id;
                        // $(".t_third>button").addClass("active");
                    }else{
                        $.toast({text: data.message, icon: 'error'});
                    }
                }) 
            }else{
                var cancel = $(event.target).data('cancel');
                API.cancelCode(cancel)._then(function(data){
                    if(data.success == 0){
                        $(event.target).data('whether', false);
                        $(".t_third>button").removeClass("active");
                    }else{
                        $.toast({text: data.message, icon: 'error'});
                    }
                })
            }
        }
        
    }
}
</script>    
                        
