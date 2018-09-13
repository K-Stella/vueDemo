<template>
    <!-- 
      default-active: 当前激活菜单的index
      defau-openeds: 当前打开的sub-menu的index的数组
      unique-opened: 是否只保持一个子菜单的展开
      router: 是否使用vue-router模式，启用该模式会在激活导航时以index作为path进行路由跳转
      index: 唯一标志

      el-menu-item-group 组件可以实现菜单进行分组
        分组名可以通过 title 属性直接设定，也可以通过具名 slot 来设定
     -->
    <el-menu :default-openeds="['1']" unique-opened @open="handleOpen" @close="handleClose" router
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Example</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="tree">Tree</el-menu-item>
              <el-menu-item index="table">Table</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组二">
              <el-menu-item index="document">Document</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">Roles</template>
              <el-menu-item index="form">Form</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Theme</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="log">Log</el-menu-item>
              <el-menu-item index="permission">Permission</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Demo</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
             </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          
        </el-menu>

</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>

</style>
