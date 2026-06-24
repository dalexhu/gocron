<template>
    <div>
      <el-dialog
        :title="$t('user.login.title')"
        v-model="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        :close-on-press-escape="false"
        width="40%">
        <el-form ref="form" :model="form" label-width="80px"
        :rules="formRules">
          <el-form-item :label="$t('user.login.usernameLabel')" prop="username" >
            <el-col :span="16">
              <el-input v-model.trim="form.username"
                        :placeholder="$t('user.login.usernamePlaceholder')">
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('user.login.passwordLabel')" prop="password">
            <el-col :span="16">
              <el-input v-model.trim="form.password" type="password" :placeholder="$t('user.login.passwordPlaceholder')"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">{{ $t('user.login.loginBtn') }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
import userServcie from '../../api/user'

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      dialogVisible: true
    }
  },
  computed: {
    formRules () {
      return {
        username: [
          {required: true, message: this.$t('user.login.usernameRequired'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('user.login.passwordRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.login()
      })
    },
    login () {
      userServcie.login(this.form.username, this.form.password, (data) => {
        this.$store.commit('setUser', {
          token: data.token,
          uid: data.uid,
          username: data.username,
          isAdmin: data.is_admin
        })
        this.$router.push(this.$route.query.redirect || '/')
      })
    }
  }
}
</script>
