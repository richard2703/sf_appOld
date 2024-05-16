<template>
    <div class="col-12 px-0 mt-4">
        <div class="row w-100 m-0 px-3 py-2 back-color-blanco " >
            <div class="row w-100 m-0 pb-2 pt-2">
                <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`" v-if="form.tipo=='reunion'">Invitados al evento</div>
                <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`" v-else>Amigos para {{ form.tipo=='party'?'el regalo grupal':form.tipo=='reunion'?'la reunión':'el evento'}}</div>
            </div>
            <div class="row w-100 m-0 border-b-gray1-1"  @click="updating('/agregar_usuarios_eventos')">
                <div class="col px-0 letra-gray3-18">Agregar amigos</div>
                <div class="col-auto px-0 letra-gray3-18">
                    <icono icono="add" clase="letra-gray3-25" />
                </div>
            </div>
            <div class="row w-100 m-0 pb-3">
                <div class="row w-100 m-0" v-for="a of usuariosForm" :key="a.id">
                    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                        <div class="row w-100 m-0">
                            <div class="w-10vw h-10vw my-auto ">
                                <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                                <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate(25) }}</div> -->
                            </div>
                            <div class="col-auto my-auto px-0 " v-if="form.tipo=='party'" @click="eliminar(a)">
                                <icono  clase="letra-gray3-30" icono="remove" />
                            </div>
                        </div>
                        <div class="row w-100 m-0" v-if="form.tipo=='reunion'">

                            <div class="col-auto my-auto px-0  " v-if="false" >
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 letra-gray3-10 justify-content-center text-center">Es para</div>
                                    <div class="row w-100 m-0">
                                        <boton-icono @click="a.propio = false" :noborder="true" icono="check_box" v-if="a.propio" />
                                        <boton-icono @click="a.propio = true" :noborder="true" icono="check_box_outline_blank" v-else />
                                    </div>
                                </div>
                            </div>

                            <div class="col-auto my-auto px-0 ml-auto " >
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 letra-gray3-10 justify-content-center text-center">Cooperación</div>
                                    <div class="row w-100 m-0">
                                        <boton-icono @click="a.cooperar = false" :noborder="true" icono="check_box" v-if="a.cooperar" />
                                        <boton-icono @click="cooperar(a,true)" :noborder="true" icono="check_box_outline_blank" v-else />
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto my-auto px-0 " @click="eliminar(a)" >
                                <icono clase="letra-gray3-30 pt-3" icono="cancel" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0" v-if="false" >
                <desgloceTotalCoopera />
            </div>
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
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }); },

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
                // console.log("UPDATING", this.form);
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

            cooperar(u,val){
                u.cooperar = val;
                this.form.cooperacion = 'si';
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
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