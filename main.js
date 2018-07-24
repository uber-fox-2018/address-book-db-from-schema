const ControllerContact = require('./controller/contact')
const ControllerGroup = require('./controller/group')
const ControllerContactGroup = require('./controller/contactGroups')
const args = process.argv.slice(2)
const input = process.argv.slice(3)
const command = args[0]
const db = require('./model/db')

if(command === 'addContact' && input[0] !== undefined && input[1] !== undefined && input[2] !== undefined && input[3] !== undefined ){
    ControllerContact.add(input[0],input[1],input[2],input[3])
}else if(command === 'updateContact' && input[0] !== undefined && input[1] !== undefined && input[2] !== undefined){
    ControllerContact.update(input[0],input[1],input[2])
}else if(command === "deleteContact" && input[0] !== undefined){
    ControllerContact.delete(input[0])
}else if(command === 'showContact'){
    ControllerContact.showContact()
} 

