<template>
    <f7-page id="inicio">
        <nav-bar tipo="inicio" :backs="true" :title="'Registro Tarjeta'"></nav-bar>
        <div class="contenedor-page padding-bottom-90 back-color-blanco">
            <div class="row w-100 m-0 px-3">
                 <div class="row w-100 m-0 mt-3 px-3">
                    <div class="row w-100 m-0 letra-gray3-18 justify-content-center text-center px-2">Ingresa los datos de la cuenta de donde tomaremos los fondos.</div>
                </div>
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
            <div class="row w-100 m-0 justify-content-center mt-3 pt-4 pb-5">
                <div class="col-12">
                    <botonApp @click="check()" texto="Registrarse" radius="10px" />
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                suscripcion: 'mensual',
                card:{
                    number: null,
                    expiracion:null,
                    cvv: null,
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
        },
        methods:{
            check(){   
                // if(device.platform == null || device.platform == 'browser'){
                //     this.card.expiracion = '2020-06';
                // }
                // if(!this.card.number || !this.card.expiracion || !this.card.cvv){
                //     swal("Debe llenar todos los campos","","info");
                //     return;
                // }
                // let data ={
                //         token_card : 'token_card_946543216',
                //         end: this.card.number.substr(this.card.number.length - 4),
                //         brand: 'visa',
                // }
                this.save();
            },
            save(data = {}){
                this.$store.dispatch('postLogin',[{email: 'alonso@sustam.com', password: '123456'}]);
                // this.$store.commit('changeView','usuario');
                // this.$store.dispatch('postRegistro', data);
            },

        }
    }
</script>