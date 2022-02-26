import service from '@/utils/request'

export function getCustomerStatistics(data) {
    return service({
        url: '/api/customer/statistics',
        method: 'post',
        data
    })
}


export function getReturninfo(data) {
    return service({
        url: '/api/return/statistics',
        method: 'post',
        data
    })
}


export function getOrderTotal(data) {
    return service({
        url: '/api/order/statistics',
        method: 'post',
        data
    })
}
