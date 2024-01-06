import axios from "@/api/axios"
// 获取用户笔记
export function getAllNotes(){
    return axios({
      method: 'GET',
      url : '/note/user'
    })
}


// 修改笔记内容
// data  = 
//   {
//     "content": "string",
//     "tempId": "string",  必须的
//   }
export function editNote(data){
  return axios({
    method:'PUT',
    url : '/note/',
    data
  })
}

//删除笔记内容
export function deleteNote(tempId) {
  return axios({
    method: 'DELETE',
    url: `/note/${tempId}`
  });
}

// 设置公开或私密
// data  = 
//   {
//     "content": "string",
//     "ispublic": Integer
//   }
export function alterIsPublic(data){
  return axios({
    method:'PUT',
    url : '/note/',
    data
  })
}