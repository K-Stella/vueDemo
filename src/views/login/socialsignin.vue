<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon"/></span> 微信
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon"/></span> QQ
    </div>
    <div class="sign-btn" @click="githubHandleClick('github')">
      <span class="github-svg-container"><svg-icon icon-class="github" class="icon"/></span> Github
    </div>
  </div>
</template>


<script>
import openWindow from '@/utils/openWindow'

export default {
    name: 'SocialSignin',
      methods: {
    wechatHandleClick(thirdpart) {
        console.log(thirdpart)
        this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const appid = 'xxxxx'
        const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect')
        const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
        openWindow(url, thirdpart, 540, 540)
    },
    tencentHandleClick(thirdpart) {
        console.log(thirdpart)
        this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const client_id = 'xxxxx'
        const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect')
        const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        openWindow(url, thirdpart, 540, 540)
    },
    githubHandleClick(thirdpart) {
        console.log(thirdpart)
        this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const client_id = '856266c32571042e52d7'
        console.log('location:', window.location.origin)
        const redirect_uri = encodeURIComponent(window.location.origin + '/authredirect')
        const url = 'https://github.com/login/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri
        // const redirect_uri = encodeURIComponent('http://localhost:8080/github/oauth/callback')
        // const url = 'https://github.com/login/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri
        // openWindow(url, thirdpart, 540, 540)
        window.location.href = url
    }
    
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .social-signup-container {
    margin: 20px 0;
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 30px;
      margin-top: 6px;
    }
    .wx-svg-container,
    .qq-svg-container,
    .github-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-top: 1px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
    }
    .wx-svg-container {
      background-color: #8dc349;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
    .github-svg-container {
      background-color: rgb(0, 17, 32);
      margin-left: 50px;
    }
  }
</style>

