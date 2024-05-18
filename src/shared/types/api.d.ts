import type { AxiosRequestHeaders, ResponseType } from 'axios'

export interface BaseResponse<T> {
  data: T
}

export interface TableData<T> {
  count: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface ErrorResponse {
  response: {
    data: {
      msg: string
    }
  }
}

export interface Request {
  url: string
  method?: string
  responseType?: ResponseType
  headers?: AxiosRequestHeaders
  params?: unknown & { api_key?: string, append_to_response?: string }
  data?: unknown
  paramsSerializer?: (params: object | string) => string
}
