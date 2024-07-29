var datamensajes = []
var mensajeria = function(tipo,mensaje) {

  Swal.fire({
    position: "top-end",
    icon: tipo,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  })


  // datamensajes.push({ tipo: tipo, mensaje: mensaje })
  // var mismensajes = document.getElementById("mismensajes")
  // mismensajes.innerHTML = ""

  // for (let a = 0; a < datamensajes.length; a++) {
  //   mismensajes.innerHTML += `<div class="alert alert-${tipo}" role="alert">
  //   ${datamensajes[a].mensaje}
  //   </div>`
    
  // }
  // setTimeout(()=>{
  //   datamensajes.splice(0, 1)
  //   mismensajes.innerHTML = ""
  //   for (let a = 0; a < datamensajes.length; a++) {
  //     mismensajes.innerHTML += `<div class="alert alert-${tipo}" role="alert">
  //     ${datamensajes[a].mensaje}
  //     </div>`
      
  //   }

  // }, 3000)

}


var PeticionPost = function(url, body, callback) {

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open("POST", url);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send(body);

xhr.addEventListener("readystatechange", function() {
  if (this.readyState === 4) {
    var resultado = JSON.parse(this.responseText);
    console.log(resultado)
    return callback(resultado)
  }
})
}


var login = function() {
    
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    
  
    var post = {
      host:"http://localhost:3000",
      path:"/usuarios/login",
      payload: "email=" + email + "&password=" + password
    }

    PeticionPost(post.host + post.path, post.payload, function(resultado){
      if(resultado.state == true) {
                mensajeria("success", resultado.mensaje)
            } else {
              mensajeria("error", resultado.mensaje)
            }
    })

}