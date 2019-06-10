export interface IWuzi {
  id: string
  name: string
  typeName: string
  img: string
  purpose: string
  brand: string
  model: string
  remark: string
  userName: string
  createDate: string // yyyy-MM-dd HH:mm:ss
  overdue: number
  materialBatchs: IBatch[]
}

export interface IBatch {
  warehousingDate: string
  dueDate: string
  count: number
}
