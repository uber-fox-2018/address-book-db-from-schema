const modelContactGroup = require('../model/model_contact_group')
const view = require('../view/view')

class ControllerContactGroup {
  static showContact() {
    modelContactGroup.showContact((err, data) => {
      if (err) {
        view.messageErr(err)
      } else {
        view.showContact(data)
      }
    })
  }

  static showGroup() {
    modelContactGroup.showGroup((err, data) => {
      if (err) {
        view.messageErr(err)
      } else {
        view.showGroup(data)
      }
    })
  }

  static assignContact(...data) {
    modelContactGroup.assignContact([...data], (err) => {
      if (err) {
        view.messageErr(err)
      } else {
        let msg = `Assign contact success`
        view.messageSucces(msg)
      }
    })
  }
}

module.exports = ControllerContactGroup