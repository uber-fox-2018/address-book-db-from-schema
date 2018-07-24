const Contact = require('./contact')
const db = require('../db')

class ContactModel {
  static save(data, callback) {
    let contact = new Contact(data[0], data[1], data[2], data[3])
    let queryInsert = `INSERT INTO Contacts (name, perusahaan, number_phone, email)
                       VALUES ("${contact.name}", "${contact.perusahaan}", "${contact.number_phone}", "${contact.email}")`

    db.run(queryInsert, (err) => {
      if (err) {
        callback(err, null)
      } else {
        db.all(`SELECT COUNT(*) AS totalContact FROM Contacts`, (err, data) => {
          if (err) throw err
          let totalContact = data[0].totalContact
          let message = {"name": contact.name, "totalContact": totalContact}
          callback(null, message)
        })
      }
    })
  }

  static update(data, callback) {
    let dataSplit = data[1].split(':')
    let id = Number(data[0])
    let column = dataSplit[0]
    let value = dataSplit[1]
    
    let queryUpdate = `UPDATE Contacts SET ${column} = "${value}" WHERE id = ${id}`

    db.run(queryUpdate, (err) => {
      if (err) {
        let messageErr = {msgErr: `${column}`}
        callback(messageErr, null)
      } else {
        let data = {"id": id}
        callback(null, data)
      }
    })
  }

  static remove(data, callback) {
    let dataSplit = data[0].split(':')
    let name = dataSplit[1]
    let queryDelete = `DELETE FROM Contacts WHERE name = "${name}"`
    let queryFind = `SELECT * FROM Contacts WHERE name = "${name}"`

    db.all(queryFind, (err, data) => {
      if (err) {
        throw err;
      } else {
        if (data.length === 1) {
          db.run(queryDelete, (err) => {
            if (err) {
              callback(err, null)
            } else {
              let data = {"name": name}
              callback(null, data)
            }
          })
        } else {
          let messageErr = {messageErr: 'The Contact has been deleted'}
          callback(messageErr, null)
        }
      }
    })
  }

  static find(data, callback) {
    let op = data[data.length-1].split(':')[1]
    for (let i = 0; i < data.length-1; i++) {
      let split = data[i].split(':')
      let column = split[0]
      let value = split[1]
      let operator = ''

      switch(op) {
        case 'like': {
          operator = `LIKE "%${value}%"`
          break
        }
        case 'equal': {
          operator = `= "${value}"`
          break
        }
        case 'not like': {
          operator = `NOT LIKE "%${value}%"`
          break
        }
      }

      let query = `SELECT * FROM Contacts WHERE ${column} ${operator}`
      
      db.all(query, (err, data) => {
        if (err) {
          throw err
        } else {
          if (data.length === 0) {
            let message = {messageInfo: `Data tidak ditemukan`}
            callback(message, null)
          } else {
            callback(null, data)
          }
        }
      })
      
    }
  }
}

module.exports = ContactModel