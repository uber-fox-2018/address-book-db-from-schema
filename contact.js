let fs = require('fs')
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./address.db')
class Contact {
    static create() {
        let dataContactsString = fs.readFileSync('./contacts.json')
        let dataContactsObj = JSON.parse(dataContactsString)

        
        db.serialize(() => {
            dataContactsObj.forEach(element => {
                
                let query = `INSERT INTO contacts (name,phoneNumber,email)
                        VALUES ('${element.name}','${element.phoneNumber}','${element.email}')`
                db.run(query,() =>{
                    console.log('succsess')
                })
            });

        })
    }

    static update() {

    }

    static delete() {

    }
}

Contact.create()