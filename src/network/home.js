import { request } from './request'

export function menus() {
  return request({
    url: 'menus'
  })
}
