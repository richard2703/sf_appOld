<template>
    <f7-page class="" id="inicio">
        <modalInfo :state="modal" @close="modal=false" />


        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Confirmar pedido'" />
            <div class="contenedor-page">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pt-3">
                        <div class="row w-100 m-0 letra-azul1-17 text-uppercase">productos del pedido</div>
                    </div>
                    <div class="row w-100 m-0 py-2" v-for="(p, ex) of productos" :key="ex" >
                        <div class="row w-100 m-0 back-color-blanco">
                            <div class="row w-100 m-0 back-color-blanco border-b-gray00-1 py-2 px-3">
                                <div class="row w-100 m-0 letra-gray4-20">{{p.nombre}}</div>
                                <div class="row w-100 m-0 letra-azul1-14" v-if="p.partner && p.partner.id">{{p.partner.tradename}}</div>
                            </div>
                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="row w-100 m-0 px-3 py-1 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-gray3-18">{{p.cantidad}}x</div>
                                    <template v-if="Number(p.iva)">
                                        <div class="col-auto my-auto px-0 letra-gray3-18 pl-2" >{{Number(p.total) | currency}} {{p.currency}}</div>
                                        <div class="col-auto my-auto px-0 ml-auto letra-gray3-19 fw-800">{{Number(p.total) * Number(p.cantidad) | currency}} {{p.currency}}</div>
                                    </template>
                                    <template v-else >
                                        <div class="col-auto my-auto px-0 letra-gray3-18 pl-2" >{{p.precio | currency}} {{p.currency}}</div>
                                        <div class="col-auto my-auto px-0 ml-auto letra-gray3-19 fw-800">{{Number(p.precio) * Number(p.cantidad) | currency}} {{p.currency}}</div>
                                    </template>
                                </div>
                                <!-- <div class="row w-100 m-0 px-3 py-1 justify-content-start" v-if="p.shipping_cost" >
                                    <div class="col my-auto px-0 letra-gray3-16">Costo de envio</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-gray3-17 fw-800">{{ p.shipping_cost | currency}} MXN</div>
                                </div> -->
                            </div>
                            <div class="row w-100 m-0 border-b-gray00-1" v-if="p.comentarios">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="row w-100 m-0 letra-gray4-16">Instrucciones:</div>
                                    <div class="row w-100 m-0 letra-gray3-16">{{p.comentarios}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="!eventos_id">
                        <template v-if="paraDomicilio">
                            <div class="row w-100 m-0 px-3 pt-4" v-if="!acepto">
                                <div class="row w-100 m-0 letra-azul1-17 text-uppercase">dirección de envío</div>
                            </div>
                                <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/mis_domicilios')" v-if="!acepto">
                                
                                <template v-if="usuario && usuario.id" >
                                    <div class="row w-100 m-0 px-3">
                                        <div class="col px-0 letra-gray3-17 fw-600">La dirección será seleccionada por el usuario que recibe el regalo</div>
                                    </div>
                                </template> 

                                <template v-else>
                                     <template v-if="usuario && usuario.id" >
                                     </template>
                                    <template v-if="domicilio && domicilio.id">
                                        <div class="row w-100 m-0 px-3">
                                            <div class="col px-0 letra-gray3-17">{{domicilio.calle}}{{domicilio.numero}}</div>
                                        </div>
                                        <div class="row w-100 m-0 px-3 pt-1">
                                            <div class="col px-0 letra-gray3-16">{{domicilio.municipio}}, {{domicilio.estado}}</div>
                                        </div>
                                    </template>
                                    <div class="row w-100 m-0 px-3" v-else >
                                        <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Selecciona una dirección de entrega</div>
                                    </div>
                                </template>
                               
                            </div>
                            <div class="row w-100 m-0" >
                                <div class="row w-100 m-0 pr-3">
                                    <div class="row m-0 w-100 mt-4">
                                        <div class="col my-auto letra-azul1-17 p-0 pl-3">No necesita dirección de entrega, enviarme un QR</div>
                                        <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                                            <toggle :checked="acepto" @change="change" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>

                    <div class="row w-100 m-0 pt-3">
                        <desgloceCarrito :confirm="true" />
                    </div>

                    <template>
                        <template>
                            <div class="row w-100 m-0 px-3 pt-4">
                                <div class="row w-100 m-0 letra-azul1-17 text-uppercase">información de pago</div>
                            </div>
                            <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/metodos_pago')">
                                <div class="row w-100 m-0 px-3" v-if="metodoPagoId == 'monedero'">
                                    <div class="w-40px">
                                        <imagen :icono="true" src="pp" />
                                    </div>
                                    <div class="col my-auto letra-gray3-16 px-2">Monedero {{session.monedero | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 px-3" v-else-if="metodo_pago && metodo_pago.id" >
                                    <div class="col-auto my-auto px-0">
                                        <div class="w-80px">
                                            <imagen :icono="true" :src="metodo_pago.brand.toLowerCase()" />
                                        </div>
                                    </div>
                                    <div class="col my-auto px-0 letra-gray3-17">**** {{metodo_pago.ending}}</div>
                                </div>
                                <div class="row w-100 m-0 px-3" v-else >
                                    <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Selecciona una metodo de pago</div>
                                </div>
                            </div>
                        </template>
                        <template v-if="metodoPagoId == 'monedero'">
                            <div class="row w-100 m-0 px-3 pt-1">
                                <div class="row w-100 m-0 letra-azul1-17 text-uppercase">
                                    <div class="col-auto px-0">Metodo de pago complementario:</div>
                                    <div class="col-auto px-0 mr-auto pl-2 pt-3px " @click="modal = true">
                                        <icono icono="info" clase="letra-azul1-20" />
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/metodos_pago_alternativo')">
                                <div class="row w-100 m-0 px-3" v-if="metodo_pago_alter == 'monedero'">
                                    <div class="w-40px">
                                        <imagen :icono="true" src="pp" />
                                    </div>
                                    <div class="col my-auto letra-gray3-16 px-2">Monedero {{session.monedero | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 px-3" v-else-if="cardAlter && cardAlter.id" >
                                    <div class="col-auto my-auto px-0">
                                        <div class="w-80px">
                                            <imagen :icono="true" :src="cardAlter.brand.toLowerCase()" />
                                        </div>
                                    </div>
                                    <div class="col my-auto px-0 letra-gray3-17">**** {{cardAlter.ending}}</div>
                                </div>
                                <div class="row w-100 m-0 px-3" v-else >
                                    <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Selecciona una metodo de pago</div>
                                </div>
                            </div>
                        </template>
                    </template>

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 pt-3 pb-3 px-3">
                            <botonApp tipo="azul" texto="Confirmar pedido" radius="10px" @click="next()"/>
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
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                acepto: false,
                modal: false,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            data(){return this.$store.getters.carritoObject('desgloce');},
            eventos_id(){return this.$store.getters.carritoObject('eventos_id');},

            metodoPagoId(){return this.$store.getters.carritoObject('metodo_pago');},
            metodo_pago(){return this.$store.getters.getMetodoPago(this.metodoPagoId);},

            metodo_pago_alter(){return this.$store.getters.carritoObject('metodo_pago_alter');},
            cardAlter(){return this.$store.getters.getMetodoPago(this.metodo_pago_alter);},

            productos(){return this.data.carrito || [];},
            paraDomicilio(){ return this.productos.some(x=>{return x.tipo_envio == 'domicilio' }) },
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},
            usuario(){return this.$store.getters.carritoObject('usuario') || {};},

        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            change(){
                this.acepto = !this.acepto;
                this.data.por_qr = this.acepto;
                this.$store.commit('calcularTotal');
            },
            next(){
                if(!this.metodoPagoId){
                    swal("","Agrega un metdodo de pago para continuar","");
                    return;
                }
                if(this.data.total){
                    this.$store.dispatch('postCrearPedido',[this.acepto]);
                }
            }
        }
    }
</script>