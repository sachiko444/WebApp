//funcion que obtenga info de dos inputs para poder mostrar el mensaje

function mensaje() {
  var nombre = document.getElementById("name");
  var apellidos = document.getElementById("apellidos");

  //si el nombre esta vacio, se quita el boton de "Aceptar"
  if (nombre.value == "") {
    var button = document.getElementsByTagName("button"); //getElementsbyTagName lo aplica a todos los botones que hayan en la pagina
    button[0].style.display = "none";
  }

  //si el nombre esta vacio, se cambia el color"
  if (nombre.value == "") {
    var button = document.getElementsByTagName("button");
    button[0].style.backgroundColor = "#fff"; //con style se accede al css
  }

  console.log("Bienvenido " + nombre.value + " " + apellidos.value);
  //alert("Bienvenido " + nombre.value + " " + apellidos.value);
}
