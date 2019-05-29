export interface IHead {
  ret: number
  msg: string
}

export interface IResponseResult {
  head: IHead
  data: any
}

export interface IListResult<T> {
  first?: number
  hasNext?: boolean
  hasPre?: boolean
  nextPage?: number
  pageNo?: number
  pageSize?: number
  prePage?: number
  result?: T[]
  totalCount?: number
  totalPages?: number
}
