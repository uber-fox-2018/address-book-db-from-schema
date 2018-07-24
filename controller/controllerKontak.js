const Model = require('../model/modelKontak')
const View = require('../view/view')

class Kontak{
    static insert(nama, nama_perusahaan, nomor_telp, email){
        Model.insert(nama,nama_perusahaan,nomor_telp,email,function(err){
            if(!err){
               View.showMessage(`data has been inserted`) 
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static update(id, nama, nama_perusahaan, nomor_telp, email){
        Model.update(id, nama, nama_perusahaan, nomor_telp, email, function(err){
            if(!err){
                View.showMessage(`data succesfully updated`)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static deleteById(id){
        Model.deleteById(id,function(err){
            if(!err) {
                View.showMessage(`data succesfully deleted`)
            }else {
                View.showMessage(err.message)
            }
        })
    }

    static delete(column,value){
        Model.delete(column,value, function(err){
            if(!err) {
                View.showMessage(`data succesfully deleted`)
            }else {
                View.showMessage(err.message)
            }
        })
    }

    static findById(id){        
        Model.findById(id, function(err,data){
            if(!err){
                View.showMessage(`nama : ${data.nama}, nama_perusahaan : ${data.nama_perusahaan}, nomor_telp : ${data.nomor_telp}, email : ${data.email}`)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static findKontak(column, value){
        Model.findKontak(column, value, function(err,data){
            if(!err){
                View.showMessage(`nama : ${data[0].nama}, nama_perusahaan : ${data[0].nama_perusahaan}, nomor_telp : ${data[0].nomor_telp}, email : ${data[0].email}`)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static showKontak(){
        Model.showKontak(function(err,data){
            if(!err){
                View.showMessage(data)
            }else{
                View.showMessage(err.message)
            }
        })
    }

    static request(column1, column2, value1, value2, operan, conjunction){
        Model.request(column1, column2, value1, value2, operan, conjunction,function(err,data){
            if(!err){
                View.showMessage(data)
            }else{
                View.showMessage(err.message)
            }
        })
    }


}

module.exports = Kontak