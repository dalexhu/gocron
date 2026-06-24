<template>
  <el-container>
    <task-sidebar></task-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('taskLog.list.breadcrumbHome') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/task' }">{{ $t('taskLog.list.breadcrumbTask') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('taskLog.list.breadcrumbLog') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :inline="true" >
        <el-form-item label="">
          <el-input :placeholder="$t('taskLog.list.taskIdPlaceholder')" v-model.trim="searchParams.task_id"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model.trim="searchParams.protocol" :placeholder="$t('taskLog.list.protocolPlaceholder')">
            <el-option :label="$t('taskLog.list.protocolSelect')" value=""></el-option>
            <el-option
            v-for="item in protocolList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model.trim="searchParams.status">
            <el-option :label="$t('taskLog.list.statusSelect')" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()"><el-icon><Search/></el-icon>{{ $t('taskLog.list.searchBtn') }}</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
          <el-button type="danger" v-if="this.$store.getters.user.isSuperAdmin" @click="clearLog"><el-icon><Delete/></el-icon>{{ $t('taskLog.list.clearLogBtn') }}</el-button>
          <el-button type="info" @click="refresh"><el-icon><Refresh/></el-icon>{{ $t('taskLog.list.refreshBtn') }}</el-button>
      </el-row>
      <el-table
        :data="logs"
        border
        ref="table"
        style="width: 100%; margin: 20px 0;">
        <el-table-column type="expand">
          <template #default="scope">
            <el-form label-position="left">
              <el-form-item>
                  {{ $t('taskLog.list.retryTimes') }}: {{scope.row.retry_times}} <br>
                  {{ $t('taskLog.list.cronExpr') }}: {{scope.row.spec}} <br>
                  {{ $t('taskLog.list.command') }}: {{scope.row.command}}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="$t('taskLog.list.idLabel')"
          width="100">
        </el-table-column>
        <el-table-column
          prop="task_id"
          :label="$t('taskLog.list.taskIdLabel')"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('taskLog.list.nameLabel')">
        </el-table-column>
        <el-table-column
          prop="protocol"
          :label="$t('taskLog.list.protocolLabel')"
          :formatter="formatProtocol"
          width="100">
        </el-table-column>
        <el-table-column
          :label="$t('taskLog.list.nodeLabel')"
          width="150">
          <template #default="scope">
            <div v-html="scope.row.hostname"></div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('taskLog.list.durationLabel')"
          width="250">
          <template #default="scope">
            {{ $t('taskLog.list.duration') }}: {{scope.row.total_time > 0 ? scope.row.total_time : 1}}{{ $t('taskLog.list.seconds') }}<br>
            {{ $t('taskLog.list.startTime') }}: {{$formatTime(scope.row.start_time)}}<br>
            <span v-if="scope.row.status !== 1">{{ $t('taskLog.list.endTime') }}: {{$formatTime(scope.row.end_time)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('taskLog.list.statusLabel')"
          width="100"
          align="center"
          >
          <template #default="scope">
            <span v-if="scope.row.status === 0">
              <el-tag type="danger">{{ $t('taskLog.list.statusFailed') }}</el-tag>
            </span>
            <span v-else-if="scope.row.status === 1">
              <el-tag>{{ $t('taskLog.list.statusRunning') }}</el-tag>
            </span>
            <span v-else-if="scope.row.status === 2">
              <el-tag type="success">{{ $t('taskLog.list.statusSuccess') }}</el-tag>
            </span>
            <span v-else-if="scope.row.status === 3">
              <el-tag type="info">{{ $t('taskLog.list.statusCancelled') }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('taskLog.list.operationLabel')"
          align="center"
          header-align="left"
          width="110" v-if="this.isAdmin">
          <template #default="scope">
            <el-button size="small" type="success"
                       v-if="scope.row.status === 2"
                       @click="showTaskResult(scope.row)">{{ $t('taskLog.list.viewResultBtn') }}</el-button>
            <el-button size="small" type="warning"
                       v-if="scope.row.status === 0"
                       @click="showTaskResult(scope.row)" >{{ $t('taskLog.list.viewResultBtn') }}</el-button>
            <el-button size="small" type="danger"
                       v-if="scope.row.status === 1 && scope.row.protocol === 2"
                       @click="stopTask(scope.row)">{{ $t('taskLog.list.stopTaskBtn') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('taskLog.list.resultLabel')"
          width="102" v-else>
          <template #default="scope">
            <el-button size="small" type="success"
                       v-if="scope.row.status === 2"
                       @click="showTaskResult(scope.row)">{{ $t('taskLog.list.viewResultBtn') }}</el-button>
            <el-button size="small" type="warning"
                       v-if="scope.row.status === 0"
                       @click="showTaskResult(scope.row)" >{{ $t('taskLog.list.viewResultBtn') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :total="logTotal"
          :page-size="20"
          @size-change="changePageSize"
          @current-change="changePage"
          @prev-click="changePage"
          @next-click="changePage">
        </el-pagination>
      </el-row>
      <el-dialog
        v-model="dialogVisible"
        width="70%">
        <div>
          <pre>{{currentTaskResult.command}}</pre>
        </div>
        <div>
          <pre>{{currentTaskResult.result}}</pre>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import taskSidebar from '../task/sidebar.vue'
import taskLogService from '../../api/taskLog'

export default {
  name: 'task-log',
  data () {
    return {
      logs: [],
      logTotal: 0,
      searchParams: {
        page_size: 20,
        page: 1,
        task_id: '',
        protocol: '',
        status: ''
      },
      isAdmin: this.$store.getters.user.isAdmin,
      dialogVisible: false,
      currentTaskResult: {
        command: '',
        result: ''
      },
      protocolList: [
        {
          value: '1',
          label: 'http'
        },
        {
          value: '2',
          label: 'shell'
        }
      ]
    }
  },
  components: {taskSidebar},
  computed: {
    statusList () {
      return [
        {
          value: '1',
          label: this.$t('taskLog.list.statusFailed')
        },
        {
          value: '2',
          label: this.$t('taskLog.list.statusRunning')
        },
        {
          value: '3',
          label: this.$t('taskLog.list.statusSuccess')
        },
        {
          value: '4',
          label: this.$t('taskLog.list.statusCancelled')
        }
      ]
    }
  },
  created () {
    if (this.$route.query.task_id) {
      this.searchParams.task_id = this.$route.query.task_id
    }
    this.search()
  },
  methods: {
    formatProtocol (row, col) {
      if (row[col.property] === 1) {
        return 'http'
      }
      return 'shell'
    },
    changePage (page) {
      this.searchParams.page = page
      this.search()
    },
    changePageSize (pageSize) {
      this.searchParams.page_size = pageSize
      this.search()
    },
    search (callback = null) {
      taskLogService.list(this.searchParams, (data) => {
        this.logs = data.data
        this.logTotal = data.total

        if (callback) {
          callback()
        }
      })
    },
    clearLog () {
      this.$appConfirm(() => {
        taskLogService.clear(() => {
          this.searchParams.page = 1
          this.search()
        })
      })
    },
    stopTask (item) {
      taskLogService.stop(item.id, item.task_id, () => {
        this.search()
      })
    },
    showTaskResult (item) {
      this.dialogVisible = true
      this.currentTaskResult.command = item.command
      this.currentTaskResult.result = item.result
    },
    refresh () {
      this.search(() => {
        this.$message.success(this.$t('taskLog.list.refreshSuccess'))
      })
    }
  }
}
</script>
<style scoped>
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 10px;
    background-color: #334157;
    color: white;
    border-radius: 2px;
  }
</style>
