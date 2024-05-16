<template>
    <f7-page>
    <div class="vista">
    <nav-bar tipo="inicio" :backs="true" :title="'Políticas de cancelación'"></nav-bar>
    <div class="contenedor-page-tabs">
        <div class="row w-100 m-0 back-color-blanco">
            <div class="row w-100 m-0 py-2 justify-content-center">
                <div class="col-12 text-justify mt-2" >
                    <div class="row w-100 m-0 p-0 px-1 letra-gray-light-4-3vw white-space-preline text-justify">
                    <div class="row w-100 m-0 fw-800">Políticas de cancelación en servicio a domicilio:</div> 
                    En caso de que el “Cliente” cancele el servicio cuatro horas antes de su cita, se le cobrará el 15% del total del servicio, por lo cual se efectuará un reembolso del 85% del costo total.

                    Si el “Cliente” cancela el servicio de tres a dos horas antes de la cita, se le cobrará el 50% del servicio y se efectuará un reembolso del 50% del costo total.

                    En caso de que el “Cliente” cancele el servicio faltando una hora para la realización del servicio o una vez que el Talento se presente en el domicilio del “Cliente” y este último lo hace esperar más de 15 minutos sin iniciar el servicio, el “Talento” se retirará del domicilio y el cargo por el servicio se efectuará por el 100% del costo total.
                    <div class="row w-100 m-0 fw-800 pt-3">Políticas de cancelación como agenda en establecimientos:</div>
                    El cobro de estos servicios se efectuará directamente en el establecimiento, la APP no lleva administración de pagos en esta modalidad a menos que algún establecimiento así lo requiera y en cuyo caso se le notificará al cliente al momento de agendar su servicio.
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