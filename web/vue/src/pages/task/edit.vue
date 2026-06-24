<template>
  <el-container>
    <task-sidebar></task-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('task.edit.breadcrumbHome') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/task' }">{{ $t('task.edit.breadcrumbTask') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('task.edit.breadcrumbEdit') }}</el-breadcrumb-item>
     </el-breadcrumb>
      <el-form ref="form" class="page-form" :model="form" :rules="formRules" label-width="180px">
        <el-input v-model="form.id" type="hidden"></el-input>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.nameLabel')" prop="name">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item :label="$t('task.edit.levelLabel')">
              <template #label>
                {{ $t('task.edit.levelLabel') }}
                <el-tooltip placement="top">
                  <template #content>
                    {{ $t('task.edit.levelTooltip') }}
                  </template>
                  <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
              </template>
              <el-select v-model.trim="form.level" :disabled="form.id !== ''">
                <el-option
                  v-for="item in levelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" v-if="form.level === 1">
            <el-form-item :label="$t('task.edit.dependencyLabel')">
              <template #label>
                {{ $t('task.edit.dependencyLabel') }}
                <el-tooltip placement="top">
                  <template #content>
                    <span v-html="$t('task.edit.dependencyTooltip')"></span>
                  </template>
                  <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
              </template>
              <el-select v-model.trim="form.dependency_status">
                <el-option
                  v-for="item in dependencyStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('task.edit.tagLabel')">
              <el-input
                v-model.trim="form.tag"
                :placeholder="$t('task.edit.tagPlaceholder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.subTaskIdLabel')" v-if="form.level === 1">
              <el-input
                v-model.trim="form.dependency_task_id"
                :placeholder="$t('task.edit.subTaskIdPlaceholder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" style="margin-left: 180px;">
            <el-icon style="color: #909399;"><Clock/></el-icon>
            <el-button
              style="color: #909399;"
              class="box-shadow-not"
              type="text"
              v-for="(item, index) in specOptions"
              :key="index"
              @click="specSelect(item.value)"
              >{{ item.label }}</el-button
            >
          </el-col>
        </el-row>
        <el-row v-if="form.level === 1">
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.specLabel')" prop="spec">
              <el-input
                v-model.trim="form.spec"
                :placeholder="$t('task.edit.specPlaceholder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('task.edit.protocolLabel')">
              <el-select v-model.trim="form.protocol">
                <el-option
                  v-for="item in protocolList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" v-if="form.protocol === 1">
            <el-form-item :label="$t('task.edit.httpMethodLabel')">
              <el-select key="http-method" v-model.trim="form.http_method">
                <el-option
                  v-for="item in httpMethods"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="8" v-else>
            <el-form-item :label="$t('task.edit.hostLabel')">
              <el-select
                key="shell"
                v-model="selectedHosts"
                filterable
                multiple
                :placeholder="$t('task.edit.selectPlaceholder')"
              >
                <el-option
                  v-for="item in hosts"
                  :key="item.id"
                  :label="item.alias + ' - ' + item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('task.edit.multiLabel')">
              <template #label>
                {{ $t('task.edit.multiLabel') }}
                <el-tooltip placement="top">
                  <template #content>
                    {{ $t('task.edit.multiTooltip') }}
                  </template>
                  <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
              </template>
              <el-select v-model.trim="form.multi">
                <el-option
                  v-for="item in runStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.commandLabel')" prop="command">
              <el-input
                type="textarea"
                :rows="5"
                size="medium"
                width="100"
                :placeholder="commandPlaceholder"
                v-model="form.command"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.timeoutLabel')" prop="timeout">
              <template #label>
                {{ $t('task.edit.timeoutLabel') }}
                <el-tooltip placement="top">
                  <template #content>
                    {{ $t('task.edit.timeoutTooltip') }}
                  </template>
                  <el-icon><QuestionFilled/></el-icon>
                </el-tooltip>
              </template>
              <el-input v-model.number.trim="form.timeout"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.retryTimesLabel')" prop="retry_times">
              <el-input
                v-model.number.trim="form.retry_times"
                :placeholder="$t('task.edit.retryTimesPlaceholder')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.retryIntervalLabel')" prop="retry_interval">
              <el-input
                v-model.number.trim="form.retry_interval"
                :placeholder="$t('task.edit.retryIntervalPlaceholder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.statusLabel')">
              <el-switch
                v-model="form.status"
                :active-value="1"
                :inactive-vlaue="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('task.edit.notifyStatusLabel')">
              <el-select v-model.trim="form.notify_status">
                <el-option
                  v-for="item in notifyStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.notify_status !== 1">
            <el-form-item :label="$t('task.edit.notifyTypeLabel')">
              <el-select v-model.trim="form.notify_type">
                <el-option
                  v-for="item in notifyTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            v-if="form.notify_status !== 1 && form.notify_type === 2"
          >
            <el-form-item :label="$t('task.edit.mailReceiverLabel')">
              <el-select
                key="notify-mail"
                v-model="selectedMailNotifyIds"
                filterable
                multiple
                :placeholder="$t('task.edit.selectPlaceholder')"
              >
                <el-option
                  v-for="item in mailUsers"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :span="8"
            v-if="form.notify_status !== 1 && form.notify_type === 3"
          >
            <el-form-item :label="$t('task.edit.slackChannelLabel')">
              <el-select
                key="notify-slack"
                v-model="selectedSlackNotifyIds"
                filterable
                multiple
                :placeholder="$t('task.edit.selectPlaceholder')"
              >
                <el-option
                  v-for="item in slackChannels"
                  :key="item.id"
                  :label="item.name"
                  selected="true"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.notify_status === 4">
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.notifyKeywordLabel')" prop="notify_keyword">
              <el-input
                v-model.trim="form.notify_keyword"
                :placeholder="$t('task.edit.notifyKeywordPlaceholder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item :label="$t('task.edit.remarkLabel')">
              <el-input
                type="textarea"
                :rows="3"
                size="medium"
                width="100"
                v-model="form.remark"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submit">{{ $t('task.edit.saveBtn') }}</el-button>
          <el-button @click="cancel">{{ $t('task.edit.cancelBtn') }}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import taskSidebar from './sidebar.vue'
import taskService from '../../api/task'
import notificationService from '../../api/notification'

export default {
  name: 'task-edit',
  data () {
    return {
      form: {
        id: '',
        name: '',
        tag: '',
        level: 1,
        dependency_status: 1,
        dependency_task_id: '',
        spec: '',
        protocol: 2,
        http_method: 1,
        command: '',
        host_id: '',
        timeout: 0,
        multi: 2,
        notify_status: 1,
        notify_type: 2,
        notify_receiver_id: '',
        notify_keyword: '',
        retry_times: 0,
        retry_interval: 0,
        status: 1,
        remark: ''
      },
      httpMethods: [
        {
          value: 1,
          label: 'get'
        },
        {
          value: 2,
          label: 'post'
        }
      ],
      protocolList: [
        {
          value: 1,
          label: 'http'
        },
        {
          value: 2,
          label: 'shell'
        }
      ],
      hosts: [],
      mailUsers: [],
      slackChannels: [],
      selectedHosts: [],
      selectedMailNotifyIds: [],
      selectedSlackNotifyIds: []
    }
  },
  computed: {
    formRules () {
      return {
        name: [
          {required: true, message: this.$t('task.edit.ruleName'), trigger: 'blur'}
        ],
        spec: [
          {required: true, message: this.$t('task.edit.ruleSpec'), trigger: 'blur'}
        ],
        command: [
          {required: true, message: this.$t('task.edit.ruleCommand'), trigger: 'blur'}
        ],
        timeout: [
          {
            type: 'number',
            required: true,
            message: this.$t('task.edit.ruleTimeout'),
            trigger: 'blur'
          }
        ],
        retry_times: [
          {
            type: 'number',
            required: true,
            message: this.$t('task.edit.ruleRetryTimes'),
            trigger: 'blur'
          }
        ],
        retry_interval: [
          {
            type: 'number',
            required: true,
            message: this.$t('task.edit.ruleRetryInterval'),
            trigger: 'blur'
          }
        ],
        notify_keyword: [
          {
            required: true,
            message: this.$t('task.edit.ruleNotifyKeyword'),
            trigger: 'blur'
          }
        ]
      }
    },
    levelList () {
      return [
        {
          value: 1,
          label: this.$t('task.edit.levelMain')
        },
        {
          value: 2,
          label: this.$t('task.edit.levelSub')
        }
      ]
    },
    dependencyStatusList () {
      return [
        {
          value: 1,
          label: this.$t('task.edit.dependencyStrong')
        },
        {
          value: 2,
          label: this.$t('task.edit.dependencyWeak')
        }
      ]
    },
    runStatusList () {
      return [
        {
          value: 2,
          label: this.$t('task.edit.multiYes')
        },
        {
          value: 1,
          label: this.$t('task.edit.multiNo')
        }
      ]
    },
    notifyStatusList () {
      return [
        {
          value: 1,
          label: this.$t('task.edit.notifyNone')
        },
        {
          value: 2,
          label: this.$t('task.edit.notifyFail')
        },
        {
          value: 3,
          label: this.$t('task.edit.notifyAlways')
        },
        {
          value: 4,
          label: this.$t('task.edit.notifyKeyword')
        }
      ]
    },
    notifyTypes () {
      return [
        {
          value: 2,
          label: this.$t('task.edit.notifyTypeMail')
        },
        {
          value: 3,
          label: this.$t('task.edit.notifyTypeSlack')
        },
        {
          value: 4,
          label: this.$t('task.edit.notifyTypeWebhook')
        }
      ]
    },
    specOptions () {
      return [
        {
          value: '0 * * * * *',
          label: this.$t('task.edit.specEveryMinute')
        },
        {
          value: '0 */5 * * * *',
          label: this.$t('task.edit.specEvery5Minutes')
        },
        {
          value: '0 0 * * * *',
          label: this.$t('task.edit.specEveryHour')
        },
        {
          value: '0 0 0 * * *',
          label: this.$t('task.edit.specEveryDay')
        },
        {
          value: '0 0 0 * * 1',
          label: this.$t('task.edit.specEveryMonday')
        },
        {
          value: '0 0 0 1 * *',
          label: this.$t('task.edit.specEveryMonth')
        }
      ]
    },
    commandPlaceholder () {
      if (this.form.protocol === 1) {
        return this.$t('task.edit.commandUrlPlaceholder')
      }

      return this.$t('task.edit.commandShellPlaceholder')
    }
  },
  components: {taskSidebar},
  created () {
    const id = this.$route.params.id

    taskService.detail(id, (taskData, hosts) => {
      if (id && !taskData) {
        this.$message.error(this.$t('task.edit.dataNotExist'))
        this.cancel()
        return
      }
      this.hosts = hosts || []
      if (!taskData) {
        return
      }
      this.form.id = taskData.id
      this.form.name = taskData.name
      this.form.tag = taskData.tag
      this.form.level = taskData.level
      if (taskData.dependency_status) {
        this.form.dependency_status = taskData.dependency_status
      }
      this.form.dependency_task_id = taskData.dependency_task_id
      this.form.spec = taskData.spec
      this.form.protocol = taskData.protocol
      if (taskData.http_method) {
        this.form.http_method = taskData.http_method
      }
      this.form.command = taskData.command
      this.form.timeout = taskData.timeout
      this.form.multi = taskData.multi ? 1 : 2
      this.form.notify_keyword = taskData.notify_keyword
      this.form.notify_status = taskData.notify_status + 1
      this.form.status = taskData.status
      this.form.notify_receiver_id = taskData.notify_receiver_id
      if (taskData.notify_type) {
        this.form.notify_type = taskData.notify_type + 1
      }
      this.form.retry_times = taskData.retry_times
      this.form.retry_interval = taskData.retry_interval
      this.form.remark = taskData.remark
      taskData.hosts = taskData.hosts || []
      if (this.form.protocol === 2) {
        taskData.hosts.forEach((v) => {
          this.selectedHosts.push(v.host_id)
        })
      }

      if (this.form.notify_status > 1) {
        const notifyReceiverIds = this.form.notify_receiver_id.split(',')
        if (this.form.notify_type === 2) {
          notifyReceiverIds.forEach((v) => {
            this.selectedMailNotifyIds.push(parseInt(v))
          })
        } else if (this.form.notify_type === 3) {
          notifyReceiverIds.forEach((v) => {
            this.selectedSlackNotifyIds.push(parseInt(v))
          })
        }
      }
    })

    notificationService.mail((data) => {
      this.mailUsers = data.mail_users
    })

    notificationService.slack((data) => {
      this.slackChannels = data.channels
    })
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.form.protocol === 2 && this.selectedHosts.length === 0) {
          this.$message.error(this.$t('task.edit.selectHost'))
          return false
        }
        if (this.form.notify_status > 1) {
          if (
            this.form.notify_type === 2 &&
            this.selectedMailNotifyIds.length === 0
          ) {
            this.$message.error(this.$t('task.edit.selectMailReceiver'))
            return false
          }
          if (
            this.form.notify_type === 3 &&
            this.selectedSlackNotifyIds.length === 0
          ) {
            this.$message.error(this.$t('task.edit.selectSlackChannel'))
            return false
          }
        }

        this.save()
      })
    },
    save () {
      if (this.form.protocol === 2 && this.selectedHosts.length > 0) {
        this.form.host_id = this.selectedHosts.join(',')
      }
      if (this.form.notify_status > 1 && this.form.notify_type === 2) {
        this.form.notify_receiver_id = this.selectedMailNotifyIds.join(',')
      }
      if (this.form.notify_status > 1 && this.form.notify_type === 3) {
        this.form.notify_receiver_id = this.selectedSlackNotifyIds.join(',')
      }

      this.form.status = this.form.status ? 1 : 0

      taskService.update(this.form, () => {
        this.$router.push('/task')
      })
    },
    cancel () {
      this.$router.push('/task')
    },
    specSelect (spec) {
      this.form.spec = spec
    }
  }
}
</script>
