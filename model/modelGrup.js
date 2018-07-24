const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')


class Grup{
    static insert(namaGrup,cb){
        var query = `INSERT INTO grup VALUES (null, "${namaGrup}")`
        db.run(query, (err)=>{
            if(err){
                var err = {message : `insert data failed`}
                cb(err)
            }else{
                cb()
            }
        })
    }

    static update(id,namaGrup,cb){
        var querySearch = `SELECT * FROM grup WHERE id = ${id}`
        var qUpdate = `UPDATE grup
                        SET nama = "${namaGrup}"
                        WHERE id = ${id}`
        
        db.get(querySearch,(err,data)=>{
            if(err){
                var err = {message : 'id not found'}
                cb(err)
            }else if(data === undefined){
                var err = {message : 'id not found'}
                cb(err)
            }else{
                db.run(qUpdate,(err)=>{
                    if(err){
                        var err = {message : 'update failed'}
                        cb(err)
                    }else{
                        cb()
                    }
                })
            }
        })
    }

    static delete(id,cb){
        var query = `DELETE FROM grup WHERE id = ${id}`
        var qSearch = `SELECT * FROM grup WHERE id = ${id}`
        var qIdConjunction = `DELETE FROM kontak_grup
                              WHERE grup_id = ${id}`

        db.get(qSearch,(err,data)=>{
            if(err){
                var err = {message : 'id not found'}
                cb(err)
            }else if(data === undefined){
                var err = {message : 'id not found'}
                cb(err)
            }else{
                db.run(qIdConjunction)
                db.run(query,(err)=>{
                        if(err){
                            var err = {message : 'delete failed'}
                            cb(err)
                        }else{
                            cb()
                        }
                })
            }
        })

    }

    static findGrup(column,value,cb){
        if(column === 'id'){
            var query = `SELECT * FROM grup WHERE ${column} = ${value}`
        }else{
            var query = `SELECT * FROM grup WHERE ${column} = "${value}"`
        }

        db.get(query,(err,data)=>{
            if(err){
                var err = {message : 'data not found'}
                cb(err,data)
            }else if (data === undefined){
                var err = {message : 'data not found'}
                cb(err,data)
            }else{
                cb(err,data)
            }
        })
    }
}

module.exports = Grup