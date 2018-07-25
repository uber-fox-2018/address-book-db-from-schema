const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class ContactGroup {
    static assign(contactId, groupId, callback) {
        let query_assign = `INSERT INTO ContactsGroups (contactId, groupId) VALUES ("${contactId}", "${groupId}")`
        db.run(query_assign, function(err) {
            if (err) {
                callback(err,null)
            } else {
                callback(null,null)
            }
        })
    }
}

module.exports = ContactGroup