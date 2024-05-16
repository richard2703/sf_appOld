<template>
    <f7-page id="inicio">
        <div class="vista h-99vh">
        <div class="contenedor-page-tabs back-color-blanco position-relative">
            <div class="row w-100 m-0 justify-content-start pt-4">
            </div>
            <div class="row w-100 m-0 justify-content-center pt-ios-20px ">
                <div class="col-5 px-0 pt-3">
                    <imagen clase="my-auto" :logo="true"  />
                </div>
            </div>
            <div class="row w-100 m-0 mt-3 pt-ios-20px justify-content-center">
                <div class="col-11">
                    <inputForm texto="Correo" type="email" placeholder="email@ejemplo.com" v-model="form.email" />
                </div>
                <div class="col-11 mt-4">
                    <inputForm texto="Contraseña" :password="true" type="password" placeholder="********" v-model="form.password" @enter="login" />
                </div>
                <div class="col-11 mt-3 letra-azul1-4-1vw text-center" @click="router.navigate('/recuperar_password')">¿Olvidaste tu contraseña?</div>
                <div class="col-11 mt-4 pt-ios-20px " @click="login()">
                   <botonApp texto="Entrar" tipo="azul" radius="30px" />
                </div>
                <div class="col-11 mt-4 " @click="entrar()">
                   <botonApp texto="Explorar" tipo="gris" radius="30px" />
                </div>
            </div>
            <div class="row w-100 m-0 pt-ios-30px justify-content-center mt-1">
                <div class="col-12 mt-3 text-center">
                  <p class="letra-gray3-14" @click="router.navigate('/registro')">¿AÚN NO TIENES UNA CUENTA? <span class="letra-azul1-14">REGÍSTRATE</span></p>
                </div>

                <div class="col-12 mt-4 text-center" @click="open()">
                  <p class="letra-gray3-14 text-uppercase" >¿Quieres convertirte en partner para vender por SocialFlow ®?<span class="letra-azul1-14 pl-1">Registra tu negocio.</span></p>
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
                    password: '',
                },
                afiliado:{
                    email: 'jesus@sustam.com',
                    password: 'sustam',
                },
                estudio:{
                    email: 'sara@sustam.com',
                    password: 'sustam',
                },
                usuario:{
                    email: 'daniel@sustam.com',
                    password: '123456',
                }
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },

        beforeMount(){
            console.log("LOGENADO",this.session.token);
            if(this.session.token){
                this.$store.commit('changeViewByTipe');
            }
        },

        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        
        methods:{
            back(){
                this.router.back('/slider_home',{force:true});
            },
            open(){
                this.$store.dispatch('openBrowser', 'https://socialflow.app');
            },
            entrar(){
               this.$store.commit('changeView','usuario');
            },
            login(){
                if(!this.form.email || !this.form.password){
                    swal("Ingrese email y contraseña", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postLogin',[this.form]);
            },
            enter(f){
                this.$store.dispatch('postLogin',[f]);
            }
          
        }
    }
</script>