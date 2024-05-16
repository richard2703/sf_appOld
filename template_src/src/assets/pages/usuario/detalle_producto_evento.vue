<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>

            <div class="contenedor-page">
                <topRowPorducto :data="producto" :notRelated="1" />
            </div>

            <div class="row w-100 m-0 pb-4 back-color-blanco border-t-gray1-1">
                <div class="row w-100 m-0 py-2">
                    <div class="row w-100 m-0 px-3 justify-content-center">
                        <div class="col-5 px-0">
                            <div class="row w-100 m-0">
                                <div class="col-auto px-2 back-color-azul1 border-radius-5px" @click="cantidad>1?cantidad -= 1:cantidad = cantidad">
                                    <icono icono="remove" clase="letra-blanco-30 pt-4px" />
                                </div>
                                <div class="col px-0">
                                    <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{cantidad}}</div>
                                </div>
                                <div class="col-auto px-2 back-color-azul1 border-radius-5px" @click="cantidad += 1">
                                    <icono icono="add" clase="letra-blanco-30 pt-4px" />
                                </div>
                            </div>
                        </div>
                        <div class="col-auto ml-auto px-0 letra-azul1-23">{{(Number(producto.precio) * cantidad) * (producto.iva == '1'?1.16:1) | currency}} {{producto.currency}}</div>
                    </div>
                </div>
                <div class="row w-100 m-0 pt-2 pb-4 px-3">
                    <div class="col-12 px-0 pb-ios-20px">
                        <botonApp tipo="azul" texto="Agregar a carrito" radius="30px" @click="add()"/>
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
                total: 0,
                cantidad: 1,
                form: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            restaurante(){return this.$store.getters.restaurantesFind('restaurantes','restaurante') || {};},
            producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
            galeria(){return this.producto.galeria || []},
            tipo(){ return this.$store.getters.userStateObject('tipo') },
            nuevaFecha(){ return this.$store.getters.userStateObject('tipo') == 'nuevaFecha' },
        },
        methods:{
            set(platillo){
                this.total = platillo.total;
                this.form = platillo;
            },
            add(){
                console.log("TIPOS", this.tipo );
                this.producto.cantidad = this.cantidad;

                if( this.tipo == 'nuevoEvento' ){
                    let l = this.router.history.length;
                    // console.log("RUTERANDO", this.router.history[l-3]);
                    this.$store.commit('addRegaloCallback',{
                        regalo:     this.producto, 
                        callback:   ()=>{
                            this.router.back( this.router.history[l-3] ,{force: true} );
                        }
                    });
                    return;
                }

                if( this.tipo == 'editarEvento' ){
                    let l = this.router.history.length;
                    // console.log("RUTERANDO", this.router.history[l-3]);
                    this.$store.commit('addRegaloCallback',{regalo:this.producto, callback: ()=>{
                        this.router.back( this.router.history[l-3] , {force: true} );
                    }});
                    return;
                }

                if( this.tipo == 'nuevaFecha' ){
                    this.$store.commit('addRegalo',this.producto);
                    this.router.back( '/lista_nuevo_evento', {force: true} );
                    return;
                }

                if( this.tipo == 'editarFecha' ){
                    this.$store.commit('addRegalo',this.producto);
                    this.router.back( '/editar_evento_fecha', {force: true} );
                    return;
                }
            }
        }
    }
</script>