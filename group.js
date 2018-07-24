var sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('database.db')

class Group{
    static createGroup(name,cb){
        let query = `INSERT INTO groups(name) values ('${name}')`;
        db.run(query,(err) =>{
            cb('group',name)
        })        
    }
}

module.exports = Group