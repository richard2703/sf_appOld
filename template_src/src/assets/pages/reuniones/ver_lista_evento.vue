<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Wishlists'" />
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0" v-for="a of misListas " :key="a.id">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" >
                            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                                <div class="w-12vw h-12vw my-auto">
                                    <imagen clase="border-radius-15px" v-if="!a.imagen" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/w1.jpg" />
                                    <imagen clase="border-radius-15px" v-else :fit="true" :create="true" :src="a.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                                </div>
                                <div class="col-auto my-auto px-0 pl-2">
                                    <!-- <div class="row w-100 m-0" >
                                        <div class="w-37px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click="nuevo(a.id)" >
                                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                    </div> -->
                                    <!-- <div class="row w-100 m-0 pt-2" >
                                        <div class="w-37px border-radius-5px back-color-gray3 py-1 justify-content-center text-center" @click=" eliminar(a) " >
                                            <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0 pl-3">
                                <div class="row w-100 m-0 py-1" v-for="p of a.productos" :key="p.id">
                                    <div class="w-18vw h-18vw my-auto">
                                        <imagen clase="border-radius-15px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                        <imagen clase="border-radius-15px" :fit="true" src="https://socialflow.app/admin/apiv1/imagenes/p1.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{p.nombre | truncate(36)}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18">{{p.precio | currency}} {{p.producto.currency}}</div>
                                        <div class="row w-100 m-0 letra-verde6-18" v-if=" p.comprado && p.comprado.id ">Comprado</div>
                                    </div>
                                    <div class="col-auto my-auto px-0 pl-2" >
                                        <div class="row w-100 m-0 pt-2" v-if=" !p.comprado || !p.comprado.id ">
                                            <div class="w-37px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click=" add(p,a) ">
                                                <icono icono="local_grocery_store" clase="letra-blanco-20 pt-4px" />
                                            </div>
                                        </div>
                                        <!-- <div class="row w-100 m-0 pt-2" >
                                            <div class="w-37px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click=" $store.dispatch('postEliminarProducto', p) ">
                                                <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                            </div>
                                        </div> -->
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
            amigo(){return this.$store.getters.userStateFind('usuarios','amigo');},
            detalle(){ return this.$store.getters.userStateObject('detalle'); },
            
            evento(){return this.$store.getters.userStateFind('misEventos','evento'); },
            misListas(){ return [this.evento.lista || {}] },
        },
        mounted() {
            this.$store.dispatch('synchronizeData');
        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },
            eliminar(e){
                this.$store.dispatch('postBorrarLista',e);
            },
            add(e, lista){
                this.$store.commit('updateCatalogosState',['producto', e.producto.id]);
                this.$store.commit('setCarritosState',['producto', e.producto.id]);

                this.$store.commit('setCarritosState',['para_usuarios_id', lista.usuarios_id]);
                this.$store.commit('setCarritosState',['listas_id', lista.id]);
                
                this.$store.commit('setCarritosState',['eventos_id', null]);
                this.$store.commit('addProductoCarrito',e.producto);
                this.router.navigate('/carrito');
            },
            
        }
    }
</script>