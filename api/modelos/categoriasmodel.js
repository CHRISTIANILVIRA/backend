var categoriasmodel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var categoriasSchema = new Schema({
    cod_cat: String,
    nombre: String,
    estado: Number //tambien puede ser "booleano o string"
})

const myModel = mongoose.model('categorias', categoriasSchema)


categoriasmodel.buscarcodigo = function(post, callback){

    myModel.find({cod_cat:post.cod_cat},{nombre:1, cod_cat:1, estado:1 }).then((respuesta) =>{
        console.log(respuesta)
        if(respuesta.length == 0){
            return callback({ posicion: -1})
        }
        else{
            return callback({ posicion: respuesta.length }) 
        }
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
//    var posicion = categorias.findIndex((item) => item.cod_cat == post.cod_cat)
//    return callback({posicion:posicion})

}
categoriasmodel.list = function(post,callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    })
}
categoriasmodel.listId = function(post,callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    })
}
categoriasmodel.crear = function(post, callback){

    const instancia = new myModel
    instancia.cod_cat = post.cod_cat
    instancia.nombre = post.nombre
    instancia.estado = post.estado

    instancia.save().then((respuesta) =>{
        return callback({ state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,mensaje:error})
    })



    // categorias.push({cod_cat: post.cod_cat, nombre: post.nombre, estado: post.estado })
    // return callback({state: true})

}
categoriasmodel.update = function(post, callback){
    myModel.updateOne({_id:post._id},{nombre:post.nombre,estado:post.estado}).then((respuesta) => {
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}
categoriasmodel.delete = function(post, callback){
    myModel.deleteOne({_id:post._id }).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}


module.exports.categoriasmodel = categoriasmodel



