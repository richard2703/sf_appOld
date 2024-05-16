<template>
    <f7-page >

    <modalmensajeA
        :texto="`¿Deseas bloquear a este usuario?`"
        :boton="'Bloquear'"
        colorC="azul"
        colorA="gris"
        :cancelBoton="'Cancelar'"
        @click="bloquearUsuario"
    />

    <div class="vista">

        <div class="w-45px h-45px border-radius-50 position-absolute bottom-12 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 " @click="scroll()">
            <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
        </div>

        <nav-bar tipo="inicio" :backs="true" :title="'Mensajes'" :right="true" icon="add" @right="goTo('/mensajear_amigo')" />

        <div class="row w-100 m-0">
            <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                <busquedaInput v-model="b" />
            </div>
        </div>

        <div class="contenedor-page" v-if="!chats.length && !b">
            <div class="row m-0 mt-5 w-100 justify-content-center">
                <div class="col-10 mt-3 letra-gray-dark-25 text-center">No tienes mensajes</div>
            </div>
        </div>

        <div id="chatsd" class="contenedor-page" v-else>
            <div class="row w-100 m-0 back-color-blanco">

                <template>
                    <div class="row w-100 m-0" v-for="a of busquedaAmi" :key="a.id" >
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1 "  >

                        <div class="row w-100 m-0" v-if="a.usuario && a.usuario.id" @click="tochat(a.usuario.id)" >
                            <div class="w-17vw h-17vw">
                                <imagen :clase="`border-radius-50 border-${a.nivel}-4`" :src="a.usuario.foto" :fit="true" :user="true" />
                            </div>
                            <div class="col my-auto px-0 pl-3">
                                 <div class="row w-100 m-0 letra-gray4-18">{{a.usuario.nombre}}</div>
                            </div>
                        </div>
                        
                        <div class="row w-100 m-0" v-else @click="tochat(a.id)" >
                            <div class="w-17vw h-17vw">
                                <imagen :clase="`border-radius-50 border-${a.nivel}-4`" :src="a.foto" :fit="true" :user="true" />
                            </div>
                            <div class="col my-auto px-0 pl-3">
                                 <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </template>

                <template v-for="c of busqueda">

                    <template v-if=" c.tipo == 'c' " >
                        <div class="row w-100 m-0 py-2 border-b-gray0-1" :key="c.id">
                        <div class="col-auto my-auto position-relative">
                            <div class="w-17vw h-17vw  border-radius-50 overflow-hidden">
                                <imagen :src="c.usuario.foto" :user="1"  />
                            </div>
                            <div class="w-auto position-absolute top--5px right-5px"  @click="chat = c.chat;  $store.commit('openA') " >
                                <icono clase="letra-gray2-30" icono="report" />
                            </div>
                        </div>
                        <div class="col px-1" @click="goToDetelle(c)">
                            <div class="row w-100 m-0">
                                <div class="col p-0 my-auto letra-gray-dark2-4-5vw fw-800">{{c.usuario.nombre}}</div>
                                <div class="col-auto p-0 my-auto letra-gray3-11 text-right font-italic" v-if="getLastMensaje(c.mensajes).fecha">{{ [getLastMensaje(c.mensajes).fecha, 'YYYY-MM-DD HH:mm:ss'] | moment("from", "now") }}</div>
                                <div class="col-1 p-0 my-auto">
                                    <imagen src="ch_left" :icono="1" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 mt-1px">
                                <template v-if="getLastMensaje(c.mensajes).usuarios_id" >
                                    <template v-if="getLastMensaje(c.mensajes).leido == null" >
                                        <div class="col-auto my-auto pr-1 px-0" v-if="getLastMensaje(c.mensajes).usuarios_id && getLastMensaje(c.mensajes).usuarios_id != session.id" >
                                            <icono icono="fiber_manual_record" clase="letra-azul1-15 pt-5px" />
                                        </div>
                                        <div class="col my-auto p-0 letra-azul1-16" :class="(getLastMensaje(c.mensajes).usuarios_id == session.id)?'':'fw-800'" >{{getLastMensaje(c.mensajes).mensaje}}</div>
                                    </template>
                                    <div class="col my-auto p-0 letra-azul1-16" v-else :class="(getLastMensaje(c.mensajes).usuarios_id == session.id)?'':''" >{{getLastMensaje(c.mensajes).mensaje}}</div>
                                    <!-- <div class="col my-auto p-0 letra-azul1-16"  :class="(getLastMensaje(c.mensajes).usuarios_id == session.id)?'':''" >{{getLastMensaje(c.mensajes).leido}}</div> -->
                                </template>
                            </div>
                        </div>
                    </div>

                    </template>

                    <template v-if="c.tipo == '1' || c.tipo == '2' ">
                        <div class="row w-100 m-0 py-2 position-relative border-b-gray0-1" :key="c.id">
                            <div class="row w-100 m-0 position-absolute top-0px left-0px" >
                                <div v-if="c.evento.type == 'Reunion'" class="col-auto ml-auto px-3 back-color-verde4 letra-blanco-15 border-bl-radius-15px text-capitalize">Reunion</div>
                                <div v-else class="col-auto ml-auto px-3 back-color-amar letra-blanco-15 border-bl-radius-15px text-capitalize">Regalo grupal</div>
                            </div>
                            <div class="row w-100 m-0 pt-12px">
                                <div class="col-auto my-auto px-0 pl-3">
                                    <div class="h-17vw w-17vw border-radius-50 overflow-hidden " v-if="c.evento.imagen">
                                        <imagen :fit="true" :create="true" :src="c.evento.imagen" />
                                    </div>
                                    <div class="h-17vw w-17vw border-radius-50 overflow-hidden back-color-azul1 text-center" v-else >
                                        <icono icono="group" clase="letra-blanco-50 pt-11px" />
                                    </div>
                                </div>
                                
                                <div class="w-76 px-1 ml-auto " @click="goToEvento(c)">
                                    <div class="row w-100 m-0">
                                        <div class="row w-100 m-0">
                                            <div class="col p-0 my-auto ">
                                                <div class="row w-100 m-0 letra-gray-dark2-4-5vw fw-800">{{c.evento.nombre}}</div>
                                                <div class="row w-100 m-0">Creador {{c.usuario.nombre}}</div>
                                                <!-- <div class="row w-100 m-0">tipo {{c.tipo}}</div> -->
                                            </div>
                                        </div>
                                        <div class="row w-100 m-0 mt-1px">
                                            <div class="col-12 p-0 letra-azul1-16 leido" 
                                                v-if="getLastMensaje(c.mensajes).fecha" 
                                                :class="(getLastMensaje(c.mensajes).usuarios_id == session.id)?'':(getLastMensaje(c.mensajes).leido != null)?'':'fw-800'" 
                                                >
                                                <p><strong>{{ getUser(c.data, getLastMensaje(c.mensajes).usuarios_id ) }}:</strong> {{getLastMensaje(c.mensajes).mensaje}}</p>
                                            </div>
                                        </div>
                                        <div class="row w-100 m-0 justify-content-end">
                                            <div class="col-auto p-0 my-auto ml-auto letra-gray3-11 text-right " v-if="getLastMensaje(c.mensajes).fecha">{{ [getLastMensaje(c.mensajes).fecha, 'YYYY-MM-DD HH:mm:ss'] | moment("from", "now") }}</div>
                                            <div class="col-1 p-0 my-auto " >
                                                <imagen src="ch_left" :icono="1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </template>

                </template>

               

                

            </div>
        </div>
        <tabs />
    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
import Imagen from '../componentes/genericos/imagen.vue';
import moment from 'moment';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
                lectura: [],
                chat: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            chats(){return this.$store.getters.getChats;},

            amigos(){return this.$store.getters.userStateArray('amigos');},
            filtrado(){return this.amigos.filter(x=>{return x.estatus == 'aceptado'}); },
            usuarios(){return this.$store.getters.userStateArray('usuarios');},

            busquedaAmi() { 
                if(this.b){
                    // return this.filtrado.filter( x=>{ return (x.usuario.email || '').toLowerCase().includes( this.b.toLowerCase() ) || (x.usuario.email || '').toLowerCase().includes( this.b.toLowerCase() ) } );
                    return this.usuarios.filter( x=>{return  (x.nombre || '').toLowerCase().includes( this.b.toLowerCase() ) } );
                }
                return [];
            },
            
            misEventos(){ return this.$store.getters.userStateArray('misEventos'); },
            invitaciones(){ return this.$store.getters.userStateArray('invitaciones'); },
            ordenar(){
                let a = [];
                this.chats.map(x=>{
                    x.momento = (x.mensajes[x.mensajes.length-1] || {}).fecha || '1992-01-01 12:00:00';
                    a.push({ id: _.uniqueId('c_'), tipo: 'c', leido:false, busqueda: x.usuario.nombre, momento: x.momento, chat: x, ids: x.id, mensajes: x.mensajes, usuario: x.usuario });
                });
                this.misEventos.map(x=>{
                    x.momento = (x.mensajes[x.mensajes.length-1] || {}).fecha || '1992-01-01 12:00:00';
                    a.push({ id: _.uniqueId('y_'), tipo: '1', leido:false, busqueda: x.nombre, momento: x.momento, evento: x, ids: x.id, data: x, mensajes: x.mensajes, usuario: x.usuario});
                });
                this.invitaciones.map(x=>{
                    x.momento = (x.mensajes[x.mensajes.length-1] || {}).fecha || '1992-01-01 12:00:00';
                    a.push({ id: _.uniqueId('y_'), tipo: '2', leido:false, momento: x.momento, busqueda: x.evento.nombre, evento: x.evento, data: x, ids: x.id, mensajes: x.mensajes, usuario: x.usuario });
                });
                return _.orderBy(a,['momento'],['desc']);
            },
            busqueda(){
                if(this.b){
                    return this.ordenar.filter(x =>  x.busqueda.toLowerCase().includes(this.b.toLowerCase()) || x.mensajes.find(y=>y.mensaje.toLowerCase().includes(this.b.toLowerCase())) != undefined );
                }
                return this.ordenar;
            },
        },

        created(){
            console.log("UPDATE fecha");
            this.$store.dispatch('postUpdateUsuarioTable',[ {fecha_lectura_chats: moment().format('YYYY-MM-DD HH:mm:ss')} ]);
        },
        mounted(){
            // console.log("CHATS", this.chats);
        },

        methods:{
            scroll(){
                $('#chatsd').animate({ scrollTop: 9999 }, 'slow');
            },

            tochat(id){
                this.$store.commit('goToChat', [ id ] );
            },

            goTo(ruta){
                this.router.navigate(ruta);
            },

            getUser(i,id){
                // console.log("ASD", i, id, (i.usuarios.find(s=>s.usuarios_id == id) || i.usuario) );
                if(i.usuario.id == id){
                    return i.usuario.nombre;
                }
                let u = i.usuarios.find(s=>s.usuarios_id == id);
                if(u){
                    return u.usuario.nombre;
                }
            },

            goToDetelle(e){
                e.leido = true;
                this.$store.commit('selectChat', e.ids)
                this.goTo('/mensajes_chat');
            },

            getLastMensaje(mensajes){
                return mensajes[mensajes.length-1] || {} ;
            },

            goToEvento(e){
                this.lectura.push(e.ids)
                this.$store.commit('setUsuarioData',['evento', e.ids ]);
                if(e.tipo == '1'){
                    this.router.navigate('/mensajes_eventos');
                }
                else{
                    this.router.navigate('/mensajes_invitaciones');
                }
            },

            bloquearUsuario(){
                this.$store.dispatch('postBloquearUsuario',[ this.chat ]);
            }
        }
    }
</script>