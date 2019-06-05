import { observable } from 'mobx'

const counterStore = observable({
  // state
  editResourceType: {
    name: '',
    remark: ''
  },
  setEditResourceType(editResourceType) {
    this.editResourceType = editResourceType
  }
})
export default counterStore
