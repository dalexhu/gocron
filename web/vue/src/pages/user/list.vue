<template>
  <el-container>
    <user-sidebar></user-sidebar>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('user.list.breadcrumbHome') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user' }">{{ $t('user.list.breadcrumbUser') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('user.list.breadcrumbList') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="toEdit(null)" v-if="this.$store.getters.user.isSuperAdmin"><el-icon><Edit/></el-icon>{{ $t('user.list.addBtn') }}</el-button>
        <el-button type="info" @click="refresh"><el-icon><Refresh/></el-icon>{{ $t('user.list.refreshBtn') }}</el-button>
      </el-row>

      <el-table
        :data="users"
        tooltip-effect="dark"
        border
        style="width: 100%; margin: 20px 0;">
        <el-table-column
          prop="id"
          :label="$t('user.list.idLabel')"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('user.list.nameLabel')">
        </el-table-column>
        <el-table-column
          prop="email"
          :label="$t('user.list.emailLabel')">
        </el-table-column>
        <el-table-column
          prop="is_admin"
          :formatter="formatRole"
          :label="$t('user.list.roleLabel')">
        </el-table-column>
        <el-table-column
          :label="$t('user.list.statusLabel')">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-vlaue="0"
              active-color="#13ce66"
              @change="changeStatus(scope.row)"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="left"
          :label="$t('user.list.operationLabel')"
          width="250"
          v-if="this.isSuperAdmin">
          <template #default="scope">
            <el-row>
              <el-button size="small" type="primary" @click="toEdit(scope.row)">{{ $t('user.list.editBtn') }}</el-button>
              <el-button size="small" type="success" @click="editPassword(scope.row)">{{ $t('user.list.editPasswordBtn') }}</el-button>
              <el-button size="small" type="danger" @click="remove(scope.row)">{{ $t('user.list.deleteBtn') }}</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total"
          :total="userTotal"
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
import userSidebar from './sidebar.vue'
import userService from '../../api/user'
export default {
  name: 'user-list',
  data () {
    return {
      users: [],
      userTotal: 0,
      searchParams: {
        page_size: 20,
        page: 1
      },
      isSuperAdmin: this.$store.getters.user.isSuperAdmin
    }
  },
  components: {userSidebar},
  created () {
    this.search()
  },
  methods: {
    changeStatus (item) {
      if (item.status) {
        userService.enable(item.id)
      } else {
        userService.disable(item.id)
      }
    },
    formatRole (row, col) {
      if (row[col.property] === 2) {
        return this.$t('user.list.roleSuperAdmin')
      } else if (row[col.property] === 1) {
        return this.$t('user.list.roleAdmin')
      } else {
        return this.$t('user.list.roleNormal')
      }
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
      userService.list(this.searchParams, (data) => {
        this.users = data.data
        this.userTotal = data.total
        if (callback) {
          callback()
        }
      })
    },
    remove (item) {
      this.$appConfirm(() => {
        userService.remove(item.id, () => {
          this.refresh()
        })
      })
    },
    toEdit (item) {
      let path = ''
      if (item === null) {
        path = '/user/create'
      } else {
        path = `/user/edit/${item.id}`
      }
      this.$router.push(path)
    },
    refresh () {
      this.search(() => {
        this.$message.success(this.$t('user.list.refreshSuccess'))
      })
    },
    editPassword (item) {
      this.$router.push(`/user/edit-password/${item.id}`)
    }
  }
}
</script>
