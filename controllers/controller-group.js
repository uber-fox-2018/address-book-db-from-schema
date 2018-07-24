const Group = require('../models/group')
const View = require('../view')

class ControllerGroup {

    static createGroup(name) {
        Group.create(name, (err, name) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `Create Group data ${name} success`
                View.showResult(result)
            }
        }) 
    }

    static updateGroup(id, name) {
        Group.update(id, name, (err, name) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `Update Group data ${name} success`
                View.showResult(result)
            }
        })
    }

    static deleteGroup(id) {
        Group.delete(id, (err, id) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `Delete Group data ID : ${id} success`
                View.showResult(result)
            }
        })
    }

    static showGroup() {
        Group.show((err, data) => {
            if(err) {
                View.showError(err)
            }else {
                View.showResult(data)
            }
        })
    }

    static transferGroups() {
        Group.transfer((err) => {
            if(err) throw err;
            let result = `transfer data group success`
            View.showResult(result)
        })
    }

}

module.exports = ControllerGroup;