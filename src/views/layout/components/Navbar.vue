<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <h3>navbar</h3> -->
    <!-- 下拉菜单 -->
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <!-- 通过slot为dropdown来设置下拉菜单 -->
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlinkBlock" to='/'>
        <!-- 下拉选项 -->
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navbar',
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        console.log('logout')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

