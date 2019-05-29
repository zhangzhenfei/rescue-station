export interface IModal {
  show: boolean
  mask: boolean
  modalType: ModalType
  onHide: () => void
  onOpen: () => void
  onClose: () => void
}

export enum ModalType {
  WARN = 'WARN',
  LOCK = 'LOCK',
  SCREEN = 'SCREEN'
}
