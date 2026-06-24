import { createI18n } from 'vue-i18n'

// 每个 area 模块自包含两种语言, 且使用各自独立的顶级 key (common/nav/task/...),
// 因此用浅合并即可组装出完整 messages, 便于按模块拆分维护。
import common from './locales/common'
import nav from './locales/nav'
import sidebar from './locales/sidebar'
import notFound from './locales/notFound'
import task from './locales/task'
import taskLog from './locales/taskLog'
import host from './locales/host'
import user from './locales/user'
import system from './locales/system'
import agent from './locales/agent'
import install from './locales/install'

const areas = [common, nav, sidebar, notFound, task, taskLog, host, user, system, agent, install]

function buildMessages (lang) {
  return areas.reduce((acc, mod) => Object.assign(acc, mod[lang]), {})
}

export const SUPPORT_LOCALES = ['zh-CN', 'en']

export function getLocale () {
  const saved = localStorage.getItem('locale')
  if (saved && SUPPORT_LOCALES.includes(saved)) {
    return saved
  }
  return 'zh-CN'
}

export function setLocale (locale) {
  if (!SUPPORT_LOCALES.includes(locale)) {
    return
  }
  localStorage.setItem('locale', locale)
  i18n.global.locale = locale
}

// legacy: true 保留 Options API 下的 this.$t / 模板 $t 全局注入
const i18n = createI18n({
  legacy: true,
  globalInjection: true,
  locale: getLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': buildMessages('zh-CN'),
    'en': buildMessages('en')
  }
})

export default i18n
