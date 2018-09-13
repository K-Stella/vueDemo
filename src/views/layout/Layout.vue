<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px">
        <sidebar/>
      </el-aside>

      <el-container>
      <div class="main-container">
        <navbar/>
        <app-main/>
      </div>
      </el-container>
    </el-container>
  </div>
  
</template>

<script>
import { Navbar, AppMain, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .main-container {
    width: 100%;
  }
</style>
