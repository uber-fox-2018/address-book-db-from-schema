const Contact = require('../models/contact')
const View = require('../views/view-contact')

class ControllerContact {
    static add(name,company,phone,email){
        Contact.addData(name,company,phone,email,function(err,data){
            if (err) {
                View.showError(err)
                // console.log(err);
            }else {
                View.showData(data)
                // console.log(data);
                
            }
        })
    }

    static edit(id,name,company,phone,email){
        Contact.updateData(id,name,company,phone,email,function(err,data){
            if (err) {
                View.showError(err)
            }else {
                View.showData(data)
            }
        })
    }

    static remove(id){
        Contact.deleteData(id,function(err,data){
            if (err) {
                View.showError(err)
            }else{
                View.showData(data)
            }
        })
    }
}

module.exports = ControllerContact