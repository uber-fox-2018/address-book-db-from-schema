const db = require('../db')

class  ContactGroup {
  static showContact(callback) {
    // menampilkan contact dan nama group
    let queryShowContact = `SELECT contact_name, perusahaan, email, Groups.name_group FROM ContactGroups, (
                              SELECT 
                                Contacts.name AS contact_name, 
                                Contacts.perusahaan AS perusahaan,
                                Contacts.email As email,
                                Contacts.number_phone AS phone,
                                ContactGroups.contact_id
                              FROM Contacts
                              JOIN ContactGroups
                              ON Contacts.id = ContactGroups.contact_id
                              GROUP BY contact_id
                            ) AS newContactGroup
                            JOIN Groups
                            ON ContactGroups.group_id = Groups.id
                            WHERE ContactGroups.contact_id = newContactGroup.contact_id`

    db.all(queryShowContact, (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static showGroup(callback) {
    // menampilkan nama group dan nama contact
    let queryShowGroup = `SELECT name_group, name FROM Groups
                          JOIN ContactGroups
                          ON Groups.id = ContactGroups.group_id
                          JOIN Contacts
                          ON ContactGroups.contact_id = Contacts.id
                          `

    db.all(queryShowGroup, (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    })
  }

  static assignContact(data, callback) {
    let name = data[0]
    let group = data[1]

    let qContact = `SELECT id AS contact_id FROM Contacts WHERE name LIKE "%${name}%"`
    let qGroup = `SELECT id AS group_id FROM Groups WHERE name_group LIKE "%${group}%"`

    db.all(qContact, (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        let contact_id = data[0].contact_id
    
        db.all(qGroup, (err, data) => {
          if (err) {
            callback(err, null)
          } else {
            let group_id = data[0].group_id
            
            let qInsertContactGrou = `INSERT INTO ContactGroups (contact_id, group_id)
                                      VALUES ("${contact_id}", "${group_id}")`
            
            db.run(qInsertContactGrou, (err) => {
              if (err) {
                callback(err, null)
              } else {
                callback(null)
              }
            })
          }

        })
      }
      
    })
  }
}

module.exports = ContactGroup