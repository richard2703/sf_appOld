<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Agregar producto'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 text-center pt-2 mb-3 position-relative">
                            <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                                <uploadImagen class="back-color-azul1" :user="false" v-model="form.imagen" />
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Nombre del producto:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" texto="Precio:" placeholder="" v-model="form.precio" :maxlength="10" />
                        </div>
                    </div>
                </div>


                <div class="row w-100 m-0 justify-content-center mt-4 pb-5 px-2">
                    <div class="col-12 py-2">
                        <botonApp tipo="azul" texto="Guardar" radius="30px" @click="save" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
const moment = require('moment')

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'feminino', nombre: 'Feminino'},
                ],
                form:{
                    nombre:     null,
                    precio:   null,
                    imagen:   null,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            tipos_fechas(){return this.$store.getters.getCatalogo('tipos_fechas');},
            repeticiones(){return this.$store.getters.getCatalogo('repeticiones');},
        },
        methods:{
            save(){
                if(!this.form.nombre || !this.form.precio){
                    swal("","Por favor ingresa el nombre y precio del producto","");
                    return;
                }
                this.$store.dispatch('postGuardarProducto',this.form);
            }
          
        }
    }
</script>