class View {
    static setup() {
        console.log('SETUP FINISHED!!')
        console.log('TABLE ALREADY CREATED')
        console.log('CONTACTS||GROUPS||CONTACT_GROUP')
    }
    static initData(){
        console.log('initData from JSON and insert to table is finished')
    }
    static createContact(input){
        console.log(input)
    }
    static createGroup(input){
        console.log(input)
    }
    static assignContactToGroup(input){
        console.log(`${input.name} succsess assigned to ${input.groupName}`)
    }
    static deleteContact(input){
        for(let i=0 ; i < input.length ; i++){
            console.log(`'${input[i].name}' deleted from '${input[i].groupName}'`)
        }
    }
    static deleteGroup(input){
        for(let i=0 ; i < input.length ; i++){
            console.log(`'${input[i].groupName}' deleted from '${input[i].name}' contact`)
        }
    }
    static showContactInGroup(input){
        console.log(input)
    }
    
    static showGroupInContact (input){
        console.log(input)
    }
}

module.exports = View