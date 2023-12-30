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


// 修改用户昵称
// data = {
//   username,
//   nickName
// }
export function updateNickname(data){
  return axios({
    method: 'PUT',
    url: '/user/nickname',
    data
  })
}

// 修改用户头像
// data = {
//   username,
//   icon
// }
export function updateIcon(data){
  return axios({
    method: 'PUT',
    url: '/user/icon',
    data
  })
}



