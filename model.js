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

    static delete(obj, cb){
        let query;
        for(let key in obj){
            if(key!=="id"){
                query = `DELETE FROM contacts WHERE ${key} = "${obj[key]}"`;
            }else{
                query = `DELETE FROM contacts WHERE ID = ${obj[key]}`;
            }
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err) cb(key, this.changes)
                })
            }) 
        }
    }

    static show(cb){
        let query = `SELECT name, company, phone, email, (SELECT name FROM groups WHERE ID = groupId) AS groupName FROM contacts
                     JOIN contactGroup
                     ON contacts.ID = contactGroup.contactId
                     ORDER BY name`;
        db.serialize(()=>{
            db.all(query, (err, data)=>{
                if(!err) cb(data)
            })
        })
    }
        
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
        let addToGroups = `INSERT INTO groups(name) VALUES (?)`;
        db.serialize(()=>{
            db.run(addToGroups, [obj.name], function(err){
                if(err) cb("error");
                if(!err) cb(this.lastID);
            })  
        })
        
    }

    static id(cb){
        let getLastID = `SELECT max(ID) as lastID FROM groups`;
        db.serialize(()=>{
            db.get(getLastID, (err, data)=>{
                if(err) cb("error")
                if(!err) cb(data.lastID)
            })
        })
    }
    static update(newValues, whereCondition, cb){
        for(let key in newValues){
            let query = `UPDATE groups SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err){
                        cb(this.changes);
                    }
                })
            })
        }
    }

    static delete(obj, cb){
        let query;
        for(let key in obj){
            if(key!=="id"){
                query = `DELETE FROM groups WHERE ${key} = "${obj[key]}"`;
            }else{
                query = `DELETE FROM groups WHERE ID = ${obj[key]}`;
            }
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err) cb(key, this.changes)
                })
            }) 
        }
    }

    static show(cb){
        let query = `SELECT name, (SELECT name FROM contacts WHERE ID = contactId) AS contactName FROM groups
                     JOIN contactGroup
                     ON groups.ID = contactGroup.contactId
                     ORDER BY name`;
        db.serialize(()=>{
            db.all(query, (err, data)=>{
                if(!err) cb(data)
            })
        })
    }
      
}

class ContactGroups{
    static save(objArr, cb){
        let addToContactGroup = `INSERT INTO contactGroup(contactId, groupId) VALUES (?, ?)`;
        db.serialize(()=>{
           objArr.forEach(contactGroup=>{
               db.run(addToContactGroup,[contactGroup.contactId, contactGroup.groupId], function(err){
                    if(err) cb("error");
                    if(!err) cb(this.lastID);
               })
           })         
        })   
    }

    static create(obj, cb){
        let addToContactGroup = `INSERT INTO contactGroup(contactId, groupId) VALUES (?, ?)`;
        db.serialize(()=>{
            db.run(addToContactGroup, [obj.contactId, obj.groupId], function(err){
                if(err) cb("error");
                if(!err) cb(this.lastID);
            })  
        })
        
    }

    static id(cb){
        let getLastID = `SELECT max(ID) as lastID FROM contactGroup`;
        db.serialize(()=>{
            db.get(getLastID, (err, data)=>{
                if(err) cb("error")
                if(!err) cb(data.lastID)
            })
        })
    }

    static update(newValues, whereCondition, cb){
        for(let key in newValues){
            let query = `UPDATE contactGroup SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err){
                        cb(this.changes);
                    }
                })
            })
        }
    }

    static delete(obj, cb){
        let query;
        for(let key in obj){
            if(key!=="id"){
                query = `DELETE FROM contactGroup WHERE ${key} = "${obj[key]}"`;
            }else{
                query = `DELETE FROM contactGroup WHERE ID = ${obj[key]}`;
            }
            db.serialize(()=>{
                db.run(query, function(err){
                    if(!err) cb(key, this.changes)
                })
            }) 
        }
    }
      
}

module.exports = {
    Contacts : Contacts,
    Groups : Groups,
    ContactGroups : ContactGroups
};


