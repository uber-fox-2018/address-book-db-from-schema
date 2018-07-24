const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')


class KontakGrup{
    static insert(kontak_id,grup_id,cb){
        var qKontakId = `SELECT * FROM kontak WHERE id = ${kontak_id}`
        var qGrupId = `SELECT * FROM grup where id = ${grup_id}`
        var query = `INSERT INTO kontak_grup VALUES (null,${kontak_id},${grup_id});`

        db.get(qKontakId,(err,dataKontak)=>{
            if(err){
                var err = {message : 'id kontak not found'}
                cb(err)
            }else if(dataKontak === undefined){
                var err = {message : 'id kontak not found'}
                cb(err)
            }else{
                db.get(qGrupId,(err,dataGrup)=>{
                    if(err){
                        var err = {message : 'id grup not found'}
                        cb(err)
                    }else if(dataGrup === undefined){
                        var err = {message : 'id grup not found'}
                        cb(err)
                    }else{
                        db.run(query,(err)=>{
                            if(err){
                                var err = {message : 'insert data failed'}
                                cb(err)
                            }else{
                                cb()
                            }
                        })
                    }
                })
            }
        })
        
    }

    static update(id,kontak_id,grup_id,cb){
        var qKontakId = `SELECT * FROM kontak WHERE id = ${kontak_id}`
        var qGrupId = `SELECT * FROM grup WHERE id = ${grup_id}`
        var query = `UPDATE kontak_grup
                     SET kontak_id = ${kontak_id}, grup_id = ${grup_id}
                     WHERE id = ${id}`
            
            db.get(qKontakId,(err,dataKontak)=>{
            if(err){
                var err = {message : 'id kontak not found'}
                cb(err)
            }else if(dataKontak === undefined){
                var err = {message : 'id kontak not found'}
                cb(err)
            }else{
                db.get(qGrupId,(err,dataGrup)=>{
                    if(err){
                        var err = {message : 'id grup not found'}
                        cb(err)
                    }else if(dataGrup === undefined){
                        var err = {message : 'id grup not found'}
                        cb(err)
                    }else{
                        db.run(query,(err)=>{
                            if(err){
                                var err = {message : 'update data failed'}
                                cb(err)
                            }else{
                                cb()
                            }
                        })
                    }
                })
            }
        })
        
    }

    static delete(id,cb){
        var querySearch = `SELECT * FROM kontak_grup WHERE id = ${id}`
        var query = `DELETE FROM kontak WHERE id = ${id}`
        db.get(querySearch,(err,data)=>{
            if(err){
                var err = {message : 'delete data failed'}
                cb(err)
            }else if (data === undefined) {
                var err = {message : `data with id ${id} not found`}   
                cb(err)
            }else{
                db.run(query,(err)=>{
                    if(err){
                        var err = {message : 'delete data failed'}
                        cb(err)
                    }else{
                        cb()
                    }
                })
            }
        })
    }
}

module.exports = KontakGrup

