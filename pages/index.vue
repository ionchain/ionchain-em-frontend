<template lang="pug">
.page-home
    //- banner start
    .section-banner
        #banner.section-main
            .viewer-box.swiper-container
                ul.swiper-wrapper
                    li.b-item.swiper-slide(v-for="banner in banners")
                        a(href="javascript:;")
                            .ads-words {{$t('adv_space_rental')}}
                            img(:src="banner")
                            .l-upper
                                .l-tool-bar
                                    .l-main
                                        span.item
                                            i.icon-download
                                            s 20
                                        span.item.item2
                                            i.icon-eye
                                            s 20
                                        button.ic-btn-big.i-outline-primary {{$t('vote')}}
            ul.panel.swiper-pagination
    //- banner end
    //- 公告 start
    .section-notice.home-section
        span {{$t('IONC_token_total_number')}} ：
        span.f-32.bold(data-bind="text: totalIncome")
        span  IONChain
    //- 公告 end
    //- 设备 start
    .section-equipment-data#section-equipment-data
        .eq_prev.icon-left-arrow
        .section-main.swiper-container
            .slide-wrap.swiper-wrapper
                .card-H.swiper-slide(v-for="equ in equList")
                    .card-hd 荣耀P20 Pro手机
                    no-ssr
                        .card-bd
                            .l-progess
                                //- input.dial.hide-tem(type='text' data-readOnly=true value='75' data-linecap="round" data-thickness="0.12" data-width="86" data-fgColor="#26E3E7")
                                //- .l-num.them-em1
                                //-     span 85
                                //-     s %
                                radial-progress-bar(:diameter='80', 
                                    start-color="#51e4e9", 
                                    stopColor="#51e4e9", 
                                    innerStrokeColor="#efefef"
                                    :stroke-width='4', 
                                    :completed-steps='equ.value',

                                :total-steps='totalSteps')
                                    .l-num.them-em1
                                        span {{equ.value}}
                                        s %
                            .l-info
                                p.info1
                                    span.tip-color {{$t('contribution_degree')}}：
                                    span.bold.them-em1.font-nm 8981
                                    span.them-em2   IONC
                                p
                                    span.tip-color {{$t('amount')}} ：
                                    span 50 K
                                p
                                    span.tip-color {{$t('online_time')}} ：
                                    span 9,099.00 h
        .eq_next.icon-right-arrow
    //- 数据图表
    .section-chart
        .section-main
            .box-chart.l-boxL
                .chart-hd
                    span.l-tit {{$t('contribution_curve')}}
                    ul.l-panel
                        li.active(@click="changePeriod($event,1,'24h')") 24h
                        li(@click="changePeriod($event,1, 'week')") {{$t('week')}}
                        li(@click="changePeriod($event,1, 'month')" ) {{$t('month')}}
                        li(@click="changePeriod($event,1, 'year')" ) {{$t('year')}}
                .chart-bd.chart1#chart1
                    .error-tip-gray(style="display:none;") {{$t('your_broswer_v_low')}}
            .box-chart.l-boxR
                .chart-hd
                    span.l-tit {{$t('category_increase_proportion')}}
                    ul.l-panel
                        li.active(@click="changePeriod($event,2,'24h')") 24h
                        li(@click="changePeriod($event,2, 'week')") {{$t('week')}}
                        li(@click="changePeriod($event,2, 'month')" ) {{$t('month')}}
                        li(@click="changePeriod($event,2, 'year')" ) {{$t('year')}}
                .chart-bd.chart2#chart2
                    .error-tip-gray(style="display:none;" ) {{$t('your_broswer_v_low')}}
    //- 广告位
    .section-adv
        img.wid-max(src="/img/home/adv-bg.png")
        .l-upper
            p {{$t('let_your_equ_join_net')}}
            a.ic-btn-normal.i-primary(href="/user/" ) {{$t('launch_device')}}
    //- 设备，卡片列表
    .section-equipment
        .section-main
            .sec-hd
                span.l-title
                    i.v-line
                    em {{$t('equipments')}}
                .l-search
                    .search-input
                        input()
                        i.search-btn.icon-search
            ul.sec-bd
                //- li.card-I.loading(style="display:none;" data-bind="css: {'row-right': ($index()+1) % 3 == 0}, visible: loading")
                //-     i.icon-logo
                //-         span.path1
                //-         span.path2
                //-         span.path3
                //-         span.path4
                //-         span.path5
                //-         span.path6
                //-         span.path7
                //-         span.path8
                li.card-I(v-for="device in deviceList")
                    .cont_f1
                        .cont_f1_img
                            img(data-bind="attr: {src: image_url}")
                        .cont_f1_text 
                            .f1_name(data-bind="text: name")
                            p
                                label {{$t('system')}} ：
                                span(data-bind="system")
                            p
                                label {{$t('device_number')}} ：
                                span 1578698
                            p
                                label {{$t('amount')}} ：
                                span(data-bind="text: counts")
                            p
                                label {{$t('submit_date')}} ：
                                span(data-bind="text: created_at")
                    .cont_f2 {{$t('sample_integrity')}}
                    .cont_f3 
                        #scheduleX
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
                            a(item.id data-bind="attr:{href: '/download_can/'+id}")
                                i.icon-download
                                span 20
                        .look
                            i.icon-eye
                            span 20
                        .del 
                            a(href="#") {{$t('delete')}}
                        .compile
                            a(href="#") {{$t('edit')}}
            .l-toolbar
                button.ic-btn-big.i-outline-primary(style="width: 180px;" ) {{$t('load_more')}}
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import * as API from '@/api'
import _ from 'lodash'
// import "@/less/home.less";

let chart = {
    'chart1': {},
    'chart2': {}
}
var chartGrid = {
    top: '3%',
    left: '3%',
    right: '4%',
    bottom: '11%',
    containLabel: true
};

function hour24() {
    var result = []
    for (var i = 1; i < 24; i++) {
        result.push(i + '')
    }
    return result
}

function years(current) {
    var len = 3;
    var result = [];
    for (var i = current; i < current + len; i++) {
        result.push(i + '')
    }
    return result
}

var _hour24 = hour24();
var _years = years(new Date().getFullYear())
var period = { //横坐标种类
    '24h': _hour24,
    week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: _years
}
var chartsOpt1 = {
    color: '#08AEB2',
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: _hour24
    },
    grid: chartGrid,
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {},
        smooth: true
    }]
};

var chartsOpt2 = {
    color: '#08AEB2',
    xAxis: {
        type: 'category',
        data: period['24h']
    },
    grid: chartGrid,
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [10, 52, 200, 334, 390, 330, 220],
        type: 'bar'
    }]
};
var chartsOpt = {
    chartsOpt1: chartsOpt1,
    chartsOpt2: chartsOpt2
}

function initCircleChart(cls) {
    $(cls).knob({
        lineCap: 'rounded',
        readonly: true,
        displayInput: false
    });
}
export default {
    head () {
        return {
            title: "IONPartnership",
            meta: [
            // { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    asyncData({
        req
    }) {
        return {
            name: req ? 'server' : 'client',

        }
    },
    data() {
        return {
            deviceList: [],
            completedSteps: 10,
            totalSteps: 100,
            equList: [{
                    value: 50
                },
                {
                    value: 65
                },
                {
                    value: 75
                },
                {
                    value: 85
                }
            ],
            equTypeList: [{}, {}, {}, {}],
            banners: ['/img/banner/test1.png', '/img/banner/test2.png', '/img/banner/test3.png'],
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                // some swiper options...
            }
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.userinfo
        },
    },
    mounted() {
        var _this = this
        var mySwiper = new Swiper('#banner .swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
                el: '#banner .panel.swiper-pagination',
                bulletClass: 'my-bullet',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<li class="' + className + '">' +
                        '<img src="' + _this.banners[index] + '"/>' +
                        '</li>'
                },
            },
        })
        var dataSwiper = new Swiper('#section-equipment-data .swiper-container', {
            loop: true,
            slidesPerView: 4,
            // loopedSlides: 4,
            loopFillGroupWithBlank: true,
            spaceBetween: 20,
            navigation: {
                nextEl: '#section-equipment-data .eq_next',
                prevEl: '#section-equipment-data .eq_prev',
            },
        })
        this.echartsInit()
    },
    created() {
        this.getDeviceList()
    },
    methods: {
        echartsInit() {
            chart['chart1'] = echarts.init(document.getElementById('chart1'));
            chart['chart1'].setOption(chartsOpt1);
            chart['chart2'] = echarts.init(document.getElementById('chart2'));
            chart['chart2'].setOption(chartsOpt2);
        },
        changePeriod(event, num, _period) {
            console.log("num", num);
            chartsOpt[`chartsOpt${num}`].xAxis.data = period[_period]
            chart[`chart${num}`].setOption(chartsOpt[`chartsOpt${num}`]);
            $(event.target).addClass('active').siblings().removeClass('active')
        },
        getDeviceList() {
            // console.log("userinfo @", this.userinfo);
            if(!_.get(this.userinfo,'id'))return
            API.getDeviceList({
                userId: this.userinfo.id
            }).then(({data})=>{
                this.deviceList = data.data
            }).catch((err) => {
                // console.log("getDeviceList error >>>", err);
            })
        }
    }
}
</script>
<style lang="less">
    @import "../less/home.less";
</style>

