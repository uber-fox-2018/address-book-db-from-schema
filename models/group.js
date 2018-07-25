const db = require('../db_setting');

class Group {
    constructor(name) {
        this.name = name;
    }

    static list(callback) {
        let groupsQuery = `SELECT * FROM groups`;
        db.serialize(() => {
            db.each(groupsQuery, [], (err, groupRow) => {
                if (err) throw err
                else {
                    let group = Object.assign(new Group(), groupRow);
                    this.contacts(group.id, contactRows => {
                        group.contacts = contactRows.map(row => row.name);
                        callback(group);
                    });
                }
            });
        });
    }

    static find(id, callback) {
        let sql = `SELECT * FROM groups WHERE id = ?`;
        db.get(sql, [id], (err, groupRow) => {
            if (err)
                throw err;
            else {
                if (groupRow) {
                    let group = Object.assign(new Group(), groupRow);
                    this.contacts(group.id, contactRows => {
                        group.contacts = contactRows.map(row => row.name);
                        callback(group);
                    });
                }
                else
                    callback(null);
            }
        });
    }

    static count(callback) {
        let sql = `SELECT COUNT(*) AS count FROM groups`;
        db.get(sql, [], (err, row) => {
            if (err)
                throw err;
            else
                callback(row.count)
        });
    }

    static contacts(id, callback) {
        db.serialize(() => {
            let referencesQuery = `SELECT * FROM contacts_groups WHERE group_id = ?`;
            db.all(referencesQuery, [id], (err, refRows) => {
                let contact_ids = refRows.map(row => row.contact_id);
                let contactsQuery = `SELECT * FROM contacts WHERE id IN (${contact_ids.join(',')})`;
                db.serialize(() => {
                    db.all(contactsQuery, [], (err, contactRows) => {
                        callback(contactRows);
                    });
                });
            })
        })
    };

    static checkName(name, callback) {
        let sql = `SELECT * FROM groups WHERE name = ?`;
        let params = [name];
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
        let obj = { $name: this.name }
        this._dbAdd(obj, last_id => {
            typeof callback === 'function' && callback(last_id);
        });
    }

    update(callback) {
        let obj = { $id: this.id, $name: this.name };
        this._dbUpdate(obj, changes => {
            typeof callback === 'function' && callback(changes);
        });
    }

    delete(callback) {
        this._dbDelete(this.id, changes => {
            typeof callback === 'function' && callback(changes);
        });
    }

    assign(contact_id, callback) {
        let sql = `INSERT INTO contacts_groups (contact_id, group_id) VALUES (?,?)`;
        let params = [contact_id, this.id];
        db.run(sql, params, err => {
            if(err) throw err;
            typeof callback === 'function' && callback();
        });
    }

    countContact(callback) {
        let sql = `SELECT COUNT(*) AS count FROM contacts_groups WHERE group_id = ?`;
        db.get(sql, [this.id], (err, row) => {
            if(err) 
                throw err;
            else
                callback(row.count);
        });
    }

    checkContact(contact_id, callback) {
        let sql = `SELECT * FROM contacts_groups WHERE group_id = ? AND contact_id = ?`;
        db.get(sql, [this.id, contact_id], (err, row) => {
            if(err) throw err;
            else {
                if(row) callback(false)
                else callback(true);
            }
        })
    }

    _dbAdd(obj, callback) {
        db.serialize(() => {
            let sql = `INSERT INTO groups (name) VALUES ($name)`;
            let params = obj;
            db.run(sql, params, function (err) {
                if (err) throw err;
                callback(this.lastID);
            });
        })
    }

    _dbUpdate(obj, callback) {
        db.serialize(() => {
            let sql = `UPDATE groups SET name = $name WHERE id = $id`;
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
                let sql = `DELETE FROM groups WHERE id = ?`;
                db.run(sql, [id], function (err) {
                    callback(this.changes);
                })
            });
        });
    }

    _dbDeleteReferences(id, callback) {
        db.serialize(() => {
            let sql = `DELETE FROM contacts_groups WHERE group_id = ?`;
            db.run(sql, [id], function (err) {
                callback(this.changes);
            });
        });
    }
}

module.exports = Group;