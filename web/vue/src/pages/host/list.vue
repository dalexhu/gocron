<template>
  <el-container>
    <host-sidebar></host-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/' }">{{ $t('host.list.breadcrumbHome') }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/host' }">{{ $t('host.list.breadcrumbHost') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('host.list.breadcrumbList') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :inline="true" >
        <el-row>
          <el-form-item label="">
            <el-input :placeholder="$t('host.list.idPlaceholder')" v-model.trim="searchParams.id"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input :placeholder="$t('host.list.namePlaceholder')" v-model.trim="searchParams.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">{{ $t('host.list.searchBtn') }}</el-button>
          </el-form-item>
        </el-row>
      </el-form>

      <el-row type="flex" justify="end">
        <el-button type="primary" @click="toEdit(null)" v-if="this.$store.getters.user.isAdmin"><el-icon><Edit/></el-icon>{{ $t('host.list.createBtn') }}</el-button>
        <el-button type="info" @click="refresh"><el-icon><Refresh/></el-icon>{{ $t('host.list.refreshBtn') }}</el-button>
      </el-row>

      <el-table
        :data="hosts"
        tooltip-effect="dark"
        border
        style="width: 100%; margin: 20px 0;">
        <el-table-column
          prop="id"
          :label="$t('host.list.idLabel')">
        </el-table-column>
        <el-table-column
          prop="alias"
          :label="$t('host.list.aliasLabel')">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('host.list.nameLabel')">
        </el-table-column>
        <el-table-column
          prop="port"
          :label="$t('host.list.portLabel')">
        </el-table-column>
        <el-table-column
          prop="remark"
          :label="$t('host.list.remarkLabel')">
        </el-table-column>
        <el-table-column
          align="center"
          header-align="left"
          :label="$t('host.list.operationLabel')"
          width="180"
          v-if="this.isAdmin">
          <template #default="scope">
            <el-row>
              <el-button size="small" type="primary" @click="toEdit(scope.row)">{{ $t('host.list.editBtn') }}</el-button>
              <el-button size="small" type="success" @click="toTasks(scope.row)">{{ $t('host.list.viewTasksBtn') }}</el-button>
            </el-row>
            <br>
            <el-row>
              <el-button size="small" type="danger" @click="remove(scope.row)">{{ $t('host.list.deleteBtn') }}</el-button>
              <el-button size="small" type="info" @click="ping(scope.row)">{{ $t('host.list.pingBtn') }}</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :total="hostTotal"
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
import hostSidebar from './sidebar.vue'
import hostService from '../../api/host'
export default {
  name: 'host-list',
  data () {
    return {
      hosts: [],
      hostTotal: 0,
      searchParams: {
        page_size: 20,
        page: 1,
        id: '',
        name: '',
        alias: ''
      },
      isAdmin: this.$store.getters.user.isAdmin
    }
  },
  components: {hostSidebar},
  created () {
    this.search()
  },
  methods: {
    changePage (page) {
      this.searchParams.page = page
      this.search()
    },
    changePageSize (pageSize) {
      this.searchParams.page_size = pageSize
      this.search()
    },
    search (callback = null) {
      hostService.list(this.searchParams, (data) => {
        this.hosts = data.data
        this.hostTotal = data.total
        if (callback) {
          callback()
        }
      })
    },
    remove (item) {
      this.$appConfirm(() => {
        hostService.remove(item.id, () => this.refresh())
      })
    },
    ping (item) {
      hostService.ping(item.id, () => {
        this.$message.success(this.$t('host.list.pingSuccess'))
      })
    },
    toEdit (item) {
      let path = ''
      if (item === null) {
        path = '/host/create'
      } else {
        path = `/host/edit/${item.id}`
      }
      this.$router.push(path)
    },
    refresh () {
      this.search(() => {
        this.$message.success(this.$t('host.list.refreshSuccess'))
      })
    },
    toTasks (item) {
      this.$router.push(
        {
          path: '/task',
          query: {
            host_id: item.id
          }
        })
    }
  }
}
</script>
