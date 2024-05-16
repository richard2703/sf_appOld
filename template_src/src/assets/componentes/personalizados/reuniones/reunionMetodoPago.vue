<template>
    <div v-if="form.cooperacion == 'no'" class="row w-100 m-0 " >
          <template>
            <template>
                <div class="row w-100 m-0 px-3 pt-3 mt-4 back-color-blanco">
                    <div  :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`" >Información de pago</div>
                </div>
                <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/metodos_pago')">
                    <div class="row w-100 m-0 px-3" v-if="metodoPagoId == 'monedero'">
                        <div class="w-40px">
                            <imagen :icono="true" src="pp" />
                        </div>
                        <div class="col my-auto letra-gray3-16 px-2">Monedero {{session.monedero | currency}} MXN</div>
                    </div>
                    <div class="row w-100 m-0 px-3" v-else-if="metodo_pago && metodo_pago.id" >
                        <div class="col-auto my-auto px-0">
                            <div class="w-80px">
                                <imagen :icono="true" :src="metodo_pago.brand.toLowerCase()" />
                            </div>
                        </div>
                        <div class="col my-auto px-0 letra-gray3-17">**** {{metodo_pago.ending}}</div>
                    </div>
                    <div class="row w-100 m-0 px-3" v-else >
                        <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Selecciona una metodo de pago</div>
                    </div>
                </div>
            </template>
            <template v-if="0" >
            <template v-if="metodoPagoId == 'monedero'">
                <div class="row w-100 m-0 px-3 pt-1">
                    <div class="row w-100 m-0 letra-azul1-17 text-uppercase">
                        <div class="col-auto px-0">Metodo de pago complementario:</div>
                        <div class="col-auto px-0 mr-auto pl-2 pt-3px " @click="modal = true">
                            <icono icono="info" clase="letra-azul1-20" />
                        </div>
                    </div>
                </div>
                    <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/metodos_pago_alternativo')">
                        <div class="row w-100 m-0 px-3" v-if="metodo_pago_alter == 'monedero'">
                            <div class="w-40px">
                                <imagen :icono="true" src="pp" />
                            </div>
                            <div class="col my-auto letra-gray3-16 px-2">Monedero {{session.monedero | currency}} MXN</div>
                        </div>
                        <div class="row w-100 m-0 px-3" v-else-if="cardAlter && cardAlter.id" >
                            <div class="col-auto my-auto px-0">
                                <div class="w-80px">
                                    <imagen :icono="true" :src="cardAlter.brand.toLowerCase()" />
                                </div>
                            </div>
                            <div class="col my-auto px-0 letra-gray3-17">**** {{cardAlter.ending}}</div>
                        </div>
                        <div class="row w-100 m-0 px-3" v-else >
                            <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Selecciona una metodo de pago</div>
                        </div>
                    </div>
            </template>
            </template>
        </template>
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
            session(){return this.$store.getters.getSession;},

            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},

            metodoPagoId(){return this.$store.getters.carritoObject('metodo_pago');},
            metodo_pago(){return this.$store.getters.getMetodoPago(this.metodoPagoId);},

            metodo_pago_alter(){return this.$store.getters.carritoObject('metodo_pago_alter');},
            cardAlter(){return this.$store.getters.getMetodoPago(this.metodo_pago_alter);},

            lugares(){return this.$store.getters.userStateArray('lugares');},
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }); },

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