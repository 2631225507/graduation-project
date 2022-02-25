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

export function updateWarehousing(data1,data2) {
    return service({
        url: '/api/warehousing/update',
        method: 'post',
        data:{
            newValue:data1,
            oldValue:data2
        }
    })
}

export function deleteWarehousing(data) {
    return service({
        url: '/api/warehousing/delete',
        method: 'post',
        data
    })
}

