<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Wishlist'" :right="true" icon="add" @right="router.navigate('/nueva_lista')" />
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0" v-for="a of misListas " :key="a.id">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray1-1" @click="select(a)">
                            <div class="row w-100 m-0 py-2" >
                                <div class="w-12vw h-12vw my-auto">
                                    <imagen clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/imagenes/w1.jpg" />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                                </div>
                                <!-- <div class="col-auto px-0 my-auto" @click="nuevo(a)">
                                    <icono clase="letra-gray3-30 pt-3px" icono="add" />
                                </div> -->
                            </div>
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0 px-3 ">
                                <div class="row w-100 m-0 py-1" v-for="p of a.productos" :key="p.id">
                                    <div class="w-18vw h-18vw my-auto">
                                        <imagen clase="border-radius-15px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                        <imagen clase="border-radius-15px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/no.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{p.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18">{{p.precio | currency}} {{p.currency}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
                
            </div>
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
            session(){return this.$store.getters.getSession;},
            misListas(){return this.$store.getters.userStateArray('misListas');},
        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/nuevo_producto');
            },
            select(a){
                this.$store.dispatch('postAgregarProductoLista', a );
            }
            
        }
    }
</script>