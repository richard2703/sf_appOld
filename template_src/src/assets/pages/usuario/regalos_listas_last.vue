<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" title="Regalos" :chat="false" />
            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 px-3 pt-2 pb-3">
                    <busquedaInput v-model="busqueda" :notOffset="1" />
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 py-2">
                        <scollX >
                            <div class="swiper-slide w-auto"  @click="categoria = null">
                                <div class="w-auto">
                                    <div class="row w-100 m-0 fw-600 px-3" :class="`${categoria==null?'back-color-azul1 letra-blanco-18':'letra-gray4-18'}`">Todas</div>
                                </div>
                            </div>
                            <div class="swiper-slide w-auto" v-for="p of categorias" :key="p.id" @click="categoria = p.id">
                                <div class="w-auto">
                                    <div class="row w-100 m-0 fw-600 px-3" :class="`${categoria==p.id?'back-color-azul1 letra-blanco-18':'letra-gray4-18'}`">{{p.name}}</div>
                                </div>
                            </div>
                        </scollX>
                    </div>
                </div>

                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 px-2">
                        <div class="row w-100 m-0 pt-3">
                            <div class="row w-100 m-0 letra-gray3-19 px-3">Lo mas nuevo</div>
                            <div class="row w-100 m-0 justify-content-start">
                                <div class="col-auto px-0" v-for="p of categorizadoP" :key="p.id">
                                    <cardProducto :data="p" :tipo="1" />
                                </div>
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
                busqueda: null,
                categoria: null,
                cats:[
                    {id:'Comida',},
                    {id:'Ropa',  },
                    {id:'Calzado',  },
                    {id:'Tecnologia',  },
                    {id:'Joyeria',  },
                ],
                comida: [7,10,34,35,36,48,49,50,51,53,54],
                ropa: [12,13],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            productos(){return this.$store.getters.getCatalogo('productos');},
            categorias(){return this.$store.getters.getCatalogo('categorias');},
            filtradoP(){
                if(this.busqueda){
                    return this.productos.filter(x=>{return x.nombre.toLowerCase().includes(this.busqueda.toLowerCase())});
                }
                return this.productos; 
            },
            categorizadoP(){
                if(this.categoria){
                    return this.filtradoP.filter(x=>{return x.category_id == this.categoria });
                }
                return this.filtradoP; 
            },
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
        }
    }
</script>