<template>
  <div v-cloak>
    <el-menu
      :default-active="currentRoute"
      mode="horizontal"
      :ellipsis="false"
      background-color="#334157"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <div class="nav-logo" @click="changeLogo()">{{logos[logoIndex]}}</div>
      <el-menu-item index="/task">
        <el-icon><Menu/></el-icon>
        <span>{{ $t('nav.task') }}</span>
      </el-menu-item>
      <el-menu-item index="/host">
        <el-icon><Upload/></el-icon>
        <span>{{ $t('nav.host') }}</span>
      </el-menu-item>
      <el-menu-item v-if="isSuperAdmin" index="/user">
        <el-icon><Service/></el-icon>
        <span>{{ $t('nav.user') }}</span>
      </el-menu-item>
      <el-menu-item v-if="isSuperAdmin" index="/agent/devices">
        <el-icon><Iphone/></el-icon>
        <span>{{ $t('nav.agent') }}</span>
      </el-menu-item>
      <el-menu-item v-if="isSuperAdmin" index="/system">
        <el-icon><Setting/></el-icon>
        <span>{{ $t('nav.system') }}</span>
      </el-menu-item>

      <!-- flex 占位, 把后面的语言切换和用户菜单推到最右 -->
      <div class="nav-spacer"></div>

      <el-dropdown trigger="click" class="lang-switch" @command="switchLanguage">
        <span class="lang-switch-trigger">
          {{ currentLangLabel }}<el-icon class="el-icon--right"><ArrowDown/></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh-CN" :disabled="$i18n.locale === 'zh-CN'">中文</el-dropdown-item>
            <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-sub-menu v-if="token" index="userStatus">
        <template #title>
          <span style="font-size: 16px">{{ username }}</span>
        </template>
        <el-menu-item index="/user/edit-my-password">
          <el-icon><EditPen/></el-icon>
          <span>{{ $t('nav.changePassword') }}</span>
        </el-menu-item>
        <el-menu-item @click="logout" index="/user/logout">
          <el-icon><CircleClose/></el-icon>
          <span>{{ $t('nav.logout') }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { setLocale } from '../../i18n/index'

export default {
  name: 'app-nav-menu',
  data () {
    return {
      logos: ['🅖⚆🅒🅡🅞🅝', 'Ⓖ🅞Ⓒ🅡Ⓞ🅝', '🅖➲🅒🅡🅞🅝', '🅶OCRON'],
      logoIndex: 0
    }
  },
  computed: {
    isSuperAdmin () {
      return this.$store.getters.user.isSuperAdmin
    },
    token () {
      return this.$store.getters.user.token
    },
    username () {
      return this.$store.getters.user.username
    },
    currentRoute () {
      if (this.$route.path === '/') {
        return '/task'
      }
      const segments = this.$route.path.split('/')
      return `/${segments[1]}`
    },
    currentLangLabel () {
      return this.$i18n.locale === 'en' ? 'English' : '中文'
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    },
    changeLogo () {
      this.logoIndex = this.logoIndex === (this.logos.length - 1) ? 0 : this.logoIndex + 1
    },
    switchLanguage (lang) {
      setLocale(lang)
    }
  }
}
</script>

<style scoped>
.nav-logo {
  width: 150px;
  text-align: center;
  line-height: 60px;
  height: 60px;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: bold;
  color: rgb(255, 208, 75);
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
}
.nav-spacer {
  flex-grow: 1;
}
.lang-switch {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 16px;
  flex-shrink: 0;
}
.lang-switch-trigger {
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  outline: none;
}
</style>
