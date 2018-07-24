const modelContact = require('../model/model_contact')
const view = require('../view/view')

class ControllerContact {
  static save(...data) {
    modelContact.save([...data], (err, message) => {
      if (err) {
        let messageErr = 'Contact already exists'
        view.messageErr(messageErr)
      } else {
        let msg = `Contact name ${message.name} success add to contacts. Total Contact: ${message.totalContact}`
        view.messageSucces(msg)
      }
    })
  }

  static update(...data) {
    modelContact.update([...data], (err, message) => {
      if (err) {
        let messageErr = `No such column ${err.msgErr}`
        view.messageErr(messageErr)
      } else {
        let msg = `Contact with id ${message.id} successfully update`
        view.messageSucces(msg)
      }
    })
  }

  static remove(...data) {
    modelContact.remove([...data], (err, data) => {
      if (err) {
        view.messageErr(err.messageErr)
      } else {
        let message = `Contact with name ${data.name} successfully deleted`
        view.messageSucces(message)
      }
    })
  }

  static find(...data) {
    modelContact.find([...data], (err, message) => {
      if (err) {
        view.messageErr(err.messageInfo)
      } else {
        let arr = []
        message.map(data => {
          arr.push(data)
        })
        view.messageSucces(arr)
      }
    })
  }
}

module.exports = ControllerContact