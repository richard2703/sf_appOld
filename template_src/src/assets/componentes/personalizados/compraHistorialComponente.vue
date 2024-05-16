<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
        <div class="row w-100 m-0">
        
        <template v-if="modal">
        <div class="row w-100 m-0 px-2 py-2" >
                <div class="row w-100 m-0 carta px-2" >
                    <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                        <div class="w-12vw h-12vw mt-2 ">
                            <imagen clase="border-radius-10px" />
                        </div>
                        <div class="col my-auto px-0 pl-3">
                            <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{a.id}}</div>
                            <div class="row w-100 m-0 letra-gray3-16" v-if="a.por_qr == '0'">Domicilio: {{a.calle}}</div>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">Fecha:</div>
                                <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                            </div>
                            <template v-if="Number(a.descuento_total)">
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">Subtotal:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{Number(a.subtotal) + Number(a.descuento_total) | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">Descuento:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{Number(a.descuento_total) | currency}} MXN</div>
                                </div>
                            </template>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">Subtotal:</div>
                                <div class="col-auto px-0 letra-gray4-19 ">{{a.subtotal | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">IVA productos:</div>
                                <div class="col-auto px-0 letra-gray4-19 ">{{a.iva | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0" v-if="!a.costo_envio || a.costo_envio != '0'" >
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">Costo Envió:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{a.costo_envio | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">IVA costo envió:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{a.iva_envio | currency}} MXN</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">Total:</div>
                                <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.total | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0 " v-if="a.estatus == 'rembolsado'">
                                <div class="col px-0 letra-gray4-17">Estatus:</div>
                                <div class="col-auto px-0 letra-verde3-19 fw-800">Rembolsado</div>
                            </div>
                            <div class="row w-100 m-0 " v-if="a.estatus == 'cancelado'">
                                <div class="col px-0 letra-gray4-17">Estatus:</div>
                                <div class="col-auto px-0 letra-rojo-19 fw-800">Cancelado</div>
                            </div>


                            <div class="row w-100 m-0 " v-if="a.email_regalo">
                                <div class="row w-100 m-0 letra-gray4-17">Regalo para:</div>
                                <div class="row w-100 m-0">
                                    <div class="col-auto my-auto px-0 ml-auto pr-2">
                                        <div class="row w-100 m-0 letra-gray4-19">{{a.email_regalo}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 " v-else-if="a.para_usuarios_id">
                                <div class="row w-100 m-0 letra-gray4-17">Regalo para:</div>
                                <div class="row w-100 m-0">
                                    <div class="col-auto my-auto px-0 ml-auto pr-2">
                                        <div class="row w-100 m-0 letra-gray4-19 text-capitalize">{{a.usuario.nombre}}</div>
                                    </div>
                                    <div class="w-10vw h-10vw my-auto border-radius-50 overflow-hidden">
                                        <imagen :user="true" :src="a.usuario.foto" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 py-2 pr-3">
                            <div class="col-auto px-0 ml-auto letra-azul1-18 border-b-azul1-1" @click="show = !show">
                                <template v-if="!show">Ver detalle del pedido</template>
                                <template v-else>Ocultar detalle del pedido</template>
                            </div>
                        </div>

                    </div>
                    <div class="row w-100 m-0"></div>

                    <div class="row w-100 m-0 px-3 " v-if="show">
                        <div class="row w-100 m-0 py-1" v-for="p of a.productos" :key="p.id">
                            <div class="row w-100 m-0">
                                <div class="w-10vw h-10vw my-auto">
                                    <imagen clase="border-radius-5px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                    <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/img/b1.png" v-else />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-15">{{p.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray4-18 " v-if="Number(p.iva_total)">
                                        <div class="col-auto px-0">{{Number(p.precio) | currency}}</div>
                                        <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                                        <div class="col-auto px-0 fw-800">{{Number(p.total) | currency}} {{ p.producto.currency }}</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-gray4-18 " v-else >
                                        <div class="col-auto px-0">{{p.precio | currency}}  </div>
                                        <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                                        <div class="col-auto px-0 fw-800">{{p.total | currency}} {{ p.producto.currency }}</div>
                                    </div>
                                    <div class="row w-100 m-0 pb-1">
                                        <div class="col-auto px-0 letra-gray4-17 ">Tipo entrega: </div>
                                        <div class="col-auto px-0 letra-azul1-17 fw-600 text-capitalize " v-if="p.tipo_entrega == 'qr'">QR</div>
                                        <div class="col-auto px-0 letra-azul1-17 fw-600 text-capitalize " v-else>{{p.tipo_entrega}}</div>
                                    </div>
                                </div>
                            </div>
                            <template v-if="!a.para_usuarios_id && !a.email_regalo"> 
                                <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-16 fw-600 justify-content-end text-right" v-if="p.tipo_entrega=='qr' || p.tipo_entrega=='tienda' || p.tipo_entrega=='recoger' " @click=" openQr(p, (a.para_usuarios_id || a.email_regalo)) ">
                                    <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
                                </div>
                            </template>
                            <template v-else > 
                                <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-16 fw-600 justify-content-end text-right" v-if="p.tipo_entrega=='qr' || p.tipo_entrega=='tienda' || p.tipo_entrega=='recoger' || p.tipo_entrega == 'domicilio' " @click=" openQr(p, (a.para_usuarios_id || a.email_regalo)) ">
                                    <botonApp size="w-30vw" texto="Ver detalle" tipo="azul" radius="30px" py="py-5px" />
                                </div>
                            </template>
                        </div>
                    </div>


                </div>
            </div>
        </template>

        <template v-else >
        <div class="row w-100 m-0 px-2 py-2" >
                <div class="row w-100 m-0 carta px-2" >
                    <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                        <div class="w-12vw h-12vw mt-2 ">
                            <imagen clase="border-radius-10px" />
                        </div>
                        <div class="col my-auto px-0 pl-3">
                            <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{a.id}}</div>
                            <div class="row w-100 m-0 letra-gray3-16" v-if="a.por_qr == '0'">Domicilio: {{a.calle}}</div>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">Fecha:</div>
                                <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                            </div>

                             <template>
                                <div class="row w-100 m-0">
                                    <div class="col px-0 letra-gray4-17">Estatus: </div>
                                    <div class="col-auto my-auto px-0 text-capitalize ">
                                        <div class="row w-100 m-0 letra-rojo-19" v-if="a.estatus == 'cancelado'">{{a.estatus }} </div>
                                        <div class="row w-100 m-0 letra-azul1-19" v-else >{{a.estatus }} </div>
                                    </div>
                                </div>
                            </template>

                            <template v-if="Number(a.descuento_total)">
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">Subtotal:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{Number(a.subtotal) + Number(a.descuento_total) | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">Descuento:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{Number(a.descuento_total) | currency}} MXN</div>
                                </div>
                            </template>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">Subtotal:</div>
                                <div class="col-auto px-0 letra-gray4-19 ">{{a.subtotal | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">IVA productos:</div>
                                <div class="col-auto px-0 letra-gray4-19 ">{{a.iva | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0" v-if="!a.costo_envio || a.costo_envio != '0'" >
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">Costo Envió:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{a.costo_envio | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 ">
                                    <div class="col px-0 letra-gray4-17">IVA costo envió:</div>
                                    <div class="col-auto px-0 letra-gray4-19 ">{{a.iva_envio | currency}} MXN</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 ">
                                <div class="col px-0 letra-gray4-17">Total:</div>
                                <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.total | currency}} MXN</div>
                            </div>
                            <div class="row w-100 m-0 " v-if="a.estatus == 'rembolsado'">
                                <div class="col px-0 letra-gray4-17">Estatus:</div>
                                <div class="col-auto px-0 letra-verde3-19 fw-800">Rembolsado</div>
                            </div>
                            <div class="row w-100 m-0 " v-if="a.estatus == 'cancelado'">
                                <div class="col px-0 letra-gray4-17">Estatus:</div>
                                <div class="col-auto px-0 letra-rojo-19 fw-800">Cancelado</div>
                            </div>


                            <div class="row w-100 m-0 " v-if="a.email_regalo">
                                <div class="row w-100 m-0 letra-gray4-17">Regalo para:</div>
                                <div class="row w-100 m-0">
                                    <div class="col-auto my-auto px-0 ml-auto pr-2">
                                        <div class="row w-100 m-0 letra-gray4-19">{{a.email_regalo}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 " v-else-if="a.para_usuarios_id">
                                <div class="row w-100 m-0 letra-gray4-17">Regalo para:</div>
                                <div class="row w-100 m-0">
                                    <div class="col-auto my-auto px-0 ml-auto pr-2">
                                        <div class="row w-100 m-0 letra-gray4-19 text-capitalize">{{a.usuario.nombre}}</div>
                                    </div>
                                    <div class="w-10vw h-10vw my-auto border-radius-50 overflow-hidden">
                                        <imagen :user="true" :src="a.usuario.foto" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 py-2 pr-3">
                            <div class="col-auto px-0 ml-auto letra-azul1-18 border-b-azul1-1" @click="show = !show">
                                <template v-if="!show">Ver detalle del pedido</template>
                                <template v-else>Ocultar detalle del pedido</template>
                            </div>
                        </div>

                    </div>
                    <div class="row w-100 m-0"></div>

                    <div class="row w-100 m-0 px-3 " v-if="show">
                        <div class="row w-100 m-0 py-1" v-for="p of a.productos" :key="p.id">
                            <div v-if="0" class="row w-100 m-0">
                                <div class="w-10vw h-10vw my-auto">
                                    <imagen clase="border-radius-5px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                    <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/admin/apiv1/imagenes/p1.png" v-else />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-15">{{p.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray4-18 " v-if="Number(p.iva_total)">
                                        <div class="row w-100 m-0 letra-gray4-18 " >
                                            <div class="row w-100 m-0 letra-gray4-18 " >
                                                <div class="col-auto px-0">{{ Number(p.precio) + Number(p.iva_precio) | currency}}  </div>
                                            </div>
                                            <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                                            <div class="col-auto px-0 fw-800">{{Number(p.total) | currency}} {{ p.producto.currency }}</div>
                                        </div>
                                        <div class="row w-100 m-0 justify-content-start letra-gray4-18 " >
                                            <div class="col-auto px-0">Envio: </div>
                                            <div class="col-auto px-0">{{ Number(p.costo_envio) + Number(p.iva_envio) | currency}}  </div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 letra-gray4-18 " v-else >
                                        <div class="col-auto px-0">{{p.precio | currency}}  </div>
                                        <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                                        <div class="col-auto px-0 fw-800">{{p.total | currency}} {{ p.producto.currency }}</div>
                                    </div>
                                    <div class="row w-100 m-0 pb-1">
                                        <div class="col-auto px-0 letra-gray4-17 ">Tipo entrega:</div>
                                        <div class="col-auto px-0 letra-azul1-17 fw-600 text-capitalize " v-if="p.tipo_entrega == 'qr'">QR</div>
                                        <div class="col-auto px-0 letra-azul1-17 fw-600 text-capitalize " v-else>{{p.tipo_entrega}}</div>
                                    </div>
                                </div>
                            </div>

                            <compProdDesgloce :info="a" :data="p" :tipo="2"  />

                            <template v-if="!a.para_usuarios_id && !a.email_regalo"> 
                                <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-16 fw-600 justify-content-end text-right" v-if="p.tipo_entrega=='qr' || p.tipo_entrega=='tienda' || p.tipo_entrega=='recoger' " @click=" openQr(p, (a.para_usuarios_id || a.email_regalo)) ">
                                    <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
                                </div>
                            </template>
                            <template v-else >
                                <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-16 fw-600 justify-content-end text-right" v-if="p.tipo_entrega=='qr' || p.tipo_entrega=='tienda' || p.tipo_entrega=='recoger' || p.tipo_entrega=='domicilio' " @click=" openQr(p, (a.para_usuarios_id || a.email_regalo)) ">
                                    <botonApp size="w-30vw" texto="Ver detalle" tipo="azul" radius="30px" py="py-5px" />
                                </div>
                            </template>
                        </div>
                    </div>


                </div>
            </div>
        </template>

        </div>

</transition>
</template>
<script>
export default {
    data(){
        return {
            show: false,
        };
    },
    props:[
       'data',
       'modal',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        a(){return this.data || {} },
    },

    methods:{
        openQr(a,b){
            this.$emit('open',a,b);
        }
    },
}
</script>