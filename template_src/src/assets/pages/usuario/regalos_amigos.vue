<template>
    <f7-page id="inicio" >
        <modalQr :qr="codigo" :data="x" :regalo="true" />

        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','historilaccom')" class="w-45px h-45px border-radius-50 position-absolute bottom-8 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Regalos recibidos'" :right="false" />
            
            <div id="historilaccom" class="contenedor-page">

                <div class="row w-100 m-0 pt-5" v-if="!regalosAmigos || !regalosAmigos.length">
                    <div class="row w-100 m-0 letra-gray3-20 justify-content-center text-center ">No tienes regalos</div>
                </div>

               <div class="row w-100 m-0">
                   <div class="row w-100 m-0 mb-3 back-color-blanco" v-for="a of regalosAmigos " :key="a.id">
                        <compRegalosRecibidos :data="a" vista="regalos_amigos" :callback="openQr" />
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
                codigo: 'socialFlow',
                x: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            historial(){return this.$store.getters.userStateArray('historial');},
            regalosAmigos(){return this.$store.getters.userStateArray('regalosAmigos');},
            servicios(){return this.$store.getters.userStateArray('servicios');},
        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },

            openQr(a,c){
                this.codigo = c; 
                this.x = a;
                this.$store.commit('openModal',['modalQr'])
            },
            
            set(a){
               this.$store.commit('setUsuarioData',['regalo',a.id]);
               this.router.navigate('/seleccionar_domicilio');
            },
            
        }
    }
</script>