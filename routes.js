var soloadmin = function(request, response, next){
    var rol = request.session.rol
    if(rol == 1){
        next()
    }
    else{
        response.json({permisos: true, state: false, mensaje: "Esta Api solo la pueden usar los ADMINISTRADORES"})
    }

}

var solologueados = function(request, response, next){

    if(request.session._id != undefined){
        next()
    }
    else{
        response,json({permisos:true, state: false, mensaje: "Debe iniciar session"})
    }
}




var categoriascontroller = require("./api/controladores/categoriascontroller.js").categoriascontroller


app.post("/categorias/save", function(request, response) {
    categoriascontroller.save(request, response)
})
app.post("/categorias/list", function(request, response) {
    categoriascontroller.list(request, response)
})
app.post("/categorias/listId", function(request, response) {
    categoriascontroller.listId(request, response)
})
app.post("/categorias/update", function(request, response) {
    categoriascontroller.update(request, response)
})
app.post("/categorias/delete", function(request, response) {
    categoriascontroller.delete(request, response)
})


//TABLA MAESTRA 1
var productoscontroller = require("./api/controladores/productoscontroller.js").productoscontroller


app.post("/productos/save", soloadmin, function(request, response) {
    productoscontroller.save(request, response)
})
app.post("/productos/list", function(request, response) {
    productoscontroller.list(request, response)
})
app.post("/productos/listId", soloadmin, function(request, response) {
    productoscontroller.listId(request, response)
})
app.post("/productos/update", soloadmin, function(request, response) {
    productoscontroller.update(request, response)
})
app.post("/productos/delete", soloadmin, function(request, response) {
    productoscontroller.delete(request, response)
})


//TABLA MAESTRA 3
var usuarioscontroller = require("./api/controladores/usuarioscontroller.js").usuarioscontroller


app.post("/usuarios/save", function(request, response) {
    usuarioscontroller.save(request, response)
})
app.get("/usuarios/list", function(request, response) {
    usuarioscontroller.list(request, response)
})
app.get("/usuarios/listId", function(request, response) {
    usuarioscontroller.listId(request, response)
})
app.put("/usuarios/update", function(request, response) {
    usuarioscontroller.update(request, response)
})
app.delete("/usuarios/delete", function(request, response) {
    usuarioscontroller.delete(request, response)
})
app.post("/usuarios/activar", function(request, response) {
    usuarioscontroller.activar(request, response)
})
app.post("/usuarios/login", function(request, response) {
    usuarioscontroller.login(request, response)
})
app.post("/usuarios/state", function(request, response) {
    response.json(request.session)
})
app.post("/usuarios/Misdatos",solologueados, function(request, response) {
    usuarioscontroller.Misdatos(request, response)
})
app.post("/usuarios/logout",solologueados, function(request, response) {
    request.session.destroy()
    response.json({state: true, mensaje: "Session Cerrada"})
})






