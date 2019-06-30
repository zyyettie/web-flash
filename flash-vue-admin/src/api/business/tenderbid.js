import request from '@/utils/request'

export function getTenderBidList(params) {
  return request({
    url: '/tenderbid/list',
    method: 'get',
    params
  })
}

export function saveTenderBid(params) {
  return request({
    url: '/bid',
    method: 'post',
    params: params
  })
}

export function delTenderBid(id) {
  return request({
    url: '/tenderbid',
    method: 'delete',
    params: {
      id: id
    }
  })
}
