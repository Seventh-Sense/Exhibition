/**
 * 公共基础接口封装
 */
import axiosInstance from '@/utils/request'

export const post = (url: string, data?: object | string, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': headersType || 'application/json;charset=UTF-8'
    }
  })
}
 
export const getLoginInfo = () => {
  return axiosInstance({
    method: 'GET',
    url: '/login/info'
  })
}


export const sendParams = async (data: any) => {
  try {
    const response = await post(`/device/request`, data)
    
    return response
  } catch (error) {
    throw error
  }
}

export const readChartData = async (data: any) => {
  try {
    const response = await post(`/points`, data)
    
    return response
  } catch (error) {
    throw error
  }
}