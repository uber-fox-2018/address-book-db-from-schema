const ContactGroup = require('../models/contact-group')
const View_Contact_Group = require ('../views/view-contact-group')

class Controller_Contact_Group {
    static assign(contactId, groupId) {
        ContactGroup.assign(contactId, groupId, function(err,data) {
            if (err) {
                View_Contact_Group.displayError(err)
            } else {
                let msg = { msg: `success assign Contact with ${contactId} to Group with ${groupId}`}
                View_Contact_Group.displayMessage(msg)
            }
        })
    }
}

module.exports = Controller_Contact_Group