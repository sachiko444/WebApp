const store = new Vuex.Store({
  state: {
    carrito: JSON.parse(localStorage.getItem("carrito") || "[]"),
  },
  mutations: {
    agregarCarrito(state, item) {
      for (var i = 0; i < state.carrito.length; i++) {
        if (state.carrito[i].name == item.name) {
          item.cantidad = state.carrito[i].cantidad;
          state.carrito.splice(i, 1, item);
          localStorage.setItem("carrito", JSON.stringify(state.carrito));
          return;
        }
      }
      state.carrito.push(item);
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },
    quitarCarrito(state, item) {
      for (var i = 0; i < state.carrito.length; i++) {
        if (state.carrito[i].name == item.name) {
          state.carrito.splice(i, 1);
          localStorage.setItem("carrito", JSON.stringify(state.carrito));
          return;
        }
      }
    },
  },
});

Vue.component("carrito", {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Name", "Imagen", "Descripcion", "Cantidad"],
    };
  },

  computed: {
    ...Vuex.mapState(["carrito"]),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    items() {
      return this.$store.state.carrito;
    },
  },

  methods: {
    ...Vuex.mapMutations(["agregarCarrito", "quitarCarrito"]),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    aumentar(item) {
      item.cantidad++;
      this.agregarCarrito(item);
    },
    disminuir(item) {
      item.cantidad--;
      if (item.cantidad < 1) {
        this.quitarCarrito(item);
      } else {
        this.agregarCarrito(item);
      }
    },
  },

  template: `
  <div id="app">
  <v-app id="inspire">
    <v-container fluid>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            dark
            color="#8fe7fd"
            class="mb-1"
          >
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
                >
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
                >
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.name }}
                </v-card-title>
  
                <v-divider></v-divider>
  
                
                
                <v-list dense>
                  <v-img v-bind:src="item.imagen" height="125" contain> </v-img>
                  <v-list-item

                  >        
                    </v-list-item-content>
                    <v-list-item-content
                                         
                                         
                      class="center"
                      
                    >

                     
                     
                      
                      
                      
                      
                    </v-list-item-content>
                  
                  </v-list-item>
                
                <v-card-actions class="justify-center">

                

                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="disminuir(item)"                       
                      
                    >
                      <v-icon dark>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                   {{ item.cantidad }} 
                <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="aumentar(item)"                       
                      
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  
                   </v-card-actions>
                
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
  
        <template v-slot:footer>
          <v-row
            class="mt-2"
            align="center"
            justify="center"
          >
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
  
            <v-spacer></v-spacer>
  
            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </v-app>
</div>
  
  
  
  
    `,
});

Vue.component("lista", {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Name", "Imagen", "Descripcion", "Cantidad"],
      items: [
        {
          name: "Cap'n Crunch",
          imagen: "images/capn.jpg",
          descripcion:
            "Comience bien el d??a con un taz??n dulce y crujiente de cereal Capn Crunch. Este sabroso desayuno ha despertado al mundo durante generaciones con su abundante y saludable mezcla de ma??z y avena y su sabor dulce y azucarado.",
          cantidad: 0,
        },

        {
          name: "Chocokrispis",
          imagen: "images/chocokrispies.jpg",
          descripcion:
            "Este cereal de granos de arroz tostado cubierto con sabor chocolate es el producto cl??sico que a ti y a tus hijos tanto les gusta. Adem??s, est?? adicionado con Calcio + Hierro + Zinc que ayudan al crecimiento de los m??s peque??os.",
          cantidad: 0,
        },

        {
          name: "Churros",
          imagen: "images/churros.jpg",
          descripcion:
            "La mezcla de cereales sabor a churro, adicionada con vitaminas y hierro, tambi??n tiene el dulzor del az??car y de la canela en polvo. La caja de 260 gramos puede acompa??arte en tus desayunos o cenas ligeras con tu leche y fruta favorita. ",
          cantidad: 0,
        },

        {
          name: "Cinnamon Toast Crunch",
          imagen: "images/toast.jpg",
          descripcion:
            "NESTLE Cinnamon Toast Crunch es un cereal con trigo integral y arroz con canela, fortificado con vitaminas y minerales. Con sus cuadritos de canela mas divertidos para desayunar, su delicioso sabor te encantar??!",
          cantidad: 0,
        },

        {
          name: "Corn Flakes",
          imagen: "images/cornflakes.jpg",
          descripcion:
            "El cereal Corn Flakes de NESTLE es una maravillosa manera de empezar tu d??a  con el delicioso sabor de las hojuelas de ma??z, pero sin gluten. Ricas y crujientes hojuelas de ma??z, fortificadas con 9 vitaminas.  ??El mismo gran sabor!",
          cantidad: 0,
        },

        {
          name: "Crunch",
          imagen: "images/crunch.jpg",
          descripcion:
            "Disfruta de este crocante cereal con irresistible sabor del chocolate CRUNCH ??. Hecho a base de arroz, trigo integral y ma??z integral. Empieza el d??a con un desayuno divertido y exposivo con Cereal Crunch",
          cantidad: 0,
        },

        {
          name: "Fitness",
          imagen: "images/fitness.jpg",
          descripcion:
            "Disfruta de un desayuno lleno de energ??a con los crujientes y exquisitos cereales Fitness??. Contienen vitaminas del grupo B (B2, B3, B5 y B6) que contribuyen al metabolismo energ??tico normal, trigo y avena integrales. ",
          cantidad: 0,
        },

        {
          name: "Froot Loops",
          imagen: "images/loops.jpeg",
          descripcion:
            "Es un cereal que les da a tus hijos una combinaci??n de nutrici??n, sabor, aroma y color para un desayuno Frutidivertido.",
          cantidad: 0,
        },

        {
          name: "Lucky Charms",
          imagen: "images/lucky.jpg",
          descripcion:
            "NESTLE LUCKY CHARMS es un cereal hecho con avena integral y 8 diferentes malvaviscos, adem??s est?? fortificado con 12 vitaminas y minerales, incluyendo calcio.",
          cantidad: 0,
        },

        {
          name: "Zucaritas",
          imagen: "images/zucaritas.jpg",
          descripcion:
            "Estas riqu??simas hojuelas de ma??z escarchadas con az??car pueden ser parte de un pr??ctico desayuno o de una cena ligera. Los cereales forman parte de una dieta diversa, siendo un pilar b??sico para una alimentaci??n basada en plantas.",
          cantidad: 0,
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    ...Vuex.mapState(["carrito"]),
  },
  methods: {
    ...Vuex.mapMutations(["agregarCarrito"]),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    agregar(item) {
      if (item.cantidad <= 0) {
        item.cantidad = 1;
        this.agregarCarrito(item);
      }
      this.agregarCarrito(item);
    },
  },
  template: `
  
  <v-app id="inspire">
                            <v-container fluid>
                                <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page.sync="page"
                                    :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc"
                                    hide-default-footer>
                                    <template v-slot:header>
                                        <v-toolbar dark color="#ff798a" class="mb-1">
                                            <v-text-field v-model="search" clearable flat solo-inverted hide-details
                                                prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
                                            <template v-if="$vuetify.breakpoint.mdAndUp">
                                                <v-spacer></v-spacer>
                                                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                                                    prepend-inner-icon="mdi-magnify" label="Sort by"></v-select>
                                                <v-spacer></v-spacer>
                                                <v-btn-toggle v-model="sortDesc" mandatory>
                                                    <v-btn large depressed color="blue" :value="false">
                                                        <v-icon>mdi-arrow-up</v-icon>
                                                    </v-btn>
                                                    <v-btn large depressed color="blue" :value="true">
                                                        <v-icon>mdi-arrow-down</v-icon>
                                                    </v-btn>
                                                </v-btn-toggle>
                                            </template>
                                        </v-toolbar>
                                    </template>

                                    <template v-slot:default="props">
                                        <v-row>
                                            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4"
                                                lg="3">
                                                <v-card>
                                                    <v-card-title class="subheading font-weight-bold">
                                                        {{ item.name }}
                                                    </v-card-title>

                                                    <v-divider></v-divider>



                                                    <v-list dense>
                                                        <v-img v-bind:src="item.imagen" height="125" contain> </v-img>
                                                        <v-list-item>
                                                            </v-list-item-content>
                                                            <v-list-item-content class="center"
                                                                >
                                                                {{ item.descripcion }}




                                                            </v-list-item-content>

                                                        </v-list-item>
                                                        <v-btn class="mx-2" fab dark small color="primary" @click="agregar(item)">
      <!--AQUI BOTON-->                                     
                                                            <v-icon dark>
                                                                mdi-cart
                                                            </v-icon>
                                                        </v-btn>
                                                    </v-list>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </template>

                                    <template v-slot:footer>
                                        <v-row class="mt-2" align="center" justify="center">
                                            <span class="grey--text">Items per page</span>
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn dark text color="primary" class="ml-2" v-bind="attrs"
                                                        v-on="on">
                                                        {{ itemsPerPage }}
                                                        <v-icon>mdi-chevron-down</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item v-for="(number, index) in itemsPerPageArray"
                                                        :key="index" @click="updateItemsPerPage(number)">
                                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>

                                            <v-spacer></v-spacer>

                                            <span class="mr-4
              grey--text">
                                                Page {{ page }} of {{ numberOfPages }}
                                            </span>
                                            <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                                                <v-icon>mdi-chevron-left</v-icon>
                                            </v-btn>
                                            <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-row>
                                    </template>
                                </v-data-iterator>
                            </v-container>
                        </v-app>
  
  
  
  
  
  
    `,
});

var vApp = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  store: store,
  methods: {},
});
