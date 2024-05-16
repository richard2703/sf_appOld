<template>
    <f7-page id="menu">
    <div class="vista">
    <nav-bar tipo="inicio" :backs="true" :title="'Políticas de cancelación'"></nav-bar>
    <div class="contenedor-page-tabs">
        <div class="row w-100 m-0 back-color-blanco">
            <div class="row w-100 m-0 py-2 justify-content-center">
                <div class="col-12 text-justify mt-2" >
                    <div class="row w-100 m-0 p-0 px-1 letra-gray-light-4-3vw white-space-preline text-left">
                        <div class="row w-100 m-0 fw-800">Políticas de cancelación de servicio:</div>
En caso de que el “Cliente” cancele el servicio cuatro horas antes de su cita, se le cobrará el 15% del total del servicio, por lo cual se efectuara un reembolso del 85% del costo total.  De este % el 10% será destinado al afiliado y el 5% será para la plataforma.

Si el “Cliente” cancela el servicio de tres horas a una hora antes de la cita se le cobrará el 50% del servicio (reembolso del 50%). De este % el 25% será destinado al afiliado y el 25% será para la plataforma.

En caso de que el “Cliente” cancele el servicio faltando una hora para que el “Talento” llegue a la cita, o una vez que éste se presente en el domicilio del “Cliente” y este último lo hace esperar más de 15 minutos sin iniciar el servicio, el “Talento” se retirará del domicilio y el cargo por el servicio se efectuará por el 100%. De este % el 25% será destinado al afiliado y el 25% será para la plataforma. De este % el 80% será destinado al afiliado y el 20% será para la plataforma.

Políticas de cancelación BIT MEMBER STUDIO En estas no aplican políticas de cancelación a menos que nosotros llevemos su administración de pagos ya que el cliente paga finalmente en establecimiento.
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