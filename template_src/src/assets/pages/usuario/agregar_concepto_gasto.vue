<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Nuevo concepto'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-3">
                            <inputForm type="text" texto="Concepto:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-3">
                            <inputForm type="number" texto="Costo:" placeholder="" v-model="form.precio" :maxlength="20" />
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="azul" texto="Agregar" radius="10px" @click="save" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                form:{
                    nombre: null,
                    precio: null,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            bancos(){return this.$store.getters.getCatalogo('bancos');},
        },
        methods:{
            save(){
                if(!this.form.nombre || !this.form.precio){
                    swal("","Ingresa concepto y precio","");
                    return;
                }
                this.$store.commit('addConcepto', this.form);
                this.router.back();
            },
          
        }
    }
</script>