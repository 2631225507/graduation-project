import service from '@/utils/request'

export function getProvice() {
    return service({
        url: '/api/provice',
        method: 'get'
    })
}

export function getCity(params) {
    return service({
        url: '/api/city',
        method: 'get',
        params
    })
}

export function getArea(params) {
    return service({
        url: '/api/area',
        method: 'get',
        params
    })
}

export function getDuties() {
    return service({
        url: '/api/duties',
        method: 'get',
    })
}