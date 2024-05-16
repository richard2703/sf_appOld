<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container'">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="i of galleria" :key="i.id" >
                <div class="row w-100 m-0 justify-content-center">
                    <img class="w-100 h-100" :src="i.banner" alt="foto_producto">
                </div>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>
</template>
<script>
import _ from 'lodash';
import Swiper from 'swiper';
export default {
    data(){
        return {
            id: _.uniqueId('banners_'),
            slider:null,
        };
    },
    props: ['fotos'],
    computed: {
        galleria(){return this.fotos || []},
    },
    mounted() {
        setTimeout(this.initSlider,300);
    },
    methods:{
         initSlider(){
            this.slider = new Swiper (`.${this.id}`, {
                centeredSlides: true, 
                preloadImages: true, 
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                autoplay: {
                    delay: 1800,
                },
            });
      }
    },
}
</script>