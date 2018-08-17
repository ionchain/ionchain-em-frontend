import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    counter: 0,
    userinfo: {}
  },
  actions,
  mutations,
  getters
})

export default store