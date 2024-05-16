<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Forma de pago'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 letra-gray3-18 justify-content-center text-center px-2">Ingresa los datos de la cuenta donde depositaremos las ganancias</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-12 mt-3">
                            <selectForm texto="Banco" :opciones="bancos" llave="nombre" placeholder="Selecciona uno" v-model="form.banco" />
                        </div>
                        <div class="col-12 mt-3">
                            <inputForm type="text" texto="Beneficiario:" placeholder="" v-model="form.beneficiario" />
                        </div>
                        <div class="col-12 mt-3">
                            <inputForm type="text" texto="Cuenta:" placeholder="" v-model="form.cuenta" />
                        </div>
                        <div class="col-12 mt-3">
                            <inputForm type="number" texto="Clabe interbancaria:" :maxlength="20" placeholder="" v-model="form.clave" />
                        </div>
                    </div>
                </div>
                <div class="row m-0 w-100 px-1 mt-4">
                    <div class="col my-auto letra-gray4-13 p-0 pl-3">He leído y acepto los <a class="color-rojo1" href="/terminos_condiciones" >Términos y Condiciones</a> y el <a class="color-rojo1" href="/aviso_privacidad" >Aviso de privacidad</a> de BIT ME</div>
                    <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                        <toggle :checked="acepto" @change="acepto = !acepto" />
                    </div>
                </div>
                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp texto="Continuar" radius="10px" @click="save" />
                    </div>
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
                form:{
                    foto:       this.$store.getters.getFormRegistro.foto,
                    nombre:     this.$store.getters.getFormRegistro.nombre,
                    email:      this.$store.getters.getFormRegistro.email,
                    telefono:   this.$store.getters.getFormRegistro.telefono,
                    password:   this.$store.getters.getFormRegistro.password,
                },
                confirm_password: null,
                acepto: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            bancos(){return this.$store.getters.getCatalogo('bancos');},
        },
        methods:{
            save(){
                // if(!this.form.nombre || !this.form.email || !this.form.password){
                //     swal("","Por favor llene todos los campos","");
                //     return;
                // }
                // if(this.form.password != this.confirm_password){
                //     swal("", "Las contraseñas no coinciden","");
                //     return;
                // }
                // if(!this.acepto){
                //     swal("", "Debes aceptar los terminos y condiciones","");
                //     return;
                // }
                // this.$store.commit('setFormRegistro', this.form);
                this.router.navigate('/registro_metodo_pago');
            }
          
        }
    }
</script>