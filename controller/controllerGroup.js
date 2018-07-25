const ModelAll = require('../model/modelAll.js')
const ModelGroup = ModelAll.ModelGroup
const View = require('../view.js')

class ControllerGroup{
    static cg_add(name){
        ModelGroup.mg_add(name, function (err,data){
            if(err){
                View.showError(err)
            } else {
                let result = `add "${name} success"`
                View.showData(result)
            }
        })
    }

    static cg_update(name){
        ModelGroup.mg_update(name, function(err,data){
            if(err){
                View.v_showError(err)
            } else {
                View.v_showData(data)
            }
        })
    }

    static cg_remove(id){
        ModelGroup.mg_remove(id, function(err,id){
            if(err){
                View.showError(err)
            } else {
                let result = `delete ID : ${id} success`
                View.showData(result)
            }
        })
    }

}

module.exports = ControllerGroup