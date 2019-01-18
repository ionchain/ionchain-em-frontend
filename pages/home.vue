<template lang="pug">
.page-home
	//- banner start
	.section-banner
		#banner.section-main
			//- no-ssr
			.viewer-box.swiper-container
				ul.swiper-wrapper
					li.b-item.swiper-slide(v-for="banner in banners")
						a(href="javascript:;")
							.ads-words 广告位招租
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
										button.ic-btn-big.i-outline-primary @@@参与投票###
			ul.panel.swiper-pagination
	//- banner end
	//- 公告 start
	.section-notice.home-section
		span @@@IONChain币总数###：
		span.f-32.bold(data-bind="text: totalIncome")
		span  IONChain
	//- 公告 end
	//- 设备 start
	.section-equipment-data#section-equipment-data
		.eq_prev.icon-left-arrow
		.section-main
			.slide-wrap(data-bind="foreach: equList")
			.card-H(v-for="item in equTypeList" data-bind="visible: name")
				.card-hd 荣耀P20 Pro手机
				.card-bd
				.l-progess
					input.dial.hide-tem(type='text' data-readOnly=true value='75' data-linecap="round" data-thickness="0.12" data-width="86" data-fgColor="#26E3E7")
					.l-num.them-em1
					span 85
					s %
				.l-info
					p.info1
					span.tip-color @@@贡献度###：
					span.bold.them-em1.font-nm 8981
					span.them-em2   IONC
					p
					span.tip-color @@@数量###：
					span 50 K
					p
					span.tip-color @@@在线时长###：
					span 9,099.00 h
		.eq_next.icon-right-arrow
	//- 数据图表
	.section-chart
	.section-main
		.box-chart.l-boxL
		.chart-hd
			span.l-tit @@@贡献曲线###
			ul.l-panel
			li.active(data-bind="click: changePeriod.bind($data,'24h')") 24h
			li(data-bind="click: changePeriod.bind($data, 'week')") @@@周###
			li(data-bind="click: changePeriod.bind($data, 'month')") @@@周###
			li(data-bind="click: changePeriod.bind($data, 'year')") @@@年###
		.chart-bd.chart1#chart1
			.error-tip-gray(style="display:none;" data-bind="visible: canvasError()")
			| @@@您的浏览器版本过低，不支持canvas，请升级浏览器，或更换支持的浏览器，如 chrome ，firefox 等，以显示完整内容###
		.box-chart.l-boxR
		.chart-hd
			span.l-tit @@@类型增长比###
			ul.l-panel
				li.active(data-bind="click: changePeriod2.bind($data,'24h')") 24h
				li(data-bind="click: changePeriod2.bind($data, 'week')") @@@周###
				li(data-bind="click: changePeriod2.bind($data, 'month')") @@@周###
				li(data-bind="click: changePeriod2.bind($data, 'year')") @@@年###
		.chart-bd.chart2#chart2
			.error-tip-gray(style="display:none;" data-bind="visible: canvasError()")
			| @@@您的浏览器版本过低，不支持canvas，请升级浏览器，或更换支持的浏览器，如 chrome ，firefox 等，以显示完整内容###
	//- 广告位
	.section-adv
	img.wid-max(src="/img/home/adv-bg.png")
	.l-upper
		p @@@让你的设备加入全球物联网###
		a.ic-btn-normal.i-primary @@@发布设备###
	//- 设备，卡片列表
	.section-equipment
	.section-main
		.sec-hd
		span.l-title
			i.v-line
			em @@@现有设备###
		.l-search
			.search-input
			input()
			i.search-btn.icon-search
		ul.sec-bd(data-bind="foreach: deviceList")
		//- each item,index in deviceLists
		//- li.card-I(class=(index + 1) % 3 == 0 ? 'row-right' : '' )
		//- <!-- ko if: $data.loading -->
		li.card-I.loading(style="display:none;" data-bind="css: {'row-right': ($index()+1) % 3 == 0}, visible: loading")
			i.icon-logo
			span.path1
			span.path2
			span.path3
			span.path4
			span.path5
			span.path6
			span.path7
			span.path8
		//- <!-- /ko -->
		//- <!-- ko if: $data.id -->
		li.card-I(style="display:none;" data-bind="css: {'row-right': ($index()+1) % 3 == 0}, visible: id")
			.cont_f1
				.cont_f1_img
				img(data-bind="attr: {src: image_url}")
				.cont_f1_text 
					.f1_name(data-bind="text: name")
					p
						label @@@系统###：
						span(data-bind="system")
					p
						label @@@设备编号###：
						span 1578698
					p
						label @@@数量###：
						span(data-bind="text: counts")
					p
						label @@@提交日期###：
						span(data-bind="text: created_at")
			.cont_f2 @@@样例完整度###
			.cont_f3 
			#scheduleX
			.cont_f4
				span.cont_f4_o @@@智能穿戴###syste
				span @@@IT科技###
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
					a(href="#") @@@删除###
				.compile
					a(href="#") @@@编辑###
		//- <!-- /ko -->     
		.l-toolbar
		button.ic-btn-big.i-outline-primary(style="width: 180px;") @@@加载更多###
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
	asyncData({ req }) {
		return {
			name: req ? 'server' : 'client',

		}
	},
	data(){
		return {
			equList: [],
			equTypeList: [{},{},{},{}],
			banners: [ '/img/banner/test1.png', '/img/banner/test2.png', '/img/banner/test3.png' ],
			swiperOption: {
				pagination: {
					el: '.swiper-pagination'
				},
				// some swiper options...
			}
		}
	},
	mounted(){
		var _this = this
		var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
				el: '.panel.swiper-pagination',
				bulletClass : 'my-bullet',
				clickable :true,
				renderBullet: function (index, className) {
					console.log(className);
					return '<li class="'+className+'">'+
						'<img src="'+ _this.banners[index] +'"/>'+
					'</li>'
				},
			},
		})
	},
	updated(){
		
	},
	head() {
		return {
			title: `About Page (${this.name}-side)`,
			script: [
				// {type:'text/javascript' ,src: '/plugins/jquery.SuperSlide.2.1.1.js', async: true, body: true}
			]
		}
	},
}
</script>

<style scoped>

</style>
