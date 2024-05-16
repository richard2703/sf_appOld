<template>
    <f7-page id="inicio" >
        <buscarDireccion @resultado="resultado"/>
        <div class="vista" v-vistak >
            <nav-bar tipo="inicio" :backs="true" :title="'Nuevo domicilio'" />
            <div id="direccionnueva" class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 pt-2">
                    <div class="row w-100 m-0 h-50vh">
                        <mapaPick v-model="form"  @search="$store.commit('openModal',['modalDireccion'])" />
                    </div>
                </div>
                <div class="row w-100 m-0 px-3 py-2">
                    <div class="row w-100 m-0 py-2">
                        <div class="col px-0 letra-gray3-4-2vw">Ubicación</div>
                    </div>
                    <div class="row w-100 m-0 letra-gray38-4-1vw">
                        <div class="w-65 pl-0 pr-1 my-auto ">{{form.direccion}}</div>
                        <div class="w-35 pl-1 pr-0 my-auto ">
                            <inputForm type="text" :scroll="true" :offset="300" contendorId="direccionnueva" texto="Numero interior:" placeholder="123" v-model="form.numero_interior"  />
                        </div>
                    </div>
                    <div class="row w-100 m-0 py-2">
                        <inputForm type="text" :scroll="true" :offset="450" contendorId="direccionnueva" :textarea="true" rows="5" texto="Indicaciones:" placeholder="" v-model="form.indicaciones" />
                    </div>
                </div>
                <div class="row w-100 m-0 mt-3 pb-3 px-3">
                    <div class="col-12 px-1">
                        <botonApp tipo="azul" @click="next()" texto="Guardar" radius="10px" />
                    </div>
                </div>

                <div class="row w-100 m-0 py-5"></div>
                <div class="row w-100 m-0 py-3"></div>
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
                form: {
                    usuarios_id: this.$store.getters.getSession.id,
                    direccion: null,
                    numero_interior: null,
                    indicaciones: null,
                    lat: null,
                    lng: null,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },
        mounted(){
            this.$store.dispatch('synchronizeData');
        },
        methods:{
            next(){
                if(!this.form.direccion){
                    swal("","Debes ingresar una direccion","info");
                    return;
                }
                this.$store.dispatch('postSaveDireccion',this.form);
            },
            resultado(e){
                this.form.lat = e.geometry.location.lat();
                this.form.lng = e.geometry.location.lng();
                this.form.direccion = e.formatted_address;
                console.log("THIS FORM", this.form);
            }
        }
    }
</script>