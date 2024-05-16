<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco position-relative py-3 border-radius-15px">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-verde5-40" />
                </div>

                <div class="row w-100 m-0 py-2 pt-4">
                    <div class="row w-100 m-0 px-2 py-2">
                        <imagen :user="true" :src="usuario.foto" />
                    </div>
                    <div class="row w-100 m-0 px-2">
                        <div class="row w-100 m-0 letra-gray4-20 justify-content-center text-center">{{usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-18 justify-content-center text-center">{{usuario.email}}</div>
                        <div class="row w-100 m-0 letra-azul1-16 justify-content-center text-center">Amigos: {{usuario.amigos || 2}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
const moment = require('moment');
export default {
    props:[
        'usuario',
    ],
    data(){
        return {
            name: 'modalUsuario',
        };
    },
   
    computed:{
        state() {return this.$store.getters.getModal(this.name)},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
    },
}
</script>