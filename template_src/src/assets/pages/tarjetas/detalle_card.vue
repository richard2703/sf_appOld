<template>
    <f7-page id="inicio" >
        <modalQr :qr="codigo" />
        <div class="vista" v-vistak>

            <nav-bar tipo="inicio" :backs="true" :title="'Tarjeta de regalo'" :right="false" />

            <div id="historilaccom" class="contenedor-page">

               <div class="row w-100 m-0">
                   <div class="row w-100 m-0 mb-3 back-color-blanco">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" >

                            <div class="row w-100 m-0 py-3 border-b-gray0-1">
                                <div class="row w-100 m-0 pb-1 letra-gray-18">Usuario de SocialFlow que compro</div>
                                <div class="row w-100 m-0 ">
                                    <div class="w-20vw h-20vw my-auto">
                                        <imagen clase="border-radius-10px" :fit="true" :user="true" :src="usuario.foto" />
                                    </div>
                                    <div class="col px-0 my-auto pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{usuario.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-16">{{usuario.email}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{servicioQR.id}}</div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Comprado:</div>
                                        <div class="col-auto px-0 letra-azul1-19 fw-800">{{[servicioQR.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                                    </div>
                                    
                                    <div class="row w-100 m-0 "  >
                                        <div class="col px-0 letra-gray4-17">Estatus de la tarjeta:</div>
                                        <div class="col-auto px-0 letra-verde3-19 fw-800" v-if="servicioQR.estatus == '1'">Activa</div>
                                        <div class="col-auto px-0 letra-verde3-19 fw-800" v-if="servicioQR.estatus == '0'">Inactiva</div>
                                    </div>
                                </div>
                            </div>
                          
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0 px-3 border-b-gray0-1">
                                <div class="row w-100 m-0 py-2">
                                    <div class="w-10vw h-10vw mb-auto">
                                        <imagen clase="border-radius-5px" :fit="true" :src="servicioQR.imagen" v-if="servicioQR.imagen" />
                                        <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/p1.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{servicioQR.producto.name}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18 fw-800">{{servicioQR.total | currency}}</div>
                                    </div>
                                </div>
                            </div>
                           

                           
                        </div>
                   </div>
               </div>

                <div class="row w-100 m-0 px-3 ">
                    <div class="row w-100 m-0 fw-600 letra-gray3-18">Ingresa datos para realizar el cobro:</div>
                </div>
                <div class="row w-100 m-0 px-3">
                    <div class="col-12 mt-1">
                        <inputForm type="text" texto="Nombre:" placeholder="" v-model="form.concepto" />
                    </div>
                   
                    <div class="col-12 mt-4">
                        <inputForm type="tel" texto="Teléfono:" placeholder="" v-model="form.total" :maxlength="20" />
                    </div>
               </div>
                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="azul" texto="Cobrar" radius="30px" @click="save" />
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
                codigo: 'socialFlow',
                form: {
                    concepto: null,
                    total: null,
                    codigo: null,
                }
            } 
        },

        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            servicioQR(){return this.$store.getters.carritoObject('servicioQR');},
            local(){return this.servicioQR.local || {};},
            usuario(){return this.servicioQR.usuario || {};},
            servicios(){return this.$store.getters.userStateArray('servicios');},
        },

        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },
            openQr(a){
                this.codigo = a.code; 
                this.$store.commit('openModal',['modalQr'])
            },
            canjear(){
                this.$store.dispatch('postCarritoCanjearServicio',[this.servicioQR]);
            },
            save(){
                
                if(!this.form.concepto){
                    swal("","Ingresa el concepto ","");
                    return;
                }
                if(!this.form.total){
                    swal("","Ingresa el total","");
                    return;
                }
                
                this.form.codigo = this.servicioQR.codigo;
                this.$store.dispatch('postCobrarTarjetaRegalo',[ this.form ]);
            }
            
        }
    }
</script>