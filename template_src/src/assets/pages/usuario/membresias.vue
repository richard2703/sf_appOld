<template>
    <f7-page id="inicio">
        <modalQr />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos" @click="$store.dispatch('scrollBottom', 'membresiacom')"
                class="w-45px h-45px border-radius-50 position-absolute bottom-8 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>
            <nav-bar tipo="inicio" :backs="true" :title="'Membresias'" :right="false" />
            <div id="membresiacom" class="contenedor-page">
                <div class="row w-100 m-0">
                    <div class="col-12  m-0 px-3 py-2 border-b-gray01-1">
                        <div class=" border-radius-10px " :class="'back-color-verde2'">
                            <div
                                class="  m-0 px-2 py-2 letra-blanco-20 justify-content-center text-center text-capitalize">
                                Cambio de Membresia</div>
                        </div>
                    </div>

                    <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                        <button type="button"
                            class="button button-outline button-raised button-active-gray px-3 py-2 text-left"
                            @click="updateProduct(1)">
                            <div class="row m-0 w-100 justify-content-between position-relative">
                                <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="mm" />
                                        </div>
                                    </div>
                                    <div class="col-auto mr-auto my-auto px-0 letra-gray3-19">Premium</div>
                                    <div class="col-auto my-auto ml-auto px-0">
                                        <div
                                            class="row w-100 m-0 px-2 letra-gray3-20 justify-content-center text-center text-capitalize">
                                            $149.00 MXN</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button type="button"
                            class="button button-outline button-raised button-active-gray px-3 py-2 text-left"
                            @click="updateProduct(2)">
                            <div class="row m-0 w-100 justify-content-between position-relative">
                                <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="mm" />
                                        </div>
                                    </div>
                                    <div class="col-auto mr-auto my-auto px-0 letra-gray3-19">V I P</div>
                                    <div class="col-auto my-auto ml-auto px-0">
                                        <div
                                            class="row w-100 m-0 px-2 letra-gray3-20 justify-content-center text-center text-capitalize">
                                            $249.00 MXN</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button type="button"
                            class="button button-outline button-raised button-active-gray px-3 py-2 text-left"
                            @click="updateProduct(3)">
                            <div class="row m-0 w-100 justify-content-between position-relative">
                                <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="mm" />
                                        </div>
                                    </div>
                                    <div class="col-auto mr-auto my-auto px-0 letra-gray3-19">Diamond</div>
                                    <div class="col-auto my-auto ml-auto px-0">
                                        <div
                                            class="row w-100 m-0 px-2 letra-gray3-20 justify-content-center text-center text-capitalize">
                                            $349.00 MXN</div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import { add } from 'lodash';

export default {
    components: {
        f7Page,
    },
    data() {
        return {
            currentProduct: 1 // Establece el producto inicial
        }
    },
    computed: {
        router() { return this.$store.getters.getRouter; },
        deve(){return this.$store.getters.deve;},
        session() { return this.$store.getters.getSession; },
        producto() { 
            return this.$store.getters.getCatalogo('productos').filter(w => w.id == this.currentProduct); 
        },
            
    },
    methods: {
        updateProduct(productId) {
            this.currentProduct = productId;
            this.add();
        },

        add(precio){
            console.log("producto",this.producto[0]);

                this.producto[0].cantidad = 1;
                //this.producto[0].precio = precio;
                //this.producto[0].price = precio;
                //this.producto[0].shipping_cost=0;
                //this.producto[0].name = 'Membresia';
                //this.producto[0].nombre = 'Membresia';
                //this.producto[0].subtotals =precio;
                //this.producto[0].total = precio; 
                this.producto[0].tipo = 'Membresia';

               let pp = this.$store.prodClone(this.producto[0]);
     
               console.log("SSSeeee",pp);

                let f = ()=>{
                    this.$store.commit('setCarritosState',['para_usuarios_id', null]);
                    this.$store.commit('setCarritosState',['listas_id', null]);
                }
                this.$store.commit('addProductoCarritoCallback',{ prod: pp, callback: f });
                this.router.navigate('/carrito');
            },

    }
}
</script>