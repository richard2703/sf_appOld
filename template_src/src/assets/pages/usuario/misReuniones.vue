<template>
    <f7-page class="" id="inicio">
    <modalParty v-if="info" :data="info" />

        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Mis Reuniones'" :right="true" icon="add" @right=" $store.commit('processRuteSession','/nuevo_evento_calendario')" />

             <div class="row w-100 m-0">
                <div class="row w-100 m-0 border-b-azul1-1 ">
                    <div class="col  px-0" @click="tab=1">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==1)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">Confirmados</div>
                    </div>
                    <div class="col  px-0" @click="tab=2">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==2)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">No confirmados</div>
                    </div>
                    <div class="col  px-0" @click="tab=3">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==3)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">Cancelados</div>
                    </div>
                </div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 scroll-y">

                    <div class="row w-100 m-0 scroll-y" v-if="tab == 1">

                        <div class="row w-100 m-0 scroll-y">
                            <div class="row w-100 m-0" v-for="a of misEventos " :key="a.id" @click="next(a)">
                                <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                                    <div class="w-18vw h-18vw my-auto" v-if="a.imagen">
                                        <imagen :fit="true" clase="border-radius-15px" :create="true" :src="a.imagen" />
                                    </div>
                                    <div class="w-18vw h-18vw my-auto" v-else >
                                        <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/img/b1.png" />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-17 text-capitalize">{{a.tipo}}</div>
                                        <div class="row w-100 m-0 letra-gray4-16">{{a.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.fecha">{{a.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.hora">{{[a.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 px-3 py-3" v-for=" f of aceptado " :key="f.id" >
                               <compReuRegalo :data="f" vista="misReuniones" @click="set(f)"/>
                            </div>

                        </div>
                    </div>

                    <div class="row w-100 m-0 scroll-y" v-show="tab==2" >
                        <div class="row w-100 m-0 px-3 py-3" v-for=" f of invitaciones " :key="f.id"  >
                            <compReuRegalo :data="f" vista="misReuniones" @click="set(f)" />
                        </div>
                    </div>

                    <div class="row w-100 m-0 scroll-y" v-if="tab==3">
                        <div class="row w-100 m-0" v-for="a of cancelados " :key="a.id" @click="next(a)">
                            <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                                <div class="w-18vw h-18vw my-auto" v-if="a.imagen">
                                    <imagen :fit="true" clase="border-radius-15px" :create="true" :src="a.imagen" />
                                </div>
                                <div class="w-18vw h-18vw my-auto" v-else >
                                    <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/img/b1.png" />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-17 text-capitalize">{{a.tipo}}</div>
                                    <div class="row w-100 m-0 letra-gray4-16">{{a.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.fecha">{{a.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.hora">{{[a.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <tabs />
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
                tab: 1,
                hoy: moment().format('YYYY-MM-DD'),
                info: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            misEventos(){return this.$store.getters.userStateArray('misEventos').filter(x=>{ return x.tipo == 'reunion' });},
            cancelados(){return this.misEventos.filter(x=>{ return x.estatus == '2' }); },
            
            invx(){return this.$store.getters.userStateArray('invitaciones').filter(x=>x.evento.tipo == 'reunion' );},

            invitaciones(){return this.$store.getters.userStateArray('invitaciones').filter( x=>{ return ( x.estatus == 'enviado' || x.estatus == 'rechazado' ) && x.evento.tipo == 'reunion' } );},
            aceptado(){return this.$store.getters.userStateArray('invitaciones').filter( x=>{ return x.estatus == 'aceptado' && x.evento.tipo == 'reunion' } );},

        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("AKLL INVEX", this.invx, this.invitaciones.length, this.aceptado.length)
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            eliminar(a){
                this.$store.dispatch('postEliminarEvento',a);
            },
            next(a){
                this.$store.commit('setUsuarioData',['evento', a.id]);
                this.router.navigate('/detalle_eventos');
            },
            set(f){
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },
        }
    }
</script>