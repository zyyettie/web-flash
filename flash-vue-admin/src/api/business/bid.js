import request from '@/utils/request'

export function getBidList(params) {
  return request({
    url: '/bid/list',
    method: 'get',
    params
  })
}

export function saveBid(params) {
  return request({
    url: '/bid',
    method: 'post',
    params: params
  })
}

export function delBid(id) {
  return request({
    url: '/bid',
    method: 'delete',
    params: {
      id: id
    }
  })
}
