<template>
  <el-container>
    <el-main>
      <el-card class="authorize-card">
        <template #header>
          <div>
            <span>{{ $t('agent.authorize.title') }}</span>
          </div>
        </template>
        <div v-if="!isSuperAdmin" class="message error">
          {{ $t('agent.authorize.notSuperAdmin') }}
        </div>
        <div v-else-if="success" class="message success">
          {{ $t('agent.authorize.success') }}
        </div>
        <div v-else>
          <p class="message">{{ $t('agent.authorize.confirmTip') }}</p>
          <el-button type="primary" :loading="loading" @click="approve">{{ $t('agent.authorize.approveBtn') }}</el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import agentService from '../../api/agent'
import userStorage from '../../storage/user'

export default {
  data () {
    return {
      loading: false,
      success: false
    }
  },
  computed: {
    isSuperAdmin () {
      return userStorage.getIsSuperAdmin()
    },
    userCode () {
      return this.$route.query.user_code || ''
    }
  },
  methods: {
    approve () {
      if (!this.userCode) {
        this.$message.error(this.$t('agent.authorize.codeEmpty'))
        return
      }
      this.loading = true
      agentService.approveDevice(this.userCode, () => {
        this.success = true
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.authorize-card {
  width: 420px;
  margin: 80px auto;
}
.message {
  color: #385879;
  line-height: 1.6;
}
.error {
  color: #f56c6c;
}
.success {
  color: #67c23a;
}
</style>
