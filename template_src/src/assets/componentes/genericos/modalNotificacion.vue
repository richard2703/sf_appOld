<template>
<!-- <transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"> -->
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-2" v-if="state">
        <div class="row w-100 m-0 pt-40px">
            <div class="row w-100 m-0 mt-5 pt-3 px-2 justify-content-center" v-if="info && info.tipo"  >
            <!-- <div class="row w-100 m-0 mt-5 pt-3 px-2 justify-content-center"  > -->
                <div class="col-12 px-0 back-color-blanco border-radius-15px overflow-hidden">
                    <div class="row w-100 m-0 px-0 pt-3">
                        <div class="row w-100 m-0 pb-3">

                            <div class="row w-100 m-0 justify-content-center" v-if="info.icono == 'error' ">
                                <div class="row w-100 m-0 justify-content-center text-center">
                                    <div class="w-80px h-80px border-radius-50 overflow-hidden border-azul1-3 text-center align-content-center">
                                        <div class="row w-100 m-0 justify-content-center text-center ">
                                            <icono icono="done_outline" clase="letra-azul1-49 fw-800 mt-10px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 justify-content-center" v-else >
                                <div class="row w-100 m-0 justify-content-center">
                                    <div class="w-80px h-80px border-radius-50 overflow-hidden border-azul1-3 text-center align-content-center">
                                        <div class="row w-100 m-0 justify-content-center text-center ">
                                            <icono icono="done_outline" clase="letra-azul1-49 fw-800 mt-10px" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 px-0 pt-3">
                                <div class="row w-100 m-0 px-3 letra-gray4-20 justify-content-center text-center white-space-preline">{{info.msg}}</div>
                            </div>
                            <div class="row w-100 m-0 px-0 pt-3">
                                <div class="row w-100 m-0 px-3 letra-gray3-17 justify-content-center text-center white-space-preline">{{info.body}}</div>
                            </div>

                        </div>
                           
                    </div>
                    <div class="row w-100 m-0 justify-content-center">
                        <div class="col-10 px-0 pt-3 pb-4 px-1" @click="closeModal()">
                            <botonApp texto="Aceptar" tipo="azul"  radius="30px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- </transition> -->
</template>
<script>
export default {
    data(){
        return {
            name: 'modalNotificacion',
        };
    },
    props: [],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        info(){return this.$store.getters.notiInfo || {};},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        aceptar(){
            this.$store.dispatch('postLeerTransaccion', this.notificacion);
            this.closeModal();
        },
    },
}
</script>