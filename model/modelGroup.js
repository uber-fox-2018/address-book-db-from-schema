
const db = require('./db.js')


class ModelGroup{
    static mg_add(name,cb){
        let queryGroupAdd = `INSERT INTO Groups (name) VALUES  ("${name}") `

        db.serialize(function(){
            db.run(queryGroupAdd, function(err){
                if(err){
                    cb(err,null)
                }else{
                    let group = new ModelGroup(name)
                    cb(null,group)
                }
            })
        })
    }


    static mg_update(id,name,cb){
        let queryUpdatedGroup = `UPDATE Groups SET name = "${name}" WHERE id = ${id}`


        db.serialize(function(){
            db.run(queryUpdatedGroup,function(err){
                if (err){
                    cb(err,null)
                } else {
                    cb(null,err)
                }
            })
           
        })
    }

    static mg_remove(id,cb){
        let queryRemoveGroup = `DELETE FROM Groups WHERE id = ${id}`

        db.serialize(function(){
            db.run(queryRemoveGroup, function(err){
                if(err) throw err.message
            })
            cb(null,id)
        })
    }


}
module.exports = ModelGroup