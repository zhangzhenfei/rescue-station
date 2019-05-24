import { ComponentType } from 'react'

export interface IAreaSelect {
  show: boolean
  mask: boolean
  onClose?: () => void
}

declare const AreaSelect: ComponentType<IAreaSelect>

export { AreaSelect }
