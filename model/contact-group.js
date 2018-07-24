const db = require('./database')

class ModelGroupContact {
    static insertGroupContact(contactName, groupName, callback) {
        let readContactsQuery = `SELECT * FROM Contacts`
        let readGroupsQuery = `SELECT * FROM Groups`
        db.each(readContactsQuery, function(err, rowData) {
            if(err) {
                callback(err, null);
            } else {
                if(rowData.name === contactName) {
                    db.each(readGroupsQuery, function(err, rowGroup) {
                        if(err) {
                            callback(err, null)
                        } else {
                            if(rowGroup.groupName === groupName) {
                                let insertQuery = `INSERT INTO groupContacts (contactId, groupId)
                                VALUES (${rowData.id}, ${rowGroup.id})`
                                db.run(insertQuery, function(err) {
                                    if(err) {
                                        callback(err, null)
                                    } else {
                                        callback(null, `Contact ${contactName} was added to Group ${groupName}`)
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    static showGroupContact(callback) {
        let showQuery = `SELECT groupContacts.id, Contacts.name, Groups.groupName FROM groupContacts
                            LEFT JOIN Contacts
                                ON groupContacts.contactId = Contacts.id
                            LEFT JOIN Groups
                                ON groupContacts.groupId = Groups.id`
        db.all(showQuery, function(err, data) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    static editGroupContact(nameContact, nameGroup, callback) {
        let readQuery = `SELECT Contacts.name AS contactName, Contacts.id AS cId, Groups.id AS gId, Groups.groupName, contactId, groupId FROM groupContacts
                        LEFT JOIN Contacts
                            ON groupContacts.contactId = Contacts.id
                        LEFT JOIN Groups
                            ON groupContacts.groupId = Groups.id`
        db.each(readQuery, function(err, dataNameGroup){
            if(err) {
                callback(err, null)
            } else {
                if(dataNameGroup.contactName === nameContact) {
                    let readGroupQuery = `SELECT * FROM Groups`
                    db.each(readGroupQuery, function(err, data) {
                        if(err) {
                            callback(err, null)
                        } else {
                            if(data.groupName === nameGroup) {
                                let editQuery = `UPDATE groupContacts
                                                SET groupId = ${data.id}
                                                WHERE contactId = ${dataNameGroup.cId}`   
                                db.run(editQuery, function(err) {
                                    if(err) {
                                        callback(err, null)
                                    } else {
                                        callback(null, `${nameContact} has move group to ${nameGroup}`)
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

    static removeGroupContact(id, callback) {
        let deleteQuery = `DELETE FROM groupContacts
                            WHERE id = ${id}`
        db.run(deleteQuery, function(err) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, `Data has been deleted`)
            }
        })
    }
}

module.exports = ModelGroupContact