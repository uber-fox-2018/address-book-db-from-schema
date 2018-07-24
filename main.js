const ControllerContact = require('./controllers/controller-contact')
const ControllerGroup = require('./controllers/controller-group')
const ControllerContactGroup = require('./controllers/controller-contact-group')
const argv = process.argv.slice(2)
const table = argv[0]
const command = argv[1]

//CRUD CONTACT
if(table == 'contact'){
    if(command == 'create') {
        let name = argv[2]
        let telp = argv[3]
        let company = argv[4]
        let email = argv[5]
        ControllerContact.createContact(name, telp, company, email)
    }else if (command == 'update') {
        let id = argv[2]
        let name = argv[3]
        let telp = argv[4]
        let company = argv[5]
        let email = argv[6]
        ControllerContact.updateContact(id, name, telp, company, email)
    }else if (command == 'delete') {
        let id = argv[2]
        ControllerContact.deleteContact(id)
    }else if (command == 'show') {
        ControllerContact.showContact()
    }else if(command == 'transfer'){
        ControllerContact.transferContacts()
    }
}
//CRUD GROUP
else if (table == 'group'){
    if(command == 'create') {
        let name = argv[2]
        ControllerGroup.createGroup(name)
    }else if (command == 'update') {
        let id = argv[2]
        let name = argv[3]
        ControllerGroup.updateGroup(id, name)
    }else if (command == 'delete') {
        let id = argv[2]
        ControllerGroup.deleteGroup(id)
    }else if (command == 'show') {
        ControllerGroup.showGroup()
    }else if(command == 'transfer') {
        ControllerGroup.transferGroups()
    }
}
//CRUD CONTACTGROUP
else if (table == 'contactgroup'){
    if(command == 'transfer') {
        ControllerContactGroup.transferContactGroup()
    }else if(command == 'show') {
        let groupName = argv[2]
        ControllerContactGroup.showGroup(groupName)
    }else if(command == 'assign') {
        let contactId = argv[2]
        let groupId = argv[3]
        ControllerContactGroup.assignContact(contactId, groupId)
    }
}