<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' w-100 swiper-container slider-container postion-relative '">
        <div class="swiper-wrapper position-relative">
            <slot></slot>
        </div>

        <div class="row w-100 m-0 position-absolute z-1000000000 bottom-3 left-0px" v-if="total">
            <div class="row w-100 m-0 justify-content-center">
                <div class="col-auto px-0 pl-1" v-for="(i,x) in total">
                    <div class="w-10px h-10px border-radius-50" :class="`${x==index?'back-color-rojo':'back-color-gray2'}`"></div>
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
            id: _.uniqueId('swc_'),
            slider:null,
            index: 0,
        };
    },
    props: [
        'objetos', 
        'cantidad',
        'paginado',
        'total'
    ],
    computed: {
    },
    mounted() {
        setTimeout(this.initSlider,400);
    },
    methods:{
        initSlider(){
            if(this.paginado){
                this.slider = new Swiper (`.${this.id}`, {
                        initialSlide: 0,
                        centeredSlides: false, 
                        preloadImages: true, 
                        observer: true,
                        observeParents: true,
                        observeSlideChildren: true,
                        slidesPerView: this.cantidad || "auto",
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                        },   
                    });
            }
            else{
                this.slider = new Swiper (`.${this.id}`, {
                        initialSlide: 0,
                        centeredSlides: false, 
                        preloadImages: true, 
                        observer: true,
                        observeParents: true,
                        observeSlideChildren: true,
                        slidesPerView: this.cantidad || "auto",
                        // pagination: {
                        //     el: '.swiper-pagination',
                        //     type: 'bullets',
                        // },   
                    });
            }

            this.slider.on('slideChange',()=>{
                    this.index = this.slider.realIndex;
                });

        },

    },
}
</script>