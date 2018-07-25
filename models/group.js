const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')
const fs = require('fs')

class Group {
    static readFileJSON() {
        let data = fs.readFileSync('../dataJSON/group.json', 'utf8')
        let convertData = JSON.parse(data)
        return convertData
    }

    static seedData() {
        let data = this.readFileJSON()
        for (let i = 0; i < data.length; i++) {
            db.run(`INSERT INTO Groups (groupName) VALUES ("${data[i].name}")`, function(err) {
                if (err) throw err
                console.log(`success add data group json`)
            })
        }
    }

    static addGroup(groupName, callback) {
        let queryAdd = `INSERT INTO Groups (groupName) VALUES ("${groupName}")`
        db.run(queryAdd, function(err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, this)
            }
        })
    }

    static editGroup(id, column, newValue, callback) {
        let query_edit = `UPDATE Groups SET ${column} = "${newValue}" WHERE id = "${id}"`
        db.run(query_edit, function (err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null,this)
            }
        })
    }

    static deleteGroup(id, callback) {
        let query_delete = `DELETE FROM Groups WHERE id = "${id}"`
        db.run(query_delete, function(err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null,this)
            }
        })
    }
}

module.exports = Group