<template>
    <f7-page id="inicio">
        <nav-bar tipo="inicio" :backs="true" :title="'Restaurantes favoritos'"></nav-bar>
        <div class="contenedor-page back-color-blanco">
            <div class="row w-100 m-0 py-3 px-2 border-b-gray-lligth-1" v-for="res of restaurantes" :key="res.id">
                <div class="row w-100 m-0">
                    <div class="w-25vw h-25vw my-auto">
                        <img class="w-100 h-100 object-fit border-radius-50" :src="res.imagen || 'http://rockandfood.com.co/modules/themeconfigurator/img/IconoCubiertos-01.png'" alt="logo_restaurante">
                    </div>
                    <div class="col my-auto">
                        <div class="row w-100 m-0 letra-gray3-4-5vw fw-800">{{res.nombre}}</div>
                        <div class="row w-100 m-0">
                            <div class="col pl-1 letra-gray3-3-5vw" v-for="(cat, catIn) of res.categorias" :key="cat.id">
                                <span v-if="catIn!=0">,</span>{{cat.nombre}}
                            </div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col pl-1 letra-gray3-3-5vw">{{res.direccion | truncate(70)}}</div>
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
            session(){return this.$store.getters.getSession;},
            restaurantes(){return this.$store.getters.getRestaurantes.filter(r=>{return r.favorito});},
        },
        created() {
        },
        methods:{
        }
    }
</script>