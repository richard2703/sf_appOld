<template>
    <f7-page id="inicio">
        <nav-bar tipo="inicio" :backs="true" :no_border="false" />
        <div class="contenedor-page back-color-blanco">
            <div class="row w-100 m-0 justify-content-center mt-3 pt-4">
                <div class="col-6">
                    <imagen clase="my-auto" :logo="true"  />
                </div>
            </div>
            <div class="row w-100 m-0 mt-3">
                <div class="col-12 letra-gray-light-4-4vw mb-3 pl-3 text-center">Ingresa tu correo y te enviaremos las indicaciones para recuperar tu contraseña</div>
                <div class="col-12 my-auto">
                    <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Correo</p>
                    <input type="email" class="regular-input w-100 m-0" placeholder="email@ejemplo.com" v-model="form.email">
                </div>
            </div>
            <div class="row w-100 m-0 justify-content-center mt-5 pt-2">
                <div class="col-12">
                    <boton-app @click="post()" tipo="azul" texto="Enviar" radius="10px"></boton-app>
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
                    email: '',
                }
            } 
        },
        computed: {
            session(){return this.$store.getters.getSession;}
        },
        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{

            post(){
                if(!this.form.email){
                    swal("Ingresa un email", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postrecoverPassword',[this.form]);
            }
          
        }
    }
</script>