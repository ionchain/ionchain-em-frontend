/*eslint-disable*/
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n'
import Tabs from 'vue-tabs-component'
Vue.use(Tabs);

// VeeValidate 汉化配置
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN'
})

const messages = {
  mobile: (field) => `手机号码不合法`
}


Object.assign(zh_CN.messages, messages)

VeeValidate.Validator.extend('mobile', {
  validate: value =>  /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
})

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
})
