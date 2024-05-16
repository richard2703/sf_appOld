<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <div class="contenedor-page-tabs back-color-blanco">
            <nav-bar tipo="inicio" :backs="true" :title="'Datos bancarios'" />
                <div class="row w-100 m-0">
                    <div class="col-12 mt-3">
                        <selectForm texto="Banco:" :opciones="bancos" llave="nombre" placeholder="Selecciona uno" v-model="form.banco" />
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
                <div class="row w-100 m-0 py-4 justify-content-center">
                    <div class="col-12">
                        <botonApp texto="Guardar" @click="save" radius="30px" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                form:{
                    id: this.$store.getters.getSession.id,
                    banco: this.$store.getters.getSession.banco,
                    beneficiario: this.$store.getters.getSession.beneficiario,
                    cuenta: this.$store.getters.getSession.cuenta,
                    clave: this.$store.getters.getSession.clave,
                }
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            bancos(){return this.$store.getters.getCatalogo('bancos');},
        },
        methods:{
            setImg(img){
                this.form.foto = img;
            },
            save(){
                this.$store.dispatch('postEditCuenta', [this.form]);
            },
        }
    }
</script>