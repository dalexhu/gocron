<template>
  <el-container>
    <system-sidebar></system-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('system.webhook.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system' }">{{ $t('system.webhook.systemManage') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('system.webhook.notificationConfig') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <notification-tab></notification-tab>
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" style="width: 700px;">
        <el-form-item :label="$t('system.webhook.url')" prop="url">
          <template #label>
            {{ $t('system.webhook.url') }}
            <el-tooltip placement="top-start">
              <template #content>
                {{ $t('system.webhook.urlTooltip') }}
              </template>
              <el-icon><QuestionFilled/></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model.trim="form.url"></el-input>
        </el-form-item>
        <el-form-item :label="$t('system.webhook.template')" prop="template">
          <el-input
            type="textarea"
            :rows="8"
            placeholder=""
            v-model.trim="form.template">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">{{ $t('system.webhook.save') }}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import systemSidebar from '../sidebar.vue'
import notificationTab from './tab.vue'
import notificationService from '../../../api/notification'
export default {
  name: 'notification-webhook',
  data () {
    return {
      form: {
        url: '',
        template: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        url: [
          {type: 'url', required: true, message: this.$t('system.webhook.urlRequired'), trigger: 'blur'}
        ],
        template: [
          {required: true, message: this.$t('system.webhook.templateRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  components: {notificationTab, systemSidebar},
  created () {
    this.init()
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.save()
      })
    },
    save () {
      notificationService.updateWebHook(this.form, () => {
        this.$message.success(this.$t('system.webhook.updateSuccess'))
        this.init()
      })
    },
    init () {
      notificationService.webhook((data) => {
        this.form.url = data.url
        this.form.template = data.template
      })
    }
  }
}
</script>
