<template>
    <f7-page class="" id="inicio">
        <modal-mensaje
            :texto="'Puedes comprar productos, servicios y experiencias para ti o hacer regalos para alguien mas'"
            :texto2="'Elige entre miles de opciones'"
            :oneButton="true"
            :boton="'Explorar'"
        />

        <modalFiltro 
            v-show="modal"
            @close="modal = false"
            :form="form"
            v-model="form"
        />
        
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Amenidades eventos'"/>

            <div class="contenedor-page-tabs back-color-blanco" @click="show=false">

                <div class="row w-100 m-0 pt-2 position-relative back-color-fondo " >
                    <div class="row w-100 m-0 px-2 pt-2 pb-1">
                        <div class="col my-auto px-0 pr-2">
                            <busquedaInput v-model="busqueda" :notOffset="1" />
                        </div>

                        <div v-if="0" class="col-auto mt-auto mb-1 px-0" @click="modal=true">
                            <div class="row w-100 m-0 letra-gray3-18 border-b-gray3-1">Avanzado</div>
                        </div>
                        <div class="col-auto my-auto pl-1 pr-2 " :class="top?'':''">
                            <div class="carta row w-100 m-0 px-3 py-1 border-radius-15px " @click.stop="show = !show">
                                <div class="w-30px mx-auto ">
                                    <imagen :icono="1" :src="'setg'" />
                                </div>

                                <div v-if="0" class="col-auto px-2 mx-auto" >
                                    <icono :clase="top?'letra-blanco-30 pt-4px':'letra-azul1-30 pt-4px'" icono="filter_list" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="w-33vw position-absolute top-60px right-4px z-100 back-color-fondo " v-if="show">
                        <div class="w-auto">
                            <div class="row w-100 m-0 carta ">
                                <div class="row w-100 m-0 py-1 px-2 justify-content-center text-center" 
                                :class="top==1?'letra-blanco-15 back-color-azul1':'letra-azul1-15'"
                                @click="top = 1"
                                >Mayor precio</div>
                                <div class="row w-100 m-0 py-1 px-2 justify-content-center text-center" 
                                :class="top==2?'letra-blanco-15 back-color-azul1':'letra-azul1-15'"
                                @click="top = 2"
                                >Menor precio</div>
                                <div class="row w-100 m-0 py-1 px-2 justify-content-center text-center" 
                                :class="top==3?'letra-blanco-15 back-color-azul1':'letra-azul1-15'"
                                @click="top = 3"
                                >Productos</div>
                                <div class="row w-100 m-0 py-1 px-2 justify-content-center text-center" 
                                :class="top==4?'letra-blanco-15 back-color-azul1':'letra-azul1-15'"
                                @click="top = 4"
                                >Servicio</div>
                                <div class="row w-100 m-0 py-1 px-2 justify-content-center text-center" 
                                :class="top==5?'letra-blanco-15 back-color-azul1':'letra-azul1-15'"
                                @click="modal = 1"
                                >Avanzado</div>
                                <div class="row w-100 m-0 py-1 px-2 justify-content-center text-center" v-if="top"
                                :class="top==null?'letra-blanco-15 back-color-azul1':'letra-azul1-15'"
                                @click="top = null"
                                >Todos</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 pb-2 back-color-fondo ">
                    <div class="row w-100 m-0 pl-3 py-2">
                        <scollX >
                            <div class="swiper-slide w-auto"  @click="categoria = null">
                                <div class="w-auto px-1 py-1">
                                    <div class="carta border-gray01-1 row w-100 m-0 px-3 py-2 border-radius-15px " :class="`${categoria==null?'back-color-azul1 letra-blanco-16':'letra-gray4-16'}`">Ver todo</div>
                                </div>
                            </div>
                            <div class="swiper-slide w-auto" v-for="p of categorias" :key="p.id" @click="categoria = p.id">
                                <div class="w-auto px-1 py-1">
                                    <div class="carta border-gray01-1 row w-100 m-0 px-3 py-2 border-radius-15px " :class="`${categoria==p.id?'back-color-azul1 letra-blanco-16':'letra-gray4-16'}`">{{p.name}}</div>
                                </div>
                            </div>
                        </scollX>
                    </div>
                </div>

                <!-- <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <div class="col-5 mx-auto px-1" @click="top=1">
                            <div class="row w-100 m-0 py-1 border-azul1-1 border-radius-10px justify-content-center" :class="(top==1)?'back-color-azul1 letra-blanco-18':'back-color-blanco letra-azul1-18'" >Mayor precio</div>
                        </div>
                        <div class="col-5 mx-auto px-1" @click="top=2">
                            <div class="row w-100 m-0 py-1 border-azul1-1 border-radius-10px justify-content-center" :class="(top==2)?'back-color-azul1 letra-blanco-18':'back-color-blanco letra-azul1-18'" >Menor precio</div>
                        </div>
                    </div>
                </div> -->


                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 px-2">
                      
                        <div class="row w-100 m-0 pt-3" v-if="form.activo">
                            <!-- <div class="row w-100 m-0 letra-gray3-19 px-3" >Ciudaddabti</div> -->
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 justify-content-start abs">
                                    <div class="col-6 px-0 " v-for="(p,t) of ciudad" :key="p.id">
                                        <cardProducto :index="t" :data="p" :regalo="true" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <template  v-else>
                            <div class="row w-100 m-0 px-3 pt-4" v-if="!paginado.length">
                                <div class="row w-100 m-0 letra-gray3-18 text-center justify-content-center">Aun no existen productos, servicios o experiencias en esta categoria, vuelve pronto.</div>
                            </div>
                            <div class="row w-100 m-0 pt-3" >
                                <div class="row w-100 m-0 letra-gray3-19 px-3" v-if="paginado.length">Lo mas nuevos</div>
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 justify-content-start">
                                        <div class="col-6 px-0 " v-for="(p,t) of paginado" :key="p.id">
                                            <cardProducto :index="t" :data="p" :regalo="true" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row w-100 m-0">
                                    <!-- <div class="row w-100 m-0">{{cantidad}} {{paginado.length}}</div> -->
                                    <div class="row w-100 m-0 pt-3 pb-5" v-if="cantidad <= paginado.length">
                                        <div class="col-8 px-0 mx-auto" v-if="cantidad < productos.length" @click="cantidad += add">
                                            <botonApp texto="Ver mas" tipo="azul" radius="30px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>

                    <!-- <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 pt-2">
                            <div class="row w-100 m-0 letra-gray3-19 px-3">Populares</div>
                            <div class="row w-100 m-0">
                                <scollX >
                                    <div class="swiper-slide w-auto" v-for="p of categorizadoS" :key="p.id">
                                        <cardProducto :data="p" />
                                    </div>
                                </scollX>
                            </div>
                        </div>
                    </div> -->

                    

                </div>
            </div>
            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');
import _ from 'lodash';

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                busqueda: null,
                categoria: null,
                top: 0,
                show: false,
                modal: false,
                f: null,
                cats:[
                    {id:'Comida',},
                    {id:'Ropa',  },
                    {id:'Calzado',  },
                    {id:'Tecnologia',  },
                    {id:'Joyeria',  },
                ],
                add: 21,
                cantidad: 21,
                comida: [7,10,34,35,36,48,49,50,51,53,54],
                ropa: [12,13],
                showModal: this.$store.getters.syncObj('info'),
                form:{
                    activo: false,
                    mayor: null,
                    menor: null,
                    tipo: null,
                    estado: null,
                    ciudad: null,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            categorias(){return this.$store.getters.getCatalogo('categorias');},
            
            productos(){return this.$store.getters.getCatalogo('productos').filter((a,b)=>{return true});},
            filtradoP(){
                if(this.categoria){
                    return this.productos.filter(x=>{return x.category_id == this.categoria });
                }
                return this.productos; 
                
            },

            categorizadoP(){
                return this.filtradoP;
            },

            categorizadoP_lastNOUSADO(){
                if(this.busqueda){
                    return this.productos.filter(x=>{return this.filtro(x) });
                }
                return this.filtradoP;
            },
            porPrecio(){
                if(this.top == 1) return _.orderBy(this.categorizadoP,['precio'],['desc']);
                if(this.top == 2) return _.orderBy(this.categorizadoP,['precio'],['asc']);
                if(this.top == 3) return this.categorizadoP.filter(y=>y.product_type == '1');
                if(this.top == 4) return this.categorizadoP.filter(y=>y.product_type == '2');
                return this.categorizadoP;
            },

            paginado(){
                if(this.busqueda){
                    // console.log("PRODS length",this.productos.length);
                    // return this.productos.filter(x=>{return this.filtro(x) })
                    // return this.productos.filter(x=>{return this.filtro(x) }).splice(0, this.cantidad);
                    return JSON.parse(JSON.stringify(this.productos.filter(x=>{return this.filtro(x) }))).splice(0, this.cantidad);

                }
                return JSON.parse(JSON.stringify(this.porPrecio)).splice(0, this.cantidad);
            },

            mayor(){
                if(this.form.mayor){
                    return this.categorizadoP.filter(p=>{return Number(p.precio) < Number(this.form.mayor) });
                }
                return this.categorizadoP;
            },
            menor(){
                if(this.form.menor){
                    return this.mayor.filter(p=>{return Number(p.precio) > Number(this.form.menor) });
                }
                return this.mayor;
            },
            tipo(){
                if(this.form.tipo){
                    return this.menor.filter(p=>{return p.product_type == this.form.tipo });
                }
                return this.menor;
            },
            estado(){
                if(this.form.estado){
                    return this.tipo.filter(p=>{return (p.partner || {}).state_id == this.form.estado });
                }
                return this.tipo;
            },
            ciudad(){
                if(this.form.ciudad){
                    return this.estado.filter(p=>{return (p.partner || {}).town_id == this.form.ciudad });
                }
                return this.estado;
            },

        },
        
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            filtro(x){
                
                // if(this.busqueda == x.id){
                //     return true;
                // }
                // return 0;

                if(x.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ){
                    return true;
                }

                let bus = this.busqueda.toLowerCase().split(" ");
                bus = bus.filter(e=>e!=''&&e!="");
                let nn = x.nombre.toLowerCase().split(" ");
                // console.log("NN", bus, nn);
                if(nn.some( w => bus.some( b => w.includes(b) ) )){
                    return true;
                }

                if(x.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ){
                    return true;
                }
                if((x.cat || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                    return true;
                }
                if(x.partner && x.partner.id){
                    if(((x.partner || {}).comments || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                        return true;
                    }
                    if(((x.partner || {}).social_ration || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                        return 0;
                    }
                    if(((x.partner || {}).tradename || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                        return true;
                    }                                           
                    if(((x.partner || {}).neighborhood || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                        return true;
                    }                                           
                    if(((x.partner || {}).street || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                        return true;
                    }                                           
                    if(((x.partner || {}).website || '').toLowerCase().includes(this.busqueda.toLowerCase()) ){
                        return true;
                    }                                           
                }
                return false;
            }
        }
    }
</script>