const ModelAll = require('./model/modelAll.js')
const ModelContact = ModelAll.ModelContact
const View = require('../view.js')

class ControllerContact{

    static cc_addContact(name,office,phone,email){
        ModelContact.mc_addContact(name,office,phone,email,function(err,data){
            if(err){
                View.showError(err)
            } else {
                let data = `add "${data} success"`
                View.showData(data)
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

}
module.exports = ControllerContact