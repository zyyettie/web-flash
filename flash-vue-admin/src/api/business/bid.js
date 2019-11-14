import request from '@/utils/request'

export function getBidList(params) {
  return request({
    url: '/bid/list',
    method: 'get',
    params
  })
}

export function getBidListForPayment(params) {
  return request({
    url: '/bid/listForPayment',
    method: 'get',
    params
  })
}

export function saveBid(params) {
  return request({
    url: '/bid/edit',
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

export function moveBidToNextStatusStep3(id) {
  return request({
    url: '/bid/moveToNextStatusStep3/' + id,
    method: 'get'
  })
}

export function moveBidToNextStatusWithDeliverInfo(params) {
  return request({
    url: '/bid/moveToNextStatusWithDeliverInfo',
    method: 'post',
    params
  })
}

export function moveBidToNextStatusWithQuantityPrice(params) {
  return request({
    url: '/bid/moveToNextStatusWithQuantityPrice',
    method: 'post',
    params
  })
}

export function moveBidToNextStatusWithInvoice(params) {
  return request({
    url: '/bid/moveToNextStatusWithInvoice',
    method: 'post',
    params
  })
}

export function moveBidToNextStatusWithPayment(params) {
  return request({
    url: '/bid/moveToNextStatusWithPayment',
    method: 'post',
    params
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
