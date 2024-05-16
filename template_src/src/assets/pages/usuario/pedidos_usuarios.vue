<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Pedidos'" />
            <div class="row w-100 m-0">
                <div class="col-6 px-0" @click="tab = 1">
                    <div class="row w-100 m-0 py-2 justify-content-center text-center" :class="(tab==1)?'back-color-verde3 letra-blanco-18':'back-color-blanco letra-verde3-18'">En curso</div>
                </div>
                <div class="col-6 px-0" @click="tab = 2">
                    <div class="row w-100 m-0 py-2 justify-content-center text-center" :class="(tab==2)?'back-color-verde3 letra-blanco-18':'back-color-blanco letra-verde3-18'">Historico</div>
                </div>
            </div>
            <div class="contenedor-page">
                <div class="row w-100 m-0" v-if="tab == 1">
                    <div class="row w-100 m-0" v-for="p of curso" :key="p.id">
                        <pedidosRowUsuario campo="pendientes" :data="p" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-if="tab == 2">
                    <div class="row w-100 m-0" v-for="p of historico" :key="p.id">
                        <pedidosRowUsuario campo="pendientes" :data="p" />
                    </div>
                </div>
            </div>
            <!-- <tabs :chef="true" /> -->
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
            session(){return this.$store.getters.getSession;},
            pedidos(){return this.$store.getters.userStateArray('pedidos');},
            curso(){return this.pedidos.filter(x=>{return x.estatus != 'entregados' && x.estatus != 'cancelado' && x.estatus != 'cancelado_cliente'});},
            historico(){return this.pedidos.filter(x=>{return x.estatus == 'entregados' || x.estatus == 'cancelado' || x.estatus == 'cancelado_cliente'});},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            
        }
    }
</script>