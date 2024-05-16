<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','solicitu456')" class="w-45px h-45px border-radius-50 position-absolute bottom-6 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Solicitudes de amistad'" ></nav-bar>

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 border-b-azul1-1">
                    <div class="col-6 px-0" @click="tab = 1" >
                        <div class="row w-100 m-0 justify-content-center py-2" :class="(tab==1?'letra-blanco-18 back-color-azul1':'letra-azul1-18 back-color-blanco')">Recibidas</div>
                    </div>
                    <div class="col-6 px-0" @click="tab = 2">
                        <div class="row w-100 m-0 justify-content-center py-2" :class="(tab==2?'letra-blanco-18 back-color-azul1':'letra-azul1-18 back-color-blanco')">Enviadas</div>
                    </div>
                </div>
            </div>


            <div id="solicitu456" class="contenedor-page">
               <div class="row w-100 m-0">

                   <div class="row w-100 m-0 px-3 py-4" v-if=" !filtrado || !filtrado.length ">
                       <div v-if="tab==1" class="row w-100 m-0 letra-gray3-18 justify-content-center text-center ">En este momento no tienes ninguna solicitud de amistad recibida.</div>
                       <div v-if="tab==2" class="row w-100 m-0 letra-gray3-18 justify-content-center text-center ">No tienes solicitudes de amistad enviadas.</div>
                   </div>
                   
                   <div class="row w-100 m-0" v-for="a of filtrado" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" @click="$store.verPerfil({ id: a.usuario.id })" >
                           <div class="w-15vw h-15vw my-auto">
                               <imagen clase="border-radius-50" :src="a.usuario.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-3">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.usuario.nombre}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email}}</div> -->
                               <div class="row w-100 m-0 letra-gray3-16">{{[a.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YYYY') }}</div>
                            </div>
                            <div class="col-auto my-auto px-0" v-if=" a.amigos_id == session.id ">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-verde py-1 justify-content-center text-center" @click=" send(a,'aceptado') ">
                                        <icono icono="done" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 pt-2" >
                                    <div class="w-50px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click=" send(a,'rechazado') ">
                                        <icono icono="clear" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 my-auto px-0" v-if=" a.usuarios_id == session.id ">
                                <div class="row w-100 m-0 letra-gray3-13 text-center justify-content-center ">Pendiente de autorización</div>
                            </div>
                       </div>
                   </div>
               </div>
                
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                tab:1
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            amigos(){return this.$store.getters.userStateArray('amigos');},
            // filtrado(){return this.amigos.filter(x=>{return x.estatus == 'enviado'}).filter(y=>{return y.amigos_id == this.session.id}); },
            filtrado(){return this.amigos.filter(x=>{return x.estatus == 'enviado'}).filter(s=>{
                    if(this.tab==1){
                        return s.amigos_id == this.session.id;
                    }
                    return s.usuarios_id == this.session.id;
                }) 
            },
        },
        methods:{
            send(a,s){
                this.$store.dispatch('postActulizarSolicitudAmistad',[a,s]);
            },
        }
    }
</script>