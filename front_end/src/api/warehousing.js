import service from '@/utils/request'

export function getWarehousingInfo(params) {
    return service({
        url: '/api/warehousingInfo',
        method: 'get',
        params
    })
}

export function warehousingCreate(data1, data2) {
    return service({
        url: '/api/warehousing/create',
        method: 'post',
        data: {
            mainTable: data1,
            infoTable: data2
        }
    })
}

// export function orderUpdate(data) {
//     return service({
//         url: '/api/order/update',
//         method: 'post',
//         data
//     })
// }

// export function orderDelete(data) {
//     return service({
//         url: '/api/order/delete',
//         method: 'post',
//         data
//     })
// }

