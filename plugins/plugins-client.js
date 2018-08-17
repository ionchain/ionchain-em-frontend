/*eslint-disable*/
import Vue from 'vue'
// import vDialogs from 'v-dialogs'
// Vue.use(vDialogs)

import Snotify, { SnotifyPosition } from 'vue-snotify'
const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

// Vue.use(Snotify, options)
Vue.use(Snotify)