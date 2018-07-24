const Group = require('../models/group')
const View = require('../views/view-group')

class ControllerGroup {
    static add(group_name){
        Group.addData(group_name,function(err,data){
            if (err) {
                View.showError(err)
            }else {
                View.showData(data)
            }
        })
    }

    static edit(id,group_name){
        Group.updateData(id,group_name,function(err,data){
            if (err) {
                View.showError(err)
            }else {
                View.showData(data)
            }
        })
    }

    static remove(id){
        Group.deleteData(id,function(err,data){
            if (err) {
                View.showError(err)
            }else{
                View.showData(data)
            }
        })
    }
}

module.exports = ControllerGroup