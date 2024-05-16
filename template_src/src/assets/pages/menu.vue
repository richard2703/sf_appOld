<template>
    <f7-page class="back-color-appazu">
        <div class="vista h-100 back-color-rojo1">
            <div class="contenedor-page back-color-rojo1 pb-10vh">
                <div class="row m-0 justify-content-center">
                    <div class="row w-100 m-0" v-if="session.token">
                        <div class="row w-100 m-0 justify-content-center">
                            <div class="w-100 h-30vh" @click="goTo('/mi_cuenta')">
                                <imagen clase="object-fit back-color-gray35" :perfil="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3 py-3 letra-blanco-19 back-color-gray6 justify-content-center  text-capitalize">{{session.nombre}}</div>
                    </div>
                    <template v-if="session.token">
                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="main('/inicio')" >
                            <div class="w-40px my-auto ml-2">
                                <!-- <imagen :icono="true" src="mfav" /> -->
                            </div>
                            <div class="col my-auto pl-2 pt-5px">
                                <div class="row m-0 w-100 letra-blanco-4-5vw">Apuestas</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/mis_apuestas')">
                            <div class="w-40px my-auto ml-2 px-5px">
                                <!-- <imagen :icono="true" src="bet" /> -->
                            </div>
                            <div class="col my-auto pl-2 pt-5px">
                                <div class="row m-0 w-100 letra-blanco-4-5vw" >Mis apuestas</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/datos_bancarios')">
                             <div class="w-40px my-auto ml-2 px-2px">
                                <!-- <imagen :icono="true" src="datos" /> -->
                            </div>
                            <div class="col my-auto pl-2 pt-5px">
                                <div class="row m-0 w-100 letra-blanco-4-5vw" >Datos bancarios</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/metodos_pago')">
                             <div class="w-40px my-auto ml-2 px-2px">
                                <!-- <imagen :icono="true" src="tarje" /> -->
                            </div>
                            <div class="col my-auto pl-2 pt-5px">
                                <div class="row m-0 w-100 letra-blanco-4-5vw" >Formas de pago</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/mi_cuenta')">
                            <div class="w-40px my-auto ml-2 px-2px">
                                <!-- <imagen :icono="true" src="muser" /> -->
                            </div>
                            <div class="col my-auto pl-2 pt-5px">
                                <div class="row m-0 w-100 letra-blanco-4-5vw">Mi perfil</div>
                            </div>
                        </div>
                    </template>
                    <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1">
                        <div class="w-40px my-auto ml-2 px-7px">
                            <!-- <imagen :icono="true" formato="png" src="mlog" /> -->
                        </div>
                        <div class="col my-auto pl-2 pt-5px">
                            <div class="row m-0 w-100 letra-blanco-4-5vw" @click="logout()">Cerrar sesión</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 mt-3 py-3">
                        <div class="row w-100 m-0 letra-blanco-18 justify-content-center py-2">V. {{vr}}</div>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
import g from '../js/general';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            vr(){return this.$store.getters.vr;},
            session(){return this.$store.getters.getSession;},
            saldo(){return this.$store.getters.enviosObject('saldo');},
        },
        methods:{
            main(ruta){
                this.router.back(ruta,{force:true});
                this.$f7.panel.close('left', true);
            },
            goTo(ruta){
                this.router.navigate(ruta);
                this.$f7.panel.close('left', true);
            },
            logout(){
                this.$f7.panel.close('left', true);
                this.$store.commit('logout');
            }
        }
    }
</script>