<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-4" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px mt-90px px-5 pt-90px" @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-azulapp py-3 border-radius-15px" @click.self="closeModal()">
                <div class="row w-100 m-0" @click.self="closeModal()">
                     <div class="row w-100 m-0 justify-content-around">
                        <div class="col-6 m-0 w-100 p-0 my-auto border-r-blanco-1">
                            <button class="button h-100 boton-transparente" @click="takePhoto()">
                                <div class="row m-0 h-100 justify-content-center">
                                    <div class="col-12 px-3">
                                        <img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/camera2.svg" alt="">
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="col-6 m-0 w-100 p-0 my-auto">
                             <button class="button h-100 boton-transparente" @click="takePicture()">
                                <div class="row m-0 h-100 justify-content-center">
                                    <div class="col-12 px-3">
                                        <img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/gallery.svg" alt="">
                                    </div>
                                </div>
                            </button>
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
    props: ['updateImg'],
    data(){
        return {
            name: 'seleccionarImagen',
        };
    },
    computed:{
        state(){return this.$store.getters.getModal(this.name)},
    },
    created(){
    },
    updated(){
    },
    methods:{
        takePhoto(){
            this.$store.dispatch('getFotoFunction', [this.updateImg]);
            this.closeModal();
        },
        takePicture(){
            this.$store.dispatch('selectFotoFunction', [this.updateImg]);
            this.closeModal();
        },
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
    },
}
</script>