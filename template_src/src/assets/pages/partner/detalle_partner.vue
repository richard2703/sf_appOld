<template>
    <f7-page id="inicio" >
        <modalLista />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  
                @click="$store.dispatch('scrollBottom','detal456')" 
                class="w-45px h-45px border-radius-50 position-absolute bottom-5 right-44 opacity-4 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Partner'"></nav-bar>

            <div id="detal456" class="contenedor-page-tabs">

                <div class="row w-100 m-0">
                    <imagen class="h-max-50vh overflow-hidden" :fit="true" :src="partner.imagen" />
                </div>

                <div class="row w-100 m-0 px-3 py-3">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col-auto my-auto px-0 letra-gray4-21 fw-600">{{partner.tradename}}</div>
                        </div>
                        <div class="row w-100 m-0" v-if="false" >
                            <div class="col-auto my-auto px-0 letra-gray3-18 fw-600">{{partner.website}}</div>
                        </div>

                        <div class="row w-100 m-0 pt-4" v-if="horarios && horarios.length">
                            <div class="row w-100 m-0 letra-gray3-18">Horarios</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 py-1 border-b-gray1-1" v-for="h of horarios" :key="h.id">
                                    <div class="w-25 px-0 letra-gray4-16 text-capitalize">{{h.day}}</div>
                                    <div class="col px-0 letra-azul1-16 text-capitalize justify-content-center text-center">
                                        <template v-if="h.open_time">{{ [h.open_time, 'HH:mm:ss'] | moment('HH:mm [hrs]') }}</template>
                                        <template v-else>{{ 'N/D'}}</template>
                                    </div>
                                    <div class="col-auto px-0 letra-azul1-16 text-capitalize">-</div>
                                    <div class="col px-0 letra-azul1-16 text-capitalize justify-content-center text-center">
                                        <template v-if="h.close_time">{{ [h.close_time, 'HH:mm:ss'] | moment('HH:mm [hrs]') }}</template>
                                        <template v-else>{{ 'N/D'}}</template>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0" >
                            <sucursalesProductos :data="producto" :showCats="0" />
                        </div>

                    </div>
                </div>

                <div class="row w-100 m-0 px-2 pb-5">
                    <div class="row w-100 m-0 " v-if="productos && productos.length" >
                        <div class="row w-100 m-0 letra-gray3-19 px-3">Productos del partner</div>
                        <div class="row w-100 m-0 justify-content-center ">
                            <div class="col-auto px-0" v-for="p of productos" :key="p.id">
                                <cardProducto :data="p" />
                            </div>
                            <div class="col-auto px-0">
                                <div class="w-30vw"></div>
                            </div>
                            <div class="col-auto px-0">
                                <div class="w-30vw"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 py-4"></div>
            </div>

           
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
                total: 0,
                cantidad: 1,
                form: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            cambioIva(){return this.$store.getters.catalogoGetObject('cambioIva');},
            partner(){return this.$store.getters.userStateFind('partners','partner') || {}},
            productos(){return this.partner.productos || [] },
            horarios(){return this.partner.horarios || [] },

            producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
            galeria(){return this.producto.galeria || []},
        },
        methods:{
            set(platillo){
                this.total = platillo.total;
                this.form = platillo;
            },
            add(){
                this.producto.cantidad = this.cantidad;

               let pp = this.$store.prodClone(this.producto);
               console.log("SSS",pp);

                let f = ()=>{
                    this.$store.commit('setCarritosState',['para_usuarios_id', null]);
                    this.$store.commit('setCarritosState',['listas_id', null]);
                    this.$store.commit('setCarritosState',['eventos_id', null]);
                    this.$store.commit('openMsn',['Producto añadido al carrito','Finalizar pedido',false,false]);
                    this.router.back('/regalos');
                }
                this.$store.commit('addProductoCarritoCallback',{ prod: pp, callback: f });
             
                
            },
            verPart(p){
                this.$store.commit('setUsuarioData',['partner', p.id]);
                this.router.navigate('/detalle_partner');
            },
        }
    }
</script>