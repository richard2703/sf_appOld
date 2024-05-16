<template>
    <div class="row w-100 m-0">
       
        <div class="row w-100 m-0 mt-2 border-t-gray1-1 total-regaslo-form">
             <template v-if="regalosForm.length">
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
            <template v-if="regalosForm.length">
                <div class="row w-100 m-0 px-2">
                    <div class="col px-0 letra-gray3-17">Tiempo de envio:</div>
                    <div class="col-auto px-0 letra-azul-18 pr-4">{{tiempo }} dias</div>
                </div>
            </template>
            <div class="row w-100 m-0 px-2">
                <div class="col px-0 letra-gray3-17">Total a pagar:</div>
                <div class="col-auto px-0 letra-azul-18 pr-4">{{totalCantidad(regalosForm) | currency}} MXN</div>
            </div>
            <div class="row w-100 m-0 px-2" v-if="form.cooperacion == 'si'" >
                <div class="col px-0 letra-gray3-15" v-if="form.externo=='si' || form.tipo == 'reunion'" >Cooperacion por invitado ({{(usuariosForm.filter(x=>x.cooperar).length + 1)}}): </div>
                <div class="col px-0 letra-gray3-15" v-else >Cooperacion por invitado ({{(usuariosForm.filter(x=>x.cooperar).length)}}): </div>

                <div class="col-auto px-0 letra-azul-20 pr-4" v-if="form.externo=='si' || form.tipo == 'reunion'">{{totalCantidad(regalosForm) / (usuariosForm.filter(x=>x.cooperar).length + 1) | currency}} MXN</div>
                <div class="col-auto px-0 letra-azul-20 pr-4" v-else >{{totalCantidad(regalosForm) / (usuariosForm.filter(x=>x.cooperar).length) | currency}} MXN</div>
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
                    this.regalosForm.map(y=>{ 
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
                    this.regalosForm.map(y=>{ 
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
                    this.regalosForm.map(y=>{ 
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
                this.regalosForm.map(y=>{ 
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