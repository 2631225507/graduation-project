import service from '@/utils/request'

export function getOrderInfo(params) {
    return service({
        url: '/api/orderInfo',
        method: 'get',
        params
    })
}

export function orderCreate(data1, data2) {
    return service({
        url: '/api/order/create',
        method: 'post',
        data: {
            mainTable: data1,
            infoTable: data2
        }
    })
}

export function orderUpdate(data) {
    return service({
        url: '/api/order/update',
        method: 'post',
        data
    })
}

export function orderDelete(data) {
    return service({
        url: '/api/order/delete',
        method: 'post',
        data
    })
}


export function orderOut(data) {
    return service({
        url: '/api/order/out',
        method: 'post',
        data
    })
}