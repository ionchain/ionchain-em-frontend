import * as types from './mutation-types'
import _ from 'lodash'
// import axios from 'axios'
// import API from '@/api'

export default {
  nuxtServerInit({ commit }, { req }) {
    let pettn = new RegExp('^/login')
    if (pettn.test(req.url)) {
      commit(types.SET_IS_LOGING_PAGE, true)
    }
    // console.log('nuxtServerInit', arguments[1])
    // console.log('nuxtServerInit###############', Object.keys(arguments[1]).join(','))
    if (req.ctx.session && req.ctx.session.userinfo) {
      commit(types.SET_USERINFO, req.ctx.session.userinfo)
    }
    if (req.ctx.session && req.ctx.session.locale) {
      commit(types.SET_LANG, req.ctx.session.locale)
    }
  },
  // 获取导航数据
  /* [types.GET_NAVIGATION]({ commit, state }, params) {
    API.navigation().then(({data}) => {
      if (data.success) {
        commit(types.UPDATE_NAVIGATION, data.data)
      } else {
        vm.$message({
          duration: 5000,
          type: 'warning',
          message: data.msg
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  } */
  [types.SET_LANG]({ commit, state }, params) {
    commit(types.SET_LANG, data.data)
  }
}
