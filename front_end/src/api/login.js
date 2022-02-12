import service from '@/utils/request'

export function login (data) {
    return service({
      url: '/api/user/login',
      method: 'post',
      data
    })
  }
