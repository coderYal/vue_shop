<template>
  <div id="app">
    <!--    挂载组件，路由占位符，路由切换时，切换的是router-view挂载的组件，其它内容不变化-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
