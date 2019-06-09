import { observable } from 'mobx'

const counterStore = observable({
  // 物资种类
  editResourceType: {},
  // 物资
  editMaterial: {},
  setEditResourceType(editResourceType) {
    this.editResourceType = editResourceType
  },
  setEditMaterial(editMaterial) {
    this.editMaterial = editMaterial
  }
})
export default counterStore
