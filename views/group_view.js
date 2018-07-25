class GroupView {
    constructor() { }

    static displayHelp() {
        console.log(`$ node main.js group help #show commands for group.`);
        console.log(`$ node main.js group show #show all group`);
        console.log(`$ node main.js group create <name> #create new group.`);
        console.log(`$ node main.js group update <id> <name>`);
        console.log(`$ node main.js group delete <id>`);
        console.log(`# node main.js group assign <group_id> <contact_id> #assign contact to the group`);
    }

    static displayShow(group) {
        console.log(group);
    }

    static displayAdd(group, total) {
        console.log(`New group saved.`);
        console.log(group);
        console.log(`Total group: ${total}`);
    }
    
    static displayUpdate(group, changes) {
        console.log(`Group updated.`);
        console.log(group);
        console.log(`Total row changed: ${changes}`);
    }

    static displayDelete(total) {
        console.log(`Group deleted`);
        console.log(`Total group: ${total}`);
    }

    static displayValidation(message) {
        console.log(message);
    }

    static displayAssign(group, totalContact) {
        console.log(`Contact added.`);
        console.log(group);
        console.log(`Total contact in this group: ${totalContact}`);
    }
}

module.exports = GroupView;