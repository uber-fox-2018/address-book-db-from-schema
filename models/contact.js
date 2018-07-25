const db = require('../db_setting');
const Group = require('./group');

class Contact {
    constructor(name, phone_number, email) {
        this.id;
        this.name = name;
        this.phone_number = phone_number;
        this.email = email;
    }

    static list(callback) {
        let contactsQuery = `SELECT * FROM contacts`;
        db.serialize(() => {
            db.each(contactsQuery, [], (err, contactRow) => {
                if (err) throw err
                else {
                    let contact = Object.assign(new Contact(), contactRow);
                    this.groups(contact.id, groupRows => {
                        contact.groups = groupRows.map(row => row.name);
                        callback(contact);
                    })
                }
            });
        });
    }

    static find(id, callback) {
        let sql = `SELECT * FROM contacts WHERE id = ?`;
        db.get(sql, [id], (err, contactRow) => {
            if (err)
                throw err;
            else {
                if (contactRow) {
                    let contact = Object.assign(new Contact(), contactRow);
                    this.groups(contact.id, groupRows => {
                        contact.groups = groupRows.map(row => row.name);
                        callback(contact);
                    })
                }
                else
                    callback(null);
            }
        });
    }

    static count(callback) {
        let sql = `SELECT COUNT(*) AS count FROM contacts`;
        db.get(sql, [], (err, row) => {
            if (err)
                throw err;
            else
                callback(row.count)
        });
    }

    static groups(id, callback) {
        db.serialize(() => {
            let referencesQuery = `SELECT * FROM contacts_groups WHERE contact_id = ?`;
            db.all(referencesQuery, [id], (err, refRows) => {
                let group_ids = refRows.map(row => row.group_id);
                let groupsQuery = `SELECT * FROM groups WHERE id IN (${group_ids.join(',')})`;
                db.serialize(() => {
                    db.all(groupsQuery, [], (err, groupRows) => {
                        callback(groupRows);
                    });
                });
            })
        })
    };

    static checkEmail(email, callback) {
        let sql = `SELECT * FROM contacts WHERE email = ?`;
        let params = [email];
        db.get(sql, params, (err, row) => {
            if (err)
                throw err;
            else {
                if (row)
                    callback(false);
                else
                    callback(true);
            }
        });
    }

    save(callback) {
        let obj = { $name: this.name, $phone_number: this.phone_number, $email: this.email }
        this._dbAdd(obj, last_id => {
            typeof callback === 'function' && callback(last_id);
        });
    }

    update(callback) {
        let obj = { $id: this.id, $name: this.name, $phone_number: this.phone_number, $email: this.email };
        this._dbUpdate(obj, changes => {
            typeof callback === 'function' && callback(changes);
        });
    }

    delete(callback) {
        this._dbDelete(this.id, changes => {
            typeof callback === 'function' && callback(changes);
        });
    }

    groups() {
        this._dbGetGroups(this.id, rows => {
            let groups = [];
            rows.forEach(row => {
                groups.push(Object.assign(new Group(), row));
            });
            callback(groups);
        })
    }

    _dbAdd(obj, callback) {
        db.serialize(() => {
            let sql = `INSERT INTO contacts (name, phone_number, email) VALUES ($name, $phone_number, $email)`;
            let params = obj;
            db.run(sql, params, function (err) {
                if (err) throw err;
                callback(this.lastID);
            });
        })
    }

    _dbUpdate(obj, callback) {
        db.serialize(() => {
            let sql = `UPDATE contacts SET name = $name, phone_number = $phone_number, email =$email WHERE id = $id`;
            let params = obj;
            db.run(sql, params, function (err) {
                if (err) err;
                callback(this.changes);
            });
        });
    }

    _dbDelete(id, callback) {
        db.serialize(() => {
            this._dbDeleteReferences(id, ref_changes => {
                let sql = `DELETE FROM contacts WHERE id = ?`;
                db.run(sql, [id], function (err) {
                    callback(this.changes);
                })
            });
        });
    }

    _dbDeleteReferences(id, callback) {
        db.serialize(() => {
            let sql = `DELETE FROM contacts_groups WHERE contact_id = ?`;
            db.run(sql, [id], function (err) {
                callback(this.changes);
            });
        });
    }
}

module.exports = Contact;