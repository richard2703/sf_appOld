<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container w-100'">
        <div class="swiper-wrapper">
            <div class="swiper-slide px-1 text-center">

                <div class="w-auto text-center">
                    <div class="w-18vw h-18vw mx-auto border-radius-15px back-color-verde3" :class="categoria==null?'border-rojo2-2':''" @click="update(null)">
                        <!-- <imagen clase="p-12px" :logo="true" /> -->
                    </div>
                    <div class="row w-100 m-0 h-40px align-content-center letra-verde3-3-2vw py-1 text-capitalize justify-content-center text-center">Todas</div>
                </div>

            </div>
            <div class="swiper-slide px-1 text-center"  v-for="i of categorias" :key="i.x" @click="update(i.id)">
                <div class="w-auto text-center">
                    <div class="w-18vw h-18vw mx-auto border-radius-15px overflow-hidden" :class="categoria==i.id?'border-rojo2-2':''">
                        <!-- <imagen clase="" :fit="true" :src="i.imagenes_id" /> -->
                    </div>
                    <div class="row w-100 m-0 h-40px align-content-center letra-verde3-3-2vw pt-2 text-capitalize justify-content-center text-center">{{i.categoria}}</div>
                </div>
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
            id: _.uniqueId('sw_cat'),
            slider:null,
        };
    },
    props: [],
    computed: {
        categoria(){return this.$store.getters.catalogoGetObject('categoria') || null;},
        categorias(){return this.$store.getters.getCatalogo('categorias');}
    },
    mounted() {
        console.log("CATEGORIAS", this.categoria, this.categorias);
        setTimeout(this.initSlider,300);
    },
    methods:{
        initSlider(){
            if(this.categorias && this.categorias.length){
                this.slider = new Swiper (`.${this.id}`, {
                        initialSlide: 0,
                        centeredSlides: false, 
                        preloadImages: true, 
                        observer: true,
                        observeParents: true,
                        observeSlideChildren: true,
                        slidesPerView: 4.5,
                        // pagination: {
                        //     el: '.swiper-pagination',
                        //     type: 'bullets',
                        // },   
                    });
            }
            else{
                setTimeout(this.initSlider,300);
            }
        },
        update(id){
            this.$store.commit('updateCatalogosState',['categoria', id])
        }

    },
}
</script>