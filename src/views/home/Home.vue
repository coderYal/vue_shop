<template>
  <div class="home">
    <el-container>
      <el-header>
        <div>
          <img src="" alt="" />
          <span>后台管理</span>
        </div>
        <div><el-button @click="logout">退出</el-button></div>
      </el-header>
      <el-container>
        <el-aside :width="collapse ? '60px' : '200px'">
          <div class="menuZd" @click="menuZdClick">|||</div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            unique-opened
            router
            :collapse="collapse"
            :collapse-transition=false
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in menysList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group
                v-for="itemChid in item.children"
                :key="itemChid.id"
              >
                <el-menu-item :index="'/' + itemChid.path">
                  <i class="el-icon-location"></i>
                  <span>{{ itemChid.authName }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menus } from '@/network/home'

export default {
  name: 'Home',
  data() {
    return {
      menysList: [],
      collapse: false
    }
  },
  created() {
    this.menusList()
  },
  methods: {
    logout() {
      // 退出登录，清空token，跳转到首页
      localStorage.clear()
      this.$router.replace('/login')
    },
    // 左侧列表数据请求
    async menusList() {
      const res = await menus()
      if (res.meta.status === 200) {
        this.menysList = res.data
      }
    },
    menuZdClick() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: pink;
  }
  .menuZd {
    color: #fff;
    background: #ade7ff;
    text-align: center;
    cursor: pointer;
  }
}
</style>