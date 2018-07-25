const ModelAll = require('../model/modelAll.js')
const ModelContact = ModelAll.ModelContact
const View = require('../view.js')

class ControllerContact{

    static cc_addContact(name,office,phone,email){
        ModelContact.mc_addContact(name,office,phone,email,function(err,data){
            if(err){
                View.showError(err)
            } else {
                let msg = `add "${data} success"`
                View.showData(msg)
            }
        })

    }

    static cc_updateContact(name,office,phone,email){
        ModelContact.mc_updateContact(name,office,phone,email,function(err,data){
            if(err){
                View.showError(err)
            } else {
                let data = `add "${data} success"`
                View.shwoData(data)
            }
        })

    }

    static cc_removeContact(id){
        ModelContact.mc_removeContact(id,function(err,id){
            if(err){
                View.showError(err)
            } else {
                let dataId = `Delete Success`
                View.showData(dataId)
            }
        })
    }

}
module.exports = ControllerContact