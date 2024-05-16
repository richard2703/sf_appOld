<template>
    <div class="col-12 mt-4 pt-1 px-0" v-if="form.tipo == 'reunion'" >
        <div class="row w-100 m-0 px-3 py-3 back-color-blanco"  >
            <div class="col-12 mt-2 px-0">
                <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`">Amenidades</div>
            </div>
            <div class="row w-100 m-0 border-b-gray1-1" >
                <!-- <div class="col-12 px-0 letra-gray4-19">Amenidades</div> -->
                <div class="col-12 px-0 pt-2">
                    <div class="row w-100 m-0">
                        <div class="col px-0" @click="setCooperacion('si')">
                            <div class="row w-100 m-0">
                                <div class="col-auto my-auto px-0">
                                    <icono icono="radio_button_checked" clase="letra-rojo2-30" v-if="form.cooperacion == 'si'" />
                                    <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                </div>
                                <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">Cooperación</div>
                            </div>
                        </div>
                        <div class="col px-0" @click="setCooperacion('no')">
                            <div class="row w-100 m-0">
                                <div class="col-auto my-auto px-0">
                                    <icono icono="radio_button_checked" clase="letra-rojo2-30" v-if="form.cooperacion == 'no'" />
                                    <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                </div>
                                <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">El host paga</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="col px-0 letra-gray3-16" @click="updating('/agregar_concepto_gasto')">Agregar Productos o gastos para cooperar</div>
                <div class="col-auto px-0 letra-gray3-18" @click="updating('/agregar_concepto_gasto')">
                    <icono icono="add" clase="letra-gray3-25" />
                </div> -->
                <div class="col px-0 letra-gray3-16" @click="addW()" >Agregar productos, servicios o experiencias.</div>
                <div class="col-auto px-0 letra-gray3-18" @click="addW()" >
                    <icono icono="add" clase="letra-gray3-25" />
                </div>
            </div>
            <div class="row w-100 m-0 pb-1">
                <div class="row w-100 m-0" v-for="(a) of listaRegalosForm" :key="a.id" >
                    <div class="row w-100 m-0 px-2 py-1 ">
                        <div class="w-10vw h-10vw">
                            <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                        </div>
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                            <div class="row w-100 m-0 letra-gray4-14">ID: {{a.id}}</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 py-1 " >
                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?(a.cantidad -= 1):(a.cantidad = a.cantidad)" >
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
                        <div class="w-60 px-0">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0">
                                    <div class="col px-0 my-auto letra-gray4-15">Precio:</div>
                                    <div class="col-auto my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ a.subprecio  | currency}} {{a.currency}}</div>
                                    </div>
                                </div>
                                <template v-if="Number(a.shipping_cost)">
                                    <div class="row w-100 m-0">
                                        <div class="col px-0 my-auto letra-gray4-15">Envio:</div>
                                        <div class="col-auto my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ Number(a.shipping_cost) | currency}} {{a.currency}}</div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0">
                                        <div class="col px-0 my-auto letra-gray4-15">Iva Envio:</div>
                                        <div class="col-auto my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ Number(a.shipping_cost) * 0.16 | currency}} {{a.currency}}</div>
                                        </div>
                                    </div>
                                </template>
                                <div class="row w-100 m-0">
                                    <div class="col px-0 my-auto letra-gray4-15">Cantidad:</div>
                                    <div class="col-auto my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ a.cantidad }} </div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0">
                                    <div class="col px-0 my-auto letra-gray4-15">Iva:</div>
                                    <div class="col-auto my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ ( ( a.subprecio  + Number(a.shipping_cost) ) * a.cantidad ) * ((a.iva == '1')?0.16:0 ) | currency }} {{a.currency}} </div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0">
                                    <div class="col px-0 my-auto letra-gray4-15">Total:</div>
                                    <template v-if="a.tipo_entrega == 'domicilio'">
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ ( ( a.subprecio  + Number(a.shipping_cost) * 1.16 ) * a.cantidad ) * ((a.iva == '1')?1.16:1)  | currency}} {{a.currency}}</div>
                                        </div>
                                    </template>
                                    <template v-else >
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{ ( a.subprecio * a.cantidad * ((a.iva == '1')?1.16:1) )| currency}} {{a.currency}}</div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row w-100 m-0 pt-2  ">
                        <div class="row w-100 m-0 pt-2  ">
                            <div class="col-6 px-0">
                                <div class="row w-100 m-0" @click="selecTienda(a)" >
                                    <div class="col-auto px-0">
                                        <icono clase="letra-azul1-25" v-if="a.tipo_entrega == 'tienda'" icono="radio_button_checked" />
                                        <icono clase="letra-gray3-25" v-else icono="radio_button_unchecked" />
                                    </div>
                                    <div class="col pl-2 px-0 letra-gray3-14">Recoger en tienda / QR</div>
                                </div>
                            </div>
                            <div class="col-6 px-0">
                                <div class="row w-100 m-0" @click="selecEnvio(a)" >
                                    <div class="col-auto px-0">
                                        <icono clase="letra-azul1-25" v-if="a.tipo_entrega == 'domicilio'" icono="radio_button_checked" />
                                        <icono clase="letra-gray3-25" v-else icono="radio_button_unchecked" />
                                    </div>
                                    <div class="col pl-2 px-0 letra-gray3-14">Entregar en domicilio</div>
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 pb-2" v-if="a.tipo_entrega == 'domicilio'">
                            <div class="col-auto px-0 ml-auto">
                                <inputForm type="time" texto="Hora entrega en el domicilio:" placeholder="" v-model="a.hora_entrega" :maxlength="100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row w-100 m-0 mt-2 " >
            <div class="row w-100 m-0 mt-2 py-2 back-color-blanco" >
                <template v-if="listaRegalosForm.length">
                    <div class="row w-100 m-0 px-2">
                        <div class="col px-0 letra-gray3-17">Subtotal:</div>
                        <div class="col-auto px-0 letra-azul-18 pr-4">{{ subtotal | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 px-2">
                        <div class="col px-0 letra-gray3-17">IVA del producto:</div>
                        <div class="col-auto px-0 letra-azul-18 pr-4">{{ subtotal_paraiva * 0.16 | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 px-2">
                        <div class="col px-0 letra-gray3-17">Costo de envió:</div>
                        <div class="col-auto px-0 letra-azul-18 pr-4">{{ envio | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 px-2">
                        <div class="col px-0 letra-gray3-17">IVA del costo de envió:</div>
                        <div class="col-auto px-0 letra-azul-18 pr-4">{{envio*0.16 | currency}}</div>
                    </div>
                </template>

                <div class="row w-100 m-0 px-2">
                    <div class="col px-0 letra-gray3-17">Total:</div>
                    <div class="col-auto px-0 letra-azul-18 pr-4">{{totalCantidad(listaRegalosForm) | currency}}</div>
                </div>
                <template v-if="listaRegalosForm.length">
                    <div class="row w-100 m-0 px-2">
                        <div class="col px-0 letra-gray3-17">Tiempo de envio:</div>
                        <div class="col-auto px-0 letra-azul-18 pr-4">{{tiempo }} dias</div>
                    </div>
                </template>
                <div class="row w-100 m-0 px-2" v-if="form.cooperacion == 'si'" >
                    <div class="col px-0 letra-gray3-14" >Cooperacion por invitado ({{(usuariosForm.filter(x=>x.cooperar).length + 1)}}):</div>
                    <div class="col-auto px-0 letra-azul-18 pr-4" >{{totalCantidad(listaRegalosForm) / (usuariosForm.filter(x=>x.cooperar).length + 1) | currency}} MXN</div>
                </div>
            </div>
        </div>

    </div>
</template>
                     
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        data(){
            return{
                hoy: moment().format('YYYY-MM-DD'),
            }
        },

        mounted(){
            console.log("PROD PROD PROD PRDO", this.listaRegalosForm);
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

            cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},

            total(){return (a)=>{ let x = 0; a.map(y=>{x = x + Number(y.precio)}); return x; } },

            subtotal(){
                    let x = 0; 
                    this.listaRegalosForm.map(y=>{ 
                        if(y.currency == 'USD'){
                            x = x + ((Number(y.subtotals)* Number(y.cantidad)) *this.cambioUSD);
                        }
                        else{
                            x = x + (Number(y.subtotals)* Number(y.cantidad));
                        }
                    }); 
                    return x; 
            },
            subtotal_paraiva(){
                    let x = 0; 
                    this.listaRegalosForm.map(y=>{ 
                        if(y.iva == '1'){
                            if(y.currency == 'USD'){
                                x = x + ((Number(y.subtotals)* Number(y.cantidad)) *this.cambioUSD);
                            }
                            else{
                                x = x + (Number(y.subtotals)* Number(y.cantidad));
                            }
                        }
                    }); 
                    return x; 
            },
            envio(){
                    let x = 0; 
                    this.listaRegalosForm.map(y=>{ 
                        if(y.currency == 'USD'){
                            x = x + ((Number(y.shipping_cost)* Number(y.cantidad)) *this.cambioUSD);
                        }
                        else{
                            x = x + (Number(y.shipping_cost)* Number(y.cantidad));
                        }
                    }); 
                    return x; 
            },
            tiempo(){
                let x = 0; 
                this.listaRegalosForm.map(y=>{ 
                    if(x < Number(y.tiempo)){
                        x = Number(y.tiempo);
                    }
                }); 
                return x; 
            },
            totalCantidad(){return (a)=>{ 
                let x = 0; 
                a.map(y=>{ 
                    if(y.currency == 'USD'){
                        x = x + ((Number(y.subtotals) * Number(y.cantidad)) *this.cambioUSD);
                    }
                    else{
                        x = x + (Number(y.subtotals) * Number(y.cantidad));
                    }
                }); 
                return x  + (this.subtotal_paraiva * 0.16) + (this.envio*1.16) ; 
            }},
            
        },

        methods:{

            saveForm(key,val){
                this.form[key] = val;
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
            },

            updating(ruta){
                // console.log("UPDATING", this.form);
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

            setCooperacion(val){
                this.form.cooperacion = val;
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.usuariosForm.map(u=>{
                    if(val == 'si'){
                        u.cooperar = true;
                    }else{
                        u.cooperar = false;
                    }
                });
            },

            ver(){
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.router.navigate('/deseos_usuario_evento');
            },

            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
            },

            cooperar(u,val){
                u.cooperar = val;
                this.form.cooperacion = 'si';
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
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

            addW(a){
                console.log("UPDATING", this.form, this.router);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'amenidad']);
                this.router.navigate('/regalos_eventos'); 
            },

            eliminarProd(a){
                console.log("REMOVING", a);
                this.$store.commit('userRemoveToArray',[a, 'listaRegalosForm']);
            },
          
        }
    }
</script>