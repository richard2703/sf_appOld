<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">

    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0 px-3 pt-5 mt-5">
        <div class="row w-100 m-0 pt-5 mt-5">

            <div class="row w-100 m-0 mt-5 back-color-blanco position-relative py-3 border-radius-15px">
                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-gray3-35" />
                </div>

                <div class="row w-100 m-0 py-2">
                    <div class="row w-100 m-0 back-color-blanco justify-content-start px-3" v-if="state">
                        <div class="row w-100 m-0 pt-3 pb-2">
                            <div class="row w-100 m-0 letra-gray3-16 fw-600 justify-content-center text-center ">{{session.alternativo}}</div>
                        </div>
                    </div>
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
        'state',
    ],
    data(){
        return {
            name: 'modalInfo',
            cancel: false,
            destino: null,
        };
    },
   
    computed:{
        session(){return this.$store.getters.getSession;},
    },
    
    methods:{
        closeModal(){
            this.$emit('close');
        },
        cancelar(){
            this.closeModal();
        },
        
    },
}
</script>