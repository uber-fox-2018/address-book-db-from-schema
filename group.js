const fs = require('fs');
const db = require('./db.js');

class Group {
    constructor(name) {
        this.id = null
        this.name = name
    }

    static transferGroups(callback) {
        var groups = JSON.parse(fs.readFileSync('datagroups.json', 'utf8'));

        db.serialize(function () {
            for (let i = 0; i < groups.length; i++) {
                const queryTransfer = `INSERT INTO Groups (name)
                                       VALUES ("${groups[i].name}")`;
                db.run(queryTransfer, function (err) {
                    if (err) throw err
                })
            }
            callback();
        })
    }

    static createGroup(name, callback) {
        let group = new Group(name);
        const queryCreate = `INSERT INTO Groups (name)
                             VALUES ("${group.name}")`;

        db.run(queryCreate, function (err) {
            if (err) throw err
            callback()
        })
    }

    static updateGroup(id, column_name, value_edited, callback) {
        const queryUpdate = `UPDATE Groups SET "${column_name}" = "${value_edited}"
                             WHERE id = "${id}"`;

        db.run(queryUpdate, function (err) {
            if (err) throw err
            callback()
        })
    }

    static deleteGroup(id, callback) {
        const queryDelete = `DELETE FROM Groups
                             WHERE id = ${id}`;

        db.run(queryDelete, function (err) {
            if (err) throw err
            const queryUpdate = `UPDATE ContactGroups SET GroupId = NULL
                                 WHERE groupId = ${id}`;

            db.run(queryUpdate, function (err) {
                if (err) throw err
                callback()
            })
        })
    }

    static showGroups(name, callback) {
        const queryShow = `SELECT Groups.name, contactId FROM Groups
                           JOIN ContactGroups ON Groups.id = ContactGroups.groupId
                           WHERE Groups.name = "${name}"
                           ORDER BY Groups.id ASC`;

        db.all(queryShow, function (err, data) {
            if (err) throw err
            callback(data)
        })
    }

}

module.exports = Group;