<template>
  <el-container>
    <system-sidebar></system-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('system.slack.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system' }">{{ $t('system.slack.systemManage') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('system.slack.notificationConfig') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <notification-tab></notification-tab>
      <el-form ref="form" :model="form" :rules="formRules" label-width="180px" style="width: 700px;">
        <el-form-item :label="$t('system.slack.webhookUrl')" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item :label="$t('system.slack.template')" prop="template">
          <el-input
            type="textarea"
            :rows="8"
            placeholder=""
            size="medium"
            v-model="form.template">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{ $t('system.slack.save') }}</el-button>
        </el-form-item>
        <h3>{{ $t('system.slack.channel') }} &nbsp;&nbsp;&nbsp;<el-button type="primary" size="mini" plain @click="createChannel"><el-icon><Plus/></el-icon></el-button></h3>
        <el-tag
          v-for="item in channels"
          :key="item.id"
          closable
          @close="deleteChannel(item)"
        >
          {{item.name}}
        </el-tag>
      </el-form>
      <el-dialog
        title=""
        v-model="dialogVisible"
        width="30%">
        <el-form :model="form">
          <el-form-item :label="$t('system.slack.channelName')" >
            <el-input v-model.trim="channel" v-focus></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveChannel">{{ $t('system.slack.confirm') }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import systemSidebar from '../sidebar.vue'
import notificationTab from './tab.vue'
import notificationService from '../../../api/notification'
import { localizedTemplate, isDefaultTemplate } from '../../../i18n/templates'
export default {
  name: 'notification-slack',
  data () {
    return {
      dialogVisible: false,
      form: {
        url: '',
        template: ''
      },
      // 模板是否仍为默认值(未被用户自定义), 是则跟随界面语言切换
      templateIsDefault: true,
      channels: [],
      channel: ''
    }
  },
  watch: {
    '$i18n.locale' () {
      if (this.templateIsDefault) {
        this.form.template = localizedTemplate('slack', this.$i18n.locale)
      }
    },
    'form.template' (val) {
      this.templateIsDefault = isDefaultTemplate('slack', val)
    }
  },
  computed: {
    formRules () {
      return {
        url: [
          {type: 'url', required: true, message: this.$t('system.slack.urlRequired'), trigger: 'blur'}
        ],
        template: [
          {required: true, message: this.$t('system.slack.templateRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  components: {notificationTab, systemSidebar},
  created () {
    this.init()
  },
  methods: {
    createChannel () {
      this.dialogVisible = true
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.save()
      })
    },
    save () {
      notificationService.updateSlack(this.form, () => {
        this.$message.success(this.$t('system.slack.updateSuccess'))
        this.init()
      })
    },
    saveChannel () {
      if (this.channel === '') {
        this.$message.error(this.$t('system.slack.channelRequired'))
        return
      }
      notificationService.createSlackChannel(this.channel, () => {
        this.dialogVisible = false
        this.init()
      })
    },
    deleteChannel (item) {
      notificationService.removeSlackChannel(item.id, () => {
        this.init()
      })
    },
    init () {
      this.channel = ''
      notificationService.slack((data) => {
        this.form.url = data.url
        if (isDefaultTemplate('slack', data.template)) {
          this.form.template = localizedTemplate('slack', this.$i18n.locale)
        } else {
          this.form.template = data.template
        }
        this.channels = data.channels
      })
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
