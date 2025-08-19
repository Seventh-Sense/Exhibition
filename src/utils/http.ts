/**
 * 公共基础接口封装
 */
import axiosInstance from '@/utils/request'

export const get = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: 'GET',
    params: params
  })
}

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

export const del = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: 'DELETE',
    params
  })
}
 
export const getLoginInfo = () => {
  return axiosInstance({
    method: 'GET',
    url: '/login/info'
  })
}


export const sendParams = async (id: string, data: any) => {
  try {
    const response = await post(`/request?device_id=${id}`, data)
    
    return response
  } catch (error) {
    throw error
  }
}

export const readChartData = async () => {
  try {
    const response = await get(`/points`)
    
    return response
  } catch (error) {
    throw error
  }
}

export const createDevice = async (data: any) => {
  try {
    const response = await post(`/device`, data)
    
    return response
  } catch (error) {
    throw error
  }
}

export const createMetric = async (data: any) => {
  try {
    const response = await post(`/metric`, data)
    
    return response
  } catch (error) {
    throw error
  }
}

export const getDevices = async () => {
  try {
    const response = await get(`/devices`)

    return response
  } catch (error) {
    throw error
  }
}

export const getMetric = async () => {
  try {
    const response = await get(`/metrics`)

    return response
  } catch (error) {
    throw error
  }
}

export const delMetric = async (id: string,) => {
  try {
    const response = await del(`/points/` + id)

    return response
  } catch (error) {
    throw error
  }
}