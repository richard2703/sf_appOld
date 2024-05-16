<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-2">
                    <div class="row w-100 m-0 justify-content-center py-2">
                        <div class="col-12 px-1 mb-1 text-center">
                            <div class="row w-100 m-0 letra-gray-dark-20 fw-800 justify-content-center">Pedido no entregado:</div>
                        </div>
                        <div class="col-12 px-1 py-2 text-center letra-gray-light-4-1vw">Ingresa la razon, de no entrega.</div>
                    </div>
                    <div class="row w-100 m-0 mb-2 px-1">
                        <div class="row w-100 m-0 px-5px">
                            <inputForm type="text" :textarea="true" rows="3" placeholder="" v-model="razon" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2 px-1">
                        <div class="col-6 px-1">
                            <boton-app texto="Salir" tipo="rojo" :outline="true" @click="cancelar()" ></boton-app>
                        </div>
                        <div class="col-6 px-1">
                            <boton-app texto="Enviar" @click="next()"></boton-app>
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
            name: 'modalCancelar',
            razon: '',
            calificaion:0,
        };
    },
    props: ['emit','texto','boton'],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
    },
    created() {
    },
    updated() {
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        next(){
            if(!this.razon){
                swal("","Ingresa el motivo de no entrega","");
                return;
            }
            this.closeModal();
            this.$emit('click', this.razon);
        }
    },
}
</script>