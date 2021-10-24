<template>
  <div class="nav">
    导航栏
  </div>
  <router-view class="content" />
</template>

<style lang="less" scoped>
.nav {
  height: @headerHeight;
}
.content {
  background: red;
  height: auto;
  width: 100%;
}
</style>
