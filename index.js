let Control = require('./controller.js')
let command = process.argv[2]
let input = process.argv.slice(3)

if(command == 'setup'){
    Control.setup()
}
else if(command == 'initData'){
    Control.initData()
}
else if(command == 'createNewContact'){
    Control.createNewContact(input[0],input[1],input[2])
}
else if(command == 'createNewGroup'){
    Control.createNewGroup(input)
}
else if(command == 'assignContactToGroup'){
    
    Control.assignContactToGroup(input[0],input[1])
}
else if(command == 'deleteContact'){
    Control.deleteContact(input)
}
else if(command == 'deleteGroup'){
    Control.deleteGroup(input)
}
else if(command == 'showContactInGroup'){
    Control.showContactInGroup(input)
}
else if(command == 'showGroupInContact'){
    Control.showGroupInContact(input)
}