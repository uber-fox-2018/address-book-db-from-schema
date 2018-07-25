const db = require('./conf')

class Contact {
    constructor(name, company, phone, email){
        this.table = 'contacts'
        this.name  = name
        this.company = company
        this.phone = phone
        this.email = email
    }

    readContact(cbRead){
        let query = `SELECT * FROM ${this.table}`
        db.all(query, (err, data) => {
            cbRead(data)
        })
    }

    addContact(name, company, phone, email, cbAddContact){
        this.name       = name
        this.company    = company
        this.phone      = phone
        this.email      = email
        let message

        let query = `INSERT INTO ${this.table} (name, company_name, phone, email) 
                     VALUES ("${this.name}", "${this.company}", "${this.phone}", "${this.email}")`

        db.serialize(() => {
            db.run(query, (err) => {
                if(!err)message = 'Insert Data Contact Success'
                else message = 'Insert Data Contact Failed'
                cbAddContact(message)
            })
        })
    }

    upContact(id, name, company, phone, email, cbUpdateContact){
        this.id         = id
        this.name       = name
        this.company    = company
        this.phone      = phone
        this.email      = email
        let message

        let query = `UPDATE ${this.table} SET
                     name = "${this.name}", company_name = "${this.company}", phone = "${this.phone}", email = "${this.email}"
                     WHERE id = "${this.id}"`
        
        db.run(query, (err) => {
            if(!err) message = 'Update Contact ${this.name} Success'
            else message = 'Update Contact ${this.name} Failed' 
            cbUpdateContact(message)
        })
    }

    delContact(id, cbDeleteContact){
        this.id = id
        let message

        let query = `DELETE FROM ${this.table} WHERE id = "${this.id}"`

        db.run(query, (err) => {
            if(!err) message = 'Delete Contact Success'
            else message = 'Delete Contact Failed' 
            cbDeleteContact(message)
        })
    }

}

module.exports = Contact