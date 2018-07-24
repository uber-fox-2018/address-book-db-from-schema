const fs = require('fs');
const db = require('./db.js');

class ContactGroup{
    constructor(contactId, groupId) {
        this.id = null
        this.contactId = contactId
        this.groupId = groupId
    }

    static transferContactGroups(callback) {
        var contactgroups = JSON.parse(fs.readFileSync('datacontact-group.json', 'utf8'));

        db.serialize(function () {
            for (let i = 0; i < contactgroups.length; i++) {
                const queryTransfer = `INSERT INTO ContactGroups (contactId, groupId)
                                       VALUES ("${contactgroups[i].contactId}", "${contactgroups[i].groupId}")`;
                db.run(queryTransfer, function (err) {
                    if (err) throw err
                })
            }
            callback();
        })
    }
}

module.exports = ContactGroup;