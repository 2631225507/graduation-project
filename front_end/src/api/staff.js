import service from '@/utils/request'

export function getStaffInfo(params) {
    return service({
        url: '/api/staffInfo',
        method: 'get',
        params
    })
}

export function staffCreate(data) {
    return service({
        url: '/api/staff/create',
        method: 'post',
        data
    })
}

export function staffUpdate(data) {
    return service({
        url: '/api/staff/update',
        method: 'post',
        data
    })
}

export function staffDelete(data) {
    return service({
        url: '/api/staff/delete',
        method: 'post',
        data
    })
}