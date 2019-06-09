
export enum IMsgColumnType {
  WarnMsg = 0,    // 警报消息
  RescueTel = 1,    // 救援电话
  DubanSx = 2     // 督办事项
}
export interface IMsgColumns {
  count: number;
  name: string;
  pic: string;
  sort: number;
  type: IMsgColumnType; 
  lastDate: string;
}

export interface IIndexState {
  msgColumns: IMsgColumns[]
}
