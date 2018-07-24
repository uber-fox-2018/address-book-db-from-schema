const db = require('./db')
const fs = require('fs')

class GroupContact {
    static readFile(){
        let data = fs.readFileSync('../data_json/groups.json')
        let convertedData = JSON.parse(data)

        return convertedData
    }

    static seedData(){
        let data = this.readFile()
        for (let i = 0; i < data.length; i++) {
            db.serialize(function(){
                db.run(`INSERT INTO Groups (group_name) 
                        VALUES ("${data[i].group_name}")`,function(err){
                            if (err) throw err
                            console.log(`sukses`);  
                        })
            })
        }
    }

    static addGroupContact(contactId,groupId,callback){
        let query = `INSERT INTO groupContacts (contactId,groupId) VALUES ("${contactId}","${groupId}")`

        db.run(query,function(err){
            if (err) {
                callback(err,null)
            }else{
                let msg = {msg: `Contact with Id ${contactId} has been assign to Group with Id ${groupId}`}
                callback(null,msg)
            }
        })
    }
}

module.exports = GroupContact