const Model = require('../model/modelKontakGrup')
const View = require('../view/view')

class KontakGrup{
    static insert(kontak_id, grup_id){
       Model.insert(kontak_id,grup_id,function(err){
        if(!err){
            View.showMessage(`data has been inserted`) 
         }else{
             View.showMessage(err.message)
         }
       })
    }

    static update(id,kontak_id,grup_id){
        Model.update(id,kontak_id,grup_id,function(err){
            if(!err){
                View.showMessage(`data has been updated`) 
             }else{
                 View.showMessage(err.message)
             }
        })
    }

    static delete(id){
        Model.delete(id,function(err){
            if(!err) {
                View.showMessage(`data succesfully deleted`)
            }else {
                View.showMessage(err.message)
            }
        })
    }
}

module.exports = KontakGrup