<template>
<el-container>
  <task-sidebar></task-sidebar>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $t('task.list.breadcrumbHome') }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/task' }">{{ $t('task.list.breadcrumbTask') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('task.list.breadcrumbCron') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" >
      <el-row>
        <el-form-item label="">
          <el-input :placeholder="$t('task.list.idPlaceholder')" v-model.trim="searchParams.id"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input :placeholder="$t('task.list.namePlaceholder')" v-model.trim="searchParams.name"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input :placeholder="$t('task.list.commandPlaceholder')" v-model.trim="searchParams.command"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input :placeholder="$t('task.list.tagPlaceholder')" v-model.trim="searchParams.tag"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model.trim="searchParams.protocol">
            <el-option :label="$t('task.list.protocolPlaceholder')" value=""></el-option>
            <el-option
              v-for="item in protocolList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model.trim="searchParams.host_id">
            <el-option :label="$t('task.list.hostPlaceholder')" value=""></el-option>
            <el-option
              v-for="item in hosts"
              :key="item.id"
              :label="item.alias + ' - ' + item.name + ':' + item.port "
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model.trim="searchParams.status">
            <el-option :label="$t('task.list.statusPlaceholder')" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()"><el-icon><Search/></el-icon>{{ $t('task.list.searchBtn') }}</el-button>
          <el-button type="info" @click="resetSearch()"><el-icon><CircleClose/></el-icon>{{ $t('task.list.resetBtn') }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row type="flex" justify="end">
        <el-button type="primary" @click="toEdit(null)" v-if="this.$store.getters.user.isAdmin"><el-icon><Edit/></el-icon>{{ $t('task.list.addBtn') }}</el-button>
        <el-button type="info" @click="refresh"><el-icon><Refresh/></el-icon>{{ $t('task.list.refreshBtn') }}</el-button>
    </el-row>
    <el-table
      :data="tasks"
      tooltip-effect="dark"
      border
      show-header
      style="width: 100%; margin: 20px 0;">
      <el-table-column type="expand">
        <template #default="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item :label="$t('task.list.createdLabel')">
              {{$formatTime(scope.row.created)}} <br>
            </el-form-item>
            <el-form-item :label="$t('task.list.levelLabel')">
              {{formatLevel(scope.row.level)}} <br>
            </el-form-item>
            <el-form-item :label="$t('task.list.multiLabel')">
               {{formatMulti(scope.row.multi)}} <br>
            </el-form-item>
            <el-form-item :label="$t('task.list.timeoutLabel')">
              {{formatTimeout(scope.row.timeout)}} <br>
            </el-form-item>
            <el-form-item :label="$t('task.list.retryTimesLabel')">
              {{scope.row.retry_times}} <br>
            </el-form-item>
            <el-form-item :label="$t('task.list.retryIntervalLabel')">
              {{formatRetryTimesInterval(scope.row.retry_interval)}}
            </el-form-item> <br>
            <el-form-item :label="$t('task.list.hostsLabel')">
              <div v-for="item in scope.row.hosts" :key="item.host_id">
                {{item.alias}} - {{item.name}}:{{item.port}} <br>
              </div>
            </el-form-item> <br>
            <el-form-item :label="$t('task.list.commandLabel')" style="width: 100%">
              {{scope.row.command}}
            </el-form-item> <br>
            <el-form-item :label="$t('task.list.remarkLabel')" style="width: 100%">
              {{scope.row.remark}}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        :label="$t('task.list.idLabel')" width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('task.list.nameLabel')" style="width: 30%">
      </el-table-column>
      <el-table-column
        prop="tag"
        :label="$t('task.list.tagLabel')" width="200">
        <template #default="scope">
          <el-button size="mini" class="box-shadow-not" type="success" plain @click="toTasksByTag(scope.row)" v-if="scope.row.tag">{{scope.row.tag}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="spec"
        :label="$t('task.list.specLabel')"
      width="200">
      </el-table-column>
      <el-table-column :label="$t('task.list.nextRunTimeLabel')" width="200">
        <template #default="scope">
          {{$formatTime(scope.row.next_run_time)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="protocol"
        :formatter="formatProtocol"
        :label="$t('task.list.protocolLabel')" width="100">
      </el-table-column>
      <el-table-column
        :label="$t('task.list.statusLabel')" width="100" v-if="this.isAdmin" >
          <template #default="scope">
            <el-switch
              v-if="scope.row.level === 1"
              v-model="scope.row.status"
              :active-value="1"
              :inactive-vlaue="0"
              active-color="#13ce66"
              @change="changeStatus(scope.row)"
              :disabled="!checkAuth(scope.row)"
              inactive-color="#ff4949">
            </el-switch>
          </template>
      </el-table-column>
      <el-table-column :label="$t('task.list.statusLabel')" width="100" v-else>
        <template #default="scope">
          <el-switch
            v-if="scope.row.level === 1"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-vlaue="0"
            active-color="#13ce66"
            :disabled="true"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="left"
        :label="$t('task.list.operationLabel')"
        width="180"
        v-if="this.isAdmin">
        <template #default="scope">
          <el-row>
            <el-button type="primary" size="small" @click="toEdit(scope.row)" :disabled="!checkAuth(scope.row)">{{ $t('task.list.editBtn') }}</el-button>
            <el-button type="success" size="small" @click="runTask(scope.row)" :disabled="!checkAuth(scope.row)">{{ $t('task.list.runBtn') }}</el-button>
          </el-row>
          <br>
          <el-row>
            <el-button type="danger" size="small" @click="remove(scope.row)" :disabled="!checkAuth(scope.row)">{{ $t('task.list.deleteBtn') }}</el-button>
            <el-button type="info" size="small" @click="jumpToLog(scope.row)">{{ $t('task.list.viewLogBtn') }}</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :total="taskTotal"
        :page-size="20"
        @size-change="changePageSize"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage">
      </el-pagination>
    </el-row>
  </el-main>
</el-container>
</template>

<script>
import taskSidebar from './sidebar.vue'
import taskService from '../../api/task'

export default {
  name: 'task-list',
  data () {
    return {
      tasks: [],
      hosts: [],
      taskTotal: 0,
      searchParams: {
        page_size: 20,
        page: 1,
        id: '',
        protocol: '',
        name: '',
        tag: '',
        host_id: '',
        status: '',
        command: ''
      },
      isAdmin: this.$store.getters.user.isAdmin
    }
  },
  components: {taskSidebar},
  computed: {
    protocolList () {
      return [
        {
          value: '1',
          label: 'http'
        },
        {
          value: '2',
          label: 'shell'
        }
      ]
    },
    statusList () {
      return [
        {
          value: '2',
          label: this.$t('task.list.statusActive')
        },
        {
          value: '1',
          label: this.$t('task.list.statusStopped')
        }
      ]
    }
  },
  created () {
    const hostId = this.$route.query.host_id
    if (hostId) {
      this.searchParams.host_id = hostId
    }

    this.search()
  },
  methods: {
    formatLevel (value) {
      if (value === 1) {
        return this.$t('task.list.levelMain')
      }
      return this.$t('task.list.levelSub')
    },
    formatTimeout (value) {
      if (value > 0) {
        return value + this.$t('task.list.timeoutUnit')
      }
      return this.$t('task.list.timeoutUnlimited')
    },
    formatRetryTimesInterval (value) {
      if (value > 0) {
        return value + this.$t('task.list.retryIntervalUnit')
      }
      return this.$t('task.list.retryIntervalDefault')
    },
    formatMulti (value) {
      if (value > 0) {
        return this.$t('task.list.multiNo')
      }
      return this.$t('task.list.multiYes')
    },
    changeStatus (item) {
      if (item.status) {
        taskService.enable(item.id)
      } else {
        taskService.disable(item.id)
      }
    },
    formatProtocol (row, col) {
      if (row[col.property] === 2) {
        return 'shell'
      }
      if (row.http_method === 1) {
        return 'http-get'
      }
      return 'http-post'
    },
    changePage (page) {
      this.searchParams.page = page
      this.search()
    },
    changePageSize (pageSize) {
      this.searchParams.page_size = pageSize
      this.search()
    },
    resetSearch () {
      this.searchParams = this.$options.data.call(this).searchParams
      this.search()
    },
    search (callback = null) {
      taskService.list(this.searchParams, (tasks, hosts) => {
        this.tasks = tasks.data
        this.taskTotal = tasks.total
        this.hosts = hosts
        if (callback) {
          callback()
        }
      })
    },
    runTask (item) {
      this.$appConfirm(() => {
        taskService.run(item.id, () => {
          this.$message.success(this.$t('task.list.runSuccess'))
        })
      }, true)
    },
    remove (item) {
      this.$appConfirm(() => {
        taskService.remove(item.id, () => {
          this.refresh()
        })
      })
    },
    jumpToLog (item) {
      this.$router.push(`/task/log?task_id=${item.id}`)
    },
    refresh () {
      this.search(() => {
        this.$message.success(this.$t('task.list.refreshSuccess'))
      })
    },
    checkAuth (item) {
      return item.creater === 0 || this.$store.getters.user.isSuperAdmin || item.creater === parseInt(this.$store.getters.user.uid)
    },
    toEdit (item) {
      let path = ''
      if (item === null) {
        path = '/task/create'
      } else {
        path = `/task/edit/${item.id}`
      }
      this.$router.push(path)
    },
    toTasksByTag (item) {
      this.searchParams.tag = item.tag
      this.search()
    }
  }
}
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
