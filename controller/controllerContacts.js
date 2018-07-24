const model = require('../model/model')
const ModelContact = model.modelContact
const View = require('../view/views')

class Contact {
    constructor(name, company, phoneNumber, email) {
        this.name = name;
        this.company = company;
        this.phoneNumber = phoneNumber;
        this.email = email;
    } 
}

class ControllerContact {
    static insertContact(name, company, phoneNumber, email) {
        let newContact = new Contact(name, company, phoneNumber, email)
        ModelContact.insertContact(newContact.name, newContact.company, newContact.phoneNumber, newContact.email, function(err, data){
            (!err) ? View.displayMessage(`Success to add Contact: ${name} with Number: ${phoneNumber}. Total Contact: ${data.lastID + 1}`) : View.displayErrorMessage(err)
        })
    }

    static showContacts() {
        ModelContact.showContacts(function(err, datas) {
            if(!err) {
                datas.forEach(data => {
                    View.displayMessage(`${data.id}. name: ${data.name}, phone_number: ${data.phoneNumber}`)
                })
            } else {
                View.displayErrorMessage(err.message)
            }
        })
    }

    static editContact(name, company, phoneNumber, email, id) {
        ModelContact.editContact(name, company, phoneNumber, email, id, function(err, msg) {
            (!err) ? View.displayMessage(msg) : View.displayErrorMessage(err.message)
        })
    }

    static removeContact(name) {
        ModelContact.removeContact(name, function(err, msg) {
            (!err) ? View.displayMessage(msg) : View.displayErrorMessage(err.message)
        })   
    }

    static find(nameColumn, value, operand, operand2) {
        ModelContact.find(nameColumn, value, operand, operand2, function(err, datas) {
            if(err) {
                View.displayErrorMessage(err.message)
            } else {
                let count = 1
                datas.forEach(data => {
                    View.displayMessage(`${count}. Contact: ${data.name} Phone_number : ${data.phoneNumber}`)
                    count++
                })
            }
        })
    }
}


module.exports = ControllerContact