<template>
    <f7-page id="menu" class="back-color-blanco">
    <nav-bar tipo="inicio" :backs="true" :title="'Contacto'"></nav-bar>
    <div class="contenedor-page padding-bottom-20 back-color-blanco">
        <div class="row w-100 m-0 back-color-blanco">
            <div class="row w-100 m-0 pt-2 pb-1 justify-content-start mt-1 px-3">
                <div class="row w-100 m-0 letra-gray3-4-8vw py-2 font-italic justify-content-start">Estamos a tus ordenes en los teléfonos:</div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start">
                    <div class="col-auto px-0">Guadalajara:</div>
                    <div class="col-auto px-0 pl-2" @click="call('33 3016 7556')">33 3016 7556</div>
                </div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start">
                    <div class="col-auto px-0">Monterrey:</div>
                    <div class="col-auto px-0 pl-2" @click="call('62 4235 1087')">62 4235 1087</div>
                </div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start">
                    <div class="col-auto px-0">Querétaro:</div>
                    <div class="col-auto px-0 pl-2" @click="call('442 4746 483')">442 4746 483</div>
                </div>
                <div class="row w-100 m-0 letra-gray3-4-8vw pt-2 pb-1 font-italic justify-content-start">Al correo electrónico:</div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start" @click="mailto('contacto@bitbeauty.com.mx ')">contacto@bitbeauty.com.mx </div>
                <div class="row w-100 m-0 letra-gray3-4-8vw pt-2 pb-1 font-italic justify-content-start">O en nuestras oficinas corporativas en Guadalajara en:</div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start" >IOS OFFICES Andares Corporativo</div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start" >Paseo, Blvrd Puerta de Hierro 5153,</div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start" >Puerta de Hierro, CP. 45116</div>
                <div class="row w-100 m-0 letra-gray3-4-1vw justify-content-start" >Zapopan, Jalisco</div>
            </div>
        </div>
    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
import g from '../js/general';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                promos_slider: null,
                categorias_slider: null
            } 
        },
        computed: {
        },
        mounted(){
        },
        methods:{
            call(tel){
                this.$store.dispatch('call',tel);
            },
            mailto(email){
                this.$store.dispatch('mailto',email);
            },
        }
    }
</script>