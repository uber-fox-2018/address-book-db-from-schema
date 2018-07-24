const model = require('../model/model')
const modelGroupContact = model.modelGroupContact
const View = require('../view/views')

class GroupContact {
    constructor(contactId, groupId) {
        this.contactId = contactId;
        this.groupId = groupId
    }
}

class ControllerGroupContact {
    static insertGroupContact(contactName, groupName) {
        modelGroupContact.insertGroupContact(contactName, groupName, function(err, msg) {
            if(!err) {
                View.displayMessage(msg)
            } else {
                View.displayErrorMessage(err.message)
            }
        })
    }

    static showGroupContacts() {
        modelGroupContact.showGroupContact(function(err, datas) {
            if(!err) {
                datas.forEach(data => {
                    View.displayMessage(`${data.id}. Contact: ${data.name} | Group: ${data.groupName}`)
                })
            } else {
                View.displayErrorMessage(err.message)
            }
        })
    }

    static editGroupContact(nameContact, nameGroup) {
        modelGroupContact.editGroupContact(nameContact, nameGroup, function(err, msg) {
            if(!err) {
                View.displayMessage(msg)
            } else {
                View.displayErrorMessage(err)
            }
        })
    }

    static removeGroupContact(id) {
        modelGroupContact.removeGroupContact(id, function(err, msg) {
            if(err) {
                View.displayErrorMessage(err)
            } else {
                View.displayMessage(msg)
            }
        })
    }

}

module.exports = ControllerGroupContact