const db = require('./db')
const fs = require('fs')

class Contact {

    static add(name, company, phone, email, cb) {
        let query = `insert into Contacts (name,company,phone_number,email)
        values("${name}","${company}","${phone}","${email}")`

        db.serialize(function () {
            db.run(query, function (err) {
                if (err) {
                    throw err
                }
                cb(name,null)
            })
        })

    }

    static read(cb) {
        let query = `select * from Contacts`
        db.serialize(function(){
            db.all(query, function (err, data) {
                if (err) {
                    throw err
                }
                cb(data)
            })
        })

    }

    static update(id,column,value,cb) {
        let query = `update Contacts
        set "${column}" = "${value}"
        where id = "${id}"`

        db.serialize(function(){
            db.run(query,function(err){
                if(err){
                    throw err
                }
                cb(value,null)
            })
        })
    }

    static delete(id,cb) {
        let query = `delete from Contacts where id = "${id}"`

        db.serialize(function(){
            db.run(query, function (err) {
                if (err) {
                    throw err
                }
                cb(id,null)
            })
        })
    }



}

module.exports = Contact