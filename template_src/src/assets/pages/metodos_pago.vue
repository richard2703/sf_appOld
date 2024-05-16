<template>
    <f7-page id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Métodos de pago'"></nav-bar>
            <div class="contenedor-page padding-bottom-90">
                <div class="row m-0 w-100 back-color-blanco">
                    <div class="row w-100 m-0 back-color-blanco">
                        <div class="col-12 p-0">
                            
                            <div class="row m-0 border-botom-gray border-b-gray0-1" v-for="m of tarjetas" :key="m.id" >
                                <div class="row m-0 w-100 justify-content-between py-2">

                                    <div class="col-2 my-auto p-0" @click="click(m.id)">
                                        <img class="w-100 h-100" :src="'https://socialflow.app/backend/apiv1/iconos/'+m.brand.toLowerCase()+'.svg'" alt="">
                                    </div>
                                    <div class="col my-auto letra-gray3-5-1vw px-2" @click="click(m.id)">**** {{m.ending}}</div>
                                    <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" @click="click(m.id)"  > 
                                        <icono clase="letra-azul1-40 pt-5px" v-if="metodo_pago == m.id" icono="check_box"  />
                                        <icono clase="letra-gray3-40 pt-5px" v-else icono="check_box_outline_blank"  />
                                    </div>
                                    <div class="col-2 my-auto p-0">
                                        <boton-icono @click="eliminarMetodoPago(m)" :noborder="true" icono="delete"/>
                                    </div>

                                </div>
                            </div>

                            <div v-if="session.monedero" class="row m-0 border-botom-gray border-b-gray0-1" >
                                <div class="row m-0 w-100 justify-content-between py-2 pl-3">
                                    <div class="w-40px">
                                        <imagen :icono="true" src="pp" />
                                    </div>
                                    <div class="col my-auto letra-gray3-16 px-2">Monedero {{session.monedero | currency}} MXN</div>
                                    <div class="col-auto px-0">
                                        <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto"  @click="set('monedero')" > 
                                            <icono clase="letra-azul1-40 pt-5px" v-if="metodo_pago == 'monedero'" icono="check_box"  />
                                            <icono clase="letra-gray3-40 pt-5px" v-else icono="check_box_outline_blank"  />
                                        </div>
                                    </div>
                                    <div class="col-2 my-auto p-0"></div>
                                </div>
                            </div>

                            <div class="row m-0 border-botom-gray border-b-gray0-1" @click="goTo('/agregar_metodo_pago')">
                                <div class="row m-0 w-100 justify-content-between py-2">
                                    <div class="col my-auto letra-gray3-5-1vw p-0 pl-3">Agregar método de pago</div>
                                    <div class="col-1 p-0">
                                        <img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt="">
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="row m-0 border-botom-gray border-b-gray0-1"  >
                                <div class="row m-0 w-100 justify-content-between py-1">
                                    <div class="col-2 my-auto p-0 px-1">
                                        <img class="w-100 h-100" :src="require('../iconos/dolar.svg')" alt="">
                                    </div>
                                    <div class="col my-auto letra-gray3-5-1vw px-2">Efectivo</div>
                                     <div class="col-auto my-auto px-0">
                                        <toggle :checked="!metodo_id" @change="set(null)" />
                                    </div>
                                </div>
                            </div> -->

                        </div>
                    </div>
                </div>
            </div>
            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                data:{
                    mapa: null,
                    marcador:null,
                },
                some: null,
            } 
        },
        computed:{
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            metodos(){return this.$store.getters.getMetodos;},
            tarjetas(){return this.$store.getters.getMetodos},
            metodo_id(){return this.$store.getters.viajeObject('metodo_id')},
            metodo_pago(){return this.$store.getters.carritoObject('metodo_pago')},
        },
        mounted(){
        },
        methods:{

            set(id){
                if(this.metodo_pago != id){
                    this.$store.commit('setCarritosState',['metodo_pago',id]);
                }
            },

            goTo(ruta){
                this.router.navigate(ruta);
            },
            click(id){
                if(this.metodo_pago != id){
                    this.$store.commit('setCarritosState',['metodo_pago',id]);
                }
            },
            eliminarMetodoPago(metodo){
                this.$store.dispatch('postRemoveMetodoPago',metodo)
            },
            
            
        }
    }
</script>