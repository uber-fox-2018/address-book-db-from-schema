const View = require('../views/group_view');
const Group = require('../models/group');
const Contact = require('../models/contact');

class GroupController {
    constructor() { }

    create(name) {
        if (this.isValid(name)) {
            Group.checkName(name, isAvailable => {
                if (isAvailable) {
                    let group = new Group(name);
                    group.save(last_id => {
                        Group.find(last_id, group => {
                            Group.count(total => {
                                View.displayAdd(group, total);
                            })
                        });
                    });
                }
                else
                    View.displayValidation(`group name is already registered.`);
            });
        }
    }

    update(id, name) {
        if (this.isValid(name)) {
            Group.checkName(name, isAvailable => {
                if (isAvailable) {
                    Group.find(id, group => {
                        if (group) {
                            group.name = name;
                            group.update(changes => {
                                View.displayUpdate(group, changes);
                            });
                        }
                        else
                            View.displayValidation(`group not found`);
                    });
                }
                else
                    View.displayValidation(`group name is already registered.`);
            });
        }
    }

    delete(id) {
        Group.find(id, group => {
            if (!group)
                View.displayValidation(`group not found`);
            else {
                group.delete(changes => {
                    Group.count(total => {
                        View.displayDelete(total);
                    });
                });
            }
        })
    }

    show() {
        Group.list(group => {
            View.displayShow(group);
        });
    }

    assign(group_id, contact_id) {
        Group.find(group_id, group => {
            if (!group)
                View.displayValidation(`group not found`);
            else {
                Contact.find(contact_id, contact => {
                    if (!contact)
                        View.displayValidation(`contact not found`);
                    else {
                        group.checkContact(contact_id, isAvailable => {
                            if (!isAvailable)
                                View.displayValidation(`contact is already registered in this group`);
                            else {
                                group.assign(contact_id, () => {
                                    Group.find(group_id, updatedGroup => {
                                        updatedGroup.countContact(total => {
                                            View.displayAssign(updatedGroup, total);
                                        });
                                    });
                                });
                            }
                        })
                    }
                });
            }
        });
    }

    isValid(name) {
        let isValid = true;
        if (typeof name == 'undefined' || name.trim().length <= 0) {
            isValid = false;
            View.displayValidation(`name is required`);
        }
        return isValid;
    }

    help() {
        View.displayHelp();
    }
}

module.exports = GroupController