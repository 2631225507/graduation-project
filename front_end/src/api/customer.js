import service from '@/utils/request'

export function getproduct() {
    return service({
        url: '/api/enum/page',
        method: 'get'
    })
}

export function getCustomerInfo(params) {
    return service({
        url: '/api/customerInfo',
        method: 'get',
        params
    })
}

export function customerCreate(data) {
    return service({
        url: '/api/customer/create',
        method: 'post',
        data
    })
}

export function customerUpdate(data) {
    return service({
        url: '/api/customer/update',
        method: 'post',
        data
    })
}

export function customerDelete(data) {
    return service({
        url: '/api/customer/delete',
        method: 'post',
        data
    })
}

