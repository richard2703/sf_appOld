<template>
    <div class="row w-100 m-0">
        <div class="col-12 px-0 mt-4" >
            <div class="row w-100 m-0 px-3 py-3 back-color-blanco ">

            <div class="row w-100 m-0 pb-2 pt-2">
                <div class="row w-100 m-0 letra-azul1-19 fw-800">Productos, Servicios y Experiencias.</div>
            </div>

            <div class="row w-100 m-0 border-b-gray1-1" @click="addX">
                <div class="col px-0 letra-gray3-16 " >Buscar</div>
                <div class="col-auto px-0 letra-gray3-18" >
                    <icono icono="add" clase="letra-gray3-25" />
                </div>
            </div>
            
            <template v-if=" form.externo == 'no' " >
                <div class="regalos-divididos-porque-party-es-para-mi row w-100 m-0 " >
                    <div class="row w-100 m-0 pb-3">
                        <div class="row w-100 m-0" v-for="a of regalosForm.filter(x=>{return x.serie == 'lista'})" :key="a.id">
                            <div class="row w-100 m-0 px-2 py-1 ">
                                    <div class="w-10vw h-10vw">
                                    <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-1 ">
                                <div class="row w-100 m-0 letra-gray3-14" v-if="a.tipo == 'servicio'">*Podras canjear este servicio por medio de un QR.</div>
                                <div class="row w-100 m-0 letra-gray3-14" v-if="a.tipo == 'producto'">*Se enviara a al dirección que indiques</div>
                            </div>
                            <div class="row w-100 m-0 py-1 ">
                                <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?a.cantidad -= 1:a.cantidad = a.cantidad">
                                    <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                </div>
                                <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-else @click="eliminarProd(a)">
                                    <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                </div>
                                <div class="col-2 my-auto px-0">
                                    <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{a.cantidad}}</div>
                                </div>
                                <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" @click="a.cantidad += 1">
                                    <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                </div>
                                <div class="col-auto my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio | currency}} {{a.currency}}</div>
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio * a.cantidad | currency}} {{a.currency}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 py-2 border-b-gray1-1" @click="addY">
                        <div class="col my-auto px-0 letra-gray3-16 " >Seleccionar de mis <strong>wishlist</strong> existentes.</div>
                        <div class="col-auto my-auto px-0 letra-gray3-18">
                            <icono icono="add" clase="letra-gray3-25 pt-6px" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pb-4">
                        <div class="row w-100 m-0" v-for="a of regalosForm.filter(x=>{return x.serie == 'wish'})" :key="a.id">
                            <div class="row w-100 m-0 px-2 py-1 ">
                                <div class="w-10vw h-10vw">
                                    <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-1 ">
                                <div class="row w-100 m-0 letra-gray3-14" v-if="a.tipo == 'servicio'">*Podras canjear este servicio por medio de un QR.</div>
                                <div class="row w-100 m-0 letra-gray3-14" v-if="a.tipo == 'producto'">*Se enviara a al dirección que indiques</div>
                            </div>
                            <div class="row w-100 m-0 py-1 ">
                                <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?a.cantidad -= 1:a.cantidad = a.cantidad">
                                    <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                </div>
                                <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-else @click="eliminarProd(a)">
                                    <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                </div>
                                <div class="col-2 my-auto px-0">
                                    <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{a.cantidad}}</div>
                                </div>
                                <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" @click="a.cantidad += 1">
                                    <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                </div>
                                <div class="col-auto my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio | currency}} {{a.currency}}</div>
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio * a.cantidad | currency}} {{a.currency}}</div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 pt-2 pb-2 ">
                                <div class="col px-0">
                                    <div class="row w-100 m-0" @click="selecEnvio(a)" >
                                        <div class="col-auto px-0">
                                            <icono clase="letra-azul1-25" v-if="a.tipo_entrega == 'tienda'" icono="radio_button_checked" />
                                            <icono clase="letra-gray3-25" v-else icono="radio_button_unchecked" />
                                        </div>
                                        <div class="col pl-2 px-0 letra-gray3-14">Recoger en tienda</div>
                                    </div>
                                </div>
                                <div class="col px-0">
                                    <div class="row w-100 m-0" @click="selecEnvio(a)" >
                                        <div class="col-auto px-0">
                                            <icono clase="letra-azul1-25" v-if="a.tipo_entrega == 'domicilio'" icono="radio_button_checked" />
                                            <icono clase="letra-gray3-25" v-else icono="radio_button_unchecked" />
                                        </div>
                                        <div class="col pl-2 px-0 letra-gray3-14">Entregar en domicilio</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </template>

            <div class="regalos-no-divididos row w-100 m-0 " v-else>
                <div v-if="usuario.id" class="row w-100 m-0 py-2 border-b-gray1-1" @click="addWW">
                    <div class="col my-auto px-0 letra-gray3-16 " >Seleccionar de las <strong>wishlist</strong> de {{usuario.nombre}}.</div>
                    <div class="col-auto my-auto px-0 letra-gray3-18">
                        <icono icono="add" clase="letra-gray3-25 pt-6px" />
                    </div>
                </div>
                <div class="row w-100 m-0 pb-3">
                    <div class="row w-100 m-0" v-for="a of regalosForm" :key="a.id">
                        <div class="row w-100 m-0 px-2 py-1 ">
                                <div class="w-10vw h-10vw">
                                <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-1 ">
                            <div class="row w-100 m-0 letra-gray3-14" v-if="a.tipo == 'servicio'">*Podras canjear este servicio por medio de un QR.</div>
                            <div class="row w-100 m-0 letra-gray3-14" v-if="a.tipo == 'producto'">*Se enviara a al dirección que indiques</div>
                        </div>
                        <div class="row w-100 m-0 py-1 ">
                            <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?a.cantidad -= 1:a.cantidad = a.cantidad">
                                <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                            </div>
                            <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-else @click="eliminarProd(a)">
                                <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                            </div>
                            <div class="col-2 my-auto px-0">
                                <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{a.cantidad}}</div>
                            </div>
                            <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" @click="a.cantidad += 1">
                                <icono icono="add" clase="letra-blanco-20 pt-4px" />
                            </div>
                            <div class="col-auto my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio | currency}} {{a.currency}}</div>
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio * a.cantidad | currency}} {{a.currency}}</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-2 pb-2 ">
                            <div class="col px-0">
                                <div class="row w-100 m-0" @click="selecTienda(a)">
                                    <div class="col-auto px-0">
                                        <icono clase="letra-azul1-25" v-if="a.tipo_entrega == 'tienda'" icono="radio_button_checked" />
                                        <icono clase="letra-gray3-25" v-else icono="radio_button_unchecked" />
                                    </div>
                                    <div class="col pl-2 px-0 letra-gray3-14">Recoger en tienda / QR</div>
                                </div>
                            </div>
                            <div class="col px-0">
                                <div class="row w-100 m-0" @click="selecEnvio(a)" >
                                    <div class="col-auto px-0">
                                        <icono clase="letra-azul1-25" v-if="a.tipo_entrega == 'domicilio'" icono="radio_button_checked" />
                                        <icono clase="letra-gray3-25" v-else icono="radio_button_unchecked" />
                                    </div>
                                    <div class="col pl-2 px-0 letra-gray3-14">Entregar en domicilio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                <desgloceTotalCoopera /> 
            </div>
        </div>
    </div>      
</template>
                     
<script>

import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                hoy: moment().format('YYYY-MM-DD'),
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            
            lugares(){return this.$store.getters.userStateArray('lugares');},
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }) || {}; },

            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
            nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},
            
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
            listaRegalosForm(){return this.$store.getters.userStateArray('listaRegalosForm');},

            domicilios(){return this.$store.getters.carritoArray('domicilios');},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},

            cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},

            total(){return (a)=>{ let x = 0; a.map(y=>{x = x + Number(y.precio)}); return x; } },
            totalCantidad(){return (a)=>{ 
                    let x = 0; 
                    a.map(y=>{ 
                        if(y.currency == 'USD'){
                            x = x + ((Number(y.precio) * Number(y.cantidad)) *this.cambioUSD);
                        }
                        else{
                            x = x + (Number(y.precio) * Number(y.cantidad));
                        }
                    }); 
                    return x; 
            }},
        },
        mounted() {
            console.log("######## FORM", this.form);
        },
        methods:{

            saveForm(key,val){
                this.form[key] = val;
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
            },

            updating(ruta){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                if(ruta){
                    this.router.navigate(ruta);
                }
            },

            selecEnvio(a){
                if(a.notEnvio){
                    if(a.notEnvio == 2){
                        swal("","Por ser un servicio, no tiene opción de envío a domicilio.","");
                        return;
                    }
                    swal("","Este producto no tiene envio a domicilio","");
                    return;
                }
                a.shipping_cost = a.shipping_costX;
                a.tiempo = a.tiempoX;
                a.tipo_entrega = 'domicilio'
            },

            selecTienda(a){
                if(0){
                    swal("","Este producto no tiene envio a domicilio","");
                    return;
                }
                a.shipping_cost = 0;
                a.tiempo = 0;
                a.tipo_entrega = 'tienda';
            },

            ver(){
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.router.navigate('/deseos_usuario_evento');
            },

            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
            },

            addX(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'lista']);
                this.router.navigate('/regalos_eventos'); 
            },

            addY(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'wish']);
                this.router.navigate('/mis_deseos_eventos'); 
            },

            addWW(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'wish']);
                this.router.navigate('/deseos_usuario_evento'); 
            },

            addW(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'amenidad']);
                this.router.navigate('/regalos_eventos'); 
            },

            eliminar(a){
                this.$store.commit('removeUser',a.id);
            },

            delConcepto(a){
                this.$store.commit('removeConcepto',a);
            },

            eliminarProd(a){
                this.$store.commit('removeRegalo',a.id);
            },
          
        }
    }
</script>