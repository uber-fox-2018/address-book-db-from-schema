const fs = require('fs')
const db = require('../db')

class Group {

    static create(groupName, callback) {
        let queryCreate = `INSERT INTO Groups (groupName)
                           VALUES ("${groupName}");`
                           db.run(queryCreate, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null,groupName)
    }

    static update (id, groupName, callback) {
        let queryUpdate = `UPDATE Groups
                           SET groupName = "${groupName}" 
                           WHERE id = "${id}"`
                           db.run(queryUpdate, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null, groupName)
    }

    static delete (id, callback) {
        let queryDelete = `DELETE FROM Groups 
                           WHERE id = ${id}`
                           db.run(queryDelete, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null, id)

    }

    static show (callback) {
        let queryShow = `SELECT * FROM Groups`
                         db.each(queryShow, (err, data) => {
                             if(err) {
                                err.message;
                             }else {
                                callback(null, data)
                             }
                         })
                        
    }

    static transfer (callback) {
        let groups = JSON.parse(fs.readFileSync('./data/groups.json', 'utf8'))

        db.serialize(() => {
            for(let i=0; i<groups.length; i++){
                let query = `INSERT INTO Groups (groupName) VALUES ("${groups[i].groupName}")`

                db.run(query, (err) => {
                    if(err) throw err.message
                })
            }
            callback(null)
        })
        
    }

}

module.exports = Group;