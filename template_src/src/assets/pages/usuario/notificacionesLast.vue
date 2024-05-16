<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />
        <modalParty v-if="info" :data="info" />
        <modalRegalo v-if="info" :data="info" />
        <modalFechaUsuario v-if="info" :data="info" />

        <modalPost 
            v-if="newPost"
            :show="newPost==2"
            :post="post"
            @close="newPost = false"
        />

        <modalEventoCreador />

        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Notificaciones'"/>

            <div v-if="0" class="row w-100 m-0">
                <div class="row w-100 m-0 border-b-azul1-1 ">
                    <div class="col  px-0" @click="tab=1">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==1)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">No leidas</div>
                    </div>
                    <div class="col  px-0" @click="tab=2">
                        <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==2)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">leidas</div>
                    </div>
                </div>
            </div>
            
            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 px-3 pt-3" v-if="!paginado || !paginado.length" >
                    <div class="row w-100 m-0 px-3 letra-gray4-22 justify-content-center text-center ">No hay notificaciones</div>
                </div>

                <div class="row w-100 m-0">

                <div class="row w-100 m-0 " v-for=" f of general " :key="f.id">
                    <notificacionesComponent :tab="tab" :data="f" @info="setI" v-model="post" @ver="newPost=2" />
                </div>

                <!-- <div class="row w-100 m-0 pt-4">
                    <div class="row w-100 m-0">
                        <div class="col-8 px-0 mx-auto" v-if="c < general.length" @click="c += add">
                            <botonApp texto="Ver mas" tipo="azul" radius="30px" />
                        </div>
                    </div>
                </div> -->
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
                tab: 1,
                newPost: null,
                post: {},
                info: null,
                c: 15,
                add: 5,
                zona: moment.tz.guess(),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            fechas(){return this.$store.getters.userStateArray('fechas');},
            filtrado(){ return this.fechas.filter(x=>{return this.amigos.find(y=>{return y.usuarios_id == x.usuarios_id || y.amigos_id == x.usuarios_id }) != undefined }); },

            fechasAmigos(){return this.$store.getters.userStateArray('fechasAmigos');},
            listasAmigos(){return this.$store.getters.userStateArray('listasAmigos').filter(x=>{ return x.tipo != 'Privada' });},
            misListas(){return this.$store.getters.userStateArray('misListas');},


            amigos(){return this.$store.getters.userStateArray('amigos').filter(x=>{return x.estatus == 'aceptado'});},

            eventos(){return this.$store.getters.userStateArray('misEventos'); },
            invitaciones(){return this.$store.getters.userStateArray('invitaciones');},
            cobros(){return this.invitaciones.filter(x=>{ return x.cobro && x.cobro.id });},
            misFechas(){return this.$store.getters.userStateArray('misFechas');},
            regalosAmigos(){return this.$store.getters.userStateArray('regalosAmigos');},
            notificaciones(){return this.$store.getters.getCatalogo('notificaciones');},
            postEtiquetas(){return this.$store.getters.userStateArray('postEtiquetas');},


            solicitudes(){return this.$store.getters.userStateArray('amigos').filter(s=>{return (s.estatus == 'enviado' && s.amigos_id == this.session.id) || (s.estatus == 'aceptado' && s.usuarios_id == this.session.id) });},

            general(){
                let a = [];

                this.$store.getters.userStateArray('amigos').filter(s=>{return (s.estatus == 'enviado' && s.amigos_id == this.session.id) || (s.estatus == 'aceptado' && s.usuarios_id == this.session.id) }).map(x=>{
                    let y = moment.tz(x.modificado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('s'), tipo: 's', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('invitaciones').filter(x=>{ return x.cobro && x.cobro.id }).filter(x=>{return x.evento.tipo == 'party'}).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('y'), tipo: '2', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('fechasAmigos').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('q'), tipo: '3', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('q'), tipo: '3', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('invitaciones').filter(x=>{return x.evento.tipo == 'reunion'}).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '4', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '4', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('listasAmigos').filter(x=>{ return x.tipo != 'Privada' }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '5', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('regalosAmigos').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('r'), tipo: '7', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });
                
                this.$store.getters.getCatalogo('notificaciones').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('nt'), tipo: '8', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('postEtiquetas').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('pe'), tipo: '9', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('inivtacionesRechazadas').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('ir'), tipo: '10', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('historial').map(x=>{
                    let y = moment.tz(x.created,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('his'), tipo: 'historialcompras', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.commit('catalogoXcontarNotificaciones', _.orderBy(a, ['creado'], ['desc']));
                return _.orderBy(a, ['creado'], ['desc']);
            },
            
            paginado(){
                return this.general.filter((x,y) => {return y <= this.c});
            }
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("NOTIFICACIONES···············", this.$store.getters.userStateArray('listasAmigos'),  this.general);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            setI(x){
                this.info = x;
            },
            verRegalo(e){
                this.info = e;
                this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', e.id]);
                this.$store.commit('openModal',['modalRegalo']);
            },
            verEvento(e){
                this.$store.commit('setUsuarioData',['evento', e.id]);
                this.router.navigate('/detalle_eventos');
            },

            set(f){
                this.info = f;
                this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.id]);
                this.$store.commit('openModal', ['modalParty']);
            },

            verDeseos(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.router.navigate('/deseos_amigos');
            },
            verDeseosFecha(e){
                this.$store.commit('setUsuarioData', ['amigo',e.id]);
                this.router.navigate('/deseos_fechas_amigos');
            },
            verDeseosLista(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.$store.commit('setUsuarioData', ['detalle',e.id]);
                this.router.navigate('/deseos_amigo');
            },
            reportar(){
                this.$store.commit('openModal',['modalMensaje']);
            },
            toreportar(){
                swal("","Contenido reportado","success");
            },
            editarF(a){
                this.$store.commit('setUsuarioData',['fecha',a.id]);
                this.router.navigate('/editar_evento_fecha');
            },
            editarD(a){
                this.$store.commit('setUsuarioData',['lista',a.id]);
                this.$store.commit('setUsuarioData',['type',a.type]);
                console.log("TIPE", a.type);
                this.router.navigate('/detalle_lista');
            },
            
        }
    }
</script>