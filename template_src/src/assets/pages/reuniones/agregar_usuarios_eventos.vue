<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Usuarios'"></nav-bar>
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
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-3">
                    <busquedaInput v-model="b" />
                </div>
            </div>
            <div class="contenedor-page">
               <div class="row w-100 m-0" v-if="tab==1">
                   
                   <div class="row w-100 m-0" v-for=" a of busqueda " :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-2">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate('30') }}</div> -->
                            </div>
                           <div class="col-auto my-auto px-0 pl-2 ">
                                <boton-icono @click="eliminar(a)" :noborder="true" icono="remove" v-if="usuariosForm.find(x=>{return x.id == a.id})" />
                                <boton-icono @click="add(a)" :noborder="true" icono="add" v-else />
                            </div>
                       </div>
                   </div>
               </div>

               <div class="row w-100 m-0" v-if="tab==2">
                   
                   <div class="row w-100 m-0" v-for=" a of filtrado " :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                           <div class="w-15vw h-15vw">
                               <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                           </div>
                            <div class="col my-auto px-0 pl-2">
                               <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                               <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate('30') }}</div> -->
                            </div>
                           <div class="col-auto my-auto px-0 pl-2 ">
                                <boton-icono @click="eliminar(a)" :noborder="true" icono="remove" v-if="usuariosForm.find(x=>{return x.id == a.id})" />
                                <boton-icono @click="add(a)" :noborder="true" icono="add" v-else />
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
                tab: 1,
                b: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
            todos(){return this.$store.getters.userStateArray('usuarios').filter(x=>{ return x.id != this.form.para_usuarios_id });},

            amigos(){return this.$store.getters.userStateArray('amigos');},
            amigosConfirmados(){return this.amigos.filter(x=>{return x.estatus == 'aceptado'}); },
            amigosFromUsuarios(){return this.todos.filter(s=>{return this.amigosConfirmados.some(f=>{return f.usuario.id == s.id}) }); },
            busqueda(){
                if(this.b){
                    return this.amigosFromUsuarios.filter( x=>{ return x.nombre.toLowerCase().includes( this.b.toLowerCase() ) ||  x.email.toLowerCase().includes( this.b.toLowerCase() )  } );
                }
                return this.amigosFromUsuarios;
            },

            usuarios(){return this.todos },
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            filtrado(){ 
                if(this.b){
                    return this.usuarios.filter( x=>{ return x.nombre.toLowerCase().includes( this.b.toLowerCase() ) ||  x.email.toLowerCase().includes( this.b.toLowerCase() )  } );
                }
                return this.usuarios;
            }
        },
        methods:{
            print(){
                console.log("busquedas", this.amigosConfirmados, "amigos usuarios", this.amigosFromUsuarios, "busqeuda", this.todos);
            },
            add(a){
                this.$store.commit('addUser',a);
                this.b = null;
                console.log("USUARIOS", this.usuariosForm)
            },
            eliminar(a){
                this.$store.commit('removeUser',a.id);
                this.b = null;
                console.log("USUARIOS", this.usuariosForm)
            }
            
        }
    }
</script>