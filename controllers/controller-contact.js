const Contact = require('../models/contact')
const View = require('../view')

class ControllerContact {

    static createContact(name, telp, company, email) {
        Contact.create(name, telp, company, email, (err, name) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `Create contact data ${name} success`
                View.showResult(result)
            }
        }) 
    }

    static updateContact(id, name, telp, company, email) {
        Contact.update(id, name, telp, company, email, (err, name) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `Update contact data ${name} success`
                View.showResult(result)
            }
        })
    }

    static deleteContact(id) {
        Contact.delete(id, (err, id) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `Delete contact data ID : ${id} success`
                View.showResult(result)
            }
        })
    }

    static showContact() {
        Contact.show((err, data) => {
            if(err) {
                View.showError(err)
            }else {
                View.showResult(data)
            }
        })
    }

    static transferContacts() {
        Contact.transfer((err) => {
            if(err) throw err;
            let result = `transfer data contact success`
            View.showResult(result)
        })
    }
}

module.exports = ControllerContact;