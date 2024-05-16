<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px px-3 h-98vh scroll-y" @click.self="closeModal()" >

            <div class="row w-100 m-0 mt-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray3-40 fw-600" />
                </div>

                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 pt-3">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 letra-gray3-22 text-center justify-content-center">Cupon de canjeo</div>
                        </div>
                    </div>

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 py-2">
                            <imagen :logo="3" :fit="true" />
                            <!-- <imagen :fit="true" clase="h-max-25vh overflow-hidden" :src="partner.imagen" /> -->
                        </div>
                        <div class="row w-100 m-0 " v-if="partner.imagen" >
                            <imagen :fit="true" clase="h-max-25vh overflow-hidden" :src="partner.imagen" />
                        </div>
                        <div class="row w-100 m-0 pt-2 letra-gray3-22 justify-content-center text-center fw-600">{{partner.tradename}}</div>
                        <template v-if="!info.notQr" >
                            <div class="row w-100 m-0 letra-gray4-16 justify-content-center text-center ">{{info.cat}}</div>
                            <div class="row w-100 m-0 letra-gray4-16 justify-content-center text-center ">Tel:{{partner.phone}}</div>
                            <div class="row w-100 m-0 letra-azul1-16 justify-content-center text-center ">Direccion donde canjear tu QR:</div>
                            <div class="row w-100 m-0 letra-gray4-16 justify-content-center text-center ">{{partner.street}} {{partner.num_ext}}, {{partner.cp?`CP. ${partner.cp}`:''}}</div>
                            <div class="row w-100 m-0 letra-gray4-16 justify-content-center text-center ">{{partner.ciudad}}, {{partner.estado}}</div>
                            <div class="row w-100 m-0 letra-azul-17 fw-600 justify-content-center text-center " v-if="partner.cita">{{partner.cita}}</div>
                        </template>

                    </div>

                    <div class="row w-100 m-0 px-3 pt-2" v-show="!info.notQr">
                        <div class="row w-100 m-0 px-3">
                            <div class="col-7 px-0 mx-auto py-2">
                                <imagen :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qr || 'socialFlow'}`" />
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-3 pt-4">
                        <div class="row w-100 m-0 px-3">
                            <div class="col-7 px-0 mx-auto py-2">
                                <imagen clase="border-gray1-1 border-radius-10px " :src="info.imagen" />
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-3 pb-3">
                        <div class="row w-100 m-0 pt-1 px-1">
                            <div class="col my-auto px-0 letra-gray3-16">Servicio/producto:</div>
                            <div class="col my-auto px-0 letra-azul1-14 fw-600 text-right ">{{ info.nombre }}</div>
                        </div>
                        <div class="row w-100 m-0 pt-1 px-1">
                            <div class="col my-auto px-0 letra-gray3-16">Tipo de entrega:</div>
                            <div class="col my-auto px-0 letra-azul1-18 fw-600 text-right text-capitalize">{{ info.tipo_entrega }}</div>
                        </div>
                        <div class="row w-100 m-0 pt-1 px-1">
                            <div class="col px-0 letra-gray3-16">Fecha de compra:</div>
                            <div class="col-auto px-0 letra-azul1-17 fw-600">{{ info.creado | timestamp}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-1 px-1">
                            <div class="col my-auto px-0 letra-gray3-16">Vigencia:</div>
                            <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ vencimiento }}</div>
                        </div>
                        
                        <template v-if="!regalo">
                            <div class="row w-100 m-0 pt-1 px-1">
                                <div class="row w-100 m-0">
                                    <div class="col my-auto px-0 letra-gray3-16">Precio:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ Number(info.precio)  | currency}}</div>
                                </div>
                                <div class="row w-100 m-0">
                                    <div class="col my-auto px-0 letra-gray3-16">Cantidad:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">x{{ info.cantidad }}</div>
                                </div>
                                <div class="row w-100 m-0">
                                    <div class="col my-auto px-0 letra-gray3-16">Subtotal:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ Number(info.subtotal)  | currency}}</div>
                                </div>
                                <div class="row w-100 m-0">
                                    <div class="col my-auto px-0 letra-gray3-16">Iva:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ Number(info.iva_precio)  | currency}}</div>
                                </div> 
                                <div class="row w-100 m-0" v-if="Number(info.costo_envio)" >
                                    <div class="col my-auto px-0 letra-gray3-16">Envio:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ Number(info.costo_envio)  | currency}}</div>
                                </div>
                                <div class="row w-100 m-0" v-if="Number(info.iva_envio)" >
                                    <div class="col my-auto px-0 letra-gray3-16">Iva costo envio:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ Number(info.iva_envio)  | currency}}</div>
                                </div>
                                <div class="row w-100 m-0"  >
                                    <div class="col my-auto px-0 letra-gray3-16">Total:</div>
                                    <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{ Number(info.total)  | currency}}</div>
                                </div>
                            </div>
                        </template>

                        <div class="row w-100 m-0 pt-1 px-1" v-if="vencido">
                            <div class="col my-auto px-0 letra-gray3-16">Estatus:</div>
                            <div class="col-auto my-auto px-0 letra-azul1-17 fw-600" >{{'Vencido'}}</div>
                        </div>

                        <div class="row w-100 m-0 pt-1 px-1" v-else-if="info.estatus == 'pendiente'">
                            <div class="col my-auto px-0 letra-gray3-16">Estatus:</div>
                            <div class="col-auto my-auto px-0 letra-azul1-17 fw-600" v-if="info.estatus == 'pendiente'">{{'No utilizado'}}</div>
                            <div class="col-auto my-auto px-0 letra-azul1-17 fw-600 text-capitalize" v-else >{{info.estatus || 'No utilizado'}}</div>
                        </div>


                        <div class="row w-100 m-0 pt-4 justify-content-center" v-else-if="info.estatus == 'entregado'">
                            <div class="row w-100 m-0 justify-content-center">
                                <div class="w-80px h-80px border-radius-50 overflow-hidden border-azul1-3 text-center align-content-center">
                                    <div class="row w-100 m-0px justify-content-center text-center mt-12px">
                                        <icono icono="done_outline" clase="letra-azul1-49 fw-800" />
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 letra-azul1-23 justify-content-center  text-center">Canjeado</div>
                            <div class="row w-100 m-0 letra-gray3-18 justify-content-center  text-center">Fecha de canje:</div>
                            <div class="row w-100 m-0 letra-gray4-18 justify-content-center  text-center">{{ info.fecha_entrega | timestamp}}</div>
                        </div>

                        <!-- <div class="row w-100 m-0 px-1">
                            <div class="col my-auto px-0 letra-gray3-16">Fecha de compra:</div>
                            <div class="col-auto my-auto px-0 letra-azul1-17 fw-600">{{info.creado | moment('HH:mm [Hrs] DD/MM/YYYY') }}</div>
                        </div> -->

                       
                    </div>
              
                    <div class="row w-100 m-0 pt-3 justify-content-space-between">
                        <!-- <div class="col-12 px-3">
                            <botonApp tipo="gris" texto="Cancelar" radius="30px" @click="cancelar()" />
                        </div> -->
                    </div>

                </div>
            </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
const moment = require('moment');

export default {
    props: [
        'qr',
        'data',
        'grupo',
        'regalo',
        'transaccion',
        'boton'
    ],
    data(){
        return {
            name: 'modalQr',
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        info(){ return this.data || {}},
        partner(){ return this.info.partner || (this.info.producto || {}).partner || {}},
        vencimiento(){
            if(this.data.creado){
                return moment(this.data.creado).add(30, 'days').format('HH:mm [hrs] DD/MM/YYYY');
            }
            return moment().add(30, 'days').format('HH:mm [hrs] DD/MM/YYYY');
        },
        vencido(){ moment().format('YYYY-MM-DD') > moment(this.data.creado).add(30, 'days').format('YYYY-MM-DD'); }
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
            this.$emit('cancel');
            console.log("DATAS", this.info);
        },
        cancelar(){
            this.closeModal();
        },
        click(){
            swal("","Solicitud enviada","success");
            this.closeModal();
            // this.$emit('click', this.cantidad);
        },
    },
}
</script>