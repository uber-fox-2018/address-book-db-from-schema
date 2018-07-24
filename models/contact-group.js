const fs = require('fs')
const db = require('../db')

class ContactGroup {

    static transfer (callback) {
        let contactGroups = JSON.parse(fs.readFileSync('./data/contactGroups.json', 'utf8'))
        
        db.serialize(() => {
            for(let i=0; i<contactGroups.length; i++){
                let query = `INSERT INTO ContacGroups (contactId, groupId)
                             VALUES (${contactGroups[i].contactId}, ${contactGroups[i].groupId})`
                db.run(query, (err) => {
                    if(err) throw err.message;
                })
            }
            callback(null)
        })
    }

    static show (groupName, callback) {
        let query = `SELECT name, telp, company, email FROM ContacGroups
                     INNER JOIN Groups
                        ON Groups.id = ContacGroups.groupId
                     INNER JOIN Contacts
                        ON Contacts.id = ContacGroups.contactId
                     WHERE Groups.groupName = "${groupName}"`
                     db.all(query, (err, data) => {
                        if(err) throw err.message;
                        callback(data)
                     })
    }

    static assign (contactId, groupId, callback) {
        let query = `INSERT INTO ContacGroups (contactId, groupId)
                     VALUES (${contactId}, ${groupId})`
                     db.run(query, (err) => {
                         if(err) throw err.message
                     })
                     callback(null)
    }

}

module.exports = ContactGroup;
