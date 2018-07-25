
const ControllerAll = require('./controller/controllerAll')
const ControllerContact = ControllerAll.ControllerContact
const ControllerGroup = ControllerAll.ControllerGroup
// const ControllerContactGroup = ControllerAll.ControllerContactGroup
const argv = process.argv

let table = argv[2]
let menu = argv[3]

//CRUD contact

if(table === 'contact'){
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
    }else if(menu === 'delete'){
        let id = argv[4]
        ControllerContact.cc_removeContact(id)
    }
    //CRUD Group
} else if (table === 'group'){
    if(menu === 'add'){
        let name = argv[4]
        ControllerGroup.cg_add(name)   
    } else if (menu === 'update'){
        let name = argv[4]
        ControllerGroup.cg_update(name)

    } else if (menu === 'delete'){
        let id = argv[4]
        ControllerGroup.cg_remove(id)
    }

    //CRUD ContactGroup
} else if (table === 'contactGroup'){
    if(){

    }
}