// 通知默认模板的中英文版本。
// 当后端返回的模板等于某个已知默认值(说明用户未自定义)时, 前端按当前界面语言展示对应默认模板,
// 并在切换语言时同步更新; 用户一旦改动模板, 则不再自动替换(见各通知页的 watch 逻辑)。

const emailZh =
`任务ID:  {{.TaskId}}
任务名称: {{.TaskName}}
状态:    {{.Status}}
执行结果: {{.Result}}
备注: {{.Remark}}`

const emailEn =
`Task ID:    {{.TaskId}}
Task Name:  {{.TaskName}}
Status:     {{.Status}}
Result:     {{.Result}}
Remark:     {{.Remark}}`

// webhook 默认模板为 JSON(key 为英文), 语言中立, 中英文一致
const webhook =
`{
  "task_id": "{{.TaskId}}",
  "task_name": "{{.TaskName}}",
  "status": "{{.Status}}",
  "result": "{{.Result}}",
  "remark": "{{.Remark}}"
}`

export const notificationTemplates = {
  email: { 'zh-CN': emailZh, 'en': emailEn },
  slack: { 'zh-CN': emailZh, 'en': emailEn },
  webhook: { 'zh-CN': webhook, 'en': webhook }
}

// 归一化空白后比较, 容忍缩进/空格差异(后端默认模板与此处缩进未必完全一致)
function normalize (text) {
  return (text || '').replace(/\s+/g, ' ').trim()
}

// 返回当前语言对应的默认模板
export function localizedTemplate (type, locale) {
  const group = notificationTemplates[type]
  if (!group) {
    return ''
  }
  return group[locale] || group['zh-CN']
}

// 判断给定模板是否为(任意语言的)已知默认值或空, 即用户尚未自定义
export function isDefaultTemplate (type, value) {
  const n = normalize(value)
  if (n === '') {
    return true
  }
  const group = notificationTemplates[type] || {}
  return Object.keys(group).some((locale) => normalize(group[locale]) === n)
}
