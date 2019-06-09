import { ComponentType } from 'react'
import { IAgency } from '@/pages/cabinet/assets/interface'

export { IAgency } from '@/pages/cabinet/assets/interface'

export interface IAreaSelect {
  show: boolean
  mask: boolean
  agencies: IAgency[]
  onClose?: () => void
  onConfirm?: (agencyId: IAgency) => void
}

declare const AreaSelect: ComponentType<IAreaSelect>

export { AreaSelect }
