const db = require('./model/db')

class Table{

    static createContact(){
        let query = `create table Contacts(
                    id integer not null primary key autoincrement,
                    company varchar,
                    phone_number integer,
                    email text unique)`
        db.run(query,function(err){
            if(err)throw err
        })
    }

    static createGroup(){

    }

}

Table.createContact()
