const db = require('./conf')

class Contact {
    constructor(name, company, phone, email){
        this.table = 'contacts'
        this.name  = name
        this.company = company
        this.phone = phone
        this.email = email
    }

    addContact(name, company, phone, email, cbAddContact){
        this.name  = name
        this.company = company
        this.phone = phone
        this.email = email

        let query = `INSERT INTO ${this.table} (name, company_name, phone, email) 
                     VALUES ("${this.name}", "${this.company}", "${this.phone}", "${this.email}")`


        let message
        db.serialize(() => {
            db.run(query, function(err){
                if(!err) {
                    message = 'Insert Data Contact Success'
                } else {
                    message = 'Insert Data Contact Failed'
                }
                cbAddContact(message)
            })
        })
    }

}

module.exports = Contact