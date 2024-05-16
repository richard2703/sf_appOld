<template>
    <f7-page class="" id="inicio">
        <modalConfirmar v-if="grupo && grupo.id" :usuario="session" :grupo="evento" @click="enviar()"/>
        <modal-mensaje 
            :texto="`¿Seguro que deseas cancelar la ${evento.tipo}?`"
            :boton="'Seguro'"
            @click="eliminar(evento)"
        />
        <modalQr :qr="codigo" :data="x" />

        <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','qwera85')" class="w-45px h-45px border-radius-50 position-absolute bottom-12 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
            <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
        </div>
        <div class="vista">

            <nav-bar tipo="inicio" :backs="true" title="Detalle evento"  />
            <div id="qwera85" class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0">
                                <eventosFull :data="evento" @qr="openQr" />
                            </div>
                        </div>
                    </div>

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
                hoy: moment().format('YYYY-MM-DD'),
                codigo: 'socialFlow',
                x: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            eventos(){return this.$store.getters.userStateArray('misEventos'); },
            evento(){return this.$store.getters.userStateFind('misEventos','evento'); },
            grupo(){return this.$store.getters.userStateFind('misEventos','evento'); },
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            eliminar(a){
                this.$store.dispatch('postEliminarEvento',a);
                this.router.back();
            },
            openQr(a){
                this.codigo = a.code; 
                this.x = a;
                this.$store.commit('openModal',['modalQr'])
            },
            
        }
    }
</script>