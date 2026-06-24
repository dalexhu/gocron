import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

import App from './App.vue'
import router from './router/index'
import store from './store/index'
import i18n from './i18n/index'

const app = createApp(App)
const t = i18n.global.t

// 全局注册 Element Plus 图标组件 (替代 Element-UI 的 el-icon-* 字体图标)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(i18n)

// 聚焦指令 (Vue3 中 inserted -> mounted)
app.directive('focus', {
  mounted (el) {
    el.focus()
  }
})

// 全局确认弹窗 (Vue3 移除 Vue.prototype, 改用 globalProperties), 文案随语言切换
app.config.globalProperties.$appConfirm = function (callback) {
  ElMessageBox.confirm(t('common.confirmContent'), t('common.confirmTitle'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    callback()
  }).catch(() => {})
}

// 时间格式化 (Vue3 移除过滤器, 改用全局方法 $formatTime, 模板中以 $formatTime(x) 调用)
app.config.globalProperties.$formatTime = function (time) {
  const fillZero = (num) => (num >= 10 ? num : '0' + num)
  const date = new Date(time)
  const result = date.getFullYear() + '-' +
    fillZero(date.getMonth() + 1) + '-' +
    fillZero(date.getDate()) + ' ' +
    fillZero(date.getHours()) + ':' +
    fillZero(date.getMinutes()) + ':' +
    fillZero(date.getSeconds())

  if (result.indexOf('20') !== 0) {
    return ''
  }

  return result
}

app.mount('#app')
