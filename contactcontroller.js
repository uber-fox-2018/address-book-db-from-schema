const Contact = require('./contact.js');
const View = require('./view.js');

class ContactController {

    static transferContacts() {
        Contact.transferContacts(function (output) {
            let strOutput = `All contacts transferred to address book.`;
            View.displayMessage(strOutput);
        })
    }

    static createContact(name, company_name, phone_number, email) {
        Contact.createContact(name, company_name, phone_number, email, function (err, contactData) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `New contact added: ${name}`;
                View.displayMessage(strOutput);
            }
        })
    }

    static updateContact(id, column_name, value_edited) {
        Contact.updateContact(id, column_name, value_edited, function (err, dataUpdate) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `Contact id: ${id} has been updated.`;
                View.displayMessage(strOutput);
            }
        })
    }

    static deleteContact(id) {
        Contact.deleteContact(id, function (err, dataDelete) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `Contact ${id} has been deleted from address book.`;
                View.displayMessage(strOutput);
            }
        })
    }

    static showContacts(id) {
        Contact.showContacts(id, function (err, dataOutput) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = dataOutput;
                View.displayMessage(strOutput);
            }
        })
    }

    static assignContact(contactName, groupName) {
        Contact.assignContact(contactName, groupName, function (err, dataOutput) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `${contactName} has successfully been added to ${groupName}`;
                View.displayMessage(strOutput);
            }
        })
    }
}

module.exports = ContactController;