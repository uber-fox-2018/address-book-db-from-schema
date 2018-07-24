const db = require('./db')
const fs = require('fs')

class Group {
    static readFile(){
        let data = fs.readFileSync('../data_json/groups.json')
        let convertedData = JSON.parse(data)

        return convertedData
    }

    static seedData(){
        let data = this.readFile()
        for (let i = 0; i < 10; i++) {
            db.serialize(function(){
                db.run(`INSERT INTO Groups (group_name) 
                        VALUES ("${data[i].group_name}")`,function(err){
                            if (err) throw err
                            console.log(`sukses`);  
                        })
            })
        }
    }

    static addData(group_name,callback){
        let query = `INSERT INTO Groups (group_name) 
                     VALUES ("${group_name}")`

        db.run(query,function(err){
            if (err) {
                callback(err,null)
            }else {
                let msg = {msg: `group successfully added`}
                callback(null,msg)
            }
        })
    }

    static deleteData(id,callback){
        let query = `DELETE FROM Groups WHERE id = "${id}"`

        db.run(query,function(err){
            if (err) throw err
            let msg = {msg: `group successfully deleted`}
            callback(null,msg)
        })
    }

    static updateData(id,group_name,callback){
        let query = `UPDATE Groups SET 
                     group_name = "${name}",
                     WHERE id = "${id}"`

        db.run(query,function(err){
            if (err) throw err
            let msg = {msg: `group successfully updated`}
            callback(null,msg)
        })
    }
}

module.exports = Group