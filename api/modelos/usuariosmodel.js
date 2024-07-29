var usuariosmodel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
    identificacion: Number,
    nombre: String,
    sexo: String,
    email: String,
    password:String,
    telefono: Number,
    estado: Number, //tambien puede ser "booleano o string"
    codigoact: String,
    rol: Number
})

const myModel = mongoose.model('usuarios', usuariosSchema)


usuariosmodel.buscarcodigo = function(post, callback){

    myModel.find({email:post.email},{nombre:1, email:1, estado:1 }).then((respuesta) =>{
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
//    var posicion = usuarios.findIndex((item) => item.email == post.email)
//    return callback({posicion:posicion})

}
usuariosmodel.list = function(post,callback){
    myModel.find({},{password: 0}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    })
}
usuariosmodel.listId = function(post,callback){
    myModel.find({_id:post._id},{password: 0}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    })
}
usuariosmodel.crear = function(post, callback){

    const instancia = new myModel
    instancia.identificacion = post.identificacion
    instancia.email = post.email
    instancia.password = post.password
    instancia.nombre = post.nombre
    instancia.sexo = post.sexo
    instancia.telefono = post.telefono
    instancia.estado = 0
    instancia.codigoact = post.azar
    instancia.rol = 2 // rol 2 usuario y rol 1 super dministrador

    instancia.save().then((respuesta) =>{
        return callback({ state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,mensaje:error})
    })



    // usuarios.push({codigo: post.codigo, nombre: post.nombre, estado: post.estado })
    // return callback({state: true})

}
usuariosmodel.update = function(post, callback){
    myModel.updateOne({_id:post._id},{nombre:post.nombre,estado:post.estado, rol:post.rol, sexo:post.sexo, telefono:post.telefono}).then((respuesta) => {
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}
usuariosmodel.activar = function(post, callback){
    myModel.updateOne({email:post.email, codigoact:post.codigoact},{estado: 1}).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true, respuesta: respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}
usuariosmodel.delete = function(post, callback){
    myModel.deleteOne({_id:post._id }).then((respuesta) => {
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}
usuariosmodel.login = function(post,callback){
    myModel.find({email:post.email, password:post.password },{nombre: 1,  estado: 1, rol:1}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}


module.exports.usuariosmodel = usuariosmodel



