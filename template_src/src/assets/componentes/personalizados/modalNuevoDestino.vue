<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco position-relative py-3 border-radius-15px">

                <div class="row w-100 m-0 py-2">
                   
                    <div class="row w-100 m-0 back-color-blanco  justify-content-start px-3" v-if="state">


                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 letra-gray4-17 fw-800">El usuario cambio el destino del viaje:</div>
                        </div>

                        <div class="row w-100 m-0 py-12px back-color-blanco justify-content-start">
                            <div class="w-25px my-auto px-1">
                                <imagen clase="" :icono="true" src="pin" />
                            </div>
                            <div class="col my-auto letra-gray3-15">{{servicio.calle}}</div>
                        </div>
                        
                        <div class="row w-100 m-0 py-5px justify-content-start">
                            <div class="w-30px my-auto px-1">
                                <imagen clase="" :icono="true" src="pino" />
                            </div>
                            <div class="col my-auto pl-1">
                                <div class="row w-100 m-0 letra-gray3-15 pl-1" >{{fin.calle}}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 letra-gray3-16 fw-800">Nuevo destino:</div>
                        </div>

                        <div class="row w-100 m-0 py-5px justify-content-start">
                            <div class="w-30px my-auto px-1">
                                <imagen clase="" :icono="true" src="pino" />
                            </div>
                            <div class="col my-auto pl-1">
                                <div class="row w-100 m-0 letra-gray3-15 pl-1">{{nuevo.calle}}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 pt-3">
                            <div class="col-6 px-1">
                                <div class="row w-100 m-0" @click="cambiarDestino('rechazado')">
                                    <botonApp texto="Rechazar" tipo="gris" radius="30px" />
                                </div>
                            </div>
                            <div class="col-6 px-1">
                                <div class="row w-100 m-0" @click="cambiarDestino('confirmado')">
                                    <botonApp texto="Aceptar" tipo="verde" radius="30px" />
                                </div>
                            </div>
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
    props:[
        'data',
        'map',
        'pin',
        'index',
    ],
    data(){
        return {
            name: 'modalNuevoDestino',
        };
    },
   
    computed:{
        state() {return this.$store.getters.getModal(this.name)},
        servicio(){return this.$store.getters.servicioObject('servicio');},
        ubicacion(){return {lat: Number(this.servicio.lat), lng: Number(this.servicio.lng)}; },

        chofer(){return this.servicio.chofer || {}},
        fin(){return this.servicio.destino || {}},
        nuevo(){return this.servicio.nuevoDestino || {}},
    },
    mounted() {
        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        cambiarDestino(e){
            this.$store.dispatch('postActulizarDestinoChofer',e);
        }
    },
}
</script>