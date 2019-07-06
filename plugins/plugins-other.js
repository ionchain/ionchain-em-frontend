/*eslint-disable*/
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap-grid.css'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import en from 'vee-validate/dist/locale/en'
import VueI18n from 'vue-i18n'
import Tabs from 'vue-tabs-component'
import messages from '@/locales'

Vue.use(Tabs);

// console.log("message>>>>", messages);

// VeeValidate 汉化配置
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages,
  silentFallbackWarn: true
})

const _messages = {
  mobile: (field) => `手机号码不合法`
}

Object.assign(zh_CN.messages, _messages)

VeeValidate.Validator.extend('mobile', {
  validate: value =>  /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
})

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN,
    en
  }
})

import Snotify, { SnotifyPosition } from 'vue-snotify'
const options = {
  toast: {
    position: SnotifyPosition.centerTop
  }
}

Vue.use(Snotify, options)
import 'vue-snotify/styles/material.css'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages,
    silentFallbackWarn: true
  })
  VeeValidate.configure({
    locale: store.state.locale
  });

  app.i18n.path = (link) => {
    console.log("link==================>", link)
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${link}?locale=/${app.i18n.locale}/`
  }
}

