<template>
    <f7-page>
    <div class="vista">
    <nav-bar tipo="inicio" :backs="true" :title="'Aviso de privacidad'"></nav-bar>
    <div class="contenedor-page-tabs">
        <div class="row w-100 m-0 back-color-blanco">
            <div class="row w-100 m-0 py-2 pb-4 justify-content-center">
                <div class="col-12 text-justify mt-2">
                    <div class="row w-100 m-0 p-0 letra-gray4-25 white-space-preline text-justify py-3 justify-content-center">AVISO DE PRIVACIDAD</div>
                    <div class="row w-100 m-0 p-0 letra-gray3-18 white-space-preline text-justify py-3 justify-content-center">
                        En cumplimiento con lo establecido en la Ley Federal de Protección de Datos Personales de México, en posesión de Particulares y con la finalidad de asegurar la protección y privacidad de los datos personales, así como regular el acceso, rectificación, oposición y cancelación de estos, SOCIALFLOW en adelante SOCIALFLOW, establece lo siguiente: Este aviso es relacionado al uso del sitio web de https://socialflow.app, a la App de IOS y a la App de Android.
                        
                        DATOS PERSONALES
                        La información solicitada y recabada o recibida por SOCIALFLOW ya sea en forma física, electrónica o cualquier otro medio, consistirá principalmente en los datos personales y/o empresariales, necesarios e indispensables para la contratación, identificación, administración, operación, y cualquier otro uso indispensable para las operaciones de prestación y/o recepción de servicios, comerciales, y de información de nuestros productos y servicios entre nuestros empleados, proveedores, clientes y prestadores de servicios. Tus datos personales serán utilizados únicamente para fines de uso de nuestra plataforma para brindar el servicio de la manera correcta.

                        COOKIES
                        Nuestro sitio web almacena información acerca de los usuarios que lo visitan y sus diferentes secciones a través de cookies e IPS o archivos temporales, los cuales se emplean únicamente con el propósito de definir el interés del usuario por alguna sección o servicio en particular y enriquecer aún más su visita a este sitio.

                        DERECHOS ARCO. ( ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN )
                        ( ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN ). En particular, la ley otorga a los titulares de los datos personales el derecho a acceder, rectificar, y cancelar su información personal en posesión de terceros, así como oponerse a su uso. A estos se les conoce como derechos ARCO.
                        Recuerda que para que puedas ejercer tus derechos ante el responsable, deberás demostrar que tú eres el titular de los datos o, en caso de que lo hagas a través de representante, deberás acreditar esta situación. Esto está pensado para que NADIE más que tú o tu representante, puedan decidir el uso que se le dará a tus datos personales; es por tu protección y la de tu información.

                        En caso de que ejerzas tus derechos a través de un representante, podrás acreditarlo de las siguientes maneras:

                        Presentando un instrumento público en el que conste tal situación
                        Mediante carta poder firmada ante dos testigos.
                        A través de la declaración en comparecencia del titular.
                        Podrás solicitar el ejercicio de sus derechos enviándonos un correo electrónico a la dirección siguiente: CONTACT@SOCIALFLOW.APP

                        AUTORIZACIÓN
                        Si tu como usuario, proveedor, cliente, partner o prestador de servicios nos proporcionas tus datos personales se entiende que has leído, entendido y aceptado el presente aviso de privacidad, así como has autorizado la transferencia de tus datos para los fines señalados y no has manifestado oposición con el mismo.

                        FECHA DE ACTUALIZACION
                        Este aviso fue actualizado por última vez el día 2 de JULIO de 2020, sin embargo puede cambiar o actualizarse en cualquier momento y sin previo aviso, mas que el publicado en nuestra página web HTTPS://SOCIALFLOW.APP
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
            session(){return this.$store.getters.getSession;},
            user(){return this.$store.getters.user;},
            chofer(){return this.$store.getters.chofer;},
        },
        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },
        }
    }
</script>