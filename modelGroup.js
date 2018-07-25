let fs = require('fs')
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./address.db')

class ModelGroup {
    static initData() {
        let dataGroupsString = fs.readFileSync('./group.json')
        let dataGroupsObj = JSON.parse(dataGroupsString)

        db.serialize(() => {
            dataGroupsObj.forEach(group => {
                let query = `INSERT INTO groups (groupName)
                                 VALUES ('${group.name}')`
                db.run(query, () => { })
            });
        })
    }

    static setup() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS groups 
                (groupId INTEGER PRIMARY KEY AUTOINCREMENT,
                    groupName VARCHAR);`);
        })
    }

    static createGroup(name, cb) {
        let query = `INSERT INTO groups (groupName)
                     VALUES ('${name}')`

        db.run(query, (err, data) => {
            if (err) {
                cb(err)
            }
            else {
                cb(`succsessfully created a new group : "${name}"`)
            }
        })
    }
    static showContactInGroup(nameGroup, cb) {
        let query = `SELECT groups.groupName,contacts.name,contacts.phoneNumber,contacts.email FROM groups
        join contacts_group ON groups.groupId = contacts_group.groupId
        join contacts on contacts.contactId = contacts_group.contactId
        where groups.groupName = "${nameGroup}"
        ORDER BY groups.groupName`

        db.all(query, (err, data) => {
            if(err){
                cb(err)
            }
            else{
                cb(data)
            }
        })
    }
    //UPDATE ------->

    static updateGroup(groupId, groupName, cb) {
        let query = `UPDATE groups
                    SET groupName = '${groupName}'
                    WHERE groupId = '${groupId}'`
        db.run(query, () => { })
    }
    //DELETE -------->

    static deleteGroup(groupId, cb) {

        let query = `SELECT groups.groupName, contacts.name FROM groups
        join contacts_group on contacts_group.groupId = groups.groupId
        join contacts on contacts_group.contactId = contacts.contactId
        WHERE groups.groupId = '${groupId}'`

        db.all(query, (err, data) => {
            if (err) {
                cb(err)
            }
            else {
                cb(data)
            }
        })

        let delete_group = `DELETE FROM groups
                     WHERE groupId = ${groupId}`
        db.run(delete_group, () => {
            let delete_contactGroup = `DELETE FROM contacts_group
            WHERE groupId = ${groupId}`
            db.run(delete_contactGroup, () => { })
        })
    }
}

module.exports = ModelGroup