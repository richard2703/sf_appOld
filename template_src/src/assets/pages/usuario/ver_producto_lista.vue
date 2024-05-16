<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>
            <div class="contenedor-page">
                <div class="row w-100 m-0 h-65vw" v-if="producto.imagen">
                    <imagen :fit="true" :src="producto.imagen" />
                </div>
                <div class="row w-100 m-0 px-3 py-3">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col-12 my-auto px-0 letra-gray4-19 fw-600">{{producto.nombre}}</div>
                            <div class="col-auto ml-auto px-0 letra-azul1-23">{{producto.precio | currency}} {{producto.currency}} + IVA</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto my-auto ml-auto px-0 letra-azul1-25 fw-600 ">{{Number(producto.precio) * 1.16  | currency}} {{producto.currency}}</div>
                        </div>
                        
                        <div class="row w-100 m-0 pt-3" v-if="producto.partner && producto.partner.id">
                            <div class="row w-100 m-0 letra-gray4-17">Partner</div>
                            <div class="row w-100 m-0 letra-azul1-18">{{producto.partner.tradename }}</div>
                        </div>
                        <div class="row w-100 m-0 pt-3" v-if="producto.partner && producto.partner.id">
                            <div class="row w-100 m-0 letra-gray4-17">Ubicación</div>
                            <div class="row w-100 m-0 letra-azul1-18">{{producto.partner.ciudad }}, {{producto.partner.estado}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-2 letra-gray3-16 text-justify">{{producto.descripcion}}</div>
                    </div>
                </div>

                <!-- <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 ">
                        <div class="row w-100 m-0 letra-gray3-19 px-3">Productos relacionado</div>
                        <div class="row w-100 m-0">
                            <scollX >
                                <div class="swiper-slide w-auto" v-for="p of productos" :key="p.id">
                                    <cardProducto :data="p" :tipo="1" />
                                </div>
                            </scollX>
                        </div>
                    </div>
                </div> -->
            </div>
            <!-- <div class="row w-100 m-0 pb-2 back-color-blanco border-t-gray00-1">
                <div class="row w-100 m-0 pt-3 pb-4 px-3">
                    <div class="col-12 px-0 pb-2 pb-ios-20px">
                        <botonApp tipo="azul" texto="Agregar a la wishlist" radius="30px" @click="add()"/>
                    </div>
                </div>
            </div> -->
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