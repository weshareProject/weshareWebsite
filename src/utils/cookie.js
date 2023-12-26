// import { useCookies } from '@vueuse/integrations/useCookies'

// const cookie = useCookies()

// ============================== Token 令牌 ==============================

// 存储在 Cookie 中的 Token 的 key
export const TOKEN_KEY = 'weshare-api-secret'

// 获取 Token 值
export function getToken() {
    // return cookie.get(TOKEN_KEY)
    return localStorage.getItem(TOKEN_KEY)
}

// 设置 Token 到 Cookie 中
export function setToken(token) {
    // return cookie.set(TOKEN_KEY, token)
    console.log("set:"+token)
    let ret = localStorage.setItem(TOKEN_KEY,token)
    return ret
}

// 删除 Token
export function removeToken() {
    // return cookie.remove(TOKEN_KEY)
    return localStorage.removeItem(TOKEN_KEY)
}

