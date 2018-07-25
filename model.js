let fs = require('fs')
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./address.db')

class ModelContactGroup {
    static initData() {
        
        let dataContactGroupsString = fs.readFileSync('./contact-group.json')
        let dataContactGroupsObj = JSON.parse(dataContactGroupsString)

        db.serialize(() => {
            dataContactGroupsObj.forEach(contactGroup => {
                let query = `INSERT INTO contacts_group (groupId,contactId)
                                 VALUES ('${contactGroup.groupId}','${contactGroup.contactId}')`
                db.run(query, () => { })
            });
        })
    }

    static setup() {
        db.serialize(() => {
         
            db.run(`CREATE TABLE IF NOT EXISTS contacts_group 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                groupId INTEGER,
                contactId INTEGER);`)
        })
    }
    
    //assign contact to group
    static createContactGroup(groupId, contactId, cb) {
        let query = `INSERT INTO contacts_group (groupId,contactId)
                     VALUES ('${groupId}','${contactId}')`

        db.run(query, (err,data) => { 
            if(err){
                cb(err)
            }
            else{
                let query = `SELECT contacts.name,groups.groupName FROM contacts_group
                join contacts ON contacts.contactId = contacts_group.contactId
                join groups ON contacts_group.groupId = groups.groupId
                WHERE contacts_group.contactId = '${contactId}' AND contacts_group.groupId = '${groupId}'`
                db.get(query,(err,data)=>{
                    if(err){
                        cb(err)
                    }
                    else{
                        cb(data)
                    }
                })
               
            }
        })
    }
        
    //UPDATE ------->
    static updateContactGroups(id, groupId, contactId, cb) {
        let query = `UPDATE contacts_group
                    SET groupId = '${groupId}', contactId = '${contactId}'
                    WHERE id = ${id}`
        db.run(query, () => { })
    }

    //DELETE ------->
    static deleteContactGroup(id, cb) {
        let delete_group = `DELETE FROM contacts_group
                     WHERE id = ${id}`
        db.run(delete_group, () => { })
    }


}

module.exports = ModelContactGroup
