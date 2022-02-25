import service from '@/utils/request'

export function getCustomerStatistics(data) {
    return service({
        url: '/api/customer/statistics',
        method: 'post',
        data
    })
}


