import * as types from './mutation-types'
// import axios from 'axios'
// import API from '@/api'

export default {
  nuxtServerInit({ commit }, { req }) {
    let pettn = new RegExp('^/login')
    if (pettn.test(req.url)) {
      commit(types.SET_IS_LOGING_PAGE, true)
    }
  }
  // 获取导航数据
  /* [types.GET_NAVIGATION]({ commit, state }, params) {
    API.navigation().then((res) => {
      if (res.data.success) {
        commit(types.UPDATE_NAVIGATION, res.data.data)
      } else {
        vm.$message({
          duration: 5000,
          type: 'warning',
          message: res.data.msg
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  } */
}
