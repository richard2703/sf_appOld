<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Agrega al festejado'" ></nav-bar>
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0" v-if="false">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="col px-0 letra-gray3-20">Agrega al festejado</div>
                            <div class="col-auto my-auto px-0">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click=" router.navigate('/enviar_invitacion') ">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                       </div>
                   </div>
                   <div class="row w-100 m-0">
                        <div class="row w-100 m-0 border-b-azul1-1 ">
                            <div class="col  px-0" @click="tab=1; print()">
                                <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==1)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">Amigos</div>
                            </div>
                            <div class="col  px-0" @click="tab=2; print()">
                                <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==2)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">Usuarios SOCIALFLOW</div>
                            </div>
                        </div>
                    </div>
                   <template v-if="tab == 1">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-3">
                            <busquedaInput v-model="b" />
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-for="a of busqueda" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw my-auto">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-3">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate(20)}}</div> -->
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email}}</div> -->
                            </div>

                            <div class="col-auto my-auto px-0">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-azul1 py-8px justify-content-center text-center" @click=" send(a) ">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                   </template>

                   <template v-if="tab == 2">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-3">
                            <busquedaInput v-model="b" />
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-for="a of filtrado" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw my-auto">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-3">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate(20)}}</div> -->
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email}}</div> -->
                            </div>

                            <div class="col-auto my-auto px-0">
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-azul1 py-8px justify-content-center text-center" @click=" send(a) ">
                                        <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                   </template>

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
                c: null,
                tab: 1,
                all: [],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            usuarios(){return this.$store.getters.userStateArray('usuarios').filter(x=>{return this.usuariosForm.some(y=>{return y.id == x.id}) == false }); },
            todos(){return this.$store.getters.userStateArray('usuarios').filter(x=>{return this.usuariosForm.some(y=>{return y.id == x.id}) == false }); },

            filtrado(){ 
                if(this.b){
                    return this.usuarios.filter( x=>{ return x.nombre.toLowerCase().includes( this.b.toLowerCase() ) ||  x.email.toLowerCase().includes( this.b.toLowerCase() )  } );
                }
                return this.usuarios;
            },

            agenda(){ return this.$store.getters.getCatalogo('contactos') },
            contactos(){
                if(this.c){
                    return this.agenda.filter(x => { return x.nombre.toLowerCase().includes( this.c.toLowerCase() ) });
                }
                return this.agenda;
            },

            amigos(){return this.$store.getters.userStateArray('amigos');},
            amigosConfirmados(){return this.amigos.filter(x=>{return x.estatus == 'aceptado'}); },
            amigosFromUsuarios(){return this.todos.filter(s=>{return this.amigosConfirmados.some(f=>{return f.usuario.id == s.id}) }); },
            busqueda(){
                if(this.b){
                    return this.amigosFromUsuarios.filter( x=>{ return x.nombre.toLowerCase().includes( this.b.toLowerCase() ) ||  x.email.toLowerCase().includes( this.b.toLowerCase() )  } );
                }
                return this.amigosFromUsuarios;
            },

        },
        methods:{
            print(){
                console.log("busquedas", this.amigosConfirmados, "amigos usuarios", this.amigosFromUsuarios, "busqeuda", this.todos);
            },
            send(a){
                this.$store.commit('setUsuarioDataForm', ['nuevoEventoForm','para_usuarios_id',a.id]);
                this.router.back();
            },
            sendX(s){
                if(!s.telefono){
                    swal("el numero de teléfono no es correcto");
                    return;
                }

                let texto = `Hola quiero organizar tu party, te invito a descargar la app de Socialflow en https://socialflow.app`;
                texto = texto.replace(/ /g,'%20');
                // console.log("========>", texto);
                let url = `https://api.whatsapp.com/send?phone=${s.telefono}&text=${texto}`;
                try{
                    cordova.InAppBrowser.open(url, '_system');
                }catch(e){};
            },
        }
    }
</script>