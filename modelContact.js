let fs = require('fs')
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./address.db')

class ModelContact {
    static initData() {
        let dataContactsString = fs.readFileSync('./contacts.json')
        let dataContactsObj = JSON.parse(dataContactsString)

        db.serialize(() =>{
            dataContactsObj.forEach(contact => {
                let query = `INSERT INTO contacts (name,phoneNumber,email)
                             VALUES ('${contact.name}','${contact.phoneNumber}','${contact.email}')`
                db.run(query, () => { })
            });
        })
    }

    static setup() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS contacts 
                (contactId INTEGER PRIMARY KEY AUTOINCREMENT,
                 name VARCHAR, 
                 phoneNumber INTEGER, 
                 email VARCHAR);`);
        })
    }

    static createContact(name, phoneNumber, email, cb) {
        let query = `INSERT INTO contacts (name,phoneNumber,email)
                     VALUES ('${name}','${phoneNumber}','${email}')`

        db.run(query, (err,data) => {
            if(err){
                cb(err)
            }
            else {
                cb(`succsessfully created a new contact : ${name} ,${phoneNumber} ,${email} `)
            }
         })

    }

    static showGroupInContact(name, cb) {
        let query = `SELECT contacts.name,contacts_group.contactId,
        contacts_group.groupId,contacts.email,contacts.phoneNumber,groups.groupName
        FROM contacts
        join contacts_group 
        ON contacts.contactId = contacts_group.contactId
        join groups on contacts_group.groupId = groups.groupId
        WHERE contacts.contactId = (select contactId from contacts where name = '${name}')
        ORDER BY name`

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

    static updateContact(contactId, name, phoneNumber, email, cb) {
        let query = `UPDATE contacts
                    SET name = '${name}', phoneNumber = '${phoneNumber}',email = ${email}
                    WHERE contactId = ${contactId}`
        db.run(query, () => { })
    }
    //DELETE ------->

    static deleteContact(contactId, cb) {
        let query = `SELECT contacts.name,groups.groupName
                FROM contacts
                join contacts_group 
                ON contacts.contactId = contacts_group.contactId
                join groups on contacts_group.groupId = groups.groupId
                WHERE contacts.contactId = '${contactId}'
                ORDER BY name`
                db.all(query,(err,data)=>{
                    if(err){
                        cb(err)
                    }
                    else{
                        cb(data)
                    }                    
                })
        
        let delete_contact = `DELETE FROM contacts
                     WHERE contactId = ${contactId}`

        db.run(delete_contact, () => {
            let delete_group = `DELETE FROM contacts_group
            WHERE contactId = ${contactId}`
            db.run(delete_group, () => { })
        })
    }
}

module.exports = ModelContact