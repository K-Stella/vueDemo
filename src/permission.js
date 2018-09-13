import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// permission judge function
function hasPermission(roles, permissionRoles) {
    console.log(' roles: ', roles)
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
  }

// 采用正则表达式获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}  

// 不重定向白名单
const whiteList = ['/login']
/**
 * to: Router： 即将要进入目标的路由对象
 * from: Router：当前导航正要离开的路由
 * next: Function：一定要调用该方法来resolve这个钩子
 */
router.beforeEach((to, from, next) => {
    NProgress.start()
    // console.log(window.location.href)
    // const code = GetQueryString('code')
    // console.log('code:', code)
    const token = getToken()
    console.log('222:', token)

    if(getToken()) {
        if (to.path === '/login') {
            next({ path:'/' })
            NProgress.done()
        } else {
            // 根据 token 值判断是用户登陆还是第三方登陆
            if( getToken() === 'admin') {
                if (store.getters.roles.length === 0) {
                    store.dispatch('GetUserInfo').then(res => {
                        const roles = res.data.data.roles
                        // console.log('role:', roles)
                        // 生成可访问的路由表, GenerateRoutes接口根据角色权限生成对应的路由表
                        // 此处的roles必须是数组，否则运行时则会报错
                        store.dispatch('GenerateRoutes', { roles }).then(() => {
                            router.addRoutes(store.getters.addRouters)
                            console.log('Router：', store.getters.addRouters)
                            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        })
                        // console.log(res);
                        next()
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    next()
                }
            } else {
                console.log('thiedParty')
                if (store.getters.roles.length === 0) {
                    store.dispatch('GetGithubUserInfo').then(res => {
                        console.log(res)
                        const roles = 'admin'
                        store.dispatch('GenerateRoutes', { roles }).then(() => {
                            router.addRoutes(store.getters.addRouters)
                            console.log('Router：', store.getters.addRouters)
                            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        })
                        
                    })
                } else {
                    next()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
  })