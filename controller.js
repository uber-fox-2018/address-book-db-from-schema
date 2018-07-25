Model_ContactGroup = require('./model.js')
Model_Contact = require('./modelContact.js')
Model_Group = require('./modelGroup.js')
View = require('./view.js')

class Control {
    static setup(){
        Model_Contact.setup()
        Model_ContactGroup.setup()
        Model_Group.setup()
        View.setup()
    }
    static initData(){
        Model_Contact.initData()
        Model_ContactGroup.initData()
        Model_Group.initData()
        View.initData()
    }
    static createNewContact(name, phoneNumber, email){
        Model_Contact.createContact(name, phoneNumber, email, output =>{
            View.createContact(output)
        })
    }
    static createNewGroup(name){
        Model_Group.createGroup(name,output =>{
            View.createGroup(output)
        })
    }
    static assignContactToGroup(groupId,contactId){
        Model_ContactGroup.createContactGroup(groupId,contactId,output =>{
            View.assignContactToGroup(output)
        })
    }
    static deleteContact(contactId){
        Model_Contact.deleteContact(contactId,output =>{
            View.deleteContact(output)
        })
    }
    static deleteGroup(groupId){
        Model_Group.deleteGroup(groupId,output =>{
            View.deleteGroup(output)
        })
    }
    static showContactInGroup(nameGroup){
        Model_Group.showContactInGroup(nameGroup,output =>{
            View.showContactInGroup(output)
        })
    }
    static showContactInGroup(nameGroup){
        Model_Group.showContactInGroup(nameGroup,output =>{
            View.showContactInGroup(output)
        })
    }
    static showGroupInContact(nameContact){
        Model_Contact.showGroupInContact(nameContact,output =>{
            View.showGroupInContact(output)
        })
    }
    
}

module.exports = Control