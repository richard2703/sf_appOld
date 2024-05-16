<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px position-relative ">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-azul1-40 fw-600" />
                </div>

                <div class="row w-100 m-0 px-2 pt-4">
                    <div class="row w-100 m-0 pt-2">
                        <div class="row w-100 m-0 border-b-azul1-1 ">
                            <div class="col  px-0" @click="tab=1">
                                <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==1)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">Filtro por tipo</div>
                            </div>
                            <div class="col  px-0" @click="tab=2">
                                <div class="row w-100 m-0 justify-content-center text-center py-15px" :class="`${(tab==2)?'back-color-azul1 letra-blanco-17':'back-color-blanco letra-azul1-17'}`">Filtro por region</div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 mb-2 px-1" v-if="tab==1">
                        <div class="row w-100 m-0 pt-3 px-5px">
                            <div class="col-auto mb-auto px-0 " @click="form.tipo = 'mayor'" >
                                <icono icono="radio_button_checked" clase="letra-azul1-30" v-if="form.tipo == 'mayor'" />
                                <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else />
                            </div>
                            <div class="col px-0 pl-2">
                                <inputForm texto="Mayor precio" type="number" :maxlength="50"  placeholder="" v-model="form.mayor" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-3 px-5px">
                            <div class="col-auto mb-auto px-0 " @click="form.tipo = 'menor'" >
                                <icono icono="radio_button_checked" clase="letra-azul1-30" v-if="form.tipo == 'menor'" />
                                <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else />
                            </div>
                            <div class="col px-0 pl-2">
                                <inputForm texto="Menor precio" type="number" :maxlength="50"  placeholder="" v-model="form.menor" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-3 px-5px">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0" @click="form.tipo = '1'">
                                    <div class="col-auto my-auto px-0">
                                        <icono icono="radio_button_checked" clase="letra-azul1-30" v-if="form.tipo == '1'" />
                                        <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else />
                                    </div>
                                    <div class="col px-0 pl-3 mb-auto mt-2px letra-gray3-18">Producto</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-3">
                                <div class="row w-100 m-0" @click="form.tipo = '2'">
                                    <div class="col-auto my-auto px-0">
                                        <icono icono="radio_button_checked" clase="letra-azul1-30" v-if="form.tipo == '2'" />
                                        <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else />
                                    </div>
                                    <div class="col px-0 pl-3 mb-auto mt-2px letra-gray3-18 text-capitalize">servicio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 mb-2 px-1" v-if="tab==2">
                        <div class="row w-100 m-0 pt-3 px-5px">
                            <div class="col-12">
                                <selectForm type="text" texto="Estado" :opciones="estados" v-model="form.estado" @change="form.ciudad = null; print()" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-3 pb-3 px-5px">
                            <div class="col-12">
                                <selectForm type="text" texto="Ciudad" :opciones="ciudades" v-model="form.ciudad" />
                            </div>
                        </div>
                       
                    </div>
                    <div class="row w-100 m-0 pt-2 px-1">
                        <div class="col-4 px-1">
                            <botonApp texto="Limpiar" radius="50px" tipo="gris" @click="cancelar()" />
                        </div>
                        <div class="col-8 px-1" v-if="tab == 1">
                            <botonApp texto="Aplicar" tipo="azul" radius="50px" @click="next()" />
                        </div>
                        <div class="col-8 px-1" v-if="tab == 2">
                            <botonApp texto="Aplicar" tipo="azul" radius="50px" @click="next2()" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
export default {
    data(){
        return {
            tab: 1,
            name: 'modalCancelar',
            razon: '',
            calificaion:0,
            form:{
                activo: false,
                mayor: null,
                menor: null,
                tipo: null,
                estado: null,
                ciudad: null,
            },
        };
    },
    props: [
        'emit',
        'texto',
        'boton'
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        estados(){return this.$store.getters.getCatalogo('estados');},
        ciudades(){
            if(this.form.estado){
                return (this.estados.find(s=>s.id == this.form.estado) || {}).municipios || []
            }
            return [];
        },
    },
    methods:{

        closeModal(){
            this.$emit('close');
        },

        print(){
            console.log("FORM", this.form);
        },

        cancelar(){
            this.form.activo= false;
            this.form.mayor= null;
            this.form.menor= null;
            this.form.tipo= null;
            this.form.estado= null;
            this.form.ciudad= null;
            console.log("FORM FORM", this.form);
            this.$emit('input', this.form);
            // this.closeModal();
        },

        next(){
            if(!this.form.mayor && !this.form.menor && !this.form.tipo){
                swal("","Selecciona un filtro para aplicar","");
                return;
            }
            this.form.activo = true;
            if(this.form.tipo == 'mayor'){
                if(!this.form.mayor){
                    swal("","Ingresa el monto mayor","");
                    return;
                }
                this.form.menor = null;
                this.form.tipo = null;
            }
            if(this.form.tipo == 'menor'){
                if(!this.form.menor){
                    swal("","Ingresa el monto menor","");
                    return;
                }
                this.form.mayor = null;
                this.form.tipo = null;
            }
            this.$emit('input', this.form);
            console.log("FORMING ", this.form);
            this.closeModal();
        },

        next2(){
            if(!this.form.estado && !this.form.ciudad){
                swal("","Selecciona un filtro para aplicar","");
                return;
            }
            this.form.activo = true;
            this.$emit('input', this.form);
            console.log("FORMING ", this.form);
            this.closeModal();
        }
    },
}
</script>