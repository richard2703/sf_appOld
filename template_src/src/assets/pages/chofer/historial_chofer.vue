<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="'Mis viajes'" />
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 border-b-verde5-1">
                        <div class="col-6 px-0" @click="tab=1">
                            <div class="row w-100 m-0 py-10px px-3 justify-content-center text-center" :class="`${tab==1?'back-color-verde5 letra-blanco-15':'back-color-blanco letra-verde5-15'}`">Realizados</div>
                        </div>
                        <div class="col-6 px-0" @click="tab=2">
                            <div class="row w-100 m-0 py-10px px-3 justify-content-center text-center" :class="`${tab==2?'back-color-verde5 letra-blanco-15':'back-color-blanco letra-verde5-15'}`">Cancelados</div>
                        </div>
                    </div>
                </div>
                <div class="contenedor-page">
                    <div class="row w-100 m-0" v-if="tab==1">
                        <div class="row w-100 m-0" v-for="s of realizado" :key="s.id">
                            <rowViaje :isChofer="true" :data="s" />
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-if="tab==2">
                        <div class="row w-100 m-0" v-for="s of cancelados" :key="s.id">
                            <rowViaje :isChofer="true" :data="s" />
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
                tab: 1,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            servicios(){return this.$store.getters.userStateArray('historial');},
            realizado(){return this.servicios.filter(x=>{return x.estatus == 'terminado'});},
            cancelados(){return this.servicios.filter(x=>{return x.estatus == 'cancelado'});},
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            next(estatus){
               this.$store.dispatch('postTomarViaje',estatus);
            }
        }
    }
</script>