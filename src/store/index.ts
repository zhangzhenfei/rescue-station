import { observable } from 'mobx'

const counterStore = observable({
  // state
  editResourceType: {
    name: '1',
    remark: '213'
  },
  setEditResourceType(editResourceType) {
    this.editResourceType = editResourceType
  }
})
export default counterStore
