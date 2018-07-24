const db = require('./db')
const fs = require('fs')

class Group {

    static add(name,cb) {
        let query = `insert into Groups (groupname)
        values("${name}")`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) {
                    throw err
                }
                cb(name, null)
            })
        })

    }

    static read(cb) {
        let query = `select * from Groups`
        db.serialize(function () {
            db.all(query, function (err, data) {
                if (err) {
                    throw err
                }
                cb(data)
            })
        })

    }

    static update(id, column, value, cb) {
        let query = `update Groups
        set "${column}" = "${value}"
        where id = "${id}"`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) {
                    throw err
                }
                cb(value, null)
            })
        })
    }

    static delete(id, cb) {
        let query = `delete from Groups where id = "${id}"`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) {
                    throw err
                }
                cb(id, null)
            })
        })
    }

}

module.exports = Group