<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Editar evento'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">

                        <div class="col-12 text-center pt-2 mb-3 position-relative">
                            <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                                <uploadImagen class="back-color-azul1" :user="false" :create="true" v-model="form.imagen" />
                            </div>
                        </div>

                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Fecha:" placeholder="" v-model="form.fecha" :maxlength="50" />
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Tipo de evento:" :opciones="tipo" v-model="form.tipo" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm :scroll="true" type="text" texto="Nombre del evento:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4" v-if="form.tipo == 'reunion'">
                            <inputForm type="time" texto="Hora:" placeholder="" v-model="form.hora" :maxlength="50" />
                        </div>
                        <div class="col-12 mt-4" v-if="form.tipo == 'reunion'">
                            <div class="row w-100 m-0" v-if="!form.otro">
                                <div class="row w-100 m-0 pb-3">Selecciona un lugar para la reunion:</div>
                                <selectForm type="text" :nulo="true" texto="Recomedados por SocialFlow" :opciones="lugares" v-model="form.lugar" />
                            </div>
                            <div class="row w-100 m-0" v-if="!form.lugar">
                                <div class="col-12 px-0 mt-2">
                                    <inputForm :scroll="true" type="text" texto="Otro lugar:" placeholder="" v-model="form.otro" />
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4 pt-4" v-if="form.tipo == 'party'">
                            <div class="row w-100 m-0 border-b-gray1-1" @click=" $store.commit('setUsuarioData',['tipo', 'editarEvento']); router.navigate('/regalos_eventos') ">
                                <div class="col px-0 letra-gray3-18">Agregar regalos</div>
                                <div class="col-auto px-0 letra-gray3-18">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="a of regalosForm" :key="a.id">
                                    <div class="row w-100 m-0 px-2 py-1 ">
                                         <div class="w-10vw h-10vw">
                                            <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                                        </div>
                                        <div class="col-auto my-auto px-0 pl-2 ">
                                            <boton-icono @click="eliminarProd(a)" :noborder="true" icono="remove" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4 pt-4">
                            <div class="row w-100 m-0 border-b-gray1-1"  @click="router.navigate('/agregar_usuarios_eventos')">
                                <div class="col px-0 letra-gray3-18">Agregar amigos</div>
                                <div class="col-auto px-0 letra-gray3-18">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="a of usuariosForm" :key="a.id">
                                    <div class="row w-100 m-0 px-3 py-2">
                                        <div class="w-15vw h-15vw">
                                            <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                                        </div>
                                            <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                                            <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate(25) }}</div>
                                            </div>
                                        <div class="col-auto my-auto px-0 pl-2 ">
                                                <boton-icono @click="eliminar(a)" :noborder="true" icono="remove" />
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
                hoy: moment().format('YYYY-MM-DD'),
                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'feminino', nombre: 'Feminino'},
                ],
                tipo:[
                    { id: 'reunion', nombre: 'Reunion'},
                    { id: 'party', nombre: 'Party'},
                ],
                form:{
                    id:         this.$store.getters.userStateFind('misEventos','evento').id,
                    imagen:         this.$store.getters.userStateFind('misEventos','evento').imagen,
                    nombre:         this.$store.getters.userStateFind('misEventos','evento').nombre,
                    lugar:          ( this.$store.getters.userStateArray('lugares').find(x=>{return x.id == this.$store.getters.userStateFind('misEventos','evento').lugar }) )? this.$store.getters.userStateFind('misEventos','evento').lugar : null,
                    otro:           ( this.$store.getters.userStateArray('lugares').find(x=>{return x.id == this.$store.getters.userStateFind('misEventos','evento').lugar }) )?null : this.$store.getters.userStateFind('misEventos','evento').lugar ,
                    tipo:           this.$store.getters.userStateFind('misEventos','evento').tipo,
                    fecha:          this.$store.getters.userStateFind('misEventos','evento').fecha,
                    hora:           this.$store.getters.userStateFind('misEventos','evento').hora,
                },
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            tipos_fechas(){return this.$store.getters.getCatalogo('tipos_fechas');},
            repeticiones(){return this.$store.getters.getCatalogo('repeticiones');},
            lugares(){return this.$store.getters.userStateArray('lugares');},
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
            evento(){return this.$store.getters.userStateFind('misEventos','evento'); },
        },
        beforeCreate() {
            let uss = this.$store.getters.userStateFind('misEventos','evento').usuarios;
            uss.map(x=>{
                this.$store.commit('addUser',x.usuario);
            });
            let pss = this.$store.getters.userStateFind('misEventos','evento').productos;
            pss.map(x=>{
                x.producto.imagen = x.imagen;
                this.$store.commit('addRegalo', x.producto );
            });
        },
        methods:{
            save(){
                if(!this.form.nombre){
                    swal("","Por favor ingresa el nombre de la fecha","");
                    return;
                }
                if(this.form.tipo == 'reunion'){
                    if(!this.form.lugar && !this.form.otro){
                        swal("","Por favor ingresa seleciona el lugar de la reunion","");
                        return;
                    }
                }
                if(this.form.fecha < this.hoy){
                    swal("","Solo puedes agregar eventos futuros","");
                    return;
                }
                this.$store.dispatch('postAgregarEvento',this.form);
            },
            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
            },
            eliminar(a){
                this.$store.commit('removeUser',a.id);
            },
            eliminarProd(a){
                this.$store.commit('removeRegalo',a.id);
            },
          
        }
    }
</script>