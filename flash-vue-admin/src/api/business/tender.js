import request from '@/utils/request'

export function getTenderList(params) {
  return request({
    url: '/tender/list',
    method: 'get',
    params
  })
}

export function saveTender(params) {
  return request({
    url: '/tender',
    method: 'post',
    params: params
  })
}

export function delTender(id) {
  return request({
    url: 'tender',
    method: 'delete',
    params: {
      id: id
    }
  })
}
