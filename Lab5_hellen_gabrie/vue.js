const store = new Vuex.Store({
  state: {
    cantidad: 0,
  },
  mutations: {
    aumentar() {
      this.state.cantidad++;
    },
    disminuir() {
      this.state.cantidad--;
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
      keys: ["Nombre", "Imagen", "Cantidad"],
      items: [],
    };
  },

  computed: {
    ...Vuex.mapState(["cantidad"]),
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    agregarCarrito(name, image, count) {
      this.items.push({
        nombre: name,
        imagen: image,
        cantidad: count,
      });
    },
  },

  methods: {
    ...Vuex.mapMutations(["aumentar", "disminuir"]),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
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
            color="#ff798a"
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
                :items="keys[2]"
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
                      :class="{ 'blue--text': sortBy === key }"
                    >
                      {{ item.descripcion }}
                      
                      
                      
                      
                    </v-list-item-content>
                  
                  </v-list-item>
                
                <v-card-actions class="justify-center">

           <lista :item.cantidad="item.cantidad"> </lista>            <!--Comunicacion entre carrito y lista-->

                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="cantidad--"                       <!--AQUI BOTON-->
                      
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
                      @click="cantidad++"                       <!--AQUI BOTON-->
                      
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
      keys: ["Nombre", "Imagen", "Descripcion", "Cantidad"],
      items: [
        {
          name: "Cap'n Crunch",
          imagen: "images/capn.jpg",
          descripcion:
            "Comience bien el día con un tazón dulce y crujiente de cereal Capn Crunch. Este sabroso desayuno ha despertado al mundo durante generaciones con su abundante y saludable mezcla de maíz y avena y su sabor dulce y azucarado.",
          cantidad: 0,
        },

        {
          name: "Chocokrispis",
          imagen: "images/chocokrispies.jpg",
          descripcion:
            "Este cereal de granos de arroz tostado cubierto con sabor chocolate es el producto clásico que a ti y a tus hijos tanto les gusta. Además, está adicionado con Calcio + Hierro + Zinc que ayudan al crecimiento de los más pequeños.",
          cantidad: 0,
        },

        {
          name: "Churros",
          imagen: "images/churros.jpg",
          descripcion:
            "La mezcla de cereales sabor a churro, adicionada con vitaminas y hierro, también tiene el dulzor del azúcar y de la canela en polvo. La caja de 260 gramos puede acompañarte en tus desayunos o cenas ligeras con tu leche y fruta favorita. ",
          cantidad: 0,
        },

        {
          name: "Cinnamon Toast Crunch",
          imagen: "images/toast.jpg",
          descripcion:
            "NESTLE Cinnamon Toast Crunch es un cereal con trigo integral y arroz con canela, fortificado con vitaminas y minerales. Con sus cuadritos de canela mas divertidos para desayunar, su delicioso sabor te encantará!",
          cantidad: 0,
        },

        {
          name: "Corn Flakes",
          imagen: "images/cornflakes.jpg",
          descripcion:
            "El cereal Corn Flakes de NESTLE es una maravillosa manera de empezar tu día  con el delicioso sabor de las hojuelas de maíz, pero sin gluten. Ricas y crujientes hojuelas de maíz, fortificadas con 9 vitaminas.  ¡El mismo gran sabor!",
          cantidad: 0,
        },

        {
          name: "Crunch",
          imagen: "images/crunch.jpg",
          descripcion:
            "Disfruta de este crocante cereal con irresistible sabor del chocolate CRUNCH ®. Hecho a base de arroz, trigo integral y maíz integral. Empieza el día con un desayuno divertido y exposivo con Cereal Crunch",
          cantidad: 0,
        },

        {
          name: "Fitness",
          imagen: "images/fitness.jpg",
          descripcion:
            "Disfruta de un desayuno lleno de energía con los crujientes y exquisitos cereales Fitness®. Contienen vitaminas del grupo B (B2, B3, B5 y B6) que contribuyen al metabolismo energético normal, trigo y avena integrales. ",
          cantidad: 0,
        },

        {
          name: "Froot Loops",
          imagen: "images/loops.jpeg",
          descripcion:
            "Es un cereal que les da a tus hijos una combinación de nutrición, sabor, aroma y color para un desayuno Frutidivertido.",
          cantidad: 0,
        },

        {
          name: "Lucky Charms",
          imagen: "images/lucky.jpg",
          descripcion:
            "NESTLE LUCKY CHARMS es un cereal hecho con avena integral y 8 diferentes malvaviscos, además está fortificado con 12 vitaminas y minerales, incluyendo calcio.",
          cantidad: 0,
        },

        {
          name: "Zucaritas",
          imagen: "images/zucaritas.jpg",
          descripcion:
            "Estas riquísimas hojuelas de maíz escarchadas con azúcar pueden ser parte de un práctico desayuno o de una cena ligera. Los cereales forman parte de una dieta diversa, siendo un pilar básico para una alimentación basada en plantas.",
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
    ...Vuex.mapState(["cantidad"]),
    agregar(name, image, count) {
      this.items.cantidad++;
      agregarCarrito(name, image, count);
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    ...Vuex.mapMutations(["aumentar"]),
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
                                                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys[0]"
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
                                                                :class="{ 'blue--text': sortBy === key }">
                                                                {{ item.descripcion }}




                                                            </v-list-item-content>

                                                        </v-list-item>
                                                        <v-btn class="mx-2" fab dark small color="primary" @click="agregar(item.nombre, item.imagen, item.cantidad)">
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
});
