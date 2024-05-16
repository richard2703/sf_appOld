<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Notificaciones'"></nav-bar>
            <div class="contenedor-page padding-bottom-90 back-color-blanco">
                <div class="row w-100 m-0 mt-3 px-2">
                    <div class="row w-100 m-0 py-2 justify-content-center">
                        <div class="col-10 my-auto px-1 py-2">
                            <inputForm type="tel" texto="Id del usuario:" placeholder="Nombre" v-model="form.id" />
                        </div>
                        <div class="col-10 my-auto px-1 py-2">
                            <inputForm type="text" texto="Texto:" placeholder="Nombre" v-model="form.texto" />
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center mt-2">
                    <div class="col-10 py-2">
                        <boton-app texto="Enviar" radius="35px" @click="save"></boton-app>
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
                    id: null,
                    texto: null,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            categorias(){return this.$store.getters.afiliadoStateArray('categorias');}
        },
        methods:{
            save(){
                this.$store.dispatch('postPushPrueba', this.form);
            }
          
        }
    }
</script>