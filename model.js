const db = require("./setup.js")

class Contacts{
    static save(objArr, cb){
        let addContacts = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        db.serialize(()=>{
           objArr.forEach(contact=>{
               db.run(addContacts,[contact.name, contact.company, contact.phone, contact.email], function(err){
                    if(err) cb("error");
                    if(!err) cb(this.lastID);
               })
           })         
        })   
    }

    static create(obj, cb){
        let addContact = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        db.serialize(()=>{
            db.run(addContact, [obj.name, obj.company, obj.phone, obj.email], function(err){
                if(err) cb("error");
                if(!err) cb(this.lastID);
            })  
        })
        
    }

    static id(cb){
        let getLastID = `SELECT max(ID) as lastID FROM contacts`;
        db.serialize(()=>{
            db.get(getLastID, (err, data)=>{
                if(err) cb("error")
                if(!err) cb(data.lastID)
            })
        })
    }
    static update(newValues, whereCondition, cb){
        for(let key in newValues){
            let query = `UPDATE contacts SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err){
                        cb(this.changes);
                    }
                })
            })
        }
    }
    static delete(){

    }

    // static show(){

    // }

    // static help(){

    // }
        
}

class Groups{
    static save(objArr, cb){
        let addToGroups = `INSERT INTO groups(name) VALUES (?)`;
        db.serialize(()=>{
           objArr.forEach(group=>{
               db.run(addToGroups,[group.name], function(err){
                    if(err) cb("error");
                    if(!err) cb(this.lastID);
               })
           })         
        })   
    }

    static create(obj, cb){
        let addContact = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        db.serialize(()=>{
            db.run(addContact, [obj.name, obj.company, obj.phone, obj.email], function(err){
                if(err) cb("error");
                if(!err) cb(this.lastID);
            })  
        })
        
    }

    static id(cb){
        let getLastID = `SELECT max(ID) as lastID FROM contacts`;
        db.serialize(()=>{
            db.get(getLastID, (err, data)=>{
                if(err) cb("error")
                if(!err) cb(data.lastID)
            })
        })
    }
    static update(newValues, whereCondition, cb){
        for(let key in newValues){
            let query = `UPDATE contacts SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err){
                        cb(this.changes);
                    }
                })
            })
        }
    }
    static delete(){

    }

    // static show(){

    // }

    // static help(){

    // }
      
}

class ContactGroups{
    static save(objArr, cb){
        let addContacts = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        db.serialize(()=>{
           objArr.forEach(contact=>{
               db.run(addContacts,[contact.name, contact.company, contact.phone, contact.email], function(err){
                    if(err) cb("error");
                    if(!err) cb(this.lastID);
               })
           })         
        })   
    }

    static create(obj, cb){
        let addContact = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        db.serialize(()=>{
            db.run(addContact, [obj.name, obj.company, obj.phone, obj.email], function(err){
                if(err) cb("error");
                if(!err) cb(this.lastID);
            })  
        })
        
    }

    static id(cb){
        let getLastID = `SELECT max(ID) as lastID FROM contacts`;
        db.serialize(()=>{
            db.get(getLastID, (err, data)=>{
                if(err) cb("error")
                if(!err) cb(data.lastID)
            })
        })
    }
    static update(newValues, whereCondition, cb){
        for(let key in newValues){
            let query = `UPDATE contacts SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err){
                        cb(this.changes);
                    }
                })
            })
        }
    }
    static delete(){

    }

    // static show(){

    // }

    // static help(){

    // }
      
}

module.exports = {
    Contacts : Contacts,
    Groups : Groups,
    ContactGroups : ContactGroups
};


