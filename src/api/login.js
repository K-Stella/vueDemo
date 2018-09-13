import request from '@/utils/request'

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: 'https://easy-mock.com/mock/5b8f4e7a830bb75e3ad4c56a/login',
        method: 'post',
        data
    })
}

export function getUserInfo(token) {
    return request({
        url: 'https://easy-mock.com/mock/5b8f4e7a830bb75e3ad4c56a/user',
        method: 'get',
        params: { token }
    })
}

export function getGithubUserinfo(access_token) {
    return request({
        url: 'https://api.github.com/user',
        method: 'get',
        params: { access_token }
    })
}

export function logout() {
    return request({
        url: 'https://easy-mock.com/mock/5b8f4e7a830bb75e3ad4c56a/user/logout',
        method: 'post',
    })
}

export function loginByThirdparty(code) {
    const client_id = '856266c32571042e52d7'
    const client_secret = 'eba58af6a2f645e6231bb982a561e35762de7924'
    console.log('loginByThirdparty api')

    return request({
        url: '/api',
        method: 'post',
        params: {
            client_id,
            client_secret,
            code
        }
    })
}