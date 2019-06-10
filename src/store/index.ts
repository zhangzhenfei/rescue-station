import { observable } from 'mobx'

const counterStore = observable({
  // 物资种类
  editResourceType: {},
  // 物资
  editMaterial: {},
  // 选择的物资种类
  selectedClass: {},
  setEditResourceType(editResourceType) {
    this.editResourceType = editResourceType
  },
  setEditMaterial(editMaterial) {
    this.editMaterial = editMaterial
  },
  setSelectedClass(selectedClass) {
    this.selectedClass = selectedClass
  }
})
export default counterStore
