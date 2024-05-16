<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Cambiar contraseña'"></nav-bar>
            <div class="contenedor-page padding-bottom-90 back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <!-- <div class="col-12 mt-3">
                        <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Contraseña anterior:</p>
                        <input type="password" class="regular-input w-100 m-0" placeholder="********" v-model="form.password_anterior">
                    </div> -->
                    <div class="col-12 mt-3">
                        <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Contraseña nueva:</p>
                        <input type="password" class="regular-input w-100 m-0" placeholder="********" v-model="form.password">
                    </div>
                    <div class="col-12 mt-3">
                        <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Confirmar contraseña</p>
                        <input type="password" class="regular-input w-100 m-0" placeholder="********" v-model="confirm_password">
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center mt-4">
                    <div class="col-12 px-4">
                        <botonApp tipo="azul" texto="Guardar" @click="save" radius="10px" />
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
                    password_anterior: null,
                    password: null,
                },
                confirm_password: null,
            } 
        },
        computed: {
        },
        mounted(){
        },
        methods:{
            save(){
                if(!this.confirm_password || !this.form.password){
                    swal("","Por favor llene todos los campos","info");
                    return;
                }
                if(this.form.password != this.confirm_password){
                    swal("", "Las contraseñas no coinciden","info");
                    return;
                }
                this.$store.dispatch('postChangePassword', this.form);
            }
          
        }
    }
</script>