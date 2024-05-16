<template>
    <f7-page class="" id="inicio">
         <modal-mensaje @click="rechazar"
          :texto="'¿Deseas rechazar este viaje? No podras tomarlo nuevamente.'"
          :boton="'Aceptar'"
         />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="'MIVIA'" />
            <div class="contenedor-page-tabs">
                <div class="row w-100 m-0 pt-4"  v-if="!servicios || !servicios.length">
                    <div class="row w-100 m-0 pt-4 justify-content-center">
                        <div class="col-4 px-2">
                            <imagen :icono="true" src="taxi" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 py-2 letra-gray4-25 justify-content-center text-center">No hay viajes por ahora, pronto vendran.</div>
                </div>
            </div>
            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                servicio: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            servicios(){return this.$store.getters.choferStateArray('servicios');}
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            next(estatus){
               this.$store.dispatch('postActualizarPedido',estatus);
            },
            rechazar(){
                this.$store.commit('rechazarViaje', this.servicio);
            },
        }
    }
</script>