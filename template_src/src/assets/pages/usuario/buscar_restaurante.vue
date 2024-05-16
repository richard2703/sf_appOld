<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="false" :title="'Buscar'"></nav-bar>
            <div class="row w-100 m-0 px-2 py-3">
                <busquedaInput v-model="busqueda" holder="Escribe lo que se te antoje y lo buscamos..."  />
            </div>
            <div class="contenedor-page">
                <div class="row w-100 m-0" v-if="!filtrado || !filtrado.length">
                    <div class="row w-100 m-0 pt-4 justify-content-center text-center letra-gray3-18">No has buscado aún</div>
                </div>
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0" v-for="r of filtrado" :key="r.id">
                       <restauranteCard :data="r" />
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
                busqueda: ''
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            restaurantes(){return this.$store.getters.restaurantesArray('restaurantes') || []},
            filtrado(){
                if(this.busqueda){
                    return this.restaurantes.filter(x=>{return x.restaurant_nombre.toLowerCase().includes(this.busqueda.toLowerCase())});
                }
                return [];
            }
        },
        methods:{
        }
    }
</script>