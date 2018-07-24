const ControllerContact = require('./controllers/controller-contact')
const ControllerGroup = require('./controllers/controller-group')
const ControllerGroupContact = require('./controllers/controller-group-contacts')

let argv = process.argv
let command = argv[2]

if (command == 'help') {
    console.log(`==============HELP LIST=================`);
    console.log(`node main.js addContact <name> <company> <phone> <email>`);
    console.log(`node main.js editContact <id> <name> <company> <phone> <email>`);
    console.log(`node main.js deleteContact <id>`);
    console.log(`node main.js addGroup <group_name>`);
    console.log(`node main.js editGroup <id> <group_name>`);
    console.log(`node main.js deleteGroup <id>`);
    console.log(`node main.js assign <contactId> <groupId>`);
    console.log(`node main.js show `);
    
}else if (command == 'addContact') {
    let name = argv[3]
    let company = argv[4]
    let phone = argv[5]
    let email = argv[6]
    ControllerContact.add(name,company,phone,email)
}else if (command == 'editContact') {
    let id = argv[3]
    let name = argv[4]
    let company = argv[5]
    let phone = argv[6]
    let email = argv[7]
    ControllerContact.edit(id,name,company,phone,email)
}else if (command == 'deleteContact') {
    let id = argv[3]
    ControllerContact.remove(id)
}else if (command == 'addGroup') {
    let group_name = argv[3]
    ControllerGroup.add(group_name)
}else if (command == 'editGroup') {
    let id = argv[3]
    let group_name = argv[4]
    ControllerGroup.edit(id,group_name)
}else if (command == 'deleteGroup') {
    let id = argv[3]
    ControllerGroup.remove(id)
}else if (command == 'assign') {
    let contactId = argv[3]
    let groupId = argv[4]
    ControllerGroupContact.assign(contactId,groupId)
}else if (command == 'show') {
    ControllerGroupContact.show()
}
