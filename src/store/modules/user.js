import { loginByUsername, getUserInfo, logout, loginByThirdparty } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resolve } from 'path';
import { rejects } from 'assert';
import { stat } from 'fs';
import { getGithubUserinfo } from '../../api/login';

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        thirdpart: '',
        setting: {
          articlePlatform: []
        }
    },
    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
          },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_AUTH_TYPE: (state, thirdpart) => {
            state.roles = thirdpart
        }
    },
    actions: {
        // 用户名登陆
        LoginByusername({ commit },userinfo) {
            const username = userinfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userinfo.password).then(response => {
                    const data = response.data
                    commit('SET_TOKEN', data.token)
                    setToken(response.data.data.token)
                    resolve(response)
                }).catch(error => {
                    console.log("login error")
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(response => {
                    console.log(response)
                    const data = response.data
                    if(data.data.roles && data.data.roles.length > 0) {
                        commit('SET_ROLES', data.data.roles)
                    } else {
                        reject('getUserInfo: roles must be a non-null array !')
                    }
                    // console.log('name:', data.data.name)
                    commit('SET_NAME', data.data.name)
                    commit('SET_TOKEN', data.token)
                    commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80')
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取第三方用户信息
        GetGithubUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getGithubUserinfo(state.token).then(response => {
                    console.log(response)
                    commit('SET_AVATAR', response.data.avatar_url)
                    commit('SET_ROLES', 'admin')
                    commit('SET_NAME', response.data.name)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 用户登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(response => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 第三方验证登陆
        LoginByThirdparty({ commit, state }, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code)
                loginByThirdparty(state.code).then(response => {
                    // console.log('code1111:', code)
                    var token = response.data

                    // 以‘&’分割
                    token = token.split('&')
                    // 获得access_token所有值 
                    token = token[0].split('=')
                    token = token[1]
                    // console.log('token:', token)

                    commit('SET_TOKEN', token)
                    setToken(token)
                    // console.log(getToken())
                    // console.log(response)
                    // 将接口结果返回
                    resolve(response) 
                }).catch(error => {
                    console.log('error')
                    reject(error)
                })
            })
        }
    }
}

export default user