const View = require('./view.js');
const Group = require('./group.js');
const Contact = require('./contact.js')
class Controller{
    static help(){
        let command = ['help','create group <name>','create contact <name> <company> <phone_number> <email>','update contact <id> <column> replaceBy <replace> \nExample : update contact 8 name replaceBy kosasih','update group <id> name replaceBy <replace> \nExample : update group 8 name replaceBy kosasih','delete <contact or group> <id>','showContact','showGroup']
        for(let i = 0 ; i < command.length ; i++){
            View.command(command[i])
        }
    }
    static create(data){
        if(data[0] === 'group' && data.length === 2){
            Group.createGroup(data[1], Controller.cbCreate)
        }else if(data[0] === 'contact' && data.length === 5){
            data = data.slice(1)
            Contact.createcontact(data, Controller.cbCreate)
            
            
        }else{
            this.help()
        }
    }
    static cbCreate(command,name){
        View.added(command,name)
        
    }
    static update(data){
        if(data[0] === 'contact' && data.length === 6){
            Contact.update(data, Controller.cbUpdate)
        }else if(data[0] === 'group' && data.length === 6){
            Contact.update(data, Controller.cbUpdate)            
        }else{
            this.help()
        }
    }
    static cbUpdate(data){
        View.update(data)
        
    }
    static delete(data){
        if(data[0] === 'contact' && data.length === 2){
            Contact.delete(data,'contact_id' ,Controller.cbDelete)
        }else if(data[0] === 'group' && data.length === 2){
            Contact.delete(data,'group_id' ,Controller.cbDelete)
        }
    }
    static cbDelete(data){
        View.delete(data)
    }
}

module.exports = Controller

// 'update <name contact or group> <name column> <replace by> <name>'