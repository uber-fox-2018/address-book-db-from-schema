const Model = require('../model/contact')
const View = require('../view/contact')

class Contact {

    static add(name, company, phone, email){
        Model.add(name, company, phone, email, function(name){
            View.add(name)
        })
    }

    static update(id,column,value){
        Model.update(id,column,value,function(value){
            View.update(value)
        })
    }

    static delete(id){
        Model.delete(id,function(id){
            View.delete(id)
        })
    }

    static showContact(){
        Model.read(function(data){
            View.showContact(data)
        })
    }
}

module.exports = Contact