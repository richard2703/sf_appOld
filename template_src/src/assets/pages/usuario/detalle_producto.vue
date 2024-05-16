<template>
    <f7-page id="inicio" >
        <modalLista />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  
                @click="$store.dispatch('scrollBottom','detal456')" 
                class="w-45px h-45px border-radius-50 position-absolute bottom-18 right-44 opacity-4 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>

            <div id="detal456" class="contenedor-page">

                <topRowPorducto :data="producto" />

                <!-- <div class="row w-100 m-0 py-3" v-if="galeria && galeria.length" >
                    <div class="row w-100 m-0" >
                        <scollX :cantidad="1" :paginado="true" >
                            <div class="swiper-slide w-auto" v-for="p of galeria" :key="p.id">
                                <div class="row w-100vw m-0" >
                                    <imagen class="h-max-50vh overflow-hidden" :fit="true" :src="p.imagen" />
                                </div>
                            </div>
                        </scollX>
                    </div>
                </div>
                <div class="row w-100 m-0 px-3 py-3" v-else-if="producto.imagen" >
                    <imagen class="h-max-50vh  overflow-hidden border-radius-10px " :fit="true" :src="producto.imagen" />
                </div> -->

                <!-- <div class="row w-100 m-0 px-3 py-3">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col-auto my-auto px-0 letra-gray4-21 fw-600">{{producto.nombre}}</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto my-auto mr-auto px-0 letra-gray4-25" v-if="producto.iva == '1'">{{producto.precio | currency}} {{producto.currency}} + IVA</div>
                            <div class="col-auto my-auto mr-auto px-0 letra-gray4-25" v-else >{{producto.precio | currency}} {{producto.currency}}</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto my-auto ml-auto px-0 letra-azul1-25" v-if="producto.iva == '1'">{{ Number(producto.total)  | currency}} {{producto.currency}}</div>
                        </div>

                        <div class="row w-100 m-0 pt-3 mt-1 letra-gray3-16 text-justify white-space-preline">{{producto.descripcion}}</div>

                        <div class="row w-100 m-0 pt-3 mb-2 border-b-gray01-1"></div>
                        
                        <div class="row w-100 m-0 letra-gray3-25">Información general</div>
                        <div class="row w-100 m-0 pt-2 " v-if="producto.partner && producto.partner.id" @click="verPart(producto.partner)">
                            <div class="row w-100 m-0 letra-gray4-17">Partner</div>
                            <div class="row w-100 m-0 letra-gray3-18">{{producto.partner.tradename }}</div>
                        </div>

                        <div class="row w-100 m-0 pt-3" >
                            <sucursalesProductos :data="producto" :showCats="1" />
                        </div>
                    </div>
                </div> -->

                <!-- <div class="row w-100 m-0 px-3 pb-5">
                        <div class="row w-100 m-0 mb-3 border-b-gray01-1"></div>
                        <div class="row w-100 m-0 " v-if="productos && productos.length" >
                            <div class="row w-100 m-0 letra-gray3-19 px-3">Productos relacionados</div>
                            <div class="row w-100 m-0">
                                <scollX >
                                    <div class="swiper-slide w-auto" v-for="p of productos" :key="p.id">
                                        <cardProducto :data="p" />
                                    </div>
                                </scollX>
                            </div>
                        </div>
                    </div> -->
            </div>

            <div class="row w-100 m-0 pb-1 back-color-blanco border-t-gray1-1">
                <div class="row w-100 m-0 py-2">
                    <div class="row w-100 m-0 px-3 justify-content-center">
                        <div class="col-4 px-0">
                            <div class="row w-100 m-0 back-color-gray0 border-radius-15px overflow-hidden ">
                                <div class="col-auto px-2 back-color-gray0 border-radius-5px" @click="cantidad>1?cantidad -= 1:cantidad = cantidad">
                                    <icono icono="remove" clase="letra-gray4-30 pt-4px" />
                                </div>
                                <div class="col px-0">
                                    <div class="row w-100 m-0 letra-gray4-25 text-center justify-content-center">{{cantidad}}</div>
                                </div>
                                <div class="col-auto px-2 back-color-gray0 border-radius-5px" @click="cantidad += 1">
                                    <icono icono="add" clase="letra-gray4-30 pt-4px" />
                                </div>
                            </div>
                        </div>
                        <div class="col-4 px-0 my-auto mx-auto text-center letra-gray4-18" @click="add()">
                            <botonApp texto="Comprar" tipo="azul" radius="30px" />
                        </div>
                        
                        <div class="col-auto ml-auto my-auto px-0 letra-azul1-17" @click="add()">{{(Number(producto.total) * cantidad)  | currency}} {{producto.currency}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0 pt-2 pb-0 px-3" v-if="0" >
                    <div class="col-12 px-0">
                        <botonApp tipo="azul" texto="Agregar a carrito" radius="30px" @click="add()"/>
                    </div>
                    <div class="col-12 pt-3 px-0">
                        <botonApp tipo="gris" texto="Agregar a wishlists" radius="30px" @click="$store.commit('openModal',['modalLista'])"/>
                    </div>
                </div>

                <div class="row w-100 m-0 py-1"></div>

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
            producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
            galeria(){return this.producto.galeria || []},
            productos(){return this.$store.getters.getCatalogo('productos').filter(
                w=>{ return  w.id != this.producto.id && (w.category_id == this.producto.category_id || w.subcategory_one_id == this.producto.subcategory_one_id ||  w.partner_id == this.producto.partner_id ) }).filter(
                    (x,y)=>{return y < 10 });},
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