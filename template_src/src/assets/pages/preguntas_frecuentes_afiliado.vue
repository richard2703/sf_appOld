<template>
    <f7-page class="back-color-blanco">
    <div class="vista">
    <nav-bar tipo="inicio" :backs="true" :title="'Preguntas frecuentes'"></nav-bar>
    <div class="contenedor-page-tabs">
        <div class="row w-100 m-0 back-color-blanco">
            <div class="row w-100 m-0 py-2 justify-content-center">
                <div class="col-12 text-justify mt-2" >
                    <div class="row w-100 m-0 p-0 px-1 letra-gray-light-4-3vw white-space-preline text-left">
                    <div class="row w-100 m-0 fw-800">¿Qué es BIT Beauty?</div>
                    <div class="row w-100 m-0">BIT es un proyecto desarrollado con la finalidad de brindar soluciones de imagen personal para todas aquellas personas que se preocupan por verse y sentirse bien. Somos la primera aplicación (APP) en México en llevar todos los servicios de belleza al hogar, empresa, negocio, hotel en el lugar y tiempo que usted elija así como también agendar de manera rápida y eficiente en los mejores establecimientos de cada zona geográfica.</div>
                    <div class="row w-100 m-0 fw-800 pt-2">¿Cuándo estará disponible al público?</div>
                    <div class="row w-100 m-0">Jalisco – Actualmente disponible
                    Querétaro – Próximamente
                    Monterrey – Próximamente
                    Puebla & CDMX - Próximamente</div>
                    <!-- <div class="row w-100 m-0 fw-800 pt-2">¿Cómo puedo descargar BIT Beauty?</div> -->
                    <!-- <div class="row w-100 m-0">BIT Beauty está disponible para cualquier dispositivo, puedes encontrarla en Apple Store & Google Play</div> -->
                    <!-- <div class="row w-100 m-0 fw-800 pt-2">¿Cómo puedo afiliarme a BIT Beauty?</div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">1)</div> <div class="col p-0 pl-2">Ingresa a la página web www.bitbeauty.com.mx.</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">2)</div> <div class="col p-0 pl-2">Da clic en la pestaña “Afíliate”</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">3)</div> <div class="col p-0 pl-2">Selecciona tu modalidad de afiliación</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">4)</div> <div class="col p-0 pl-2">Completa la ficha de registro</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">5)</div> <div class="col p-0 pl-2"> Deberás aprobar el primer filtro de acuerdo a tu especialidad. (Maquillistas, estilistas, nail artist y barberos deberán adjuntar fotografías como evidencia de su trabajo; Cosmetólogos deberán completar un cuestionario de conocimientos; Masajistas o Terapeutas asistirán con un experto a probar sus conocimientos técnicos.</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">6)</div> <div class="col p-0 pl-2"> Un equipo especializado evaluará y aprobará tu solicitud</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">7)</div> <div class="col p-0 pl-2">Si tu solicitud fue aprobada, recibirás un correo de BIENVENIDA con indicaciones para finalizar tu proceso de afiliación</div>
                    </div> -->
                    <div class="row w-100 m-0 fw-800 pt-2">¿Cómo ser parte de BIT si ya cuentas con un lugar establecido?</div>
                    <div class="row w-100 m-0">Creamos un modelo de ventas específicamente para todas las empresas ya establecidas que prestan servicios de belleza y es un honor invitarlos a formar parte de BIT MEMBER STUDIO, para más información, visita www.bitbeauty.com.mx</div>
                    <div class="row w-100 m-0 fw-800 pt-2">¿Hay algún filtro de seguridad?</div>
                    <div class="row w-100 m-0">En BIT Beauty nos preocupamos por la seguridad de todos los que forman parte de esta comunidad, aquí les mencionamos las medidas preventivas que tenemos:</div>
                    <div class="row w-100 m-0 fw-800 pt-2">MEDIDAS PREVENTIVAS PARA EL TALENTO BIT:</div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">1)</div> <div class="col p-0 pl-2">Todos nuestros CLIENTES deberán registrar sus datos personales para ingresar a la APP.</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">2)</div> <div class="col p-0 pl-2">Antes de iniciar un servicio, el TALENTO BIT recibirá un código de seguridad que deberá proporcionar al cliente para su verificación y así asegurarse que es el domicilio indicado y proceder con el servicio.</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">3)</div> <div class="col p-0 pl-2">La APP cuenta con un botón de emergencia.</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-auto p-0 fw-800">4)</div> <div class="col p-0 pl-2">Cada servicio tiene un tiempo promedio de realización, por lo que la plataforma detectará si existe alguna anomalía de acuerdo al tiempo en que permanezca abierto un servicio y enviará una señal de alarma a nuestro sistema interno.</div>
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