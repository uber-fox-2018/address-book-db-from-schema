const modelGroup = require('../model/model_group')
const view = require('../view/view')

class ControllerGroup {
  static save(...data) {
    modelGroup.save([...data], (err, data) => {
      if (err) {
        view.messageErr(err)
      } else {
        let msg = `Group ${data.name_group} successfully add to group.`
        view.messageSucces(msg)
      }
    })
  }

  static update(...data) {
    modelGroup.update([...data], (err, data) => {
      if (err) {
        view.messageErr(err.message)
      } else {
        let msg = `Group with id ${data.id} successfully updated.`
        view.messageSucces(msg)
      }
    })
  }

  static remove(...data) {
    modelGroup.remove([...data], (err, data) => {
      if (err) {
        view.messageErr(err)
      } else {
        let msg = `Group with id ${data.id} success deleted`
        view.messageSucces(msg)
      }
    })
  }
}

module.exports = ControllerGroup