var productosmodel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var productosSchema = new Schema({
    cod_cat: String,
    cod_prod: String,
    nombre: String,
    estado: Number, //tambien puede ser "booleano o string"
    imagen: String,
    precio: Number,
    descripcion: String
})

const myModel = mongoose.model('productos', productosSchema)


productosmodel.buscarcodigo = function(post, callback){

    myModel.find({cod_prod:post.cod_prod},{nombre:1, cod_prod:1, estado:1 }).then((respuesta) =>{
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
//    var posicion = productos.findIndex((item) => item.cod_prod == post.cod_prod)
//    return callback({posicion:posicion})

}
productosmodel.list = function(post,callback){
    myModel.find({},{}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    })
}
productosmodel.listId = function(post,callback){
    myModel.find({_id:post._id},{}).then((respuesta) => {
        return callback({state: true, data: respuesta })
    })
}
productosmodel.crear = function(post, callback){

    const instancia = new myModel
    instancia.cod_cat = post.cod_cat
    instancia.cod_prod = post.cod_prod
    instancia.nombre = post.nombre
    instancia.estado = post.estado
    instancia.descripcion = post.descripcion
    if (post.imagen == ""){
        instancia.imagen = "http://localhost:3000/imagenes/default.png"
    }
    else{
        instancia.imagen = post.imagen
    }
    instancia.precio = post.precio

    instancia.save().then((respuesta) =>{
        return callback({ state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false,mensaje:error})
    })



    // productos.push({cod_prod: post.cod_prod, nombre: post.nombre, estado: post.estado })
    // return callback({state: true})

}
productosmodel.update = function(post, callback){

    myModel.updateOne({_id:post._id},{
        nombre:post.nombre,
        estado:post.estado, 
        cod_cat:post.cod_cat,
        imagen: post.imagen,
        descripcion: post.descripcion,
        precio: post.precio
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}
productosmodel.delete = function(post, callback){
    myModel.deleteOne({_id:post._id }).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({posicion:0,state:false,mensaje:error})
    })
}


module.exports.productosmodel = productosmodel



