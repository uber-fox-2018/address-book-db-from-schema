
const Model = require('../model/modelGrup')
const View = require('../view/view')
class Grup{
    static insert(namaGrup){
        Model.insert(namaGrup, function(err){
            if(!err){
                View.showMessage(`data has been inserted`)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static update(id,namaGrup){
        Model.update(id,namaGrup,function(err){
            if(!err){
                View.showMessage(`data has been updated`)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static delete(id){
        Model.delete(id,function(err){
            if(!err){
                View.showMessage(`data has been deleted`)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static findGrup(column,value){
        Model.findGrup(column,value,function(err,data){
            if(!err){
                View.showMessage(data)
            }else{
                View.showMessage(err.message)
            }
        })
    }
}

module.exports = Grup