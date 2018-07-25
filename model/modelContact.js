// const ControllerAll = require('../controller/controllerAll')
// const ControllerContact = ControllerAll.ControllerContact
const fs = require('fs')
const db = require('./db.js')

class ModelContact{
    static insertData(){
        let contact = JSON.parse(fs.readFileSync('../dataRandom.json','utf8'))
        // console.log(contact);
        for (let i in contact) {
            // let contactInsert = contact[i]
            // console.log(contact[i]);
            let name = contact[i].name
            let office = contact[i].office
            let phone = contact[i].phone
            let email = contact[i].email

            let queryInsert = `INSERT INTO Contacts (name,office,phone,email) 
                                VALUES ("${name}","${office}","${phone}","${email}")`

            // console.log(queryInsert)
            db.serialize(function(){
                 db.run(queryInsert, function(err){
                        if(err) throw err
                        
                        })
                    })
        }
        
    }
    static mc_addContact(name,office,phone,email, cb){
        db.serialize(function(){
            let queryMcAdd = `INSERT INTO Contacts (name,office,phone,email) 
                         VALUES ("${name}","${office}","${phone}","${email}")`
        
            db.run(queryMcAdd, function(err){
                if(err){
                    cb(err,null)
                } else {
                    let contact = new ModelContact(name,office,phone,email)
                    cb(null,contact)
                }
            })
        })
    }

    static mc_updateContact(id,name,office,phone,email,cb){
        let queryUpdatedData = `UPDATE Contacts SET name = "${name}", office = "${office},
                                phone = ${phone}", email = "${email}" WHERE id = ${id}`


        db.serialize(function(){
            db.run(queryUpdatedData,function(err){
                if (err){
                    cb(err,null)
                } else {
                    cb(null,err)
                }
            })
           
        })
    }

    static mc_removeContact(id,cb){
        let queryRemove = `DELETE FROM Contacts WHERE id = ${id}`

        db.serialize(function(){
            db.run(queryRemove, function(err){
                if(err) throw err.message
            })
            cb(null,id)
        })
    }


}

// ModelContact.insertData()

module.exports = ModelContact