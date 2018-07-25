const Contact = require('../models/contact');
const View = require('../views/contact_view');

class ContactController {
    constructor() { }

    show() {
        Contact.list(contact => {
            View.displayShow(contact);
        })
    }

    create(name, phone_number, email) {
        if (this.isValid(name, phone_number, email)) {
            Contact.checkEmail(email, isAvailable => {
                if (isAvailable) {
                    let contact = new Contact(name, phone_number, email);
                    contact.save(last_id => {
                        Contact.find(last_id, contact => {
                            Contact.count(total => {
                                View.displayAdd(contact, total);
                            })
                        });
                    });
                }
                else
                    View.displayValidation(`email is already registered.`);
            });
        }
    }

    update(id, name, phone_number, email) {
        if (this.isValid(name, phone_number, email)) {
            Contact.checkEmail(email, isAvailable => {
                if (isAvailable) {
                    Contact.find(id, contact => {
                        if (contact) {
                            contact.name = name;
                            contact.phone_number = phone_number;
                            contact.email = email;
                            contact.update(changes => {
                                View.displayUpdate(contact, changes);
                            });
                        }
                        else
                            View.displayValidation(`contact not found`);
                    });
                }
                else
                    View.displayValidation(`email is already registered.`);
            });
        }
    }

    delete(id) {
        Contact.find(id, contact => {
            if (!contact)
                View.displayValidation(`contact not found`);
            else {
                contact.delete(changes => {
                    Contact.count(total => {
                        View.displayDelete(total);
                    });
                });
            }
        })
    }

    isValid(name, phone_number, email) {
        let isValid = true;
        if (typeof name == 'undefined' || name.trim().length <= 0) {
            isValid = false;
            View.displayValidation(`name is required`);
        }
        if (typeof phone_number == 'undefined' || phone_number.trim().length <= 0) {
            isValid = false;
            View.displayValidation(`phone number is required`);
        }
        if (typeof email == 'undefined' || email.trim().length <= 0) {
            isValid = false;
            View.displayValidation(`email is required`);
        }
        return isValid;
    }

    help() {
        View.displayHelp();
    }
}

module.exports = ContactController;