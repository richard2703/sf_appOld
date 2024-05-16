<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Wishlist'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-2">

                        <div class="col-12 mt-4 pt-3">
                            <div class="row w-100 m-0 border-b-gray1-1" @click="add">
                                <div class="col px-0 letra-gray3-18">Agrega regalos para tu fecha importante:</div>
                                <div class="col-auto px-0 letra-gray3-18">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="a of regalosForm" :key="a.id">
                                    <div class="row w-100 m-0 px-2 py-1 ">
                                         <div class="w-10vw h-10vw my-auto">
                                            <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                        </div>
                                        <div class="col-auto my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-18">{{a.precio | currency}} {{a.currency}}</div>
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
                        <botonApp tipo="azul" texto="Guardar" radius="30px" @click="save()" />
                    </div>
                    <div class="col-12 py-2">
                        <botonApp tipo="gris" texto="Omitir" radius="30px" @click="cancel()" />
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
                    imagen:     null,
                    nombre:     null,
                    lugar:     null,
                    otro:     null,
                    tipo:   'party',
                    fecha:   moment().format('YYYY-MM-DD'),
                    hora:   '12:00',
                    repeticion:   'Unico',
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
        },
        methods:{
            save(){
                if( !this.regalosForm.length ){
                    swal("","Agrega regalos para guardarlos","");
                    return;
                }
                this.$store.dispatch('postGuardarRegalosFechas',this.regalosForm);
            },

            cancel(){
                this.router.back('/mis_fechas', {force: true} );
            },
            add(a){
                this.$store.commit('setUsuarioData',['tipo', 'nuevaFecha']);
                this.router.navigate('/regalos_fechas');
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