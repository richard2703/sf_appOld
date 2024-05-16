<template>
    <f7-page id="inicio">
        <nav-bar tipo="inicio" :backs="true" :title="'Mi historial'"></nav-bar>
        <div class="contenedor-page back-color-blanco">
            <div class="row w-100 m-0 py-3 px-2 border-b-gray-lligth-1" v-for="res of historial" :key="res.id">
                <div class="row w-100 m-0">
                    <div class="w-25vw h-25vw my-auto">
                        <img class="w-100 h-100 object-fit border-radius-50" :src="res.restaurante.imagen || 'http://rockandfood.com.co/modules/themeconfigurator/img/IconoCubiertos-01.png'" alt="logo_restaurante">
                    </div>
                    <div class="col my-auto">
                        <div class="row w-100 m-0 letra-gray3-4-5vw fw-800">{{res.restaurante.nombre}}</div>
                        <div class="row w-100 m-0">
                            <div class="col pl-1 letra-gray3-3-5vw">{{'Comida italiana, Bar'}}</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col pl-1 letra-gray3-3-5vw">{{res.restaurante.direccion | truncate(34)}}</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col pl-1 letra-gray3-3-8vw fw-800" v-if="res.id">Cuenta: #{{res.id}}</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col pl-1 letra-appt-3-5vw">{{res.fecha_pago | moment('DD MMMM YYYY')}}</div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 py-2">
                    <div class="row w-100 m-0">
                        <div class="col-3 px-1 letra-gray3-4-5vw  text-center">Subtotal:</div>
                        <div class="col-3 px-1 letra-gray3-4-5vw  text-center">Propina: </div>
                        <div class="col-3 px-1 letra-gray3-4-5vw  text-center">Mi pago:</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-3 px-1 letra-appt-4-1vw font-italics text-center">{{res.subtotal | currency}}</div>
                        <div class="col-3 px-1 letra-appt-4-1vw font-italics text-center">{{res.propina | currency}}</div>
                        <div class="col-3 px-1 letra-appt-4-1vw font-italics text-center">{{res.total | currency}}</div>
                    </div>
                </div>
            </div>
        </div>
       
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
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
            historial(){return this.$store.getters.getHistorial;},
        },
        created() {
        },
        methods:{
        }
    }
</script>