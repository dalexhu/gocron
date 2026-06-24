<template>
  <el-container>
    <system-sidebar></system-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('system.email.home') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system' }">{{ $t('system.email.systemManage') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('system.email.notificationConfig') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <notification-tab></notification-tab>
      <el-form ref="form" :model="form" :rules="formRules" label-width="150px" style="width: 800px;">
        <h3>{{ $t('system.email.serverConfigTitle') }}</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('system.email.smtpHost')" prop="host">
              <el-input v-model="form.host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.email.port')" prop="port">
              <el-input v-model.number="form.port"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('system.email.username')" prop="user">
              <el-input v-model="form.user"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('system.email.password')" prop="password">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="$t('system.email.template')" prop="template">
          <template #label>
            {{ $t('system.email.template') }}
            <el-tooltip placement="top">
              <template #content>
                {{ $t('system.email.templateTooltip') }}
              </template>
              <el-icon><QuestionFilled/></el-icon>
            </el-tooltip>
          </template>
          <el-input
            type="textarea"
            :rows="6"
            placeholder=""
            v-model="form.template">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">{{ $t('system.email.save') }}</el-button>
        </el-form-item>
        <br>
        <h3>{{ $t('system.email.notificationUser') }} &nbsp;&nbsp;&nbsp;<el-button type="primary" size="mini" plain @click="createUser"><el-icon><Plus/></el-icon></el-button></h3>
        <el-tag
          v-for="item in receivers"
          :key="item.email"
          closable
          @close="deleteUser(item)">
          {{item.username}} - {{item.email}}
        </el-tag>
      </el-form>
      <el-dialog
        title=""
        v-model="dialogVisible"
        width="30%">
        <el-form :model="form">
          <el-form-item :label="$t('system.email.username')" >
            <el-input v-model.trim="username"></el-input>
          </el-form-item>
          <el-form-item :label="$t('system.email.emailAddress')" >
            <el-input v-model.trim="email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveUser">{{ $t('system.email.confirm') }}</el-button>
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
export default {
  name: 'notification-email',
  data () {
    return {
      form: {
        host: '',
        port: 465,
        user: '',
        password: '',
        template: ''
      },
      receivers: [],
      username: '',
      email: '',
      dialogVisible: false
    }
  },
  computed: {
    formRules () {
      return {
        host: [
          {required: true, message: this.$t('system.email.hostRequired'), trigger: 'blur'}
        ],
        port: [
          {type: 'number', required: true, message: this.$t('system.email.portRequired'), trigger: 'blur'}
        ],
        user: [
          {required: true, message: this.$t('system.email.userRequired'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('system.email.passwordRequired'), trigger: 'blur'}
        ],
        template: [
          {required: true, message: this.$t('system.email.templateRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  components: {notificationTab, systemSidebar},
  created () {
    this.init()
  },
  methods: {
    createUser () {
      this.dialogVisible = true
    },
    saveUser () {
      if (this.username === '' || this.email === '') {
        this.$message.error(this.$t('system.email.paramsIncomplete'))
        return
      }
      notificationService.createMailUser({
        username: this.username,
        email: this.email
      }, () => {
        this.dialogVisible = false
        this.init()
      })
    },
    deleteUser (item) {
      notificationService.removeMailUser(item.id, () => {
        this.init()
      })
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
      notificationService.updateMail(this.form, () => {
        this.$message.success(this.$t('system.email.updateSuccess'))
        this.init()
      })
    },
    init () {
      this.username = ''
      this.email = ''
      notificationService.mail((data) => {
        this.form.host = data.host
        if (data.port) {
          this.form.port = data.port
        }
        this.form.user = data.user
        this.form.password = data.password
        this.form.template = data.template
        this.receivers = data.mail_users
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
