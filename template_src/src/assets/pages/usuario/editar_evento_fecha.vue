<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Editar fecha'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 text-center pt-2 mb-3 position-relative">
                            <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                                <uploadImagen class="back-color-azul1" :user="false" :create="true" v-model="form.imagen" />
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Nombre de fecha:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Tipo de fecha:" :opciones="tipos_fechas" v-model="form.tipos_fechas_id" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Selecciona la fecha:" placeholder="" v-model="form.fecha" :maxlength="50" />
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Repetición:" llave="nombre" :opciones="repeticiones" v-model="form.repeticion" />
                        </div>
                        <div class="col-12 mt-4 pt-4">
                            <div class="row w-100 m-0 border-b-gray1-1" @click=" add ">
                                <div class="col px-0 letra-gray3-18">Agregar regalos</div>
                                <div class="col-auto px-0 letra-gray3-18">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="a of regalosForm" :key="a.id">
                                    <div class="row w-100 m-0 px-1 py-1" >
                                         <div class="w-10vw h-10vw my-auto">
                                            <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                        </div>
                                        <div class="col-auto my-auto">
                                            <div class="row w-100 m-0 letra-gray4-16">{{a.precio | currency}} {{a.currency}}</div>
                                        </div>
                                        <div class="col-auto my-auto px-0 pl-2 ">
                                            <boton-icono @click="eliminarProd(a)" :noborder="true" icono="remove" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row w-100 m-0 justify-content-center mt-4 pb-5 px-2">
                    <div class="col-12 py-2">
                        <botonApp tipo="azul" texto="Guardar" radius="30px" @click="save" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
const moment = require('moment')

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'feminino', nombre: 'Feminino'},
                ],
                form:{
                    imagen:     this.$store.getters.userStateFind('misFechas','fecha').imagen,
                    id:     this.$store.getters.userStateFind('misFechas','fecha').id,
                    nombre:     this.$store.getters.userStateFind('misFechas','fecha').nombre,
                    tipos_fechas_id:   this.$store.getters.userStateFind('misFechas','fecha').tipos_fechas_id,
                    fecha:   this.$store.getters.userStateFind('misFechas','fecha').fecha,
                    repeticion:   this.$store.getters.userStateFind('misFechas','fecha').repeticion,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            tipos_fechas(){return this.$store.getters.getCatalogo('tipos_fechas');},
            repeticiones(){return this.$store.getters.getCatalogo('repeticiones');},
            evento(){return this.$store.getters.userStateFind('misFechas','fecha')},
            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
        },
        beforeCreate(){
            // this.$store.commit('setUsuarioData',['regalosForm', {a:[]}]);
            let pss = this.$store.getters.userStateFind('misFechas','fecha').productos;
            pss.map(x=>{
                x.producto.imagen = x.imagen;
                console.log("METIENDO", x);
                this.$store.commit('addRegalo', x.producto );
            });
            console.log("REGALOS", this.$store.getters.userStateArray('regalosForm'));
        },
        methods:{
            save(){
                if(!this.form.nombre){
                    swal("","Por favor ingresa el nombre de la fecha","");
                    return;
                }
                this.$store.dispatch('postEditarFecha',[this.form, this.regalosForm]);
            },

            add(){
                this.$store.commit('setUsuarioData',['tipo', 'editarFecha']); 
                this.router.navigate('/regalos_fechas');
            },

            eliminarProd(a){
                this.$store.commit('removeRegalo',a.id);
            },
        }
    }
</script>