<template>
<div class="row w-100 m-0 slider-component">
    <div class="row w-100 m-0">
        <div class="row w-100 m-0 justify-content-center text-center letra-gray3-5-5vw text-uppercase fw-800">{{[hoy, 'YYYY-MM-DD'] | moment('MMMM')}}</div>
    </div>
    <div :class="id +' swiper-container slider-container'">
        <div class="swiper-wrapper">
            <div class="swiper-slide" :class="hoy==i.fecha?'border-b-app-3':''" v-for="i of agenda" :key="i.x" @click="update(i.fecha)">
                <div class="row w-100 m-0 justify-content-center position-relative">
                    <div class="row w-100 m-0 letra-gray4-4-5vw fw-800 text-capitalize justify-content-center text-center">{{[i.fecha, 'YYYY-MM-DD'] | moment('ddd')}}</div>
                    <div class="row w-100 m-0 letra-gray3-4-5vw text-capitalize justify-content-center text-center">{{[i.fecha, 'YYYY-MM-DD'] | moment('D')}}</div>
                    <div class="w-12px h-12px border-radius-50 position-absolute right-1px bottom-7px back-color-app" v-if="findServicio(i.fecha)"></div>
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
            id: _.uniqueId('swiper-container_'),
            slider:null,
            dias: 90,
            agenda:[],
        };
    },
    props: ['fotos'],
    computed: {
        hoy(){return this.$store.getters.afiliadoStateObject('fecha');},
        ordenes(){return this.$store.getters.afiliadoStateArray('ordenes');},
    },
    created() {
        this.initAgenda();
    },
    mounted() {
        setTimeout(this.initSlider,300);
    },
    methods:{
        findServicio(fecha){
            return this.ordenes.filter(o=>{return o.fecha == fecha}).length > 0;
        },
        initAgenda(){
            for(let i = 0; i <= this.dias; i++){
                let x = moment().add(i, 'days');
                this.agenda.push({m: x, fecha:x.format('YYYY-MM-DD')});
            }
        },
        initSlider(){
            this.slider = new Swiper (`.${this.id}`, {
                centeredSlides: false, 
                preloadImages: true, 
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                slidesPerView: 7,
                // pagination: {
                //     el: '.swiper-pagination',
                //     type: 'bullets',
                // },   
            });
        },
        update(fecha){
            this.$store.commit('updateAfiliadoState',['fecha', fecha])
            this.$store.dispatch('synchronizeData');
        }

    },
}
</script>