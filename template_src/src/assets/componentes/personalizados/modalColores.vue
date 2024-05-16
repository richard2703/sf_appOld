<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" >
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-2">
                    <div class="row w-100 m-0 justify-content-center py-2">
                        <div class="col-12 px-1 py-2 text-center letra-gray-light-4-1vw">Selecciona el color que deseas:</div>
                    </div>
                    <div class="row w-100 m-0 mb-2 px-1">
                        <div class="row w-100 m-0  justify-content-center ">
                            <div class="w-auto px-2 py-2" v-for="c of colores" :key="c.p" @click="set(c)" >
                                <div :class="`h-50px w-50px border-radius-5px carta ${c.p == color.p?'border-negro-1':''} `" :style="`background-color: ${c.p}`"></div>
                            </div>                            
                        </div>
                    </div>


                    <div class="row w-100 m-0 pt-2 px-1">
                        <div class="col-11 mx-auto px-1" @click="closeModal()" >
                            <botonApp texto="Aceptar" tipo="gris"  />
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
            // color:  { p: '#dbdbdb', l:'#262a65' },
            colores: [
                { p: '#dbdbdb', l:'#262a65' },
                { p: '#262a65', l:'white' },
                { p: '#05789b', l:'white' },
                { p: '#6f73aa', l:'white' },
                { p: '#ce6cbe', l:'white' },
                { p: '#dbcad4', l:'white' },
                { p: '#30bced', l:'white' },
                { p: '#fce837', l:'black' },
                { p: 'white',   l:'#262a65' },
                { p: '#ff9e03', l:'#262a65' },
                { p: '#f82929', l:'white' },
                { p: '#498a80', l:'#262a65' },
                { p: '#4cd77c', l:'#262a65' },
                { p: '#004445', l:'white' },
                { p: '#72b606', l:'#262a65' },
            ],
        };
    },
    props: [
        'emit',
        'color',
        'boton'],
    computed: {
    },
    created() {
    },
    updated() {
    },
    methods:{
        closeModal(){
            this.$emit('close');
        },
        cancelar(){
            this.closeModal();
        },

        set(c){
            this.$emit('click', c);
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