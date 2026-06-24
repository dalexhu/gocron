<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="form" :rules="formRules" label-width="100px" style="width: 700px;">
        <h3>{{ $t('install.dbConfigTitle') }}</h3>
        <el-form-item :label="$t('install.dbTypeLabel')" prop="db_type">
          <el-select v-model.trim="form.db_type" @change="update_port">
            <el-option
              v-for="item in dbList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('install.dbHostLabel')" prop="db_host">
              <el-input v-model="form.db_host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('install.dbPortLabel')" prop="db_port">
              <el-input v-model.number="form.db_port"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('install.dbUsernameLabel')" prop="db_username">
              <el-input v-model="form.db_username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('install.dbPasswordLabel')" prop="db_password">
              <el-input v-model="form.db_password" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('install.dbNameLabel')" prop="db_name">
              <el-input v-model="form.db_name" :placeholder="$t('install.dbNamePlaceholder')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('install.dbTablePrefixLabel')" prop="db_table_prefix">
              <el-input v-model="form.db_table_prefix"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('install.adminConfigTitle') }}</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('install.adminUsernameLabel')" prop="admin_username">
              <el-input v-model="form.admin_username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('install.adminEmailLabel')" prop="admin_email">
              <el-input v-model="form.admin_email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('install.adminPasswordLabel')" prop="admin_password">
              <el-input v-model="form.admin_password" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('install.confirmAdminPasswordLabel')" prop="confirm_admin_password">
              <el-input v-model="form.confirm_admin_password" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submit()">{{ $t('install.installBtn') }}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import installService from '../../api/install'
export default {
  name: 'index',
  data () {
    return {
      form: {
        db_type: 'mysql',
        db_host: '127.0.0.1',
        db_port: 3306,
        db_username: '',
        db_password: '',
        db_name: '',
        db_table_prefix: '',
        admin_username: '',
        admin_password: '',
        confirm_admin_password: '',
        admin_email: ''
      },
      dbList: [
        {
          value: 'mysql',
          label: 'MySQL'
        },
        {
          value: 'postgres',
          label: 'PostgreSql'
        }
      ],
      default_ports: {
        'mysql': 3306,
        'postgres': 5432
      }
    }
  },
  computed: {
    formRules () {
      return {
        db_type: [
          {required: true, message: this.$t('install.dbTypeRequired'), trigger: 'blur'}
        ],
        db_host: [
          {required: true, message: this.$t('install.dbHostRequired'), trigger: 'blur'}
        ],
        db_port: [
          {type: 'number', required: true, message: this.$t('install.dbPortRequired'), trigger: 'blur'}
        ],
        db_username: [
          {required: true, message: this.$t('install.dbUsernameRequired'), trigger: 'blur'}
        ],
        db_password: [
          {required: true, message: this.$t('install.dbPasswordRequired'), trigger: 'blur'}
        ],
        db_name: [
          {required: true, message: this.$t('install.dbNameRequired'), trigger: 'blur'}
        ],
        admin_username: [
          {required: true, message: this.$t('install.adminUsernameRequired'), trigger: 'blur'}
        ],
        admin_email: [
          {type: 'email', required: true, message: this.$t('install.adminEmailRequired'), trigger: 'blur'}
        ],
        admin_password: [
          {required: true, message: this.$t('install.adminPasswordRequired'), trigger: 'blur'},
          {min: 6, message: this.$t('install.passwordMinLength'), trigger: 'blur'}
        ],
        confirm_admin_password: [
          {required: true, message: this.$t('install.confirmAdminPasswordRequired'), trigger: 'blur'},
          {min: 6, message: this.$t('install.passwordMinLength'), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    update_port (dbType) {
      console.log(dbType)
      console.log(this.default_ports[dbType])
      this.form['db_port'] = this.default_ports[dbType]
      console.log(this.form['db_port'])
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
      installService.store(this.form, () => {
        this.$router.push('/')
      })
    }
  }
}
</script>
