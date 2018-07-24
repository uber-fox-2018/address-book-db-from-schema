// const ControllerAll = require('../controller/controllerAll')
// const ControllerContact = ControllerAll.ControllerContact
const fs = require('fs')
const db = require('./db.js')

class ModelContact{
    static insertData(){
        let contact = JSON.parse(fs.readdirSync('./dataRandom.json','utf8'))

        for(let i = 0; i < contact.length;i++){
            let contactInsert = contact[i].split(',')
            let name = contactInsert[0]
            let office = contactInsert[1]
            let phone = contactInsert[2]
            let email = contactInsert[3]

        let queryInsert = `INSERT INTO Contacts (name,office,phone,email) 
                           VALUES ("${name}","${office}","${phone}","${email}")`

            db.serialize(function(){
               db.run(queryInsert, function(err){
                    if(err) throw err
                
                })
            })
        }
        db.serialize(function(){
            db.run(queryInsert, function(err){
                if(err) throw err

            })
        })
        
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
                    cb(null,)
                }
            })
           
        })
    }


}
insertData()

module.exports = ModelContact