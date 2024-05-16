<template>
    <f7-page class="" id="inicio">
        <modalEventoCreador />

        <modalParty 
            v-if="info" 
            :data="info"
            @cancel="preCancelarRegalo()"
        />

        <modal-mensaje 
            v-if="t==2"
            :texto="`Cancelar tu cooperación en el Regalo Grupal, eliminará tu participación y recalculará el monto entre los usuarios que aceptaron ¿Estas seguro de cancelar?`"
            :boton="'Cancelar'"
            colorC="azul"
            colorA="gris"
            :cancelBoton="'No cancelar'"
            @click="cancelarRegalo()"
        />

        <div  class="vista">
            <template v-if="tab == 1" >
                <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />
                <!-- <nav-bar tipo="init2" :backs="false" :logo="true" :profile="true" :chat="true" :right="false" icon="add" @right=" nuevo()" /> -->

                <div class="contenedor-page-tabs back-color-blanco">
                    <div class="row w-100 m-0">

                        <div v-if="montado" class="row w-100 m-0">
                            <div class="row w-100 m-0">
                                <calendarioVertical v-model="hoy" @input="tab = 2" :data="eventos" :datax="invitaciones"  />
                            </div>
                        </div>

                        <!-- <div class="row w-100 m-0">
                            <div class="row w-100 m-0" v-if="(misEventos && misEventos.length) || (filtrado && filtrado.length)">
                                <div class="row w-100 m-0" @click="next(a)" v-for="a of misEventos " :key="a.id">
                                    <eventosRow :data="a" />
                                </div>
                                <div class="row w-100 m-0" v-for="a of filtrado " :key="`x_${a.id}`">
                                    <eventosRow :externo="true" :data="a" @set="setx" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3" v-if="0">
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 px-3 letra-gray3-17 text-center justify-content-center">Da click al boton azul superior para crear reunión o regalo grupal.</div>
                                </div>
                            </div>
                        </div> -->

                    </div>
                    <div class="row w-100 m-0 py-4"></div>
                    <div class="row w-100 m-0 py-4"></div>
                </div>

                <div class="row w-100 m-0 position-absolute bottom-14 ios-bottom-18 left-0px z-10000000 " >
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 back-color-rojo border-radius-30px" @click="nuevo()">
                            <div class="row w-100 m-0 letra-blanco-18 justify-content-center text-center py-2px">
                                <div class="col-auto px-0 my-auto">Crear reunión o regalo grupal</div>
                                <div class="col-auto px-0 pl-2 my-auto">
                                    <icono clase="letra-blanco-35 pt-5px" icono="add" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <tabs />
            </template>
            
            <template v-if="tab == 2" >
                <nav-bar tipo="inicio" :emitBack="true" @back_click="tab = 1" :title="'Eventos'" />

                <div class="contenedor-page-tabs back-color-blanco">
                    <div class="row w-100 m-0">

                        <div class="row w-100 m-0 pt-4">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0">
                                    <div class="col my-auto px-0 text-center letra-rojo-21 fw-800 text-capitalize">{{set('MMMM YYYY')}}</div>
                                </div>
                            </div>
                        </div>

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0" v-if="(misEventos && misEventos.length) || (filtrado && filtrado.length)">
                                <div class="row w-100 m-0" @click="next(a)" v-for="a of misEventos " :key="a.id">
                                    <eventosRow :data="a" />
                                </div>
                                <div class="row w-100 m-0" v-for="a of filtrado " :key="`x_${a.id}`">
                                    <eventosRow :externo="true" :data="a" @set="setx" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3 py-4" v-else >
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 px-3 letra-gray3-17 text-center justify-content-center">No tienes eventos registrados este mes</div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

              
            </template>

        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                tab:    1,
                info: null,
                t: 1,
                hoy:    moment().format('YYYY-MM-DD'),
                montado: 0,
            } 
        },

        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            eventos(){return this.$store.getters.userStateArray('misEventos'); },
            misEventos(){return this.$store.getters.userStateArray('misEventos').filter(x=>{return moment(x.fecha,'YYYY-MM-DD').format('YYYY-MM') == moment(this.hoy,'YYYY-MM-DD').format('YYYY-MM') });},
            invitaciones(){return this.$store.getters.userStateArray('invitaciones');},
            filtrado(){ return this.invitaciones.filter(x=>{return moment(x.evento.fecha,'YYYY-MM-DD').format('YYYY-MM') == moment(this.hoy,'YYYY-MM-DD').format('YYYY-MM')}); }
        },

        mounted(){
            // this.$store.dispatch('initData', [this.$f7]);
            setTimeout(()=>{
                this.montado = 1;
            },1000*0.3)
            // console.log("EVENTOS MOUNTED");
        },

        methods:{
            set(f){
                return moment(this.hoy, 'YYYY-MM-DD').format(f);
            },

            setx(f){ 
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },

            preCancelarRegalo(){
                this.t = 2;
                this.$store.commit('openModal',['modalMensaje']);
            },

            cancelarRegalo(){
                this.$store.dispatch('postActulizarCobro', [this.info.evento, 0]);
            },

            go(ruta){
                this.router.navigate(ruta);
            },
            next(a){
                this.$store.commit('setUsuarioData',['evento', a.id]);
                this.$store.commit('openModal', ['modalEventoCreador']);
                // this.router.navigate('/detalle_eventos');
            },
            nuevo(){
                this.$store.commit('cleanForm', [this.hoy]);
                this.$store.commit('processRuteSession','/nuevo_evento_calendario')
            }
        }
    }
</script>