const db = require('../db.js')
const fs = require('fs')

class Contact {
    static readFileJSON() {
        let data = fs.readFileSync('../dataJSON/contact.json', 'utf8')
        let convertData = JSON.parse(data)
        return convertData
    }

    static seedData() {
        let data = this.readFileJSON()
        for (let i = 0; i < data.length; i++) {
            db.run(`INSERT INTO Contacts (name, company_name, phone_number, email) 
                    VALUES ("${data[i].name}", "${data[i].company_name}", "${data[i].phone_number}", "${data[i].email}")`, function(err) {
                        if (err) throw err
                        console.log(`success seed data`)
                    })
        }
    }

    static addContact(name, company_name, phone_number, email, callback) {
        let query_add_data = `INSERT INTO Contacts (name, company_name, phone_number, email) VALUES ("${name}", "${company_name}", "${phone_number}", "${email}")`
        db.run(query_add_data, function(err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, null)
            }
        })
    }

    static editContact(id, column, newValue, callback) {
        let query_edit = `UPDATE Contacts SET ${column} = "${newValue}" WHERE "${id}"`
        db.run(query_edit, function (err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null,null)
            }
        })
    }

    static deleteContact(id, callback) {
        let query_delete = `DELETE FROM Contacts WHERE id = "${id}"`
        db.run(query_delete, function(err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null,null)
            }
        })
    }
}

module.exports = Contact