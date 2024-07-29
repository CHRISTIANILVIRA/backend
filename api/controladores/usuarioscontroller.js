var usuariosmodel = require("../modelos/usuariosmodel.js").usuariosmodel
var usuarioscontroller = {}

usuarioscontroller.save = function(request, response){

    var post = {
        identificacion: request.body.identificacion,
        nombre: request.body.nombre,
        sexo: request.body.sexo,
        email: request.body.email,
        password:request.body.password,
        telefono: request.body.telefono,
        estado: request.body.estado,
        
        
    }

    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({ state:false, mensaje:"el campo identificacion del usuario es obligatorio", campo: "identificacion" })
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({ state:false, mensaje:"el campo nombre es obligatorio", campo: "nombre"})
        return false
    }

    if(post.sexo == undefined || post.sexo == null || post.sexo == ""){
        response.json({ state:false, mensaje:"el campo sexo es obligatorio", campo: "sexo"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({ state:false, mensaje:"el campo email del usuario es obligatorio", campo: "email" })
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({ state:false, mensaje:"el campo password del usuario es obligatorio", campo: "password" })
        return false
    }

    if(post.telefono == undefined || post.telefono == null || post.telefono == ""){
        response.json({ state:false, mensaje:"el campo telefono es obligatorio", campo: "telefono"})
        return false
    }



//BUSCAR SI EXISTE PRODUCTO    
usuariosmodel.buscarcodigo(post, function(resultado){
    if(resultado.posicion == -1){
        //crea producto

        //calcular codigo de activacion
        var azar = "Sumire-" + Math.floor(Math.random() * (999999 - 100000) + 100000);
        post.azar = azar

        //Crear correo
        const nodemailer = require("nodemailer")

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port:587,
            secure: false,
            requireTLS: true,
            auth:{
                user: config.usergmail,
                pass: config.passgmail
            }
        })

        let mailOptions = {
            from: config.usergmail,
            to: post.email,
            subject: "verifica tu cuenta codigo: " + post.azar,
            html: `<div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; color: #333; margin-bottom: 20px;">
            <img src="http://localhost:4200/activar/Logo-sumire.png" alt="Sumire Detalles" style="max-width: 150px; margin-bottom: 10px;">
            <h2 style="margin: 0;">Activación de la Cuenta</h2>
        </div>
        <div style="color: #555; line-height: 1.6;">
            <p>Hola,</p>
            <p>Gracias por registrarte en Sumire Detalles. Para activar tu cuenta, por favor ingresa el siguiente código de activación en el formulario de activación:</p>
            <p style="text-align: center; font-size: 24px; color: #d63384; margin: 20px 0;">${post.azar}</p>
            <p>Puedes activar tu cuenta haciendo clic en el siguiente enlace:</p>
            <p style="text-align: center; margin: 20px 0;">
                <a href="http://localhost:4200/activar/${post.email}/${post.azar}" style="display: inline-block; padding: 10px 20px; background-color: #d63384; color: white; text-decoration: none; border-radius: 4px;">Activar Cuenta</a>
            </p>
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
            <p>Gracias,</p>
            <p>El equipo de Sumire Detalles</p>
        </div>
        <div style="color: #555; text-align: center; margin-top: 30px;">
            <p>&copy; 2024 Sumire Detalles. Todos los derechos reservados.</p>
        </div>
    </div>`
        }

        transporter.sendMail(mailOptions,(error, info) => {
            if(error) {
                return console.log(error)
            }
            else{
                info
            }
        })



        usuariosmodel.crear(post, function(respuesta){
            if(respuesta.state == true){
                response.json({ state: true, mensaje: "elemento creado correctamente"})
                return false    
            }
            else{
                response.json({ state: false, mensaje: "error al guardar"})
                return false
            }
        })
    }
    else{
        response.json({ state: false, mensaje: "el email del usuario ya existe" })
        return false
    }
    })
}
usuarioscontroller.list = function(request, response){
    usuariosmodel.list(null, function(respuesta) {
        response.json(respuesta)
    })
}
usuarioscontroller.listId = function(request, response){

    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", nombrecampo: "_id" })
        return false
    }
    usuariosmodel.listId(post, function(respuesta) {
        response.json(respuesta)
    })
}
usuarioscontroller.update = function(request, response){
    var post = {
        identificacion: request.body.identificacion,
        _id: request.body._id,
        nombre: request.body.nombre,
        sexo: request.body.sexo,
        estado: request.body.estado,
        password: request.body.password,
        telefono: request.body.telefono,
        rol: request.body.rol
       
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", campo: "_id" })
        return false
    }

    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", campo: "identificacion" })
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({ state:false, mensaje:"el campo nombre del usuario es obligatorio", campo: "nombre" })
        return false
    }

    if(post.sexo == undefined || post.sexo == null || post.sexo == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", campo: "sexo" })
        return false
    }

    if(post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({ state:false, mensaje:"el campo estado del usuario es obligatorio", campo: "estado" })
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", nombrecampo: "password" })
        return false
    }

    if(post.telefono == undefined || post.telefono == null || post.telefono == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", nombrecampo: "telefono" })
        return false
    }

    if(post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({ state:false, mensaje:"el campo rol del usuario es obligatorio", campo: "rol" })
        return false
    }

    usuariosmodel.update(post, function(respuesta) {
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se actualizo el elemento correctamente" })
        }
        else{
            response.json({state:true, mensaje:"Se presento un error al actualizar el elemento", error: respuesta})
        }
    })




}
usuarioscontroller.delete = function(request, response){
    var post = {
        _id: request.body._id
    }

    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({ state:false, mensaje:"el campo id del usuario es obligatorio", nombrecampo: "_id" })
        return false
    }

    usuariosmodel.delete(post, function(respuesta) {
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se elimino el elemento correctamente" })
        }
        else{
            response.json({state:true, mensaje:"Se presento un error al eliminar el elemento", error: respuesta})
        }
    })
}
usuarioscontroller.login = function(request, response){

    var post = {
        email: request.body.email,
        password: request.body.password
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({ state:false, mensaje:"el campo email del usuario es obligatorio", nombrecampo: "email" })
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({ state:false, mensaje:"el campo password del usuario es obligatorio", nombrecampo: "password" })
        return false
    }
    usuariosmodel.login(post, function(respuesta) {

        console.log(respuesta.data.length)

        if(respuesta.state == true){
            if(respuesta.data.length == 0){
                response.json({state: false, mensaje: "Error en las credenciales de Acceso"})    
            }
            else{
                if(respuesta.data[0]. estado == 0) {
                    response.json({state: false, mensaje: "Su cuenta no ha sido activada, verifica tu correo"})
                }
                else {
                    request.session.nombre = respuesta.data[0].nombre
                    request.session.rol = respuesta.data[0]. rol
                    request.session._id = respuesta.data[0]. _id

                    response.json({state: true, mensaje: "Bienvenido " + respuesta.data[0].nombre })
                }

            }
        }
        else{
            response.json({state: false, mensaje: "Error en las credenciales de Acceso"})
        }
        //response.json(respuesta)
    })
}
usuarioscontroller.activar = function(request, response){
    var post = {
        email: request.body.email,
        codigoact: request.body.codigoact
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({ state:false, mensaje:"el campo email del usuario es obligatorio", campo: "email" })
        return false
    }

    if(post.codigoact == undefined || post.codigoact == null || post.codigoact == ""){
        response.json({ state:false, mensaje:"el campo codigoact del usuario es obligatorio", campo: "codigoact" })
        return false
    }

    usuariosmodel.activar(post, function(respuesta) {
        
        if(respuesta.respuesta.modifiedCount == 0){
            response.json({ state: false, mensaje: "Sus credenciales de acceso son invalidas"})
        }
        else{
            response.json({ state: true, mensaje: "Su cuenta se activo correctamente"})
        }
        
    })
}
usuarioscontroller.Misdatos = function(request, response){

    var post = {
        _id: request.session._id
    }

    usuariosmodel.listId(post, function(respuesta) {
        response.json(respuesta)
    })
}


module.exports.usuarioscontroller = usuarioscontroller