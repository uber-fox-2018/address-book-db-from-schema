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
    static delete(obj){
        Contacts.delete(obj, (key, result)=>{
            ViewContact.delete(obj, key, result);
        })
    }

    static show(){
        Contacts.show(result=>{
            ViewContact.show(result);
        })
    }
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
    
    static delete(obj){
        Groups.delete(obj, (key, result)=>{
            ViewGroup.delete(obj, key, result);
        })
    }
    static show(){
        Groups.show(result=>{
            ViewGroup.show(result);
        })
    }
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

    static delete(obj){
        ContactGroups.delete(obj, (key, result)=>{
            ViewContactGroup.delete(obj, key, result);
        })
    }
}

module.exports = {
    Contact : Contact,
    Group : Group,
    ContactGroup : ContactGroup
};
