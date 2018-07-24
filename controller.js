const View = require("./view.js")
const Model = require("./model.js");
const Contacts = Model.Contacts;
const Groups = Model.Groups;
const ContactGroups = Model.ContactGroups;
const ViewContact = View.Contacts;
const ViewGroup = View.Groups;
const ViewContactGroup = View.ContactGroups;

class Contact{
    static save(objArr){
        Contacts.save(objArr, result=>{
            ViewContact.display(result);
        })
    }
    static create(obj){
        Contacts.create(obj, result=>{
            ViewContact.create(result);
        })
    }

    static lastId(){
        Contacts.id(result=>{
            ViewContact.id(result);
        })
    }

    static update(newValues, whereCondition){
        Contacts.update(newValues, whereCondition, result=>{
            ViewContact.update(result);
        })
    }
    static delete(){

    }

    // static show(){

    // }

    // static help(){

    // }
}

class Group{
    static save(objArr){
        Groups.save(objArr, result=>{
            ViewGroup.display(result);
        })
    }
    static create(obj){
        Groups.create(obj, result=>{
            ViewGroup.create(result);
        })
    }

    static lastId(){
        Groups.id(result=>{
            ViewGroup.id(result);
        })
    }

    static update(newValues, whereCondition){
        Groups.update(newValues, whereCondition, result=>{
            ViewGroup.update(result);
        })
    }
    
    static delete(){

    }

    // static show(){

    // }

    // static help(){

    // }
}

class ContactGroup{
    static save(objArr){
        ContactGroups.save(objArr, result=>{
            ViewContactGroup.display(result);
        })
    }
    static create(obj){
        ContactGroups.create(obj, result=>{
            ViewContactGroup.create(result);
        })
    }

    static lastId(){
        ContactGroups.id(result=>{
            ViewContactGroup.id(result);
        })
    }

    static update(newValues, whereCondition){
        ContactGroups.update(newValues, whereCondition, result=>{
            ViewContactGroup.update(result);
        })
    }

    static delete(){

    }

    // static show(){

    // }

    // static help(){

    // }
}

module.exports = {
    Contact : Contact,
    Group : Group,
    ContactGroup : ContactGroup
};
