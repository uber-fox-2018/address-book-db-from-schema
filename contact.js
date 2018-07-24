const fs = require('fs');
const db = require('./db.js');

class Contact {
    constructor(name, company_name, phone_number, email) {
        this.id = null
        this.name = name
        this.company_name = company_name
        this.phone_number = phone_number
        this.email = email
    }

    static transferContacts(callback) {
        var contacts = JSON.parse(fs.readFileSync('datacontacts.json', 'utf8'));

        db.serialize(function () {
            for (let i = 0; i < contacts.length; i++) {
                const queryTransfer = `INSERT INTO Contacts (name, company_name, phone_number, email)
                                       VALUES ("${contacts[i].name}", "${contacts[i].company_name}", "${contacts[i].phone_number}", "${contacts[i].email}")`;
                db.run(queryTransfer, function (err) {
                    if (err) throw err
                })
            }
            callback()
        })
    }

    static createContact(name, company_name, phone_number, email, callback) {
        let contact = new Contact(name, company_name, phone_number, email);
        const queryCreate = `INSERT INTO Contacts (name, company_name, phone_number, email)
                             VALUES ("${contact.name}", "${contact.company_name}", "${contact.phone_number}", "${contact.email}")`;

        db.run(queryCreate, function (err) {
            if (err) throw err
            callback()
        })
    }

    static updateContact(id, column_name, value_edited, callback) {
        const queryUpdate = `UPDATE Contacts SET "${column_name}" = "${value_edited}"
                             WHERE id = "${id}"`;

        db.run(queryUpdate, function (err) {
            if (err) throw err
            callback()
        })
    }

    static deleteContact(id, callback) {
        const queryDelete = `DELETE FROM Contacts
                             WHERE id = "${id}"`;

        db.run(queryDelete, function (err) {
            if (err) throw err
            const queryUpdate = `UPDATE ContactGroups SET contactId = NULL
                                 WHERE contactId = ${id}`;
            
            db.run(queryUpdate, function (err) {
                if (err) throw err
                callback()
            })
        })
    }

    static showContacts(id, callback) {
        const queryShow = `SELECT Contacts.name, Contacts.company_name, Contacts.phone_number, Contacts.email, Groups.name AS GroupName
                           FROM Contacts
                           LEFT JOIN ContactGroups
                            ON Contacts.id = ContactGroups.contactId
                           LEFT JOIN Groups
                            ON ContactGroups.groupId = Groups.id
                            WHERE Contacts.id = ${id}
                            ORDER BY Contacts.name ASC`;

        db.all(queryShow, function (err, data) {
            if (err) throw err
            callback(data)
        })
    }

    static assignContact(contactName, groupName, callback) {
        const querycontactId = `SELECT id AS ContactId FROM Contacts
                                WHERE name = "${contactName}"`;

        const querygroupId = `SELECT id AS GroupId FROM Groups
                              WHERE name = "${groupName}"`;

        db.get(querycontactId, function (err, contactData) {
            if (err) {
                throw err
            } else {
                // console.log(contactData)
                db.get(querygroupId, function (err, groupData) {
                    if (err) {
                        throw err
                    } else {
                        // console.log(groupData)
                        const queryAssign = `INSERT INTO ContactGroups (contactId, groupId)
                                             VALUES ("${contactData.ContactId}", "${groupData.GroupId}")`;
        
                        db.run(queryAssign, function (err) {
                            if (err) throw err
                            callback()
                        })

                    }
                })

            }
        })
    }
}

module.exports = Contact;