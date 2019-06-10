export interface IModal {
  show: boolean
  mask: boolean
  modalType: ModalType
  onHide: () => void
  onClick: (type: ModalType, isOn: boolean) => void
}

export enum ModalType {
  WARN = 'WARN',
  LOCK = 'LOCK',
  SCREEN = 'SCREEN'
}
