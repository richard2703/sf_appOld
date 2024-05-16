<template>
    <f7-page>
    <div class="vista back-color-blanco">
    <nav-bar tipo="inicio" :backs="true" :logo="true" :title="''" />
    <div class="contenedor-page padding-bottom-20 back-color-blanco">
        <div class="row w-100 m-0 back-color-blanco">
           <div class="row w-100 m-0 py-2 justify-content-center">
                <div class="row w-100 m-0 px-2 position-relative pb-5" >
                    <div class="row w-100 m-0">
                        <imagen clase="" :general="true" src="f1" formato="jpg" />
                    </div>
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 letra-verde3-20 fw-600 py-2 pb-2 justify-content-center">Acerca de FIXE</div>
                        <div class="row w-100 m-0 letra-verde3-16 fw-600 py-2 pb-2 justify-content-center">El asistente virtual para tu restaurante.</div>
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 letra-gray4-15 fw-600 py-2 text-justify white-space-preline">FIXE es una APP que por medio de tecnología de punta se conecta con tu sistema punto de venta Soft R. y sincroniza la información en tiempo real. De esta forma, no necesitas estar presente en tu sucursal para conocer el estado de la misma.
    Por medio de nuestra aplicación recibirás notificaciones y alertas por movimientos importantes en tu sucursal, podrás conocer ventas, costos y un aproximado de utilidad entre muchos otros datos.
    Considera a FIXE como el asistente virtual para manejar tu restaurante, bar o sucursales de manera optima.

    FIXE transfiere datos de manera segura, esta monitoreada 24 horas y encripta la información en todo momento, puedes tener la tranquilidad de que con FIXE tu información esta resguardada.</div>
                        </div>
                    </div>
                </div>
            </div>
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
            goTo(ruta)
            {
                this.$f7.views.principal.router.navigate(ruta);
            },
            goToDetelle()
            {
                this.goTo('/mensajes_chat');
            }
        }
    }
</script>