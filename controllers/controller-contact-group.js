const ConctacGroup = require('../models/contact-group')
const View = require('../view')

class ControllerContactGroup {
    
    static transferContactGroup() {
        ConctacGroup.transfer((err) => {
            if(err) throw err;
            let result = `transfer data contactgroup success`
            View.showResult(result)
        })
    }

    static showGroup(groupName) {
        ConctacGroup.show(groupName, (err, data) => {
            if(err) {
                View.showError(err)
            }else {
                Views.showResult(data)
            }
        })
    }

    static assignContact(contactId, groupid) {
        ConctacGroup.assign(contactId, groupid, (err) => {
            if(err) throw err;
            let result = `Contact with ID: ${contactId} has been assign to Group with ID: ${groupid}`
            View.showResult(result)
        })
    }

}

module.exports = ControllerContactGroup;