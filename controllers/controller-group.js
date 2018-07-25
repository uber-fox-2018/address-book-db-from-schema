const Group = require('../models/group')
const View_Group = require('../views/view-group')

class Controller_Group {
    static addGroup(groupName) {
        Group.addGroup(groupName, function(err, data) {
            if (err) {
                View_Group.displayError(err)
            } else {
                let msg = { msg: `success add group data`}
                View_Group.displayMessage(msg)
            }
        })
    }

    static editGroup(id, column, newValue) {
        Group.editGroup(id, column, newValue, function(err, data) {
            if (err) {
                View_Group.displayError(err)
            } else {
                let msg = { msg: `success edit group data` }
                View_Group.displayMessage(msg)
            }
        })
    }
    
    static deleteGroup(id) {
        Group.deleteGroup(id, function(err, data) {
            if (err) {
                View_Group.displayError(err)
            } else {
                let msg = { msg: `success delete group data` }
                View_Group.displayMessage(msg)
            }
        })
    }
}

module.exports = Controller_Group