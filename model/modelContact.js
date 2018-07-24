// const ControllerAll = require('../controller/controllerAll')
// const ControllerContact = ControllerAll.ControllerContact
const fs = require('fs')
const db = require('./db.js')

class ModelContact{

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


}

module.exports = ModelContact