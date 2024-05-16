<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Personas importantes'" :right="true" icon="add" @right="router.navigate('/nuevos_amigos')" />
            <div class="contenedor-page">
               <div class="row w-100 m-0">

                   <div class="row w-100 m-0">
                       <div class="row w-100 m-0 px-3 py-3">
                           <busquedaInput v-model="b" />
                       </div>
                   </div>
                   
                   <div class="row w-100 m-0" v-for="a of busqueda" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                        <div class="row w-100 m-0">
                            <div class="w-15vw h-15vw">
                                <imagen clase="border-radius-50" :src="a.usuario.foto" :fit="true" :user="true" />
                            </div>
                                <div class="col my-auto px-0 pl-3">
                                <div class="row w-100 m-0 letra-gray4-18">{{a.usuario.nombre}}</div>
                                <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email | truncate(30) }}</div> -->
                                <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.usuario.email}}</div> -->
                                </div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 my-auto ml-auto">
                                <div class="row w-100 m-0 pr-1">
                                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" chat(a) ">
                                        <icono icono="chat_bubble" clase="letra-azul1-25 pt-6px" />
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
                                <div class="row w-100 m-0">
                                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" ver(a) ">
                                        <icono icono="playlist_play" clase="letra-azul1-25 pt-6px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            amigos(){return this.$store.getters.userStateArray('amigos');},
            filtrado(){return this.amigos.filter(x=>{return x.estatus == 'aceptado' && x.favorito == '1' }); },
            busqueda() { 
                if(this.b){
                    return this.filtrado.filter( x=>{ return x.usuario.email.toLowerCase().includes( this.b.toLowerCase() ) || x.usuario.nombre.toLowerCase().includes( this.b.toLowerCase() ) } );
                }
                return this.filtrado;
            }
        },
        mounted() {
            console.log("AMI", this.amigos);
        },
        methods:{
            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
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