<template>
    <div class="col-12 px-0 mt-4">
        <div class="row w-100 m-0 px-3 py-2 back-color-blanco " >
            <div class="row w-100 m-0 pb-2 pt-2">
                <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`" v-if="form.tipo=='reunion'">Etiqueta partners</div>
                <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`" v-else>Etiqueta partners</div>
            </div>
            <div class="row w-100 m-0 border-b-gray1-1"  @click="updating('/agregar_partners_post')">
                <div class="col px-0 letra-gray3-18">Agregar partners</div>
                <div class="col-auto px-0 letra-gray3-18">
                    <icono icono="add" clase="letra-gray3-25" />
                </div>
            </div>
            <div class="row w-100 m-0 pb-3">
                <div class="row w-100 m-0" v-for="a of patnersForm" :key="a.id">
                    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                        <div class="row w-100 m-0">
                            <div class="w-10vw h-10vw my-auto ">
                                <imagen clase="border-radius-50" :src="a.imagen" :fit="true" :user="true" />
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-18">{{a.tradename}}</div>
                            </div>
                            <div class="col-auto my-auto px-0 " @click="eliminar(a)">
                                <icono  clase="letra-gray3-30" icono="remove" />
                            </div>
                        </div>
                    </div>
                </div>
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
            
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }); },

            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
            patnersForm(){return this.$store.getters.userStateArray('patnersForm');},

            nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},

            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
            listaRegalosForm(){return this.$store.getters.userStateArray('listaRegalosForm');},
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
                console.log("USUARIOS", this.patnersForm)
            },

            eliminar(a){
                this.$store.commit('removePartner',a.id);
            },
          
        }
    }
</script>