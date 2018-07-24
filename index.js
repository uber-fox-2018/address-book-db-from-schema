
const ControllerAll = require('./controller/controllerAll.js')
const ControllerContact = ControllerAll.ControllerContact
const ControllerGroup = ControllerAll.ControllerGroup
const ControllerContactGroup = ControllerAll.ControllerContactGroup
const argv = process.argv

let menu = argv[2]

//contact
// ame VARCHAR, office VARCHAR, phone VARCHAR UNIQUE,
//                  email TEXT UNIQUE

if(menu === 'addContact'){
    let name = argv[3]
    let office = argv[4]
    let phone = argv[5]
    let email = argv[6]
    ControllerContact.cc_addContact(name,office,phone,email)
}