<template>
  <div v-cloak>
    <el-menu
      :default-active="currentRoute"
      mode="horizontal"
      background-color="#334157"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-row>
        <el-col style="width: 150px; text-align: center;">
          <el-menu-item index="/task" style="font-size:16px;letter-spacing:2px;color:rgb(255, 208, 75)">
          <b @click="changeLogo()">{{logos[logoIndex]}}</b>
          </el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item index="/task">
            <el-icon><Menu/></el-icon>
            <span>{{ $t('nav.task') }}</span>
          </el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item index="/host">
            <el-icon><Upload/></el-icon>
            <span>{{ $t('nav.host') }}</span>
          </el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item v-if="this.$store.getters.user.isSuperAdmin" index="/user">
            <el-icon><Service/></el-icon>
            <span>{{ $t('nav.user') }}</span>
          </el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item v-if="this.$store.getters.user.isSuperAdmin" index="/agent/devices">
            <el-icon><Iphone/></el-icon>
            <span>{{ $t('nav.agent') }}</span>
          </el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item v-if="this.$store.getters.user.isSuperAdmin" index="/system">
            <el-icon><Setting/></el-icon>
            <span>{{ $t('nav.system') }}</span>
          </el-menu-item>
        </el-col>
        <el-col style="float:right; text-align:right; width:205px" >
          <el-sub-menu v-if="this.$store.getters.user.token" index="userStatus">
            <template #title>
              <span style="margin-right: 30px; font-size: 16px">{{this.$store.getters.user.username}}</span>
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
        </el-col>
        <el-col style="float:right; text-align:right; width:120px">
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
        </el-col>
      </el-row>
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
.lang-switch {
  line-height: 60px;
  height: 60px;
}
.lang-switch-trigger {
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  outline: none;
}
</style>
