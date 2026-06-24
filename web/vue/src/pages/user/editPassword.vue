<template>
  <el-container>
    <user-sidebar></user-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('user.editPassword.breadcrumbHome') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">{{ $t('user.editPassword.breadcrumbUser') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('user.editPassword.breadcrumbEditPassword') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" class="page-form" :model="form" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('user.editPassword.newPasswordLabel')" prop="new_password">
              <el-input v-model="form.new_password" type="password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('user.editPassword.confirmNewPasswordLabel')" prop="confirm_new_password">
              <el-input v-model="form.confirm_new_password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()">{{ $t('user.editPassword.saveBtn') }}</el-button>
              <el-button @click="cancel">{{ $t('user.editPassword.cancelBtn') }}</el-button>
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
  name: 'user-edit-password',
  data: function () {
    return {
      form: {
        id: '',
        new_password: '',
        confirm_new_password: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        new_password: [
          {required: true, message: this.$t('user.editPassword.newPasswordRequired'), trigger: 'blur'}
        ],
        confirm_new_password: [
          {required: true, message: this.$t('user.editPassword.confirmNewPasswordRequired'), trigger: 'blur'}
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
    this.form.id = id
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
      userService.editPassword(this.form, () => {
        this.$router.push('/user')
      })
    },
    cancel () {
      this.$router.push('/user')
    }
  }
}
</script>
