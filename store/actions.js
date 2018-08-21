// import * as types from './mutation-types'
// import axios from 'axios'
// import API from '@/api'

export default {
  nuxtServerInit({ commit }, { ctx }) {
    if (ctx.session.userinfo) {
      commit('userinfo', ctx.session.userinfo)
    }
  }
}
