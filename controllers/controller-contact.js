const Contact = require('../models/contact')
const View_Contact = require('../views/view-contact')

class Controller_Contact {
    static addContact (name, company_name, phone_number, email) {
        Contact.addContact(name, company_name, phone_number, email, function(err, data) {
            if (err) {
                View_Contact.displayError(err)
            } else {
                let msg = { msg: `success add data` }
                View_Contact.displayMessage(msg)
            }
        })
    }    

    static editContact(contactId, column, newValue) {
        Contact.editContact(contactId,column,newValue, function(err, data) {
            if (err) {
                View_Contact.displayError(err)
            } else {
                let msg = { msg: `success edit data` }
                View_Contact.displayMessage(msg)
            }
        })
    }
    
    static deleteContact(id) {
        Contact.deleteContact(id, function(err, data) {
            if (err) {
                View_Contact.displayError(err)
            } else {
                let msg = { msg: `success delete data` }
                View_Contact.displayMessage(msg)
            }
        })
    }
}

module.exports = Controller_Contact