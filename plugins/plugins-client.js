/*eslint-disable*/
import Vue from 'vue'
import jQuery from 'jquery'
import 'swiper/dist/css/swiper.css'
import RadialProgressBar from 'vue-radial-progress'
import echarts from 'echarts'

import { Button, Select, Option } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);

window.echarts = echarts

window.$ = window.jQuery = jQuery

// import VueAwesomeSwiper from 'vue-awesome-swiper'


// Vue.component('swiper', swiper)
// Vue.component('swiper', swiperSlide)
// Vue.use(swiper)
// Vue.use(VueAwesomeSwiper)
Vue.component('radial-progress-bar', RadialProgressBar)
