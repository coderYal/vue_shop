import { request } from './request'

// 首页左侧列表
export function menus () {
  return request({
    url: 'menus'
  })
}

// 首页用户列表
export function userList (params) {
  return request({
    url: 'users',
    params
  })
}

// 首页用户列表修改用户状态
export function userEditType (data) {
  return request({
    url: `users/${data.id}/state/${data.type}`,
    method: 'put'
  })
}

// 首页用户列表删除
export function delUser (id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 首页用户列表添加
export function userAdd (data) {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

// 首页用户列表修改
export function userEdit (data) {
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data: {
      email: data.email,
      mobile: data.mobile
    }
  })
}

// 根据用户id查询数据
export function getUserIdList (id) {
  return request({
    url: `users/${id}`
  })
}
