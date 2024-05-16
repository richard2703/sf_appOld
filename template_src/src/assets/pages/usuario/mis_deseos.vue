<template>
    <f7-page id="inicio" >
        <modal-mensaje 
            :texto="`¿Deseas eliminar esta wishlist?`"
            :boton="'Aceptar'"
            @click="eliminar(data)"
        />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','deseo789')" class="w-45px h-45px border-radius-50 position-absolute bottom-15 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <!-- <nav-bar tipo="inicio" :backs="true" :title="'Wishlist'" :right="true" icon="add" @right="router.navigate('/nueva_lista')" /> -->
            <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />
            
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 back-color-azul1" @click="router.navigate('/nueva_lista')">
                    <div class="row w-100 m-0 letra-blanco-18 justify-content-center text-center py-8px">
                        <div class="col-auto px-0 my-auto">Crear nueva Wishlist</div>
                        <div class="col-auto px-0 pl-2 my-auto">
                            <icono clase="letra-blanco-35 pt-5px" icono="add" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="deseo789" class="contenedor-page-tabs">

                <div class="row w-100 m-0 py-1 ">
                    <div class="row w-100 m-0 py-2 px-3 letra-gray3-15 justify-content-center text-center ">Las Wishlists son listas que almacenan tus productos, servicios y experiencias favoritos. A las wishlists pueden acceder tus amigos cuando quieran enviarte un regalo individual o cuando creen un regalo grupal. ¡Entre mas deseos agregues mas oportunidades tienes de recibirlo!</div>
                </div>
                
               <div class="row w-100 m-0 px-2">
                   <div class="row w-100 m-0" v-for="(a,x) of misListas " :key="x">
                        <rowWhislist :data="a" />
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
                t: 1,
                data: {},
            } 
        },
        computed: {
            debug(){return this.$store.getters.debug;},
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            misListas(){return this.$store.getters.userStateArray('misListas');},
            misFechas(){return this.$store.getters.userStateArray('misFechas').filter(x => { return x.productos && x.productos.length }); },

        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['tipo', 'addListaX']); 
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },

            ver(p){
                this.$store.commit('updateCatalogosState',['producto', p.productos_id]);
                this.router.navigate('/ver_producto_lista');
            },

            toEliminar(a){
                this.data = a;
                this.$store.commit('openM');
            },

            paraEliminarFecha(a){
                this.data = a;
                this.$store.commit('openM');
            },

            eliminar(e){
                console.log("DATAS", e.type, 'lista')
                if(e.type == 'lista'){
                    this.$store.dispatch('postBorrarLista',this.data);
                }
                if(e.type == 'listaFecha'){
                    this.$store.dispatch('postEliminarFecha',this.data);
                }
            },

            nuevoF(x){
                this.$store.commit('setUsuarioData',['tipo', 'agregarRegaloFecha']); 
                this.$store.commit('setUsuarioData',['lista', x]);
                this.router.navigate('/regalos_listas');
            }
            
        }
    }
</script>