const db = require('./db')
const fs = require('fs')

class ContactGroup{

    static assignContact(contactId,groupId,cb){
        let query = `insert into ContactGroups(contactId,groupId) values("${contactId}","${groupId}")`

        db.serialize(function(){
            db.run(query,function(err){
                if (err) {
                    throw err
                }
                cb()
            })
        })
    }

}

module.exports = ContactGroup