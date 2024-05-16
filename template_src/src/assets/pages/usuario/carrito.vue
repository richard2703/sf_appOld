<template>
    <f7-page class="" id="inicio">
        <modalmensajeA 
            titulo="¿Seguro que deseas cancelar la compra?" 
            cancelBoton="Salir"
            boton="Continuar"
            @cancel="next"
        />
        <modal-mensaje
            titulo="¿Seguro que deseas eliminar el producto?" 
            :invertir="1"
            cancelBoton="No eliminar"
            boton="Eliminar"
            colorC="azul"
            colorA="gris"
            @click="$store.commit('removeProductoCarrito',prod)"
        />
        <modalMensajeFor
            v-if="m"
            @close="m=false"
            :titulo="`El usuario ${email} no esta dentro de SocialFlow`" 
            :texto="`Este usuario recibira el correo con 1 ticket para canjear el regalo`" 
            :oneButton="true"
            boton="Entendido"
            @click="()=>{router.navigate('/confirmacion_carrito');}"
        />
        <div class="vista" v-vistak>
            <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />
            <!-- <nav-bar tipo="inicio" :backs="false" :title="'Carrito'" :chat="true" /> -->

            <div class="contenedor-page-tabs ">
                <div class="row w-100 m-0 pt-4" v-if="!productos || !productos.length">
                    <div class="row w-100 m-0 px-3 letra-gray3-18 justify-content-center text-center">Aquí estarán los productos, servicios o experiencias que agregues a tu carrito, podrás consultar el total a pagar antes de procesar tú compra.</div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 py-2" v-for="(p, ex) of productos" :key="ex">
                        <div class="row w-100 m-0 back-color-blanco">
                            <div class="row w-100 m-0 back-color-blanco pt-2 px-3">
                                <div class="w-28vw h-28vw my-auto">
                                    <imagen :fit="true" clase="border-radius-10px" :src="p.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-1">
                                    <div class="row w-100 m-0 letra-gray4-15" v-if="deve">{{p.id}}</div>
                                    <div class="row w-100 m-0 letra-gray4-15" v-if="deve">{{p.tipo_envio}}</div>
                                    <div class="row w-100 m-0 letra-gray4-19">{{p.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-17" v-if="p.partner && p.partner.id">{{p.partner.tradename}}</div>
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{p.descripcion}}</div> -->
                                </div>
                                <div v-if="1" class="w-10 px-0 overflow-hidden text-center " @click="prod = p; $store.commit('openModal',['modalMensaje'])" >
                                    <icono icono="close" clase="letra-rojo-30 pl-8px" />
                                </div>
                            </div>
                            <div class="row w-100 m-0">
                            </div>
                            <div class="row w-100 m-0 px-3 py-3">

                                <div class="col-auto px-0" v-if="p.id>4">
                                    <div class="row w-100 m-0  border-radius-15px overflow-hidden ">
                                        <div class="col-auto px-2  border-radius-5px" v-if="p.cantidad>1" @click="p.cantidad>1?p.cantidad -= 1:p.cantidad = p.cantidad; $store.commit('calcularTotal');">
                                            <icono icono="remove" clase="letra-azul1-30 pt-4px" />
                                        </div>
                                        <div class="col-auto px-2  border-radius-5px" v-else @click="prod = p; $store.commit('openModal',['modalMensaje'])" >
                                            <icono icono="close" clase="letra-rojo2-30 pt-4px" />
                                        </div>
                                        <div class="w-35px px-0">
                                            <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{p.cantidad}}</div>
                                        </div>
                                        <div class="col-auto px-2  border-radius-5px" @click="p.cantidad += 1; $store.commit('calcularTotal');">
                                            <icono icono="add" clase="letra-azul1-30 pt-4px" />
                                        </div>
                                    </div>
                                </div>

                                <template v-if="Number(p.iva)">
                                    <div class="col-auto my-auto px-0 letra-gray3-16 pl-2" v-if="p.id>4">{{Number(p.total) | currency}} {{p.currency}}</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-gray3-20 fw-800">{{Number(p.total) * Number(p.cantidad) | currency}} {{p.currency}}</div>
                                </template>
                                <template v-else >
                                    <div class="col-auto my-auto px-0 letra-azul1-16 pl-2" >{{p.total | currency}} {{p.currency}}</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-azul1-20 fw-800">{{Number(p.total) * Number(p.cantidad) | currency}} {{p.currency}}</div>
                                </template>

                            </div>
                           
                            <template v-if="false" >
                                <div class="row w-100 m-0 px-3" v-if="usuario && usuario.id" >
                                    <div class="row w-100 m-0 pt-2 pb-1 letra-gray3-15">Estas comprando un regalo para:</div>
                                    <div class="row w-100 m-0">
                                        <div class="w-15vw h-15vw my-auto border-radius-50 overflow-hidden">
                                            <imagen :user="true" :src="usuario.foto" />
                                        </div>
                                        <div class="col my-auto px-0 pl-3">
                                            <div class="row w-100 m-0 letra-gray4-18">{{usuario.nombre}}</div>
                                            <div class="row w-100 m-0 letra-gray3-16">{{usuario.email | truncate(30) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 pt-3 pb-3 pb-ios-40px back-color-blanco border-t-gray00-1">
                    <desgloceCarrito 
                        v-if="data.subtotal" 
                        v-model="email"
                        @open="m = true"
                        :showSpecialField="productos.some(p => p.id > 4)"
                    />
                </div>
            </div>
            <tabs @open="open" />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                t: 'mxn',
                m: false,
                ruta: null,
                prod:{},
                email: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            deve(){return this.$store.getters.deve;},

            session(){return this.$store.getters.getSession;},

            cambioIva(){return this.$store.getters.catalogoGetObject('cambioIva');},
            cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},
            data(){return this.$store.getters.carritoObject('desgloce') || {};},
            usuario(){return this.$store.getters.carritoObject('usuario') || {};},
            restaurante(){return this.$store.getters.restaurantesFindId('restaurantes',this.data.restaurantes_id) || {} ;},
            productos(){return this.data.carrito || [];},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            goRestaurante(){
                this.$store.commit('setRestauranteState',['restaurante',this.data.restaurantes_id]);
                this.router.navigate('/restaurante');
            },
            open(ruta){
                this.ruta = ruta;
                this.$store.commit('openModal',['modalmensajeA']);
            },
            next(){
                this.router.navigate(this.ruta, {reloadCurrent: true});
                this.$store.dispatch('synchronizeData');
            }
            
        }
    }
</script>