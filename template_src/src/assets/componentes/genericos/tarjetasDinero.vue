<template>
<div class="row w-100 m-0 slider-component">
    <div :class="id +' swiper-container slider-container'">
        <div class="swiper-wrapper">
            <div class="swiper-slide w-auto px-1 text-center"  v-for="i of opciones" :key="i.cantidad" @click="update(i.cantidad)">
                <div class="w-auto text-center">
                    <div class="row w-100 m-0  px-2 border-radius-10px letra-appve-15 py-1 text-capitalize justify-content-center text-center"
                        :class="(value == i.cantidad)?'border-appve-2':'border-gray0-1'">
                        ${{i.cantidad}}
                    </div>
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
    props: ['value'],
    data(){
        return {
            id: _.uniqueId('td_'),
            slider:null,
            opciones:[
                {cantidad: 100},
                {cantidad: 200},
                {cantidad: 300},
                {cantidad: 500},
                {cantidad: 800},
                {cantidad: 1000},
                {cantidad: 1500},
            ],
        };
    },
    computed: {
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
                    slidesPerView: 'auto',
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     type: 'bullets',
                    // },   
                });
        },
        update(cantidad){
           this.$emit('input',cantidad);
        }

    },
}
</script>