<template>
    <f7-page id="inicio" >
        <modalMensajeFor
            v-if="open"
            @close="open=false"
            :titulo="'share'" 
            :oneButton="1"
            boton="Cancelar"
        />


        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" 
                :backs="true" 
                :title="'Amigos'" 
                :right="true" 
                :imagen="true" 
                icon="search"
                @right="router.navigate('/nuevos_amigos')" 
            />
            <div class="contenedor-page-tabs back-color-fondo ">
               <div class="row w-100 m-0">

                   <div v-if="0" class="row w-100 m-0">
                       <div class="row w-100 m-0 px-3 py-3">
                           <busquedaInput v-model="b" />
                       </div>
                   </div>

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 pt-3 pb-3 px-3">
                            <div class="row w-100 m-0 px-3 py-3 carta back-color-blanco position-relative ">
                                <div class="row w-100 m-0 letra-azul1-20 fw-800">Invita amigos a SocialFlow</div>

                                <div @click="share()" class="w-auto position-absolute top-10px right-10px z-1000000000 " >
                                    <icono icono="share" clase="letra-azul1-35" />
                                </div>

                                <div class="row w-100 m-0 pt-2">
                                    <div class="w-15vw h-15vw border-radius-50 overflow-hidden ">
                                        <imagen :fit="1" :perfil="1" />
                                    </div>
                                    <div class="col px-0 pl-3">
                                        <div class="row w-100 m-0 letra-gray4-16">{{session.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15">{{session.telefono}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15">
                                            <div class="col px-0">Codigo de referido: {{session.mi_codigo}}</div>
                                            <div class="col-auto px-0">
                                                <icono icono="content_copy" clase="letra-gray3-25" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                <div class="row w-100 m-0 pb-2">
                    <div class="row w-100 m-0 px-1 py-2">
                        <div class="col px-1" @click="tab = 1; b = null;" >
                            <div :class="tab == 1?'back-color-azul1 letra-blanco-17 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                class="row px-2 h-60px align-content-center carta w-100 m-0 border-radius-10px justify-content-center text-center">Agrega tus contactos</div>
                        </div>
                        <div class="col px-1" @click="tab = 2; b = null;" >
                            <div :class="tab == 2?'back-color-azul1 letra-blanco-17 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                class="row px-2 h-60px align-content-center carta w-100 m-0 border-radius-10px justify-content-center text-center">Mis amigos</div>
                        </div>
                        <div class="col px-1" @click="tab = 3; b = null;" >
                            <div :class="tab == 3?'back-color-azul1 letra-blanco-17 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                class="row px-2 h-60px align-content-center carta w-100 m-0 border-radius-10px justify-content-center text-center">Solicitudes</div>
                        </div>
                    </div>
                </div>


                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pb-3 ">
                        <busquedaInput :offset="150" v-model="b" />
                    </div>
                </div>
                   
                <div class="row w-100 m-0 px-3"  >
                    <!-- h-min-60vh -->
                    <div class="row w-100 m-0  back-color-blanco " >
                    <div class="row w-100 m-0 " v-for="a of byTab" :key="a.id" >
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1 carta">
                            <div class="row w-100 m-0" v-if="a.nombre" @click.stop="$store.verPerfil({ id: a.id })" >
                                <div class="w-15vw h-15vw">
                                    <imagen :clase="`border-radius-50 border-${a.nivel}-4`" :src="a.foto" :fit="true" :user="true" />
                                </div>
                                    <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                                    <!-- <div class="row w-100 m-0 letra-gray4-18">{{a.telefono}}</div> -->
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email | truncate(30) }}</div> -->
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email}}</div> -->
                                    </div>
                            </div>
                            <div class="row w-100 m-0" v-else @click.stop="$store.verPerfil({ id: a.usuario.id })" >
                                <div class="w-15vw h-15vw">
                                    <imagen :clase="`border-radius-50 border-${a.nivel}-4`" :src="a.usuario.foto" :fit="true" :user="true" />
                                </div>
                                    <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-gray4-18">{{a.usuario.nombre}}</div>
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.telefono}}</div> -->
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email | truncate(30) }}</div> -->
                                    </div>
                            </div>

                            <template v-if="tab==1">
                                <div class="row w-100 m-0">
                                    <div class="w-50px ml-auto border-radius-5px back-color-azul1 py-8px justify-content-center text-center" @click=" sendSol(a) ">
                                        <icono icono="person_add" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </template>
                            <template v-if="tab==2">
                                <div class="row w-100 m-0">
                                    <div class="col-auto px-0 my-auto ml-auto">
                                        <div class="row w-100 m-0 pr-1">
                                            <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" chat(a) ">
                                                <icono icono="chat" clase="letra-azul1-25 pt-6px" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto px-0 my-auto">
                                        <div class="row w-100 m-0 pr-1">
                                            <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" fav(a,'1') " v-if="a.favorito == '0'" >
                                                <icono icono="favorite_border" clase="letra-azul1-25 pt-6px" />
                                            </div>
                                            <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" fav(a,'0') " v-else >
                                                <icono icono="favorite" clase="letra-rojo-25 pt-6px" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto px-0 my-auto ">
                                        <div class="row w-100 m-0 pr-1">
                                            <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" ver(a) ">
                                                <icono icono="playlist_play" clase="letra-azul1-25 pt-6px" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-auto px-0 my-auto">
                                        <div class="row w-100 m-0">
                                            <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" send(a,'rechazado') ">
                                                <icono icono="delete" clase="letra-azul1-25 pt-6px" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <template v-if="tab==3">
                                <div class="row w-100 m-0">

                                    <div class="row w-100 m-0" v-if=" a.amigos_id == session.id " >
                                        <div class="col-auto my-auto px-0 ml-auto pr-3" >
                                            <div class="row w-100 m-0">
                                                <div class="w-50px border-radius-5px back-color-verde py-1 justify-content-center text-center" @click=" send(a,'aceptado') ">
                                                    <icono icono="done" clase="letra-blanco-20 pt-4px" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto my-auto px-0" >
                                            <div class="row w-100 m-0 " >
                                                <div class="w-50px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click=" send(a,'rechazado') ">
                                                    <icono icono="clear" clase="letra-blanco-20 pt-4px" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row w-100 m-0" v-if=" a.usuarios_id == session.id ">
                                        <div class="col-auto ml-auto my-auto px-0" >
                                            <div class="row w-100 m-0 letra-gray3-14 text-center justify-content-center ">Solicitud enviada</div>
                                        </div>
                                    </div>

                                </div>
                            </template>

                        </div>
                    </div>
                    </div>

                    <div class="row w-100 m-0 py-3"></div>  
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
                b: null,
                open: 0,
                tab: 1,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            amigos(){return this.$store.getters.userStateArray('amigos');},

            usuarios(){return this.$store.getters.userStateArray('usuarios');},

            agenda(){ return this.$store.getters.getCatalogo('contactos') },

            usersNoAmigos(){return this.usuarios.filter( w => !this.amigos.some( q=>q.amigos_id == w.id || q.usuarios_id == w.id  ) )},

            // contactos(){return this.usuarios.filter(s=> (s.telefono || '').includes('3339548526') ) ;},
            contactos(){return this.usersNoAmigos.filter(s=> this.agenda.some( a=> (a.telefono || '').includes( (s.telefono || '') ) ) ); },

            filtrado(){return this.amigos.filter(x=>{return x.estatus == 'aceptado'}); },

            sols(){return this.amigos.filter(x=>{return x.estatus == 'enviado'}).filter( s=>1 ) },

            busqueda() { 
                if(this.b){
                    return this.filtrado.filter( x=>{ return x.usuario.email.toLowerCase().includes( this.b.toLowerCase() ) || x.usuario.nombre.toLowerCase().includes( this.b.toLowerCase() ) } );
                }
                return this.filtrado;
            },
            byTab(){
                if(this.tab == 2){
                    return this.filtrado.filter(a=>{
                        if(this.b){
                            return ((a.usuario || {}).nombre || '').toLowerCase().includes(this.b.toLowerCase());
                        }return 1;
                    });
                }
                if(this.tab == 3){
                    return this.sols.filter(a=>{
                        if(this.b){
                            return ((a.usuario || {}).nombre || '').toLowerCase().includes(this.b.toLowerCase());
                        }return 1;
                    });
                }
                return this.contactos.filter(a=>{
                        if(this.b){
                            return ((a || {}).nombre || '').toLowerCase().includes(this.b.toLowerCase());
                        }return 1;
                    });
            },
        },
        
        mounted() {
            this.$store.commit('setContactos');
            // console.log("AMI", this.usuarios, this.usersNoAmigos);
        },

        methods:{
            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
            },

            sendSol(a){
                this.$store.dispatch('postEnviarSolicitud', a );
            },

            share(){
                this.open = 1;
                console.log("SHARE SHARE");
                // try{
                //     window.plugins.socialsharing.share('Hola te invito a descargar la app de SocialFlow');
                // }catch(e){
                // }
            },

            send(a,s){
                this.$store.dispatch('postActulizarSolicitudAmistad',[a,s]);
            },

            eliminar(a){
                console.log("USUARIOS", this.usuariosForm)
            },

            chat(a){
                this.$store.commit('goToChat', [ a.usuario.id ] );
            },

            fav(a,x){
                this.$store.dispatch('postSetFavorito', [ a.id, x] );
            },

            ver(a){
                this.$store.commit('setUsuarioData', ['amigo',a.id]);
                this.router.navigate('/deseos_amigos');
            }
        }
    }
</script>