import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
require('whatwg-fetch')

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    counter: 0,
    userinfo: {},
    isLoginPage: false,
    routeName: '',
    locale: 'zh_CN',
    locales: ['zh_CN','en']
  },
  mutations,
  actions
})

export default store
