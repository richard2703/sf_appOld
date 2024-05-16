<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 justify-content-center py-2">
                        <div class="col-12 px-1 mt-2 mb-1 text-center">
                            <div class="row w-100 m-0 letra-gray4-5-1vw fw-800 justify-content-center">Califica tu este servicio:</div>
                        </div>
                        <div class="col-12 px-1 py-2 text-center letra-gray3-4-1vw">Cuéntanos que te pareció la atención en este servicio</div>
                    </div>
                    <div class="row w-100 m-0 mb-2">
                        <div class="col-12 mt-1">
                            <div class="row w-100 m-0 justify-content-center">
                                <div class="col-auto px-2" @click="calificaion = 1; $emit('input',calificaion)">
                                    <i class="material-icons " :class="(calificaion>=1)?'letra-verde4-8-5vw':'letra-gray3-8-5vw'">star</i>
                                </div>
                                <div class="col-auto px-2" @click="calificaion = 2; $emit('input',calificaion)">
                                    <i class="material-icons " :class="(calificaion>=2)?'letra-verde4-8-5vw':'letra-gray3-8-5vw'">star</i>
                                </div>
                                <div class="col-auto px-2" @click="calificaion = 3; $emit('input',calificaion)">
                                    <i class="material-icons " :class="(calificaion>=3)?'letra-verde4-8-5vw':'letra-gray3-8-5vw'">star</i>
                                </div>
                                <div class="col-auto px-2" @click="calificaion = 4; $emit('input',calificaion)">
                                    <i class="material-icons " :class="(calificaion>=4)?'letra-verde4-8-5vw':'letra-gray3-8-5vw'">star</i>
                                </div>
                                <div class="col-auto px-2" @click="calificaion = 5; $emit('input',calificaion)">
                                    <i class="material-icons " :class="(calificaion>=5)?'letra-verde4-8-5vw':'letra-gray3-8-5vw'">star</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2" v-if="false">
                        <div class="row w-100 m-0 px-1 py-2 text-center letra-gray3-4-1vw">Deseas agregar propina al servicio:</div>
                        <div class="row w-100 m-0">
                            <scollX cantidad="auto">
                                <div class="swiper-slide w-auto px-1 text-center" v-for="c of cantidades" :key="c" @click="propina = c" >
                                    <div class="w-auto px-1 py-1 border-radius-50px">
                                        <div class="w-auto" >
                                            <div class="row w-100 m-0 py-5px px-2 border-radius-8px text-capitalize justify-content-center fw-800" :class="(propina == c)?'letra-verde3-15 border-verde3-1':'letra-gray3-15 border-gray3-1'">{{c | currency}}</div>
                                        </div>
                                    </div>
                                </div>
                            </scollX>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-3">
                        <div class="col-6 px-1">
                            <botonApp texto="No,gracias" tipo="gris" @click="cancelar()" />
                        </div>
                        <div class="col-6 px-1">
                            <botonApp texto="Enviar" tipo="verde" @click="calificar()" />
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
            name: 'modalCalificar',
            razon: '',
            calificaion:0,
            propina:0,
            cantidades:[0,10,20,30,40,50,60],
        };
    },
    props: [
        'servicio'
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        ultimoServicio(){return this.servicio},
        talento(){return this.$store.getters.userStateFind(['talentos','talento']);},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            // this.$store.dispatch('postNoCalificarServicio');
            this.closeModal();
        },
        calificar(){
            swal("","Gracias por calificarnos","success");
            this.closeModal();
            // this.$store.dispatch('postCalificarServicio',[this.calificaion, this.propina]);
        },
    },
}
</script>