<template>
    <f7-page id="inicio">
        <nav-bar tipo="inicio" :backs="true" :title="'Relaciona tu cuenta'" />
        <div class="contenedor-page back-color-blanco">
            <div class="row w-100 m-0 justify-content-center mt-3 pt-4">
                <div class="col-4">
                    <imagen clase="my-auto" :logo="true"  />
                </div>
            </div>
            <template v-if="session.correo_codigo_partner == '0'" >
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 letra-gray-light-18 mb-3 pl-3 text-center">Relaciona un negocio a tu cuenta.</div>
                    <div class="col-12 letra-gray-light-16 mb-3 pl-3 text-center">Ingresa el correo con el que registraste tu negocio y recibiras un codigo para validarlo</div>
                    <div class="col-12 my-auto">
                        <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Correo</p>
                        <input type="email" class="regular-input w-100 m-0" placeholder="email@ejemplo.com" v-model="form.email">
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center mt-5 pt-2">
                    <div class="col-12">
                        <botonApp @click="post()" tipo="azul" texto="Enviar" radius="10px" />
                    </div>
                </div>
            </template>
            <template v-if="session.correo_codigo_partner == '1'" >
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 letra-gray-light-18 mb-3 pl-3 text-center">Relaciona un negocio a tu cuenta.</div>
                    <div class="col-12 letra-gray-light-16 mb-3 pl-3 text-center">Ingresa el codigo enviado</div>
                    <div class="col-12 my-auto">
                        <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Codigo</p>
                        <input type="text" class="regular-input w-100 m-0" placeholder="" v-model="form.codigo">
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center mt-5 pt-2">
                    <div class="col-12">
                        <botonApp @click="send()" tipo="azul" texto="Enviar" radius="10px" />
                    </div>
                </div>
            </template>
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
                    codigo: '',
                }
            } 
        },
        computed: {
            session(){return this.$store.getters.getSession;}
        },
        methods:{
            post(){
                if(!this.form.email){
                    swal("Ingresa un email", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postRelaciona',[this.form]);
            },
            send(){
                if(!this.form.codigo){
                    swal("Ingresa el codigo", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postSendCode',[this.form]);
            },
          
        }
    }
</script>