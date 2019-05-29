export enum OperaType {
  IN = 'IN', // 入库
  OUT = 'OUT', // 出库
  CHANGE = 'CHANGE' // 更改
}

export interface IMaterials {
  type: OperaType // 物资操作类型
}
