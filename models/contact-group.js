const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class ContactGroup {
    static assign(contactId, groupId, callback) {
        let query_assign = `INSERT INTO ContactsGroups (contactId, groupId) VALUES ("${contactId}", "${groupId}")`
        db.run(query_assign, function(err) {
            if (err) {
                callback(err,null)
            } else {
                callback(null,this)
            }
        })
    }

    static show(callback) {
        let query_show = `SELECT name, company_name, phone_number, email, groupName FROM Contacts
                            INNER JOIN ContactsGroups ON Contacts.Id = ContactsGroups.contactId
                            INNER JOIN Groups ON ContactsGroups.groupId = Groups.Id`

        db.all(query_show, function(err,data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }
}

module.exports = ContactGroup