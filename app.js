var config = {
  apiKey: "AIzaSyCOkCnFAAGls61avIGj1nAH-ycwGZI9LC4",
  authDomain: "program-ap.firebaseapp.com",
  databaseURL: "https://program-ap-default-rtdb.firebaseio.com",
  projectId: "program-ap",
  storageBucket: "program-ap.appspot.com",
  messagingSenderId: "516840124369",
  appId: "1:516840124369:web:f661949dc0c8d24fa27af0",
  measurementId: "G-9QLG4JCCG0"
};
firebase.initializeApp(config);

  const auth = firebase.auth();
  var db = firebase.database().ref();
  var formFacturas;

    function verfacturas(){

      document.getElementById("form-clientes").innerHTML= "";
      document.getElementById("tbody-tabla-clientes").innerHTML="";

          var fila2 = document.getElementById("facturasx");
          var salidax;   var fila;

      var elegido= parseInt(document.getElementById("clientesx").value);

        var client = db.child("CLIENTES/" + elegido);
        client.on('value', function(snapx) {

                var cliente = snapx.val();

                fila +=  "<table><tr><td>" + cliente.DOCUMENTO + "</td>";
                fila +=  "<td>" + cliente.NOMBRE + "</td>";
                fila +=  "<td>" + cliente.DIRECCION + "</td>";
                fila +=  "<td>" + cliente.TELEFONO + "</td></tr></table>";

                 document.getElementById("tbody-tabla-clientes").innerHTML= fila;

          });

                fila2.innerHTML ="";

                var facturaz ="";  var nfactura =0;

                 var factur = db.child("FACTURAS");
                 var query2 = factur.orderByChild("ID_CLIENTE").equalTo(elegido);
                 query2.on('child_added', function(snap) {

                        nfactura = snap.key;  facturaz = snap.val();
                        var detalle= lafila(nfactura);

                     fila2.innerHTML +=  "<li>Factura: "+ nfactura + "  - Fecha: " + facturaz.FECHA + "</li>";

                     for (var ele in detalle) {
                            fila2.innerHTML +=  detalle[ele];
                       }

            });

   };

function lafila(nfactura){
  var fila3 = []; var j=0;
  var salidaw; var nf= parseInt(nfactura);
  var factur = db.child("DETALLES_FACTURA");
  var query3 = factur.orderByChild("FACTURA").equalTo(nf);
      query3.on('child_added', function(snap) {

                var detx = snap.val();  j+=1;
                var idp= parseInt(detx.ID_PRODUCTO);
                var productoz = elproducto(idp);
        fila3[j]= "<table border='1'><tr><td width='150px'>" + productoz  + "</td><td width='20px'>" + detx.CANTIDAD + " </td><td width='70px'>" + detx.VALOR + "</td></tr></table>";
  });
      return fila3;
}

function elproducto(idp){
  var productw;
  var product = db.child("PRODUCTOS/"+ idp);
  product.on("value", productsnap => {
      var detww = productsnap.val();
      productw= detww.PRODUCTO;
  });
  return productw;
}

  function writeUserData(userId, name, email) {
    db.child('usuarios/' + userId).set({
      username: name,
      email: email,
    });
  }

function verprecio(productx,preciox) {
        productx= parseInt(productx);
        document.getElementById(preciox).value= "";
  var producto = db.child("PRODUCTOS/" + productx);
    producto.on('value', function(snapx) {
          var prod = snapx.val();
          document.getElementById(preciox).value= prod.PRECIO;
    });
}

function totalitem(cn,p,cm){
    var tot = cn * p;
    document.getElementById(cm).value= tot;
}

function enviarfactura(){

  formFacturas = document.getElementById("form-facturas");
              var factactual = parseInt(factura.value);
       if (producto_1.value>0) {
            refFactura=  db.child("FACTURAS/" + factactual);
            refFactura.set({
                ID_CLIENTE: parseInt(clientesy.value),
                FECHA: fecha.value
            });
        }

        for (var i = 1; i < 7; i++) {

              var producto = document.getElementById("producto_" + i).value;
              var cantidad = document.getElementById("cantidad_" + i).value;
              var valor = document.getElementById("valor_" + i).value;

                if (producto>0) {
                    var factu = parseInt(factura.value);
                      refDetalle1=  db.child("DETALLES_FACTURA");
                      refDetalle1.push({
                          FACTURA: parseInt(factactual),
                          ID_PRODUCTO: parseInt(producto),
                          CANTIDAD: parseInt(cantidad),
                          VALOR: parseInt(valor)
                      });
                }
        }

        formFacturas.reset();
}


function loading(X) {

  if (X=='no') {

    btnLogin.addEventListener('click', e => {

      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass);

      promise.catch(e => alert(e.message) );
    });

    btnSignUp.addEventListener('click', e => {

      // TODO: comprobar que el email sea real
      const email = txtEmail.value;
      const pass = txtPassword.value;

      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => alert(e.message) );
    });

    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });
      btnCrud.addEventListener('click', e => {
            window.location="onex.html";
      });

     firebase.auth().onAuthStateChanged( firebaseUser => {
      if(firebaseUser) {
        btnCrud.classList.remove('hide');
          window.location="onex.html";
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
      } else {
        console.log('no logueado');
        btnLogout.classList.add('hide');
      }
    });


    logingoogle.addEventListener('click', function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    });

    logintwitter.addEventListener('click', function() {

      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        var user = result.user;

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

    });

}



if (X=='si') {

        var formClientes;
        var refClientes;
        var tbodytablaclientes;
        var CREATE = "Añadir Cliente";
        var UPDATE = "Modificar Cliente";
        var modo = CREATE;
        var refClienteAEditar;






     auth.onAuthStateChanged(function(user) {
          if (user) {
            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid;
              name = user.displayName;
              email = user.email;
              uid = user.uid;
              console.log("Logeado: " + email );
                  if (name != null) {
                    usuariologed.innerHTML=name + " - " + email;
                  }else{
                    usuariologed.innerHTML=email;
                  }
            } else {
                 window.location="login.html";
          }
      });

      clientesy.addEventListener('click', function() {
              var factura = db.child("FACTURAS");
              var query = factura.limitToLast(1);
              query.on('child_added', function(snapx) {
              var facturaw = parseInt(snapx.key);
              var nuevafac= facturaw + 1;
              document.getElementById("factura").value= nuevafac;
              var f = new Date();
              document.getElementById("fecha").value= f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
          });
      });


        inicializar();

        function inicializar(){

                var query = db.child('CLIENTES').orderByChild('NOMBRE');
                    clientesx.innerHTML = "<option></option>";
                    clientesy.innerHTML = "<option></option>";

                  query.on('child_added', function(snap) {
                          var cliente = snap.val();
                        clientesx.innerHTML += "<option value='"+snap.key+"'>" + cliente.NOMBRE + "</option>";
                        clientesy.innerHTML += "<option value='"+snap.key+"'>" + cliente.NOMBRE + "</option>";
                  });

                var query2 = db.child('PRODUCTOS').orderByChild('ID');

                        for (var i = 1; i < 7; i++) {
                              document.getElementById("producto_" + i).innerHTML = "<option></option>";
                        }

                    query2.on('child_added', function(snap) {
                      var producto = snap.val();

                        for (var i = 1; i < 7; i++) {
                            document.getElementById("producto_" + i).innerHTML += "<option value='"+snap.key+"'>" + producto.PRODUCTO + "</option>";
                        }

                    });

              formClientes = document.getElementById("form-clientes");

              formClientes.addEventListener("submit",enviarClientes, false);
              tbodytablaclientes= document.getElementById("tbody-tabla-clientes");
              refClientes=  db.child("CLIENTES");

              mostrarClientes();

        }

        btnLogout2.addEventListener('click', e => {
            firebase.auth().signOut();
            window.location="index.html";
        });

        function enviarClientes(event){
            event.preventDefault();
            switch (modo) {
            case CREATE:
                  var nuevocliente
                  var cliente = db.child("CLIENTES");
                  var query = cliente.limitToLast(1);
                  query.on('child_added', function(snapx) {
                      var clientex = parseInt(snapx.key);
                            nuevocliente= clientex + 1;
                    });
                     refClientes2=  db.child("CLIENTES/" + nuevocliente);
                     refClientes2.set({
                       DOCUMENTO: event.target.documento.value,
                       NOMBRE: event.target.nombre.value,
                       DIRECCION: event.target.direccion.value,
                       TELEFONO: event.target.telefono.value
                    });  break;

            case UPDATE:
              refClienteAEditar.update({
                  DOCUMENTO: event.target.documento.value,
                  NOMBRE: event.target.nombre.value,
                  DIRECCION: event.target.direccion.value,
                  TELEFONO: event.target.telefono.value
                });
                modo = CREATE;
                document.getElementById("boton-enviar-cliente").value = CREATE;
                break;

            }

            formClientes.reset();
        }

        function mostrarClientes(){

                refClientes.on("value", function(snap){

                        var datos = snap.val();  var fila="";

                        for (var key in datos) {
                              fila +=  "<tr>";
                              fila +=  "<td>" + datos[key].DOCUMENTO + "</td>";
                              fila +=  "<td>" + datos[key].NOMBRE + "</td>";
                              fila +=  "<td>" + datos[key].DIRECCION + "</td>";
                              fila +=  "<td>" + datos[key].TELEFONO + "</td>";
                              fila +=  "<td>";
                              fila +=  "<button datacon='"+ key +"' class='editar btn-default glyphicon glyphicon-pencil'></button>";
                              fila +=  "</td><td>";
                              fila +=  "<button datacon='"+ key +"' class='borrar btn-danger glyphicon glyphicon-trash'></button>";
                              fila +=  "</td>";
                              fila +=  "</tr>";

                        }

                        tbodytablaclientes.innerHTML= fila;
                        if (fila != "") {

                              var elementosEditables = document.getElementsByClassName("editar");
                              for (var i = 0; i < elementosEditables.length; i++) {
                                    elementosEditables[i].addEventListener("click", editarClientes, false);
                              }

                              var elementosBorrables = document.getElementsByClassName("borrar");
                              for (var i = 0; i < elementosBorrables.length; i++) {
                                    elementosBorrables[i].addEventListener("click", borrarClientes, false);
                              }
                        }
                });
        }

        function editarClientes(){
              var keyDeClientesAEditar = this.getAttribute("datacon");
              refClienteAEditar= refClientes.child(keyDeClientesAEditar);
              refClienteAEditar.once("value", function(snap){
              var datos= snap.val();
              document.getElementById("documento").value= datos.DOCUMENTO;
              document.getElementById("nombre").value= datos.NOMBRE;
              document.getElementById("direccion").value= datos.DIRECCION;
              document.getElementById("telefono").value= datos.TELEFONO;
              })
              document.getElementById("boton-enviar-cliente").value = UPDATE;
              modo = UPDATE;
        }

        function borrarClientes(){
        var keyDeClientesABorrar = this.getAttribute("datacon");
        var refClienteABorrar= refClientes.child(keyDeClientesABorrar);
        refClienteABorrar.remove();
        }

}

}

