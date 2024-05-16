<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Domicilios'"></nav-bar>
            <div class="contenedor-page">
               <div class="row w-100 m-0">
                    <div class="row w-100 m-0 back-color-blanco py-1 border-b-gray00-1" @click="router.navigate('/nuevo_domicilio')">
                        <div class="row w-100 m-0 px-3">
                            <div class="col my-auto px-0 letra-gray3-18">Nuevo domicilio</div>
                            <div class="col-auto my-auto px-0">
                                <icono icono="add_circle_outline" clase="letra-amar2-35" />
                            </div>
                        </div>
                    </div>  
                   <div class="row w-100 m-0" v-for="a of domiciliosU" :key="a.id">
                       <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" @click="set(a.id)" >
                            <div class="col my-auto px-0 ">
                               <div class="row w-100 m-0 letra-gray4-17">{{a.calle}} {{a.numero}}</div>
                               <div class="row w-100 m-0 letra-verde3-17">{{`${a.municipio}, ${a.estado}`}}</div>
                            </div>
                            <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto"   > 
                                <icono clase="letra-azul1-40 pt-5px" v-if="domU == a.id" icono="check_box"  />
                                <icono clase="letra-gray3-40 pt-5px" v-else icono="check_box_outline_blank"  />
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }); },

            domiciliosU(){return this.usuario.direcciones || [];},
            domU(){return this.$store.getters.carritoObject('domicilio') || {};},
            domicilioU(){return this.domicilios.find(s=>s.id == this.dom) || {}; },
        },
        methods:{

            set(id){
                console.log("SETTING",id, this.domU);
                this.$store.commit('setCarritosState',['domicilio', id]);
                this.$store.dispatch('synchronizeData');
            },

            eliminar(a){
                this.$store.dispatch('postEliminarDireccion',a);
            }
            
        }
    }
</script>