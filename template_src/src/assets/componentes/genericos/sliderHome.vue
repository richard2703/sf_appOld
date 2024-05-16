<template>
<div class="row w-100 px-0 m-0 contenedor-slide">
        <div :class="`${id} swiper w-100`">
            <div class="swiper-wrapper position-relative ">
                <div class="swiper-slide">
                    <div class="row w-100 m-0 px-2 pt-3 justify-content-center">
                        <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/o1.png" /> 
                    </div>
                    <div class="row w-100 m-0 px-3 pt-4">
                        <p class="m-0 letra-azul1-3-9vw text-center px-2 pt-3">¡Nunca olvides eventos importantes! <span class="letra-rojo1-3-9vw fw-800">SocialFlow</span> te los recuerda y te permite <span class="letra-rojo1-3-9vw fw-800" >hacer y recibir</span> <span class="letra-azul1-3-9vw fw-800" >regalos individuales, organizar regalos grupales y reuniones para festejar.</span></p>  
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row w-100 m-0 px-2 pt-3 justify-content-center">
                        <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/o2.png" />
                    </div>
                    <div class="row w-100 m-0 px-3 pt-4 ">
                        <p class="m-0 letra-azul1-3-9vw text-center px-2 pt-3">Sepas o no que regalar, en <span class="letra-rojo1-3-9vw fw-800">SocialFlow</span> encuentras lo mas adecuado y fácil para cada ocasión. <span class="letra-rojo1-3-9vw fw-800" >Podrás ver las wishlist sugeridas por los mismos festejados y crear las tuyas.</span></p>  
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row w-100 m-0 px-2 pt-3 justify-content-center">
                        <div class="row w-100 m-0 pt-20px ">
                            <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/o3.png" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 px-2 pt-2 " >
                        <p class="m-0 letra-azul1-3-9vw text-center px-2">En <span class="letra-rojo1-3-9vw fw-800">SocialFlow</span> todos ganan. Acumulas puntos comprando y recomendando amigos. ¡Tus puntos te daran mas beneficios subiendo de nivel!</p>  
                    </div>
                </div>

            </div>
            <div class="row w-100 m-0 position-absolute z-1000000000 top-98vw left-0px">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="col-auto px-2">
                        <div class="w-12px h-12px border-radius-50" :class="`${index==0?'back-color-azul1':'back-color-gray2'}`"></div>
                    </div>
                    <div class="col-auto px-2">
                        <div class="w-12px h-12px border-radius-50" :class="`${index==1?'back-color-azul1':'back-color-gray2'}`"></div>
                    </div>
                    <div class="col-auto px-2">
                        <div class="w-12px h-12px border-radius-50" :class="`${index==2?'back-color-azul1':'back-color-gray2'}`"></div>
                    </div>
                </div>
            </div>
        <!-- <div class="swiper-pagination h-50px swiper-pagination swiper-pagination-bullets top-5vw swiper-pagination-horizontal "></div> -->
            <!-- <div class="swiper-pagination w-100 h-20px z-1000000000"></div> -->
        </div>

        <!-- <div class="row w-100 m-0 position-absolute bottom-7 left-0px z-100 justify-content-center"> -->
        <div class="row w-100 m-0 z-100 justify-content-center ">
            <div class="row w-100 m-0 px-3 pt-2 justify-content-space-between">

                <div class="col-12 px-0" v-if="index==0" >
                    <div class="row w-100 m-0" @click="continuar()">
                        <botonApp tipo="azul" :outline="true" texto="Siguiente"  radius="30px" />
                    </div>
                    <!-- <div class="row w-100 m-0 pt-3 letra-gray3-19 justify-content-center text-center" @click="goLogin()">Saltar</div> -->
                </div>

                <div class="row w-100 m-0" v-if="index==1">
                    <div class="row w-100 m-0">
                        <div class="col-5 px-0"  @click="regresar()">
                            <botonApp tipo="azul" :outline="true" texto="Anterior"  radius="30px" />
                        </div>
                        <div class="col-5 px-0 ml-auto" @click="continuar()">
                            <botonApp tipo="azul" :outline="true" texto="Siguiente"  radius="30px" />
                        </div>
                    </div>
                    <!-- <div class="row w-100 m-0 pt-3 letra-gray3-19 justify-content-center text-center" @click="goLogin()">Saltar</div> -->
                </div>

                <div class="col-5 px-0" v-if="index==2" @click="continuar()">
                    <botonApp tipo="azul" :outline="true" texto="Anterior"  radius="30px" />
                </div>
                <div class="col-5 px-0" v-if="index==2" @click="continuar()">
                    <botonApp tipo="azul" texto="Comenzar"  radius="30px" />
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import _ from 'lodash';
import Swiper from 'swiper';
const moment = require('moment');
export default {
    data(){
        return {
            id: _.uniqueId('swiperhome_'),
            slider:null,
            index: 0,
        };
    },
    props: [
        'objetos', 
        'cantidad'
    ],
    computed: {
        router(){return this.$store.getters.getRouter;},
    },
    mounted() {
        setTimeout(this.initSlider,300);
    },
    methods:{
        initSlider(){
            this.slider = new Swiper (`.${this.id}`, {
                    initialSlide: 0,
                    centeredSlides: false, 
                    preloadImages: true, 
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                    slidesPerView: 1,
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     type: 'bullets',
                    // },   
                });
                this.slider.on('slideChange',()=>{
                    this.index = this.slider.realIndex;
                });
        },
        goLogin(){
            this.router.navigate('/login');
        },
        regresar(){
            this.slider.slidePrev();
        },
        continuar(){
            if(this.index < 2 ){
                this.slider.slideNext();
            }
            else{
                this.router.navigate('/login');
            }
        },

    },
}
</script>