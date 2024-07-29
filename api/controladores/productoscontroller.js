var productosmodel = require("../modelos/productosmodel.js").productosmodel
var productoscontroller = {}

productoscontroller.save = function(request, response){

    var post = {
        cod_cat: request.body.cod_cat,
        cod_prod: request.body.cod_prod,
        nombre: request.body.nombre,
        estado: request.body.estado,
        precio: request.body.precio,
        imagen: request.body.imagen,
        descripcion: request.body.descripcion
    }

    if(post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == ""){
        response.json({ state:false, mensaje:"el campo codigo de categoria es obligatorio", nombrecampo: "cod_cat" })
        return false
    }

    if(post.cod_prod == undefined || post.cod_prod == null || post.cod_prod == ""){
        response.json({ state:false, mensaje:"el campo codigo de producto es obligatorio", nombrecampo: "cod_prod" })
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

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({ state:false, mensaje:"el campo precio es obligatorio", nombrecampo: "precio" })
        return false
    }

    // if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
    //     response.json({ state:false, mensaje:"el campo imagen es obligatorio", nombrecampo: "imagen" })
    //     return false
    // }
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
productosmodel.buscarcodigo(post, function(resultado){
    if(resultado.posicion == -1){
        //crea producto

        productosmodel.crear(post, function(respuesta){
            if(respuesta.state == true){
                response.json({ state: true, mensaje: "producto creado correctamente"})
                return false    
            }
            else{
                response.json({ state: false, mensaje: "error al guardar"})
                return false
            }
        })
    }
    else{
        response.json({ state: false, mensaje: "el codigo del producto ya existe" })
        return false
    }
})






}
productoscontroller.list = function(request, response){
    productosmodel.list(null, function(respuesta) {
        response.json(respuesta)
    })
}
productoscontroller.listId = function(request, response){

    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id de producto es obligatorio", nombrecampo: "_id" })
        return false
    }
    productosmodel.listId(post, function(respuesta) {
        response.json(respuesta)
    })
}
productoscontroller.update = function(request, response){
    var post = {
        _id: request.body._id,
        cod_cat: request.body.cod_cat,
        nombre: request.body.nombre,
        estado: request.body.estado,
        precio: request.body.precio,
        imagen: request.body.imagen,
        descripcion: request.body.descripcion
    }

    if(post.cod_cat== undefined || post.cod_cat== null || post.cod_cat== ""){
        response.json({ state:false, mensaje:"el campo codigo de categoria es obligatorio", nombrecampo: "cod_cat" })
        return false
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id de producto es obligatorio", nombrecampo: "_id" })
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({ state:false, mensaje:"el campo nombre de producto es obligatorio", nombrecampo: "nombre" })
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({ state:false, mensaje:"el campo estado de producto es obligatorio", nombrecampo: "estado" })
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({ state:false, mensaje:"el campo precio es obligatorio", nombrecampo: "precio" })
        return false
    }

    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({ state:false, mensaje:"el campo imagen es obligatorio", nombrecampo: "imagen" })
        return false
    }

    productosmodel.update(post, function(respuesta) {
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se actualizo el elemento correctamente" })
        }
        else{
            response.json({state:true, mensaje:"Se presento un error al actualizar el elemento", error: respuesta})
        }
    })
}
productoscontroller.delete = function(request, response){
    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id de producto es obligatorio", nombrecampo: "_id" })
        return false
    }

    productosmodel.delete(post, function(respuesta) {
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se elimino el elemento correctamente" })
        }
        else{
            response.json({state:true, mensaje:"Se presento un error al eliminar el elemento", error: respuesta})
        }
    })
}


module.exports.productoscontroller = productoscontroller