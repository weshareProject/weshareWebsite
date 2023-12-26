import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { removeToken } from '@/utils/cookie'
// import { getUserInfo } from '@/api/user' 导入可以获取用户信息的封装


export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = reactive({username:'',email:'',icon:'',nickname:''})

  // 设置用户信息
  function setUsername(newname) {
    userInfo.username = newname
  }
  function setNickname(newname) {
    userInfo.nickname = newname
  }
  function setEmail(newemail) {
    userInfo.email = newemail
  }
  function setIcon(newicon) {
    userInfo.icon = newicon
  }


  // 退出登录
  function logout() {
    // 删除 cookie 中的 token 令牌
    removeToken()
    // 删除登录用户信息
    userInfo.value = {}
  }

  return {userInfo, logout,setUsername,setNickname,setEmail,setIcon}
}, 
{
  // 开启持久化
  persist: true,
}
)