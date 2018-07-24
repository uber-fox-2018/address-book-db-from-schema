const ContactGroup = require('./contact-group.js');
const View = require('./view.js');

class ContactGroupController {

    static transferContactGroups() {
        ContactGroup.transferContactGroups(function (output) {
            let strOutput = `Data transferred.`;
            View.displayMessage(strOutput);
        })
    }

}

module.exports = ContactGroupController;

