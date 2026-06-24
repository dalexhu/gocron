<template>
  <el-container>
    <system-sidebar></system-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('system.loginLog.home') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/system' }">{{ $t('system.loginLog.systemManage') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('system.loginLog.loginLog') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
        :data="logs"
        border
        ref="table"
        style="width: 100%; margin-bottom: 20px;">
        <el-table-column
          prop="id"
          :label="$t('system.loginLog.id')">
        </el-table-column>
        <el-table-column
          prop="username"
          :label="$t('system.loginLog.username')">
        </el-table-column>
        <el-table-column
          prop="ip"
          :label="$t('system.loginLog.loginIp')">
        </el-table-column>
        <el-table-column
          :label="$t('system.loginLog.loginTime')"
          width="">
          <template #default="scope">
            {{$formatTime(scope.row.created)}}
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
    </el-main>
  </el-container>
</template>

<script>
import systemSidebar from './sidebar.vue'
import systemService from '../../api/system'
export default {
  name: 'login-log',
  data () {
    return {
      logs: [],
      logTotal: 0,
      searchParams: {
        page_size: 20,
        page: 1
      }
    }
  },
  created () {
    this.search()
  },
  components: {systemSidebar},
  methods: {
    changePage (page) {
      this.searchParams.page = page
      this.search()
    },
    changePageSize (pageSize) {
      this.searchParams.page_size = pageSize
      this.search()
    },
    search () {
      systemService.loginLogList(this.searchParams, (data) => {
        this.logs = data.data
        this.logTotal = data.total
      })
    }
  }
}
</script>
