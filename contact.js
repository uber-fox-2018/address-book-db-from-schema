var sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('database.db')

class Contact{
    static createcontact(data, cb){
        let query = `INSERT INTO contacts(name,company,phone_number,email) VALUES ("${data[0]}","${data[1]}","${data[2]}","${data[3]}")`
        db.run(query,(err) =>{
            cb('contact',data[0])
        })
    }
    static update(data,cb){
        let query = `UPDATE contact SET ${data[1]} = ${data.slice(3).join(' ')} WHERE id = ${data[0]}`

        db.run(query,(err) =>{
            cb(data)
        })
        
        // `UPDATE employee SET login_status = 'true' WHERE id = ${dataLogin.id}`
    }
}

module.exports = Contact