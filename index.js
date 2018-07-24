
const ControllerAll = require('./controller/controllerAll.js')
const ControllerContact = ControllerAll.ControllerContact
const ControllerGroup = ControllerAll.ControllerGroup
const ControllerContactGroup = ControllerAll.ControllerContactGroup
const argv = process.argv

let tabel = argv[2]
let menu = argv[3]

//CRUD contact

if(tabel === 'contact'){
    if(menu === 'add'){
        let name = argv[4]
        let office = argv[5]
        let phone = argv[6]
        let email = argv[7]
        ControllerContact.cc_addContact(name,office,phone,email)
    }else if(menu === 'update') {
        let name = argv[4]
        let office = argv[5]
        let phone = argv[6]
        let email = argv[7]
        ControllerContact.cc_updateContact(name,office,phone,email)    
    }
}