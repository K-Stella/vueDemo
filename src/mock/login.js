import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  cxz: {
    roles: ['superEditor'],
    token: 'cxz',
    introduction: '我是超级编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Editor'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

// userMap[username] 与 userMap[token] 都表示数组的名字
// 此处需要保持username 与 token 相同，保证找到相同的数组
export default {
  loginByUsername: config => {
    console.log(JSON.parse(config.body))
    const { username } = JSON.parse(config.body)
    console.log('??0', userMap[username])
    return userMap[username]
  },
  getUserInfo: config => {
    console.log(param2Obj(config.url))
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success',
  loginByThirdparty: config => {
    console.log('mock loginByThirdparty:', config)
    const { token } = param2Obj(config.access_token)
    return token
  },
  getGithubUserInfo: config => {
    console.log('githubuser:', config.body)
    return config.body
  }
}
