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
    changeTab (item) {
      this.$router.push(`/system/notification/${item.name}`)
    }
  }
}
</script>
