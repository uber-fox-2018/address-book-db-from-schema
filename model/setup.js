const db = require('./db')

class Table{

    static createContact(){
        let query = `create table Contacts(
                    id integer not null primary key autoincrement,
                    name varchar,
                    company varchar,
                    phone_number integer,
                    email text unique)`
        db.run(query,function(err){
            if(err)throw err
        })
    }

    static createGroup(){
        let query = `create table Groups(
            id integer not null primary key autoincrement,
            groupName varchar)`
        db.run(query,function(err){
            if(err)throw err
        })
    }

    static createContactGroups(){
        let query = `create table ContactGroups(
            id integer not null primary key autoincrement,
            contactId integer,
            groupId integer,
            foreign key(contactId) references Contacts(id),
            foreign key(groupId) references Groups(id)
        )`

        db.run(query,function(err){
            if(err) throw err
        })
    }

}

Table.createContact()
Table.createGroup()
Table.createContactGroups()