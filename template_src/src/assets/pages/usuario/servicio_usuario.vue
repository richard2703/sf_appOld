<template>
    <f7-page class="" id="inicio">
        <modalAvisar :servicio="servicio" />
        <modalCambioDestino :servicio="servicio" />
        <modal-mensaje v-if="tipo==1" @click="$store.dispatch('postCancelarUsuario')"
          :texto="'La cancelacion de tu viaje implicara el cobro del servicio mas un recargo por cancelacion'"
          :boton="'Aceptar'"
         />
        <modal-mensaje v-if="tipo==2" @click="$store.dispatch('postCancelarUsuario')"
          :texto="'Deseas cancelar tu viaje'"
          :boton="'Aceptar'"
         />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="'Mi Viaje'" />
            <div class="contenedor-page pb-0" v-if="servicio.estatus == 'creado'">
                <div class="row w-100 m-0 pt-5">
                    <div class="row w-100 m-0 pt-4 justify-content-center">
                        <div class="col-6 px-2">
                            <imagen :logo="true" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2 justify-content-center">
                        <div class="lds-css ng-scope text-center"><div style="width:100%;height:100%" class="lds-ellipsis mx-auto"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
                    </div>
                    <div class="row w-100 m-0 justify-content-center fw-800 font-italic letra-gray4-25">Buscando viaje...</div>
                    <div class="row w-100 m-0 justify-content-center pt-4 ">
                      <div class="col-9 px-0" @click="tipo = 2; $store.commit('openModal',['modalMensaje'])" >
                        <botonApp texto="Cancelar viaje" tipo="verde" radius="30px" />
                      </div>
                    </div>
                </div>
            </div>
            <div class="contenedor-page pb-0" v-else>
                <div class="row w-100 h-100 m-0">
                    <mapaUsuario v-model="tipo" />
                </div>
            </div>
            <!-- <tabs /> -->
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
              tipo: 1,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            servicio(){return this.$store.getters.servicioObject('servicio');},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            
        }
    }
</script>
<style>

 .lds-ellipsis {
    position: relative;
  }
  .lds-ellipsis > div {
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
  }
  .lds-ellipsis div > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f00;
    position: absolute;
    top: 100px;
    left: 32px;
    -webkit-animation: lds-ellipsis 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  }
  .lds-ellipsis div:nth-child(1) div {
    -webkit-animation: lds-ellipsis2 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis2 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #4cd77c;
  }
  .lds-ellipsis div:nth-child(2) div {
    -webkit-animation-delay: -0.65s;
    animation-delay: -0.65s;
    background: #4cd77c;
  }
  .lds-ellipsis div:nth-child(3) div {
    -webkit-animation-delay: -0.325s;
    animation-delay: -0.325s;
    background: #4cd77c;
  }
  .lds-ellipsis div:nth-child(4) div {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    background: #4cd77c;
  }
  .lds-ellipsis div:nth-child(5) div {
    -webkit-animation: lds-ellipsis3 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis3 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #4cd77c;
  }
  .lds-ellipsis {
    width: 65px !important;
    height: 65px !important;
    -webkit-transform: translate(-32.5px, -32.5px) scale(0.325) translate(32.5px, 32.5px);
    transform: translate(-32.5px, -32.5px) scale(0.325) translate(32.5px, 32.5px);
  }

</style>