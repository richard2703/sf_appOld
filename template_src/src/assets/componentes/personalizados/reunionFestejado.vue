<template>
    <div class="row w-100 m-0 mt-3 pt-2 pb-3 back-color-blanco " v-if="form.tipo == 'party'" >
        <div class="row w-100 m-0" >
            <div class="row w-100 m-0 px-3">
                <div class="row w-100 m-0 letra-azul1-19 fw-800">Personas</div>
            </div>
            <template >
                <div class="row w-100 m-0 px-3 py-2" >
                    <div class="col-12 px-0 pb-1 letra-gray3-16">¿Para quien es el regalo grupal?</div>
                    <div class="col-12 px-0 pt-2">
                        <div class="row w-100 m-0">
                            <div class="col px-0" @click=" saveForm('externo', 'no') " >
                                <div class="row w-100 m-0">
                                    <div class="col-auto my-auto px-0">
                                        <icono icono="radio_button_checked" clase="letra-azul-30" v-if="form.externo == 'no'" />
                                        <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                    </div>
                                    <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">Para mi</div>
                                </div>
                            </div>
                            <div class="col px-0" @click=" saveForm('externo', 'si') ">
                                <div class="row w-100 m-0">
                                    <div class="col-auto my-auto px-0">
                                        <icono icono="radio_button_checked" clase="letra-azul-30" v-if="form.externo == 'si'" />
                                        <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                    </div>
                                    <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">Para alguien mas</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-3" v-if="form.externo == 'si'" >
                    <div class="row w-100 m-0 pb-2">
                        <div class="row w-100 m-0 mt-2 border-t-gray0-1 " v-if="!nuevoEventoForm.para_usuarios_id" @click="updating('/selecionar_usuario_evento')" >
                            <div class="row w-100 m-0 py-1 pt-3">
                                <div class="col my-auto px-0 letra-gray3-16 ">Si el destinatario de esta Regalo grupal es usuario Social Flow agregalo aqui.</div>
                                <div class="col-auto my-auto px-0">
                                    <icono icono="chevron_right" clase="letra-gray3-35 pt-5px" />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 mt-2 border-t-gray0-1 " v-else @click="updating('/selecionar_usuario_evento')" >
                            <div class="row w-100 m-0 py-1">
                                <div class="w-15vw h-15vw">
                                    <imagen clase="border-radius-50" :src="usuario.foto" :fit="true" :user="true" />
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-18">{{usuario.nombre}}</div>
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{usuario.email | truncate('30') }}</div> -->
                                    <!-- <div class="row w-100 m-0 pt-2 letra-azul1-16 justify-content-center" @click.stop="ver()" >Ver wishlist</div> -->
                                </div>
                                <div class="col-auto my-auto px-0" @click.stop=" saveForm('para_usuarios_id', null ) ">
                                    <icono icono="cancel" clase="letra-azul1-35 pt-5px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>      
    </div>      
</template>
                     
<script>

import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                hoy: moment().format('YYYY-MM-DD'),
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            
            lugares(){return this.$store.getters.userStateArray('lugares');},
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }) || {}; },

            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
            nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
            listaRegalosForm(){return this.$store.getters.userStateArray('listaRegalosForm');},

            domicilios(){return this.$store.getters.carritoArray('domicilios');},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},

            cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},

            total(){return (a)=>{ let x = 0; a.map(y=>{x = x + Number(y.precio)}); return x; } },
            totalCantidad(){return (a)=>{ 
                    let x = 0; 
                    a.map(y=>{ 
                        if(y.currency == 'USD'){
                            x = x + ((Number(y.precio) * Number(y.cantidad)) *this.cambioUSD);
                        }
                        else{
                            x = x + (Number(y.precio) * Number(y.cantidad));
                        }
                    }); 
                    return x; 
            }},
        },
        mounted() {
            console.log("######## FORM", this.form);
        },
        methods:{

            saveForm(key,val){
                this.form[key] = val;
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
            },

            updating(ruta){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                if(ruta){
                    this.router.navigate(ruta);
                }
            },

            ver(){
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.router.navigate('/deseos_usuario_evento');
            },

            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
            },

            addX(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'lista']);
                this.router.navigate('/regalos_eventos'); 
            },

            addY(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'wish']);
                this.router.navigate('/mis_deseos_eventos'); 
            },

            addW(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'amenidad']);
                this.router.navigate('/regalos_eventos'); 
            },

            eliminar(a){
                this.$store.commit('removeUser',a.id);
            },

            delConcepto(a){
                this.$store.commit('removeConcepto',a);
            },

            eliminarProd(a){
                this.$store.commit('removeRegalo',a.id);
            },
          
        }
    }
</script>