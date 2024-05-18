import axios from 'axios'
import config from './config'
import type { BaseResponse, Request } from '@/shared/types/api'

const baseHeaders = import.meta.env.DEV ? { ...config.csrfHeader } : {}

export function makeRequest<T>({
  url = '/',
  method = 'get',
  headers,
  params,
  data,
  responseType = 'json',
  paramsSerializer,
}: Request): Promise<BaseResponse<T>> {
  return axios({
    url,
    method,
    responseType,
    headers: { ...baseHeaders, ...headers },
    params: {
      api_key: import.meta.env.VITE_API_KEY,
      ...params,
    },
    data,
    paramsSerializer,
    withCredentials: false,
  })
}

export default makeRequest
