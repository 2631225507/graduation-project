import service from '@/utils/request'

export function getProductInfo(params) {
    return service({
        url: '/api/productInfo',
        method: 'get',
        params
    })
}

export function productCreate(data) {
    return service({
        url: '/api/product/create',
        method: 'post',
        data
    })
}

export function productUpdate(data) {
    return service({
        url: '/api/product/update',
        method: 'post',
        data
    })
}

export function productDelete(data) {
    return service({
        url: '/api/product/delete',
        method: 'post',
        data
    })
}


export function detailDelete(data) {
    return service({
        url: '/api/product-datail/delete',
        method: 'post',
        data
    })
}