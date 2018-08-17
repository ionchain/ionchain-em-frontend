import * as types from './mutation-types'
export default {
  [types.LOADING_COUNT_ADD](state) {
    state.loadingCount++
  },
  [types.LOADING_COUNT_MINUS](state) {
    state.loadingCount--
  },
  [types.SET_USERINFO](state, newdata) {
    state.userinfo = newdata
  }
}
