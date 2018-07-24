const db = require('./database')


class ModelGroup {
    static insertGroup(name, callback) {
        let queryInsert = `
        INSERT INTO Groups (groupName)
        VALUES("${name}");
        `
        db.run(queryInsert, function(err) {
            (err) ? callback(err, null) : callback(null, this)
        })
    }

    static showGroups(callback) {
        let readQuery = `
        SELECT * FROM Groups`
        db.all(readQuery, function(err, data) {
            (err) ? callback(err, null) : callback(null, data)
        })
    }

    static editGroup(name, id, callback) {
        let editQuery = `
        UPDATE Groups 
        SET groupName = "${name}"
        WHERE id = ${id}`
        db.run(editQuery, function(err) {
            (err) ? callback(err, null) : callback(null, `Group has been chanced!`)
        })
    }

    static removeGroup(name, callback) {
        let selectQuery = `SELECT * FROM Groups WHERE groupName = "${name}"`
        db.get(selectQuery, function(err, row) {
            if(err) {
                callback(err, null)
            } else {
                let deleteConjuntionQuery = `DELETE FROM groupContacts WHERE groupId = ${row.id}`
                db.run(deleteConjuntionQuery)
                let deleteQuery = `
                DELETE FROM Groups
                WHERE groupName = "${row.groupName}"`
                db.run(deleteQuery, function(err) {
                    if(err) {
                        callback(err)
                    } else {
                        callback(null, `Group ${name} has been deleted!`)
                    } 
                })
            }
        })
    }
}

module.exports = ModelGroup