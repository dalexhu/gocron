<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane :label="$t('system.tab.email')" name="email"></el-tab-pane>
      <el-tab-pane :label="$t('system.tab.slack')" name="slack"></el-tab-pane>
      <el-tab-pane :label="$t('system.tab.webhook')" name="webhook"></el-tab-pane>
    </el-tabs>
    <pre><code style="color:darkgray">{{ $t('system.tab.templateVars') }}</code></pre>
  </div>
</template>

<script>
export default {
  name: 'notification-tab',
  data () {
    return {
      activeName: ''
    }
  },
  created () {
    const segments = this.$route.path.split('/')
    if (segments.length !== 4) {
      return 'email'
    }
    this.activeName = segments[3]
  },
  methods: {
    // 仅在用户点击标签时触发 (不会因 v-model 程序化变更而误触发, 避免路由循环)。
    // Element Plus 的 @tab-click 回传 TabsPaneContext, 名称在 paneName 上 (Element-UI 时代是 item.name)。
    changeTab (pane) {
      const name = pane && (pane.paneName || (pane.props && pane.props.name))
      if (!name || name === this.$route.path.split('/')[3]) {
        return
      }
      this.$router.push(`/system/notification/${name}`)
    }
  }
}
</script>
