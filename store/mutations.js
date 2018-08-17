import * as types from './mutation-types'
export default {
  [types.LOADING_COUNT_ADD](state) {
    state.loadingCount++
  },
  [types.LOADING_COUNT_MINUS](state) {
    state.loadingCount--
  },
  [types.SET_appState](state, newData) {
    _.merge(state.appState, newData)
    localStorage.setItem('appState', JSON.stringify(_.merge({}, state.appState, newData)))
  }
}
