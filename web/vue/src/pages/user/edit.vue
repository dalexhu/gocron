<template>
  <el-container>
    <user-sidebar></user-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('user.edit.breadcrumbHome') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">{{ $t('user.edit.breadcrumbUser') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('user.edit.breadcrumbEdit') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" class="page-form" :model="form" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-input v-model="form.id" type="hidden"></el-input>
            <el-form-item :label="$t('user.edit.nameLabel')" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.edit.emailLabel')" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <template v-if="!form.id">
              <el-form-item :label="$t('user.edit.passwordLabel')" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item :label="$t('user.edit.confirmPasswordLabel')" prop="confirm_password">
                <el-input v-model="form.confirm_password" type="password"></el-input>
              </el-form-item>
            </template>
            <el-form-item :label="$t('user.edit.roleLabel')" prop="is_admin">
              <el-radio-group v-model="form.is_admin">
                <el-radio :label="0">
                  {{ $t('user.edit.roleNormal') }}
                  <el-tooltip placement="top">
                    <template #content>
                      <div>
                        {{ $t('user.edit.permissionSummary') }}<br/><br/>
                        {{ $t('user.edit.permViewAllTasksLogs') }}
                      </div>
                    </template>
                    <el-icon><QuestionFilled/></el-icon>
                  </el-tooltip>
                </el-radio>
                <el-radio :label="1">
                  {{ $t('user.edit.roleAdmin') }}
                  <el-tooltip placement="top">
                    <template #content>
                      <div>
                        {{ $t('user.edit.permissionSummary') }}<br/><br/>
                        {{ $t('user.edit.permViewAllTasksLogs') }}<br/>
                        {{ $t('user.edit.permManageOwnTasks') }}
                      </div>
                    </template>
                    <el-icon><QuestionFilled/></el-icon>
                  </el-tooltip>
                </el-radio>
                <el-radio :label="2">
                  {{ $t('user.edit.roleSuperAdmin') }}
                  <el-tooltip placement="top">
                    <template #content>
                      <div>
                        {{ $t('user.edit.permissionSummary') }}<br/><br/>
                        {{ $t('user.edit.permManageAllTasksLogs') }}<br/>
                        {{ $t('user.edit.permUserManage') }}<br/>
                        {{ $t('user.edit.permSystemManage') }}
                      </div>
                    </template>
                    <el-icon><QuestionFilled/></el-icon>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('user.edit.statusLabel')" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">{{ $t('user.edit.statusEnable') }}</el-radio>
                <el-radio :label="0">{{ $t('user.edit.statusDisable') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()">{{ $t('user.edit.saveBtn') }}</el-button>
              <el-button @click="cancel">{{ $t('user.edit.cancelBtn') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import userSidebar from './sidebar.vue'
import userService from '../../api/user'
export default {
  name: 'user-edit',
  data: function () {
    return {
      form: {
        id: '',
        name: '',
        email: '',
        is_admin: 0,
        password: '',
        confirm_password: '',
        status: 1
      }
    }
  },
  computed: {
    formRules () {
      return {
        name: [
          {required: true, message: this.$t('user.edit.nameRequired'), trigger: 'blur'}
        ],
        email: [
          {type: 'email', required: true, message: this.$t('user.edit.emailRequired'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('user.edit.passwordRequired'), trigger: 'blur'}
        ],
        confirm_password: [
          {required: true, message: this.$t('user.edit.confirmPasswordRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  components: {userSidebar},
  created () {
    const id = this.$route.params.id
    if (!id) {
      return
    }
    userService.detail(id, (data) => {
      if (!data) {
        this.$message.error(this.$t('user.edit.dataNotExist'))
        return
      }
      this.form.id = data.id
      this.form.name = data.name
      this.form.email = data.email
      this.form.is_admin = data.is_admin
      this.form.status = data.status
    })
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
      userService.update(this.form, () => {
        this.$router.push('/user')
      })
    },
    cancel () {
      this.$router.push('/user')
    }
  }
}
</script>
