export default {
  'zh-CN': {
    system: {
      email: {
        home: '首页',
        systemManage: '系统管理',
        notificationConfig: '通知配置',
        serverConfigTitle: '邮件服务器配置',
        smtpHost: 'SMTP服务器',
        port: '端口',
        username: '用户名',
        password: '密码',
        template: '模板',
        templateTooltip: '通知模板支持html',
        save: '保存',
        notificationUser: '通知用户',
        emailAddress: '邮箱地址',
        confirm: '确 定',
        hostRequired: '请输入邮件服务器地址',
        portRequired: '请输入有效的端口',
        userRequired: '请输入用户email',
        passwordRequired: '请输入密码',
        templateRequired: '请输入通知模板内容',
        paramsIncomplete: '参数不完整',
        updateSuccess: '更新成功'
      },
      slack: {
        home: '首页',
        systemManage: '系统管理',
        notificationConfig: '通知配置',
        webhookUrl: 'Slack Webhook URL',
        template: '模板',
        save: '保存',
        channel: 'Channel',
        channelName: 'Channel名称',
        confirm: '确 定',
        urlRequired: '请输入有效的通知URL',
        templateRequired: '请输入通知模板',
        channelRequired: '请输入Channel名称',
        updateSuccess: '更新成功'
      },
      webhook: {
        home: '首页',
        systemManage: '系统管理',
        notificationConfig: '通知配置',
        url: 'URL',
        urlTooltip: '通知内容推送到指定URL, POST请求, 设置Header [Content-Type: application/json]',
        template: '模板',
        save: '保存',
        urlRequired: '请输入有效的通知URL',
        templateRequired: '请输入通知模板',
        updateSuccess: '更新成功'
      },
      tab: {
        email: '邮件',
        slack: 'Slack',
        webhook: 'Webhook',
        templateVars: `通知模板支持的变量：

        TaskId   任务ID
        TaskName 任务名称
        Status   任务执行结果状态
        Result   任务执行输出`
      },
      loginLog: {
        home: '首页',
        systemManage: '系统管理',
        loginLog: '登录日志',
        id: 'ID',
        username: '用户名',
        loginIp: '登录IP',
        loginTime: '登录时间'
      }
    }
  },
  en: {
    system: {
      email: {
        home: 'Home',
        systemManage: 'System',
        notificationConfig: 'Notification',
        serverConfigTitle: 'Mail Server Configuration',
        smtpHost: 'SMTP Host',
        port: 'Port',
        username: 'Username',
        password: 'Password',
        template: 'Template',
        templateTooltip: 'The notification template supports HTML',
        save: 'Save',
        notificationUser: 'Recipients',
        emailAddress: 'Email Address',
        confirm: 'OK',
        hostRequired: 'Please enter the mail server address',
        portRequired: 'Please enter a valid port',
        userRequired: 'Please enter the user email',
        passwordRequired: 'Please enter the password',
        templateRequired: 'Please enter the notification template content',
        paramsIncomplete: 'Incomplete parameters',
        updateSuccess: 'Updated successfully'
      },
      slack: {
        home: 'Home',
        systemManage: 'System',
        notificationConfig: 'Notification',
        webhookUrl: 'Slack Webhook URL',
        template: 'Template',
        save: 'Save',
        channel: 'Channel',
        channelName: 'Channel Name',
        confirm: 'OK',
        urlRequired: 'Please enter a valid notification URL',
        templateRequired: 'Please enter the notification template',
        channelRequired: 'Please enter the channel name',
        updateSuccess: 'Updated successfully'
      },
      webhook: {
        home: 'Home',
        systemManage: 'System',
        notificationConfig: 'Notification',
        url: 'URL',
        urlTooltip: 'The notification content is pushed to the specified URL via a POST request with the header [Content-Type: application/json]',
        template: 'Template',
        save: 'Save',
        urlRequired: 'Please enter a valid notification URL',
        templateRequired: 'Please enter the notification template',
        updateSuccess: 'Updated successfully'
      },
      tab: {
        email: 'Email',
        slack: 'Slack',
        webhook: 'Webhook',
        templateVars: `Variables supported by the notification template:

        TaskId   Task ID
        TaskName Task name
        Status   Task execution result status
        Result   Task execution output`
      },
      loginLog: {
        home: 'Home',
        systemManage: 'System',
        loginLog: 'Login Log',
        id: 'ID',
        username: 'Username',
        loginIp: 'Login IP',
        loginTime: 'Login Time'
      }
    }
  }
}
