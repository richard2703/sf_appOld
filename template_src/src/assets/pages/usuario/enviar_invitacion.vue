<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Enviar invitacion'" ></nav-bar>
            <div class="contenedor-page-tabs back-color-blanco position-relative">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="col-4 px-0 py-3">
                        <imagen clase="my-auto" :logo="true"  />
                    </div>
                </div>
                <div class="row w-100 m-0 mt-3 justify-content-center">
                    <div class="col-11">
                        <inputForm texto="Correo" type="email" placeholder="email@ejemplo.com" v-model="form.email" />
                    </div>
                    <div class="col-11 mt-4" @click="next()">
                        <botonApp texto="Enviar" tipo="azul" radius="30px" />
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
                    email: '',
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },
        methods:{
            next(){
                if(!this.form.email){
                    swal("Ingrese email para enviar la invitación", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postEnviarInvitacion',this.form);
            },
        }
    }
</script>