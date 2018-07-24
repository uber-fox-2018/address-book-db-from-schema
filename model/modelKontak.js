const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')

class Kontak{
    static insert(nama, nama_perusahaan, nomor_telp, email,cb){
        var query = `INSERT INTO kontak VALUES (null,"${nama}","${nama_perusahaan}","${nomor_telp}","${email}");`

        db.run(query,(err)=>{
            if(err){
                var err = {message : 'insert data failed'}
                cb(err)
            }else{
                cb()
            }
        })
    }

    static update(id, nama, nama_perusahaan, nomor_telp, email,cb){
        var query = `UPDATE kontak
                     SET nama = "${nama}", nama_perusahaan = "${nama_perusahaan}", nomor_telp = "${nomor_telp}", email = "${email}"
                     WHERE id = ${id}`

        db.run(query,(err)=>{
            if(err){
                var err = {message : 'update data failed'}
                cb(err)
            }else{
                cb()
            }
        })
    }

    static deleteById(id,cb){
        var querySearch = `SELECT * FROM kontak WHERE id = ${id}`
        var query = `DELETE FROM kontak WHERE id = ${id}`
        var qIdConjunction = `DELETE FROM kontak_grup
                              WHERE kontak_id = ${id}`
        db.serialize(function(){
            db.get(querySearch,(err,data)=>{
                if(err){
                    var err = {message : 'delete data failed'}
                    cb(err)
                }else if (data === undefined) {
                    var err = {message : `data with id ${id} not found`}   
                    cb(err)
                }else{
                    db.run(qIdConjunction)

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
            
        })
        
    }

    static delete(column, value, cb){
        if(column === 'id'){
            var query = `SELECT * FROM kontak WHERE ${column} = ${value}`
        }else{
            var query = `SELECT * FROM kontak WHERE ${column} = "${value}"`
        }

        if(column === 'id'){
            var qDelete = `DELETE FROM kontak WHERE ${column} = ${value}`
        }else{
            var qDelete = `DELETE FROM kontak WHERE ${column} = "${value}"`
        }


        db.get(query,(err,data)=>{
            if(err){
                var err = {message : 'delete data failed'}
                cb(err)
            }else if (data === undefined) {
                var err = {message : `data with id ${id} not found`}   
                cb(err)
            }else{
                db.run(qDelete,(err)=>{
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

    static findById(id,cb){
        var query = `SELECT * FROM kontak WHERE id = ${id}`        
        db.get(query,(err,data)=>{
            if(err){
                var err = {message : `id not found`}
                cb(err,data)
            }else if(data === undefined){
                var err = {message : `id not found`}
                cb(err,data)
            }else{
                cb(err,data)
            }
        })
    }

    static findKontak(column, value, cb){
        var query = `SELECT * FROM kontak WHERE ${column} = "${value}"`
        db.all(query,(err,data)=>{
            if(err){
                var err = {message : `data not found`}
                cb(err,data)
            }else if(data === undefined){
                var err = {message : `data not found`}
                cb(err,data)
            }else{
                cb(err,data)
            }
        })
    }

    static showKontak(cb){
        var query = `SELECT * FROM kontak JOIN kontak_grup ON kontak.id = kontak_grup.kontak_id JOIN grup ON kontak_grup.grup_id = grup.id`
        console.log(query);
        
        db.all(query,(err,data)=>{
            if(err){
                var err = {message : `data not found`}
                cb(err,data)
            }else if(data === undefined){
                var err = {message : `data not found`}
                cb(err,data)
            }else{
                cb(err,data)
            }
        })
    }

    static request(column1, column2, value1, value2, operan, conjunction,cb){
        if(operan === 'like'){
            var query = `SELECT * FROM kontak WHERE ${column1} ${operan} "%${value1}%" ${conjunction} ${column2} ${operan} "%${value2}%"`
        }else if(operan === '='){
            var query = `SELECT * FROM kontak WHERE ${column1} ${operan} "${value1}" ${conjunction} ${column2} ${operan} "${value2}"`
        }

        db.all(query,(err,data)=>{
            if(err){
                var err = {message : `data not found`}
                cb(err,data)
            }else if(data === undefined){
                var err = {message : `data not found`}
                cb(err,data)
            }else{
                cb(err,data)
            }
        })
    }
}

module.exports = Kontak