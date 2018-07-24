const Group = require('./group.js');
const View = require('./view.js');

class GroupController {

    static transferGroups() {
        Group.transferGroups(function (output) {
            let strOutput = `All groups transferred to address book.`;
            View.displayMessage(strOutput);
        })
    }

    static createGroup(name) {
        Group.createGroup(name, function (err, groupData) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `New group added: ${name}`;
                View.displayMessage(strOutput);
            }

        })
    }

    static updateGroup(id, column_name, value_edited) {
        Group.updateGroup(id, column_name, value_edited, function (err, dataUpdate) {
            if (err) {
                View.displayError(err);
            } else {
                let strOuput = `Group id: ${id} has been updated.`;
                View.displayMessage(strOuput);
            }
        })
    }

    static deleteGroup(id) {
        Group.deleteGroup(id, function (err, dataDelete) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `Group ${id} has been deleted from address book.`;
                View.displayMessage(strOutput);
            }
        })
    }

    static showGroups(name) {
        Group.showGroups(name, function (err, dataOutput) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = dataOutput;
                View.displayMessage(strOutput);
            }
        })
    }
}

module.exports = GroupController;