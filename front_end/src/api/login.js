import service from '@/utils/request'

export function login(data) {
    return service({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

export function getInfo(data) {
    return service({
        url: '/api/user/info',
        method: 'post',
        data
    })
}

export function logout(data) {
    return service({
        url: '/api/user/logout',
        method: 'post',
        data
    })
}
