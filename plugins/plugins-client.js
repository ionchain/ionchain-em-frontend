/*eslint-disable*/
import Vue from 'vue'
import jQuery from 'jquery'
import 'swiper/dist/css/swiper.css'
import RadialProgressBar from 'vue-radial-progress'
import echarts from 'echarts'
import vSelect from 'vue-select'
window.echarts = echarts

window.$ = window.jQuery = jQuery

// import VueAwesomeSwiper from 'vue-awesome-swiper'


// Vue.component('swiper', swiper)
// Vue.component('swiper', swiperSlide)
// Vue.use(swiper)
// Vue.use(VueAwesomeSwiper)
Vue.component('radial-progress-bar', RadialProgressBar)
Vue.component('v-select', vSelect)
