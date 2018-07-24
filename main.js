var command = process.argv[2]
var Controller = require('./controller.js')
var data = process.argv.slice(3)


if(command === 'help' || !command){
    Controller.help()
}else if(command === 'create'){
    Controller.create(data)
}else if(command === 'update'){
    Controller.update(data)
}