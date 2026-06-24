<template>
  <el-dialog
    :title="$t('notFound.title')"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false">
    <el-button type="primary" @click="jump">{{ $t('notFound.confirm') }}</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    jump () {
      this.$router.push('/')
    }
  }
}
</script>
