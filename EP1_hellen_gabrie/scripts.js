function mensaje() {
  var nombre = document.getElementById("name");

  if (nombre.value == "") {
    alert("Debe ingresar su nombre");
  } else {
    //alert("Bienvenido " + nombre.value);
    var texto = document.getElementsByClassName("texto");
    var nave = document.getElementsByTagName("header");
    texto[0].style.color = "red";
    nave[0].style.backgroundColor = "orange";
  }
}
