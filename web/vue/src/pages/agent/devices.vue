<template>
  <el-main>
    <el-table :data="devices">
      <el-table-column prop="device_name" :label="$t('agent.devices.deviceNameLabel')"></el-table-column>
      <el-table-column prop="client_type" :label="$t('agent.devices.clientTypeLabel')"></el-table-column>
      <el-table-column prop="client_version" :label="$t('agent.devices.clientVersionLabel')"></el-table-column>
      <el-table-column prop="last_used_ip" :label="$t('agent.devices.lastUsedIpLabel')"></el-table-column>
      <el-table-column prop="last_used_at" :label="$t('agent.devices.lastUsedAtLabel')"></el-table-column>
      <el-table-column prop="expires_at" :label="$t('agent.devices.expiresAtLabel')"></el-table-column>
      <el-table-column :label="$t('agent.devices.statusLabel')">
        <template #default="scope">
          <el-tag v-if="scope.row.revoked_at && scope.row.revoked_at !== '0001-01-01T00:00:00Z'" type="info">{{ $t('agent.devices.statusRevoked') }}</el-tag>
          <el-tag v-else type="success">{{ $t('agent.devices.statusValid') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('agent.devices.operationLabel')" width="120">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="revoke(scope.row.device_id)">{{ $t('agent.devices.revokeBtn') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import agentService from '../../api/agent'

export default {
  data () {
    return {
      devices: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      agentService.devices((data) => {
        this.devices = data || []
      })
    },
    revoke (deviceId) {
      this.$confirm(this.$t('agent.devices.confirmRevoke'), this.$t('agent.devices.confirmTitle'), {
        type: 'warning'
      }).then(() => {
        agentService.revokeDevice(deviceId, () => {
          this.$message.success(this.$t('agent.devices.revokeSuccess'))
          this.load()
        })
      }).catch(() => {})
    }
  }
}
</script>
