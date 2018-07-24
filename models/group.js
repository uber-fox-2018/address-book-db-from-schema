const fs = require('fs')
const db = require('../db')

class Group {

    static create(name, callback) {
        let queryCreate = `INSERT INTO Groups (name)
                           VALUES ("${name}");`
                           db.run(queryCreate, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null,name)
    }

    static update (id, name, callback) {
        let queryUpdate = `UPDATE Groups
                           SET name = "${name}" 
                           WHERE id = "${id}"`
                           db.run(queryUpdate, (err) => {
                               if(err) throw err.message;
                           })
                           callback(null, name)
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
                let query = `INSERT INTO Groups (name) VALUES ("${groups[i].name}")`

                db.run(query, (err) => {
                    if(err) throw err.message
                })
            }
            callback(null)
        })
        
    }

}

module.exports = Group;