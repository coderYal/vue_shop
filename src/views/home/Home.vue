<template>
  <div class="home">
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      // 退出登录，清空token，跳转到首页
      localStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style>

</style>