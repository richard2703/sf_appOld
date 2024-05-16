<template>
    <f7-page  >
        <modalQr :qr="codigo" :data="x" :regalo="regalo" />

        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','historilaccom')" class="w-45px h-45px border-radius-50 position-absolute bottom-8 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Servicios por canjear'" :right="false" />

            <div id="historilaccom" class="contenedor-page-tabs" >

                <div class="row w-100 m-0 border-b-gray0-15" v-for="a of ordenar" :key="a.idx">
                    <compServiciosCanjeables :data="a" vista="servicios_canjear" :callback="openQr" />
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
                regalo: false,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            debug(){return this.$store.getters.deviceready == false; },

            historial(){return this.$store.getters.userStateArray('historial');},
            servicios(){return this.$store.getters.userStateArray('servicios');},
            regalos(){return this.$store.getters.getCatalogo('regalosEventos').filter(f=>{return f.productos && f.productos.length});},
            regalosAmigos(){return this.$store.getters.userStateArray('regalosAmigos');},
            ordenar(){
                this.servicios.map(x=>{
                    x.idx = _.uniqueId('x_');
                    x.typex = '1';
                    x.orderDate = x.pedido.created;
                });
                this.regalos.map(x=>{
                    x.idx = _.uniqueId('y_');
                    x.typex = '2';
                    x.orderDate = x.creado;
                });
                this.regalosAmigos.filter(w=>{
                    return w.productos.some(e=>e.tipo_entrega != 'domicilio');
                }).map(x=>{
                    x.idx = _.uniqueId('w_');
                    x.typex = '1.1';
                    x.orderDate = x.creado;
                });
                console.log("ORDER BY", [...this.servicios, ...this.regalos, ...this.regalosAmigos]);
                return _.orderBy([...this.servicios, ...this.regalos, ...this.regalosAmigos], ['orderDate'], ['desc']);
            }   
        },

        mounted(){
            console.log("AMIGOS", this.regalosAmigos);
        },
        
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },
            openQr(a, c, regalo = false){
                this.codigo = c;
                this.x = a;
                this.regalo = regalo;
                this.$store.commit('openModal',['modalQr'])
            },
        }
    }
</script>