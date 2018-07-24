const model = require('../model/model')
const ModelGroup = model.modelGroup
const View = require('../view/views')

class Group {
    constructor(groupName) {
        this.groupName = groupName
    }
}

class ControllerGroup {
    static insertGroup(name) {
        let newContact = new Group(name)
        ModelGroup.insertGroup(newContact.groupName, function(err, data){
            (!err) ? View.displayMessage(`Success to add Group: ${name}. Total Group: ${data.lastID}`) : View.displayErrorMessage(err)
        })
    }

    static showGroups() {
        ModelGroup.showGroups(function(err, datas) {
            if(!err) {
                datas.forEach(data => {
                    View.displayMessage(`${data.id}. Group: ${data.groupName}`)
                })
            } else {
                View.displayErrorMessage(err.message)
            }
        })
    }

    static editGroup(name, id) {
        ModelGroup.editGroup(name, id, function(err, msg) {
            (!err) ? View.displayMessage(msg) : View.displayErrorMessage(err.message)
        })
    }

    static removeGroup(name) {
        ModelGroup.removeGroup(name, function(err, msg) {
            (!err) ? View.displayMessage(msg) : View.displayErrorMessage(err.message)
        })   
    }
}

module.exports = ControllerGroup