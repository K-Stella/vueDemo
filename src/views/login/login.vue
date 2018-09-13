<template>
    <div class="login-container">
        <!-- 
            label-position: 表单域标签的位置
            model: 表单数据对象
            rules: 表单验证规则
            'v-bind' 缩写 ':' 用于动态绑定多个特性
            'v-on' 缩写 '@'
         -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">{{loginForm.title}}</h3>
            </div>
        <!-- 
          使用prop后才可以正常传递数据
         -->
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <!-- <svg-icon icon-class="user" /> -->
          </span>
            <el-input
                v-model="loginForm.username"
                :placeholder="loginForm.username"
                name="username"
                type="text"
                auto-complete="true"
            />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
          </span>
            <el-input
                v-model="loginForm.password"
                :placeholder="loginForm.password"
                name="password"
                type="password"
                auto-complete="true"
            />
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Log in</el-button>

        <el-button class="thirdparty-button" :loading="loading" type="primary" @click="showDialog=true">Thirdparty</el-button>
        </el-form>

        <!-- 对话框 -->
        <el-dialog title="Thirdparty" :visible.sync="showDialog" append-to-body>
          Can not be simulated on local, so please combine you own business simulation! ! ! 
          <br>
          <br>
          <br>
          <social-sign />
        </el-dialog>
    </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import SocialSign from './socialsignin'
import { getQueryObject } from '@/utils/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 采用正则表达式获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

export default {
    name: 'Login',
    components: { SocialSign },
    data() {
      const validateUsername = (rule, value, callback) => {
        console.log(value)
        if (!isvalidUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else 
        {
          callback()
        }
      }
      return {
        loginForm: {
          title: 'Login From',
            username: 'admin',
            password: '111111'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        // 等待属性
        loading: false,
        showDialog: false
      }
    },
    created() {
      console.log('created')
      window.addEventListener('urlchange', this.afterGithub())
      // this.afterGithub()
    },
    
    methods: {
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true   
              const token = getToken()
              console.log('wewrw:', getToken())
              
              if (token === undefined){
                // 分发接口
                this.$store.dispatch('LoginByusername', this.loginForm).then( response => {
                  this.loading = false
                  // console.log(response)
                  // 登陆成功后跳转到主页面
                  this.$router.push({ path: '/' })
                })
              } else {
                console.log('thirdParty')
                this.$router.push({ path: '/' })
              }
            } else {
              console.log('input error')
              return false
            }
          })  
        },
        afterGithub() {
          console.log('github')
          const code = GetQueryString('code')
          
          // console.log('code:', code) 

          // 为了重写url，使code得以隐藏（因为执行速度快，所以可以隐藏code值，但如果网络不好，还是会暴露）
          const hash = window.location.hash.slice(1)
          const hashObj = getQueryObject(hash)
          const originUrl = window.location.origin
          history.replaceState({}, '', originUrl)
          
          if (code !=null) {
            this.$store.dispatch('LoginByThirdparty',code).then(response => {
              // console.log(response.data)
              console.log(getToken())
              // this.$router.push({ path: '/' })
            })
          }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
  }
}
</style>
