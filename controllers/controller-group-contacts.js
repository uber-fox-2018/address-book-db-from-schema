const GroupContact = require('../models/contact-group')
const View = require('../views/view-group-contacts')

class ControllerGroupContact {
    static assign(contactId,groupId){
        GroupContact.addGroupContact(contactId,groupId,function(err,data){
            if (err) {
                View.showError(err)
            }else {
                View.showData(data)
            }
        })
    }
}

module.exports = ControllerGroupContact