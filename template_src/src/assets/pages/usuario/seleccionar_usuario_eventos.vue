<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Usuarios'"></nav-bar>
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-3">
                    <busquedaInput v-model="b" />
                </div>
            </div>
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                   
                   <div class="row w-100 m-0" v-for=" a of filtrado " :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-2">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate('30') }}</div>
                            </div>
                           <div class="col-auto my-auto px-0 pl-2 ">
                                <boton-icono @click="add(a)" :noborder="true" icono="add" />
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
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            filtrado(){ 
                if(this.b){
                    return this.usuarios.filter( x=>{ return x.nombre.toLowerCase().includes( this.b.toLowerCase() ) ||  x.email.toLowerCase().includes( this.b.toLowerCase() )  } );
                }
                return this.usuarios;
            }
        },
        methods:{
            add(a){
                this.$store.commit('setUsuarioDataForm', ['nuevoEventoForm','para_usuarios_id',a.id]);
                this.router.back();
            },
            eliminar(a){
                this.$store.commit('removeUser',a.id);
                this.b = null;
                console.log("USUARIOS", this.usuariosForm)
            }
            
        }
    }
</script>