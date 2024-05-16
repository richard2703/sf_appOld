<template>
    <f7-page id="inicio" >
        <modalQr />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','historilaccom')" class="w-45px h-45px border-radius-50 position-absolute bottom-8 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Historial monedero'" :right="false" />
            <div id="historilaccom" class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0" v-for="a of historial " :key="a.id">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" >
                            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                                <div class="w-12vw h-12vw mt-2 mb-auto">
                                    <imagen clase="border-radius-15px"  />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{a.id}}</div>
                                    <div class="row w-100 m-0 letra-gray3-16" v-if="a.por_qr == '0'">Domicilio: {{a.calle}}</div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Fecha:</div>
                                        <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                                    </div>

                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Subtotal:</div>
                                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.subtotal | currency}} MXN</div>
                                    </div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">IVA productos:</div>
                                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.iva | currency}} MXN</div>
                                    </div>
                                    <div class="row w-100 m-0" v-if="!a.costo_envio || a.costo_envio != '0'" >
                                        <div class="row w-100 m-0 ">
                                            <div class="col px-0 letra-gray4-17">Costo Envió:</div>
                                            <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.costo_envio | currency}} MXN</div>
                                        </div>
                                        <div class="row w-100 m-0 ">
                                            <div class="col px-0 letra-gray4-17">IVA costo envió:</div>
                                            <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.iva_envio | currency}} MXN</div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Total:</div>
                                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.total | currency}} MXN</div>
                                    </div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Puntos:</div>
                                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{ (Number(a.subtotal) * 0.10) |  currency({    symbol: '',
                                                                                                                    thousandsSeparator: ',',
                                                                                                                    fractionCount: '',
                                                                                                                    fractionSeparator: '',
                                                                                                                    symbolPosition: '',
                                                                                                                    symbolSpacing: '',
                                                                                                                    avoidEmptyDecimals: 0,
                                                                                                                }) }} pts</div>
                                    </div>
                                    <div class="row w-100 m-0 " v-if="a.para_usuarios_id">
                                        <div class="col px-0 letra-gray4-17">Para:</div>
                                        <div class="col-auto px-0 letra-gray4-19 text-capitalize">{{a.usuario.nombre}}</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-azul1-16 fw-600 justify-content-end text-right" v-if="a.por_qr == '1'" @click=" $store.commit('openModal',['modalQr']) ">Ver QR</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0 px-3 ">
                                <div class="row w-100 m-0 py-1" v-for="p of a.productos" :key="p.id">
                                    <div class="w-10vw h-10vw my-auto">
                                        <imagen clase="border-radius-5px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                        <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/admin/apiv1/imagenes/p1.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{p.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18 ">
                                            <div class="col-auto px-0">{{p.precio | currency}}  </div>
                                            <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                                            <div class="col-auto px-0 fw-800">{{p.total | currency}} {{ p.producto.currency }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
                
            </div>
            <tabs/>
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            historial(){return this.$store.getters.userStateArray('historial').filter(s=>s.tipo_pago != 'monedero');},
        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },
            
        }
    }
</script>