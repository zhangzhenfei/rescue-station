export interface ICabinet {
  id: string
  mechaName: string
  name: string
  address: string
  img: string
  installDate: string
  code: string
}

export interface ICabinetState {
  cabinets: ICabinet[]
}

export interface IAgency {
  id: string // 当前机构ID
  pId?: string // 父级机构ID
  name: string // 机构名称
  level: number // 当前层级
  mechanismTree: IAgency[] // 下级机构列表
}
