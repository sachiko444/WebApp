function mensaje() {
  var nombre = document.getElementById("nombre");
  var apellido = document.getElementById("Apellido");
  var correo = document.getElementById("Correo");
  var edad = document.getElementById("Edad");

  if (edad.value < 18) {
    document.getElementById("nombre").disabled = true;
    document.getElementById("Apellido").disabled = true;
    document.getElementById("Genero").disabled = true;
    document.getElementById("Edad").disabled = true;
    document.getElementById("Correo").disabled = true;
    document.getElementById("telefono").disabled = true;
    document.getElementById("Mensaje").disabled = true;
    swal({
      title: "Error!",
      text:
        "Hola, " +
        nombre.value +
        "  " +
        apellido.value +
        " usted no puede recibir información porque no cumple con la mayoría de edad",
      icon: "warning",
      button: "Boo ya",
    });
  } else {
    swal({
      title: "Oh yea!",
      text:
        "Bienvenido, " +
        nombre.value +
        "  " +
        apellido.value +
        " en breve le enviaremos un correo electrónico con información a " +
        correo.value,
      icon: "success",
      button: "Cool",
    }).then(function () {
      window.location = "../index.html";
    });
  }
}
