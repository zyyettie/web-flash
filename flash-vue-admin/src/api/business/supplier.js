import request from '@/utils/request'

export function getSupplierList(params) {
  return request({
    url: '/supplier/list',
    method: 'get',
    params
  })
}

export function saveSupplier(params) {
  return request({
    url: '/supplier',
    method: 'post',
    params: params
  })
}

export function delSupplier(id) {
  return request({
    url: 'supplier',
    method: 'delete',
    params: {
      id: id
    }
  })
}
