import request from '@/utils/request'

export function getTenderList(params) {
  return request({
    url: '/tender/list',
    method: 'get',
    params
  })
}

export function getTenderList2(params) {
  return request({
    url: '/tender/list2',
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
    url: '/tender',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function getTenderDetails(id) {
  return request({
    url: '/tender',
    method: 'get',
    params: id
  })
}

export function closeTender(id) {
  return request({
    url: '/tender/closeTender',
    method: 'post',
    params: {
      id: id
    }
  })
}
