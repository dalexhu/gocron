<template>
  <el-aside width="150px">
    <el-menu
      :default-active="currentRoute"
      mode="vertical"
      background-color="#334157"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/task">
        <el-icon><Clock/></el-icon>
        <span>{{ $t('sidebar.taskCron') }}</span>
      </el-menu-item>
      <el-menu-item index="/task/log">
        <el-icon><Tickets/></el-icon>
        <span>{{ $t('sidebar.taskLog') }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'task-sidebar',
  data () {
    return {}
  },
  computed: {
    currentRoute () {
      if (this.$route.path === '/task/log') {
        return '/task/log'
      }
      return '/task'
    }
  }
}
</script>
