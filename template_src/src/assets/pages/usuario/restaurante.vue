<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                   <restauranteCard :full="true" :data="restaurante" />
               </div>
               <div class="row w-100 m-0 px-3 py-2">
                   <busquedaInput v-model="busqueda" />
               </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for="c of filtrarCategorias(categorias) " :key="c.categoria">
                        <div class="row w-100 m-0 letra-gray4-22 px-3 border-t-gray00-1 border-b-gray00-1">{{c.categoria}}</div>
                        <div class="row w-100 m-0 " v-for="p of filtrarFoods(c.foods)" :key="p.id">
                            <platilloMenuCard :data="p" />
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
                busqueda: '',
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            restaurante(){return this.$store.getters.restaurantesFind('restaurantes','restaurante') || {};},
            categorias(){return this.restaurante.foods || []},
        },
        methods:{
            filtrarFoods(foods){
                if(this.busqueda){
                    return foods.filter(x=>{return x.platillo.toLowerCase().includes(this.busqueda.toLowerCase())});
                }
                return foods;
            },
            filtrarCategorias(cats){
                if(this.busqueda){
                    return cats.filter(x=>{return (this.filtrarFoods(x.foods) || []).length > 0 });
                }
                return cats;
            },
            set(id){
                console.log("SETTING",id);
                if(this.domicilio == id){
                    this.$store.commit('setCarritosState',['domicilio', null]);  
                }
                this.$store.commit('setCarritosState',['domicilio', id]);
                this.$store.dispatch('synchronizeData');
            },
            
        }
    }
</script>