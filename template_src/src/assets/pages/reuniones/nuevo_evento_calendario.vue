<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Agrega evento'"/>
            <div class="contenedor-page-tabs back-color-gray0 ">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">

                        <div class="row w-100 m-0 pb-2 back-color-blanco ">
                            <div class="col-12 text-center pt-2 position-relative">
                                <div class="w-30vw h-30vw back-color-azul1 mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                                    <uploadImagen class="" :user="0" :create="1" v-model="form.imagen" />
                                </div>
                                <div class="row w-100 m-0 letra-gray3-15 text-center justify-content-center">Agrega una imagen para el evento (opcional).</div>
                            </div>
                            <div class="col-12 mt-4">
                                <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`">Datos basicos del evento</div>
                            </div>
                            <div class="col-12 mt-1">
                                <selectForm type="text" texto="Tipo de evento:" placeholder="Selecciona un tipo de evento" :opciones="tipo" v-model="form.tipo" />
                            </div>
                            <!-- <div class="col-12 m-0" v-if="form.tipo=='reunion'" >
                                <div class="row w-100 m-0 px-1 letra-rojo-14 ">*Recuerda respetar las restricciones vigente en materia de Covid y aségurarte, con una prueba, estar negativo, antes de participar a una reunión.</div>
                            </div> -->
                            <div class="col-12 m-0" v-if="form.tipo=='party'" >
                                <div class="row w-100 m-0 px-1 letra-gray3-14 ">*Un regalo grupal es 1 o varios productos, servicios y experiencias que puedes comprar entre 1 o mas personas para regalárselas a un tercero o para que te lo regalen a ti.</div>
                            </div>
                            <div class="col-12 mt-3">
                                <inputForm 
                                    :key="form.tipo"
                                    :scroll="true" 
                                    :offset="300" 
                                    type="text" 
                                    placeholder="" 
                                    v-model="form.nombre"  
                                    :texto="`Nombre ${form.tipo=='party'?'del regalo grupal':form.tipo=='reunion'?'de la reunión':'del evento'}:`" />
                            </div>
                            <div class="col-12 mt-3">
                                <inputForm type="date" texto="Fecha:" placeholder="" v-model="form.fecha" :maxlength="50" @change="checkF" />
                            </div>
                            <div class="col-12 pt-2" v-if="form.tipo=='reunion'" >
                                <inputForm type="time" texto="Hora:" placeholder="" v-model="form.hora" :maxlength="50" />
                            </div>
                        </div>

                        <div class="row w-100 m-0 " v-if="form.tipo == 'reunion'">
                            <div class="row w-100 m-0 pb-3 back-color-blanco ">
                                <div class="col-12 mt-2">
                                    <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`">Lugar</div>
                                </div>
                                <div class="col-12 mt-2">
                                    <div class="row w-100 m-0" v-if="!form.otro">
                                        <!-- <div class="row w-100 m-0 pb-3">Selecciona un lugar para la reunion:</div> -->
                                        <selectForm type="text" :cancel="true" :nulo="true" texto="Recomedados por SocialFlow" :opciones="lugares" v-model="form.lugar" />
                                    </div>

                                    <div class="row w-100 m-0 pt-3" v-if="!form.lugar">
                                        <selectForm 
                                            :key="form.otro" 
                                            type="text" 
                                            :cancel="true" 
                                            :nulo="true" 
                                            texto="Otro lugar:" 
                                            extraText="*En este apartado verás todos los nuevos domicilios que hayas agregado." 
                                            llave="calle" 
                                            nombre="calle" 
                                            :opciones="domicilios" 
                                            v-model="form.otro" 
                                        />
                                    </div>

                                    <!-- <div class="row w-100 m-0 letra-rojo-15" >{{form.otro}}</div> -->

                                    <div class="row w-100 m-0 mt-3" v-if="!form.lugar" @click="updating('/nuevo_domicilio')" >
                                        <div class="row w-100 m-0 py-1 border-b-gray-1 pl-2">
                                            <div class="col my-auto px-0 letra-gray3-16">Agregar nuevo domicilio</div>
                                            <div class="col-auto my-auto px-0">
                                                <icono icono="chevron_right" clase="letra-gray3-35 pt-5px" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <reunionFestejado />

                        <reunionUsuarios />

                        <reunionRegalos v-if="form.tipo == 'party'" />

                        <template v-if="form.tipo == 'party'" >
                        <template v-if="form.externo == 'no'" >
                            <div class="row w-100 m-0 mt-4 back-color-blanco" v-if="regalosForm && regalosForm.length">
                                <div class="row w-100 m-0" v-if="regalosForm.some(x=>{return x.tipo == 'producto'})" >
                                    <template v-if="!form.canjear_qr">
                                        <div class="row w-100 m-0 px-3 pt-2" @click="updating('/mis_domicilios')">
                                            <div class="row w-100 m-0">
                                                <div class="col px-0 letra-azul1-19 fw-800 text-capitalize">dirección de entrega</div>
                                                <div class="col-auto px-0 pt-3 letra-azul-15 border-b-azul-1">Click para cambiar</div>
                                            </div>
                                        </div>
                                        <div class="row w-100 m-0 back-color-blanco py-2" @click="updating('/mis_domicilios')"  >
                                            <template v-if="usuario && usuario.id">
                                                <template v-if="domicilioU && domicilioU.id">
                                                    <div class="row w-100 m-0 px-3">
                                                        <div class="col px-0 letra-azul1-16">{{domicilioU.calle}} {{domicilioU.numero}}</div>
                                                    </div>
                                                    <div class="row w-100 m-0 px-3 pt-1">
                                                        <div class="col px-0 letra-azul1-14">{{domicilioU.municipio}}, {{domicilioU.estado}}</div>
                                                    </div>
                                                </template>
                                                <div class="row w-100 m-0 px-3" v-else >
                                                    <div class="col-auto my-auto px-0 py-2 letra-azul1-16"> Selecciona una dirección de entrega</div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <template v-if="domicilio && domicilio.id">
                                                    <div class="row w-100 m-0 px-3">
                                                        <div class="col px-0 letra-azul1-16">{{domicilio.calle}} {{domicilio.numero}}</div>
                                                    </div>
                                                    <div class="row w-100 m-0 px-3 pt-1">
                                                        <div class="col px-0 letra-azul1-14">{{domicilio.municipio}}, {{domicilio.estado}}</div>
                                                    </div>
                                                </template>
                                                <div class="row w-100 m-0 px-3" v-else >
                                                    <div class="col-auto my-auto px-0 py-2 letra-azul1-16"> Selecciona una dirección de entrega</div>
                                                </div>
                                            </template>

                                        </div>
                                    </template>

                                    <div class="row w-100 m-0" v-if="0" >
                                        <div class="row w-100 m-0 pr-3 pb-3 pt-3">
                                            <div class="row m-0 w-100">
                                                <div class="col my-auto letra-gray3-16 p-0 pl-3">No necesita dirección de entrega, enviarme un QR</div>
                                                <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                                                    <toggle :checked="form.canjear_qr" @change="form.canjear_qr = !form.canjear_qr" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </template>
                        </template>

                        <reunionAmenidades />

                        <reunionMetodoPago />

                        <reunionPartners v-if="form.tipo == 'reunion'" />

                        <reunionWishlistUsuario />
                        
                    </div>
                </div>


                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="row w-100 m-0 justify-content-center mt-2 pb-5">
                        <div class="col-12 px-4 py-3 back-color-blanco" >
                            <template v-if="form.tipo == 'party'">
                                <botonApp tipo="azul" texto="Guardar y enviar invitación" radius="30px" @click="save" />
                            </template>
                            <template v-else>
                                <template v-if="form.cooperacion == 'no'">
                                    <botonApp tipo="azul" texto="Enviar invitacion y pagar" radius="30px" @click="save" />
                                </template>
                                <template v-else>
                                    <botonApp tipo="azul" texto="Guardar y enviar invitación" radius="30px" @click="save" />
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 pb-5"></div>
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
                hora: moment().format('HH:mm'),
                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'feminino', nombre: 'Feminino'},
                ],
                tipo:[
                    { id: 'reunion', nombre: 'Reunion'},
                    { id: 'party', nombre: 'Regalo grupal'},
                ],
                acepto: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            
            lugares(){return this.$store.getters.userStateArray('lugares');},

            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }); },

            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
            nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
            listaRegalosForm(){return this.$store.getters.userStateArray('listaRegalosForm');},

            domicilios(){return this.$store.getters.carritoArray('domicilios');},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},

            domiciliosU(){return this.usuario.direcciones || [];},
            domU(){return this.$store.getters.carritoObject('domicilio');},
            domicilioU(){return this.domicilios.find(s=>s.id == this.dom) ||  {}; }, 

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
            // console.log("######## FORM", this.form);
        },
        methods:{

            checkF(){
                if(this.form.fecha < this.hoy){
                    swal("","No puedes crear eventos, que tengan una fecha anterior","");
                    return;
                }
            },
            
            checkHH(){
                if(this.form.fecha == this.hoy){
                    if(this.form.hora <= this.hora){
                        swal("","Debes crear el con 4 horas de anticipacion","");
                        return;
                    }
                }
            },

            save(){
                
                if(!this.form.tipo){
                    swal("",`Selecciona el tipo de evento`,"");
                    return;
                }

                if(!this.form.nombre){
                    swal("",`Por favor ingresa el nombre de tu ${this.form.tipo=='party'?'Regalo grupal':'Reunion'}`,"");
                    return;
                }

                if(this.form.tipo == 'reunion'){
                    if(!this.form.lugar && !this.form.otro){
                        swal("","Por favor ingresa o seleciona el lugar de la reunion","");
                        return;
                    }
                    if(this.form.lugar){
                        let y = this.lugares.find(x=>{return x.id == this.form.lugar; });
                        if(y){
                            this.form.lat = y.lat;
                            this.form.lng = y.lng;
                        }
                    }
                    if(this.form.otro){
                        let y = this.domicilios.find(x=>{return x.calle == this.form.otro; });
                        if(y){
                            this.form.domicilios_id = y.id;
                            this.form.lat = y.lat;
                            this.form.lng = y.lng;
                        }
                    }
                }
                if(this.form.tipo == 'party'){
                    if(!this.regalosForm || !this.regalosForm.length){
                        swal("","Selecciona por lo menos un producto para el regalo grupal.","");
                        return;
                    }
                    // console.log("REGLOAS FORMI", this.regalosForm);

                    if(this.regalosForm.some(x=>{return x.tipo == 'producto'})){
                        // if(!this.form.canjear_qr){
                        //     if(!this.domicilio || !this.domicilio.id){
                        //         swal("","Por favor selecciona un direccion de entrega","");
                        //         return;
                        //     }
                        // }
                    }else{
                        // this.form.canjear_qr = true;
                    }
                }

                if(this.form.fecha < this.hoy){
                    swal("","No puedes crear eventos, que tengan una fecha anterior","");
                    return;
                }

                this.form.domicilios_id = this.domicilio.id;
                this.$store.dispatch('postAgregarEvento',this.form);
            },

            updating(ruta){
                // console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                if(ruta){
                    console.log("ROUTING", ruta);
                    this.router.navigate(ruta);
                }
            },

            ver(){
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.router.navigate('/deseos_usuario_evento');
            },

            add(a){
                this.$store.commit('addUser',a);
                // console.log("USUARIOS", this.usuariosForm)
            },

            addX(a){
                // console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'lista']);
                this.router.navigate('/regalos_eventos'); 
            },

            addY(a){
                // console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'wish']);
                this.router.navigate('/mis_deseos_eventos'); 
            },

            addW(a){
                // console.log("UPDATING", this.form);
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