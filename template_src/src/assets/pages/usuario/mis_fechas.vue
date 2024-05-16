<template>
    <f7-page id="inicio" >

        <modal-mensaje 
            :texto="`¿Deseas eliminar esta fecha?`"
            :boton="'Aceptar'"
            @click="eliminar()"
        />

        <div class="vista position-relative"  >

            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','fechast')" class="w-45px h-45px border-radius-50 position-absolute bottom-9 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Mis Fechas'" :right="true" icon="add" @right="router.navigate('/nuevo_evento')" />
            <div id="fechast" class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0" v-for="a of misFechas " :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                            <div class="w-22vw h-22vw my-auto" v-if="a.imagen">
                                <imagen :fit="true" :create="true" clase="border-radius-15px" :src="a.imagen" />
                            </div>
                            <div class="w-22vw h-22vw my-auto" v-else>
                                <imagen :fit="true" clase="border-radius-15px" :default="true" />
                            </div>
                            <div class="col my-auto px-0 pl-3">
                               <div class="row w-100 m-0 letra-azul1-17">{{a.tipo.nombre}}</div>
                               <div class="row w-100 m-0 letra-gray4-16">{{a.nombre}}</div>
                               <div class="row w-100 m-0 letra-rojo2-15">{{a.repeticion}}</div>
                               <div class="row w-100 m-0 letra-gray3-15 text-capitalize">{{a.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                            </div>
                            <div class="col-auto px-0">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" editar(a) ">
                                        <icono icono="edit" clase="letra-azul1-20 pt-4px" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 pt-2" >
                                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" toEliminar(a) ">
                                        <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                                    </div>
                                </div>
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
                data: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            misFechas(){return this.$store.getters.userStateArray('misFechas');},
        },
        methods:{
            scroll(){
                $('#chatsd').animate({ scrollTop: 9999 }, 'slow');
            },
            set(id){
                console.log("SETTING",id);
                if(this.domicilio == id){
                    this.$store.commit('setCarritosState',['domicilio', null]);  
                }
                this.$store.commit('setCarritosState',['domicilio', id]);
                this.$store.dispatch('synchronizeData');
            },
            editar(a){
                this.$store.commit('setUsuarioData',['regalosForm', {a:[]}]);
                this.$store.commit('setUsuarioData',['fecha',a.id]);
                this.router.navigate('/editar_evento_fecha');
            },

            toEliminar(a){
                this.data = a;
                this.$store.commit('openM');
            },

            eliminar(){
                this.$store.dispatch('postEliminarFecha',this.data);
            },
            
        }
    }
</script>