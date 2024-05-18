import type { ResponseType } from 'axios'

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
  headers?: any
  params?: any
  data?: any
  paramsSerializer?: (params: object | string) => string
}
