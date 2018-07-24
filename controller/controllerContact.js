const ModelAll = require('./model/modelAll.js')
const ModelContact = ModelAll.ModelContact
const View = require('../view.js')

class ControllerContact{

    static cc_addContact(name,office,phone,email){
        ModelContact.mc_addContact(name,office,phone,email,function(err,data){
            if(err){
                View.showError(err)
            } else {
                View.mc_add(data)
            }
        })

    }

}
module.exports = ControllerContact