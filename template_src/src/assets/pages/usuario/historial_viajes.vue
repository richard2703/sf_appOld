<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="'Mis viajes'" />
              <div class="contenedor-page" v-if="!servicios || !servicios.length">
                    <div class="row w-100 m-0 pt-4">
                        <div class="row w-100 m-0 pt-4 justify-content-center">
                            <div class="col-6 px-2">
                                <imagen :logo="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 py-2 letra-gray4-25 justify-content-center text-center">Aun has realizado ningun viaje</div>
                    </div>
                </div>
                <div class="contenedor-page">
                    <div class="row w-100 m-0" v-for="s of servicios" :key="s.id">
                        <rowViaje :data="s" />
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            servicios(){return this.$store.getters.userStateArray('historial');}
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            next(estatus){
               this.$store.dispatch('postActualizarPedido',estatus);
            }
        }
    }
</script>