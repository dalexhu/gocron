<template>
  <el-container>
    <host-sidebar></host-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('host.edit.breadcrumbHome') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/host' }">{{ $t('host.edit.breadcrumbHost') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('host.edit.breadcrumbEdit') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" class="page-form" :model="form" :rules="formRules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-input v-model="form.id" type="hidden"></el-input>
            <el-form-item :label="$t('host.edit.aliasLabel')" prop="alias">
              <el-input v-model="form.alias"></el-input>
            </el-form-item>
            <el-form-item :label="$t('host.edit.nameLabel')" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('host.edit.portLabel')" prop="port">
              <el-input v-model.number="form.port"></el-input>
            </el-form-item>
            <el-form-item :label="$t('host.edit.remarkLabel')">
              <el-input
                type="textarea"
                :rows="5"
                size="medium"
                width="100"
                v-model="form.remark">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()">{{ $t('host.edit.saveBtn') }}</el-button>
              <el-button @click="cancel">{{ $t('host.edit.cancelBtn') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import hostSidebar from './sidebar.vue'
import hostService from '../../api/host'
export default {
  name: 'edit',
  data: function () {
    return {
      form: {
        id: '',
        name: '',
        port: 5921,
        alias: '',
        remark: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        name: [
          {required: true, message: this.$t('host.edit.nameRequired'), trigger: 'blur'}
        ],
        port: [
          {required: true, message: this.$t('host.edit.portRequired'), trigger: 'blur'},
          {type: 'number', message: this.$t('host.edit.portInvalid')}
        ],
        alias: [
          {required: true, message: this.$t('host.edit.aliasRequired'), trigger: 'blur'}
        ]
      }
    }
  },
  components: {hostSidebar},
  created () {
    const id = this.$route.params.id
    if (!id) {
      return
    }
    hostService.detail(id, (data) => {
      if (!data) {
        this.$message.error(this.$t('host.edit.notExist'))
        this.cancel()
        return
      }
      this.form.id = data.id
      this.form.name = data.name
      this.form.port = data.port
      this.form.alias = data.alias
      this.form.remark = data.remark
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
      hostService.update(this.form, () => {
        this.$router.push('/host')
      })
    },
    cancel () {
      this.$router.push('/host')
    }
  }
}
</script>
