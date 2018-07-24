const db = require('./db')
const fs = require('fs')

class Contact {
    static readFile(){
        let data = fs.readFileSync('../data_json/contacts.json')
        let convertedData = JSON.parse(data)

        return convertedData
    }

    static seedData(){
        let data = this.readFile()
        for (let i = 0; i < 20; i++) {
            db.serialize(function(){
                db.run(`INSERT INTO Contacts (name,company,phone,email) 
                        VALUES ("${data[i].name}", "${data[i].company}","${data[i].phone}","${data[i].email}")`,function(err){
                            if (err) throw err
                            console.log(`sukses`);  
                        })
            })
        }
    }

    static addData(name,company,phone,email,callback){
        let query = `INSERT INTO Contacts (name,company,phone,email) 
                     VALUES ("${name}","${company}","${phone}","${email}")`

        db.run(query,function(err){
            if (err) {
                callback(err,null)
            }else {
                let msg = {msg: `data successfully added`}
                callback(null,msg)
            }
        })
    }

    static deleteData(id,callback){
        let query = `DELETE FROM Contacts WHERE id = "${id}"`

        db.run(query,function(err){
            if (err) throw err
            let msg = {msg: `data successfully deleted`}
            callback(null,msg)
        })
    }

    static updateData(id,name,company,phone,email,callback){
        let query = `UPDATE Contacts SET 
                     name = "${name}",
                     company = "${company}",
                     phone = "${phone}",
                     email = "${email}"
                     WHERE id = "${id}"`

        db.run(query,function(err){
            if (err) throw err
            let msg = {msg: `data successfully updated`}
            callback(null,msg)
        })
    }
}

module.exports = Contact