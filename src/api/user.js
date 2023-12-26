import axios from "@/api/axios"

// 登录接口
// {
//   "password": "string",  *
//   "username": "string"   * 
// }
export function login(data) {
    return axios({
        method: 'POST',
        url: '/user/login',
        data
      })
}

// 登出接口
// export function logout(){
//   return axios({
//     method : 'POST',
//     url :'/user/logout',
//   })
// }

// 修改用户密码
// data = {
//   username,
//   password,
//   newPassword
// }
export function updatePassword(data){
  return axios({
    method: 'PUT',
    url: '/user/password',
    data
  })
}

// 注册接口
// data ={
//   username,
//   oldPassword,
//   newPassword,
//   vaildCode
// }
export function register(data){
  return axios({
    method : "POST",
    url : '/user/register',
    data
  })
}

// 获取验证码接口

export function getCode(email) {
  return axios({
    method: 'POST',
    url: `/user/code?email=${encodeURIComponent(email)}`,
    // 其他请求配置...
  });
}

// 获取用户笔记
export function getAllNotes(){
  return axios({
    method: 'GET',
    url : '/note/user'
  })
}

