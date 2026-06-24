<template>
  <el-container>
    <user-sidebar></user-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('user.editMyPassword.breadcrumbHome') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">{{ $t('user.editMyPassword.breadcrumbUser') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('user.editMyPassword.breadcrumbEditPassword') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" class="page-form" :model="form" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('user.editMyPassword.oldPasswordLabel')" prop="old_password">
              <el-input v-model="form.old_password" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.editMyPassword.newPasswordLabel')" prop="new_password">
              <el-input v-model="form.new_password" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.editMyPassword.confirmNewPasswordLabel')" prop="confirm_new_password">
              <el-input v-model="form.confirm_new_password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()">{{ $t('user.editMyPassword.saveBtn') }}</el-button>
              <el-button @click="cancel">{{ $t('user.editMyPassword.cancelBtn') }}</el-button>
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
  name: 'user-edit-my-password',
  data: function () {
    return {
      form: {
        old_password: '',
        new_password: '',
        confirm_new_password: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        old_password: [
          {required: true, message: this.$t('user.editMyPassword.oldPasswordRequired'), trigger: 'blur'}
        ],
        new_password: [
          {required: true, message: this.$t('user.editMyPassword.newPasswordRequired'), trigger: 'blur'}
        ],
        confirm_new_password: [
          {required: true, message: this.$t('user.editMyPassword.confirmNewPasswordRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  components: {userSidebar},
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
      userService.editMyPassword(this.form, () => {
        this.$router.back()
      })
    },
    cancel () {
      this.$router.back()
    }
  }
}
</script>
