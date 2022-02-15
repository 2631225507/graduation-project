import service from '@/utils/request'

export function getShelvesInfo(params) {
    return service({
        url: '/api/shelvesInfo',
        method: 'get',
        params
    })
}

export function shelvesCreate(data) {
    return service({
        url: '/api/shelves/create',
        method: 'post',
        data
    })
}

export function shelvesUpdate(data) {
    return service({
        url: '/api/shelves/update',
        method: 'post',
        data
    })
}

export function shelvesDelete(data) {
    return service({
        url: '/api/shelves/delete',
        method: 'post',
        data
    })
}