const db = require('./conf')

class Group {
    constructor(){
        this.table = 'groups'
    }

    readGroup(cbRead){
        let query = `SELECT * FROM ${this.table}`

        db.all(query, (err, data) => {
            cbRead(data)
        })
    }

    addGroup(name, cbAddGroup){
        this.name  = name
        let message

        let query = `INSERT INTO ${this.table} (name) 
                     VALUES ("${this.name}")`

        db.serialize(() => {
            db.run(query, (err) => {
                if(!err) message = 'Insert Data Group Success'
                else message = 'Insert Data Group Failed'
                cbAddGroup(message)
            })
        })
    }

    upGroup(id, name, cbUpdateGroup){
        this.id   = id
        this.name = name
        let message

        let query = `UPDATE ${this.table} SET 
                     name = "${this.name}" WHERE id = "{this.id}"`

        db.run(query, (err)=>{
            if(!err) message = `Update Group to ${this.name} Success`
            else message = 'Update Group Failed' 
            cbUpdateGroup(message)
        })
    }

    delGroup(id, cbDeleteGroup){
        this.id = id
        let message

        let query = `DELETE FROM ${this.table} WHERE id = "${this.id}"`

        db.run(query, (err) => {
            if(!err) message = 'Delete Group Success'
            else message = 'Delete Group Failed' 
            cbDeleteGroup(message)
        })
    }
    
}

module.exports = Group