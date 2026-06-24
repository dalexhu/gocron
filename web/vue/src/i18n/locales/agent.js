export default {
  'zh-CN': {
    agent: {
      authorize: {
        title: 'CLI 设备授权',
        notSuperAdmin: '仅超级管理员可以授权 gocron-cli。',
        success: '授权成功，可以回到命令行继续操作。',
        confirmTip: '确认授权当前 CLI 设备访问 gocron。',
        approveBtn: '确认授权',
        codeEmpty: '授权码不能为空'
      },
      devices: {
        deviceNameLabel: '设备名',
        clientTypeLabel: '客户端',
        clientVersionLabel: '版本',
        lastUsedIpLabel: '最近 IP',
        lastUsedAtLabel: '最近使用',
        expiresAtLabel: '过期时间',
        statusLabel: '状态',
        statusRevoked: '已撤销',
        statusValid: '有效',
        operationLabel: '操作',
        revokeBtn: '撤销',
        confirmRevoke: '确认撤销该 CLI 设备授权？',
        confirmTitle: '提示',
        revokeSuccess: '已撤销'
      }
    }
  },
  en: {
    agent: {
      authorize: {
        title: 'CLI Device Authorization',
        notSuperAdmin: 'Only super administrators can authorize gocron-cli.',
        success: 'Authorization succeeded. You can return to the command line to continue.',
        confirmTip: 'Confirm authorizing the current CLI device to access gocron.',
        approveBtn: 'Confirm Authorization',
        codeEmpty: 'Authorization code cannot be empty'
      },
      devices: {
        deviceNameLabel: 'Device Name',
        clientTypeLabel: 'Client',
        clientVersionLabel: 'Version',
        lastUsedIpLabel: 'Last IP',
        lastUsedAtLabel: 'Last Used',
        expiresAtLabel: 'Expires At',
        statusLabel: 'Status',
        statusRevoked: 'Revoked',
        statusValid: 'Valid',
        operationLabel: 'Operation',
        revokeBtn: 'Revoke',
        confirmRevoke: 'Are you sure to revoke this CLI device authorization?',
        confirmTitle: 'Tip',
        revokeSuccess: 'Revoked'
      }
    }
  }
}
