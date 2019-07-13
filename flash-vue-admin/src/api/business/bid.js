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

export function getBidByTenderId(params) {
  return request({
    url: '/bid/bytender',
    method: 'get',
    params
  })
}

export function moveBidToNextStatus(id) {
  return request({
    url: '/bid/moveToNextStatus/' + id,
    method: 'get'
  })
}

export function approveBid(id) {
  return request({
    url: '/bid/approve/' + id,
    method: 'get'
  })
}

export function denyBid(id) {
  return request({
    url: '/bid/deny/' + id,
    method: 'get'
  })
}
