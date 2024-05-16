<template>
    <f7-page>
    <div class="vista back-color-blanco">
        <nav-bar tipo="inicio" :backs="true" :logo="true" :title="''"></nav-bar>
        <div class="contenedor-page-tabs back-color-blanco">
            <div class="row w-100 m-0 back-color-blanco pb-5">
                <div class="row w-100 m-0 py-2 justify-content-center">
                    <div class="row w-100 m-0 position-relative pb-5" >
                        <div class="row w-100 m-0">
                            <imagen clase="" :general="true" src="f2" formato="jpg" />
                        </div>
                        <div class="row w-100 m-0 px-3" >
                            <div class="row w-100 m-0 letra-verde3-18 py-2 pb-4 justify-content-center">Preguntas frecuentes</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 letra-gray4-18 fw-600">¿Como funciona FIXE?</div>
                                <div class="row w-100 m-0 letra-gray4-15 fw-600 py-2 text-justify">Por medio de un conector con tu punto de venta Soft R. sincronizamos la información utilizando un túnel de datos seguro sin afectar a tu punto de venta y sin modificar ningún valor.</div>
                            </div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 letra-gray4-18 fw-600">¿FIXE ve mi información?</div>
                                <div class="row w-100 m-0 letra-gray4-15 fw-600 py-2 text-justify">No, FIXE no tiene acceso a tu contenido, este viaja encriptado y solo es visualizado única y exclusivamente por nuestro cliente.</div>
                            </div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 letra-gray4-18 fw-600">¿Como instalo FIXE?</div>
                                <div class="row w-100 m-0 letra-gray4-15 fw-600 py-2 text-justify">Nuestra área de soporte técnico te asiste en todo momento, en 10 minutos instalas el conector y todo queda listo para operar.</div>
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