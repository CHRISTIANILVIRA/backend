const express = require("express")
global.app = express()
global.config = require("./config.js").config //importar modulo
global.categorias = []
global.productos = [{cod_prod:"001", nombre:"fresas"}]

var bodyparser = require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
   // console.log(whitelist)
    res.header('Access-Control-Allow-Origin', whitelist);
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
   res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
   res.header("Access-Control-Allow-Credentials", "true");
  // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');


   next();

});

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then(
    () => console.log("conectado a mongoose")
).catch((error) => {
    console.log(error)
})


var cors = require("cors")

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true)

        if (config.origin.indexOf(origin) === -1) {
            return callback('error de cors', false)
        }

        return callback(null, true)
    }
}))


var session = require("express-session")({
    secret:config.palabraclave,
    resave: true,
    saveUninitialized: true,
    cookie: {path: "/",httpOnly:true, maxAge: config.maxage },
    name: config.nombrecookie,
    rolling: true
})

app.use(session)

require("./routes.js")


app.use("/", express.static(__dirname + "/pagina"))
app.use("/imagenes", express.static(__dirname + "/imagenes"))




app.listen(config.puerto, function() {
console.log("servidor funcionando por el puerto " + config.puerto)
})