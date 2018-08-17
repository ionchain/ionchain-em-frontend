import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    counter: 0,
    userinfo: {}
  },
  mutations
})

export default store
