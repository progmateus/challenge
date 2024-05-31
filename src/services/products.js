import request from './request'

export function ListProducts ( data ) {
  return request({
    url: '/products',
    method: 'post',
    data
  })
}