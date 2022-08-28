new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    valid: true,
    contacto: {
      name: "",
      apellido: "",
      email: "",
      genero: "",
      edad: "",
      telefono: "",
      mensaje: "",
    },
    errormess: "",
    successmess: "",
    nameRules: [
      (v) => !!v || "El nombre es requerido",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    apellidoRules: [
      (v) => !!v || "El apellido es requerido",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    edadRules: [
      (v) => !!v || "La edad es requerido",
      (v) => (v && v.length == 2) || "Edad debe ser dos caracteres",
    ],

    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail debe ser valido",
    ],

    telefonoRules: [
      (v) => !!v || "El telefono es requerido",
      (v) =>
        (v && v.length == 8) || "Número telefónico debe ser de 8 caracteres",
    ],

    mensajeRules: [(v) => !!v || "El Mensaje es requerido"],

    items: ["Femenino", "Masculino"],
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Apellido", value: "apellido" },
      { text: "Género", value: "genero" },
      { text: "Edad", value: "edad" },
      { text: "Email", value: "email" },
      { text: "Teléfono", value: "telefono" },
    ],
    info: [],
  }),

  methods: {
    guardar() {
      if (this.contacto.edad < 18) {
        this.valid = false;
        this.errormess =
          "Hola, " +
          this.contacto.name +
          "  " +
          this.contacto.apellido +
          " usted no puede recibir información porque no cumple con la mayoría de edad";
        this.$refs.form.reset();
      } else {
        this.valid = true;
        this.successmess =
          "Bienvenido, " +
          this.contacto.name +
          " " +
          this.contacto.apellido +
          " en breve le enviaremos un correo electrónico con información a " +
          this.contacto.email;
        this.info.push({
          name: this.contacto.name,
          apellido: this.contacto.apellido,
          genero: this.contacto.genero,
          edad: this.contacto.edad,
          email: this.contacto.email,
          telefono: this.contacto.telefono,
        });
        this.$refs.form.validate();
      }
    },
    getColor(edad) {
      if (edad < 35) return "blue";
      else return "gray";
    },
  },
});
