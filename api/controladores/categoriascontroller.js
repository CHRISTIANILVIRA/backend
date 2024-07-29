var categoriasmodel = require("../modelos/categoriasmodel.js").categoriasmodel
var categoriascontroller = {}

categoriascontroller.save = function(request, response){

    var post = {
        cod_cat: request.body.cod_cat,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if(post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == ""){
        response.json({ state:false, mensaje:"el campo codigo de categoria es obligatorio", nombrecampo: "cod_cat" })
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({ state:false, mensaje:"el campo nombre es obligatorio", nombrecampo: "nombre"})
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({ state:false, mensaje:"el campo estado es obligatorio", nombrecampo: "estado"})
        return false
    }
//OPCION #1
    // if(post.estado.toLocaleLowerCase() == "true"){
    //     post.estado = true
    // }

    // if(post.estado.toStrig().toLocaleLowerCase() == "false"){
    //     post.estado = false
    // }

    // if(typeof post.estado != "boolean"){
    //     response.json({state: false, mensaje: "el campo estado debe ser true o false"})
    //     return false
    // }


//OPCION #2
    // if ([true,false].findIndex((item) => item == post.estado) == -1){
    //     response.json({mensaje:"el campo estado debe ser boleano"})
    //     return falses
    // }


//BUSCAR SI EXISTE PRODUCTO    
categoriasmodel.buscarcodigo(post, function(resultado){
    if(resultado.posicion == -1){
        //crea producto

        categoriasmodel.crear(post, function(respuesta){
            if(respuesta.state == true){
                response.json({ state: true, mensaje: "categoria creado correctamente"})
                return false    
            }
            else{
                response.json({ state: false, mensaje: "error al guardar"})
                return false
            }
        })
    }
    else{
        response.json({ state: false, mensaje: "la categoria del producto ya existe" })
        return false
    }
})






}
categoriascontroller.list = function(request, response){
    categoriasmodel.list(null, function(respuesta) {
        response.json(respuesta)
    })
}
categoriascontroller.listId = function(request, response){

    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id de la categoria es obligatorio", nombrecampo: "_id" })
        return false
    }
    categoriasmodel.listId(post, function(respuesta) {
        response.json(respuesta)
    })
}
categoriascontroller.update = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id de categoria es obligatorio", nombrecampo: "_id" })
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({ state:false, mensaje:"el campo nombre de categoria es obligatorio", nombrecampo: "nombre" })
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({ state:false, mensaje:"el campo estado de categoria es obligatorio", nombrecampo: "estado" })
        return false
    }

    categoriasmodel.update(post, function(respuesta) {
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se actualizo el elemento correctamente" })
        }
        else{
            response.json({state:true, mensaje:"Se presento un error al actualizar el elemento", error: respuesta})
        }
    })
}
categoriascontroller.delete = function(request, response){
    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id de categoria es obligatorio", nombrecampo: "_id" })
        return false
    }

    categoriasmodel.delete(post, function(respuesta) {
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se elimino el elemento correctamente" })
        }
        else{
            response.json({state:true, mensaje:"Se presento un error al eliminar el elemento", error: respuesta})
        }
    })
}


module.exports.categoriascontroller = categoriascontroller