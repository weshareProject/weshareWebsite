import Login from '@/pages/login.vue'
import Admin from '@/pages/admin.vue'
import Register from '@/pages/register.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// 统一在这里声明所有路由
const routes = [
    {
        path: '/', // 直接转移到管理页面（但是有拦截）
        redirect:'/admin'
    },
    {
        path: '/admin', // 管理页面
        component: Admin,
        meta: {
            title: 'weshare 管理页'
        }
    },
    {
        path: "/login", // 登录页面
        component: Login,
        meta: {
            title: 'weshare 登陆页'
        }
    },
    {
        path: "/register", // 注册页面
        component: Register,
        meta: {
            title: 'weshare 注册页'
        }
    }
]

// 创建路由
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: createWebHashHistory(),
    // routes: routes 的缩写
    routes, 
})

// 暴露出去
export default router

