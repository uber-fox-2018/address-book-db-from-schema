const Model = require('../model/group')
const View = require('../view/group')

class Group{

    static add(name){
        Model.add(name, function(name){
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

    static showGroup(){
        Model.read(function(data){
            View.showGroup(data)
        })
    }

}

module.exports = Group