<template>
    <f7-page id="mi_cuenta">
    <div class="vista">
        <nav-bar tipo="inicio" :backs="true" :title="'Perfil'"  />
        
        <div class="contenedor-page-tabs" >
            <div class="row w-100 m-0 pt-3 pb-1 justify-content-center">
                <div class="h-30vw w-30vw">
                    <imagen :clase="`object-fit border-radius-50 border-${per.nivel}-4 `" :fit="true" :user="true" :src="per.foto" alt="" />
                </div>
            </div>

            <div class="row w-100 m-0">
                <div class="row m-0 w-100 pt-1 pb-1 letra-gray4-20 fw-600 justify-content-center">{{per.nombre}}</div>
                <div class="row m-0 w-100 pb-1 letra-gray3-16  justify-content-center text-cneter " v-if="per.mi_codigo">
                    <div class="col-auto px-0">Codigo de referencia:</div> 
                    <div class="col-auto px-0 pl-2">{{per.mi_codigo}}</div> 
                    <div class="col-auto px-0 pl-2" @click="copy(per.mi_codigo)">
                        <icono icono="content_copy" clase="letra-gray3-30" />
                    </div> 
                    </div>
            </div>

            <div class="row w-100 m-0 pt-3">
                 <div class="col-6 px-2 ">
                    <div :class="`row w-100 m-0 back-color-${per.nivel} border-radius-10px`" >
                        <div :class="`row m-0 w-100 pt-1 pb-1 letra-blanco-20 fw-600 justify-content-center text-capitalize`">{{per.nivel}}</div>
                    </div>
                </div>
                <div class="col-6 px-2 ">
                    <div class="row w-100 m-0 back-color-azul1 border-radius-10px">
                        <div class="row m-0 w-100 py-5px letra-blanco-17 justify-content-center">Puntos: {{per.puntos  |   currency({
                                                                                                                    symbol: '',
                                                                                                                    thousandsSeparator: ',',
                                                                                                                    fractionCount: '1',
                                                                                                                    fractionSeparator: '.',
                                                                                                                    symbolPosition: '',
                                                                                                                    symbolSpacing: '',
                                                                                                                    avoidEmptyDecimals: 0,
                                                                                                                    }) }} pts</div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 py-2">
                <div class="col-6 px-2 ">
                    <div class="row m-0 w-100 py-5px border-radius-10px back-color-azul1 letra-blanco-17 justify-content-center">Amigos: {{per.totalAmigos}} </div>
                </div>
                <div class="col-6 px-2 ">
                    <div class="row w-100 m-0 border-radius-10px back-color-azul1">
                        <div class="row w-100 m-0 py-5px my-auto letra-blanco-17 justify-content-center text-center ">Amigos en común: {{amigosComun.length}}</div>
                    </div>
                </div>
            </div>
           
            <div class="row w-100 m-0 pt-3 px-3" v-if="amigosComun.length">
                <div class="row w-100 m-0 "  >
                    <div class="col px-0 letra-gray4-18 fw-600">Amigos en común</div>
                    <!-- <div class="col-auto px-0 letra-azul1-22 fw-600">{{amigosComun.length}}</div> -->
                </div>
                <div class="row w-100 m-0 pt-2 justify-content-center">
                    <div class="w-33 mt-2"  v-for="a of amigosComun" :key="a.id" @click.stop="$store.verPerfil({id: a.id})" >
                        <div class="row w-100 m-0">
                            <div class="w-15vw h-15vw mx-auto">
                                <imagen clase="object-fit border-radius-50 " :fit="true" :user="true" :create="true" :src="a.foto" alt="" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 letra-gray3-15 text-center justify-content-center">{{a.nombre}}</div>
                    </div>
                    <div class="w-33"></div>
                    <div class="w-33"></div>
                </div>
            </div>

            <div class="row w-100 m-0 pt-3 ">
                <div class="row w-100 m-0 px-3">
                    <div class="col px-0 letra-gray4-18 fw-600">Actividad reciente</div>
                    <!-- <div class="col-auto px-0 letra-azul1-22 fw-600">{{amigosComun.length}}</div> -->
                </div>
                <div class="row w-100 m-0 pt-2 justify-content-center">
                    <div class="row w-100 m-0" v-for="f of general" :key="f.id" >
                        <rowActividadUsuario  
                            :data="f" :perfil="per" 
                            @verDeseosLista="verDeseosLista" 
                            @verDeseosFecha="verDeseosFecha" 
                        />
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
const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                zona: moment.tz.guess(),
                
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            id(){return this.$store.getters.getRouter.currentRoute.params.id },
            per(){return this.$store.getters.userStateFindById('usuarios', this.id ) || {} },
            amigo(){return this.$store.getters.userStateArray('amigos').find(s=>s.amigos_id == this.id || s.usuarios_id == this.id ); },

            amigos(){return this.$store.getters.userStateArray('amigos').filter(s=>s.estatus =='aceptado' );},
            amigosComun(){return (this.per.amigos || []).filter(x=>{return this.amigos.some(w=>w.usuario.id == x.id)}) || []},

            misEventos(){return this.per.misEventos || [] },
            misFechas(){return this.per.misFechas || [] },
            misListas(){return this.per.misListas || [] },
            
            general(){
                let a = [];

                // this.solicitudes.map(x=>{
                //     let y = moment.tz(x.modificado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('s'), tipo: 's', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                // });

                // this.cobros.filter(x=>{return x.evento.tipo == 'party'}).map(x=>{
                //     let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('y'), tipo: '2', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                // });

                this.misFechas.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('q'), tipo: '3', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('q'), tipo: '3', creado: x.creado, data: x });
                });

                this.misEventos.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '4', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '4', creado: x.creado, data: x });
                });

                this.misListas.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '5', creado: x.creado, data: x });
                });

                // this.regalosAmigos.map(x=>{
                //     let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('r'), tipo: '7', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                // });

                return _.orderBy(a, ['creado'], ['desc']);
            }, 
        },
        mounted(){
            console.log("ASASAS", this.id, this.$store.getters.getRouter, this.$store.getters.getRouter.currentRoute );
            this.$store.dispatch('synchronizeData');
        },
        methods:{
            goTo(ruta){
                this.router.navigate(ruta);
            },
            copy(code){
                console.log("COPING");
                navigator.clipboard.writeText(code);
            },
            registra(){
                this.$store.dispatch('openBrowser', 'https://socialflow.app');
            },
            openBrowser(url){
                this.$store.dispatch('openBrowser',url);
            },

            verDeseosLista(e){
                console.log("AMIGOS AMIGOS", this.id, this.amigo, e);
                if(this.amigo && this.amigo.id){
                    this.$store.commit('setUsuarioData', ['amigo', this.amigo.id]);
                    this.$store.commit('setUsuarioData', ['detalle',e.id]);
                    this.router.navigate('/deseos_amigo');
                }else{
                    swal("","Hubo un error con este usuario","");
                }
            },

            verDeseosFecha(e){
                this.$store.dispatch('verDeseosFecha', [e]);
            },

        }
    }
</script>