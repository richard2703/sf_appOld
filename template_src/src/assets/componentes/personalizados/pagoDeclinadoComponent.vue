<template>
    <div class="row w-100 m-0">
        <template v-if=" cobro.estatus_cobro == 'errorcobro' && Number(cobro.total) " >
            <div class="row w-100 m-0 back-color-gray0 ">
                <div class="row w-100 m-0 pt-2">
                    <div class="row w-100 m-0 pb-2 letra-azul1-20 text-center justify-content-center ">*Tu pago fue rechazado</div>  
                </div>
                <template>
                    <div class="row w-100 m-0 px-3 pt-2 pb-2 ">
                        <div class="row w-100 m-0 letra-gray3-15 text-uppercase">selecciona metodo pago</div>
                    </div>
                    <div class="row w-100 m-0 border-t-gray01-1 border-b-gray01-1 py-1 " @click="router.navigate('/metodos_pago_evento')">
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
                <div class="row w-100 m-0 px-3 pt-3 pb-3">
                    <div class="col-12 mx-auto px-1">
                        <botonApp :texto="`Pagar cooperación por $${ Number(cobro.total).toFixed(2) }`" radius="15px" tipo="rojo" @click="pagar(1)" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('share_')
        };
    },
    props: [
        'dx',
        'cx',
        'boton'
    ],

    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},

        evento(){return this.dx || {}},
        cobro(){return this.cx || {}},

        metodoPagoId(){return this.$store.getters.carritoObject('metodo_pago');},
        metodo_pago(){return this.$store.getters.getMetodoPago(this.metodoPagoId);},
    },
    
    mounted() {
        console.log("SOCIAL SOCIAL SOCIAL", jsSocials );
        // this.init();
    },

    methods:{
        pagar(){
            if(!this.metodoPagoId){
                swal("","Selecciona el metodo de pago","");
                return;
            }
            console.log("EVENTOS XX", this.evento);
            this.$store.dispatch('postVolverAPagar',[this.evento.id, this.metodoPagoId]);
        }  
    },
}
</script>