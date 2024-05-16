<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>

            <div class="contenedor-page">
                <topRowPorducto :data="producto" :notRelated="1" />
            </div>

            <div class="row w-100 m-0 pb-2 back-color-blanco border-t-gray00-1">
                <div class="row w-100 m-0 pt-3 pb-4 px-3">
                    <div class="col-12 px-0 pb-2 pb-ios-20px">
                        <botonApp tipo="azul" texto="Agregar a la wishlist" radius="30px" @click="add()"/>
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
                form: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            productos(){return this.$store.getters.getCatalogo('productos').filter((x,y)=>{return y < 3});},
            producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
            galeria(){return this.producto.galeria || []},
            lista(){return this.$store.getters.userStateFind('misListas','lista') || {}},
        },
        methods:{
            set(platillo){
                this.total = platillo.total;
                this.form = platillo;
            },
            add(){
                this.$store.dispatch('postAgregarProductoListaByID',[this.lista, this.producto]);
            }
        }
    }
</script>