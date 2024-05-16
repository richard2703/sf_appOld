<template>
    <f7-page id="inicio">
        <div class="vista">
        <nav-bar tipo="inicio" :backs="true" :title="'Nueva tarjeta'"></nav-bar>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3 px-3">
                    <div class="row w-100 m-0 my-auto py-1 px-4">
                        <div class="col px-0">
                            <imagen :icono="true" src="visa" />
                        </div>
                        <div class="col px-0">
                            <imagen :icono="true" src="amex" />
                        </div>
                        <div class="col px-0">
                            <imagen :icono="true" src="mastercard" />
                        </div>
                    </div>
                    <div class="col-12 px-1 mt-3">
                        <inputForm type="number" texto="Numero de la tarjeta:" placeholder="" v-model="card.number" :maxlength="16"  />
                    </div>
                    <div class="col-6 px-1 mt-4">
                        <inputForm :date="true" type="month"  texto="Vigencia (mes/año):" placeholder="MM/YY" v-model="card.expiracion"  />
                    </div> 
                    <div class="col-6 px-1 mt-4">
                        <inputForm type="number" texto="CVV" placeholder="***" v-model="card.cvv" maxlength="4"  />
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center px-3 pt-3">
                    <div class="col-12 px-0">
                        <boton-app @click="check()" texto="Agregar tarjeta" radius="35px"></boton-app>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                card:{
                    number: '',
                    expiracion:'',
                    cvv: '',
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            deviceReady(){return this.$store.getters.deviceready;},
            device(){return device.platform == 'browser' || device.platform == null},
        },
        methods:{
            check(){   
                if(!this.deviceReady){
                    this.card.expiracion = '2021-07';
                }
                if(!this.card.number || !this.card.expiracion || !this.card.cvv){
                    swal("Debe llenar todos los campos","","info");
                    return;
                }
                this.card.mes = moment(this.card.expiracion,'YYYY-MM').format('MM');
                this.card.year = moment(this.card.expiracion,'YYYY-MM').format('YYYY');
                console.log("CARD DATA", this.card);
                if(this.deviceReady){
                    this.checarNumero();
                }
                else{
                    // this.saveDebug();
                }
            },

            save(data){
                this.router.back();
            },
            
            checarNumero(){
                cordova.plugins.stripe.validateCardNumber(this.card.number, 
                (res)=>{
                    console.log("numero valido", res);
                    this.checarFecha();
                }, 
                (error)=>{
                    console.error("NUmero invalido", error);
                    swal("","El numero de la tarjeta es incorrecto", "error");
                });
            },

            checarFecha(){
                cordova.plugins.stripe.validateExpiryDate(this.card.mes, this.card.year, 
                (res)=>{
                    console.log("FECHA VALIDA", res);
                    this.checarCVC();
                }, 
                (error)=>{
                    console.error("FECHA INVALIDA", error);
                    swal( "","La fecha de expiración es incorrecta", "error");
                    return;
                });
            },

            checarCVC(){
                cordova.plugins.stripe.validateCVC(this.card.cvv,
                (res)=>{
                    console.log("CVC VALIDA", res);
                    this.createToken();
                }, 
                (error)=>{
                    console.error("CVC INVALIDA", error);
                    swal( "","El CVC es incorrecto", "error");
                    return;
                });
            },

            getBrand(){
                if(this.$store.getters.deviceready){
                    cordova.plugins.stripe.getCardType(this.card.number, function(cardType) {
                        console.log(cardType); // visa
                        return cardType;
                    });
                }
            },

            saveDebug(){
                let card = {
                    number: this.card.number,
                    expMonth: this.card.mes,
                    expYear: this.card.year,
                    cvc: this.card.cvv,
                    currency: 'MXN',
                };
                let data = {
                    ending: card.number.substr(card.number.length - 4),
                    brand: 'visa',
                    mes: card.expMonth,
                    year: card.expYear,
                    token_card: moment().format('X'),
                };
                this.save(data);
            },    

            createToken(){
                let card = {
                    number: this.card.number,
                    expMonth: this.card.mes,
                    expYear: this.card.year,
                    cvc: this.card.cvv,
                    currency: 'MXN',
                };
                try {
                    this.$store.commit('initLoader');
                    console.log("INTENT", card);
                    cordova.plugins.stripe.createCardToken(card,
                        result =>{
                            this.$store.commit('finishLoader');
                            card.ending = card.number.substr(card.number.length - 4);               
                            card.brand = (result.card.brand).toLowerCase();               
                            card.token_card = result.id;     
                            card.mes = card.expMonth;
                            card.year = card.expYear;
                            console.log("token para pago", result, card);   
                            this.save(card)                            
                        },
                        error=>{
                            this.$store.commit('finishLoader');
                            swal(error,"","error");
                        });
                }
                catch(error){
                    this.$store.commit('finishLoader');
                    swal("Error de red: revise su conexion", "", "error");                   
                }
            },      
            save(data){
                this.$store.dispatch('postAddMetodoPago', data);
            },          
        }
    }
</script>