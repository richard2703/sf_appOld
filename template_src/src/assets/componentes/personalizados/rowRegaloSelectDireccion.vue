<template>
    <div class="row w-100 m-0 px-0 transporte-slide"  >
        <div class="row w-100 m-0 py-2" v-if="productos.some(x=>{return x.tipo_entrega == 'domicilio'})" >
            <div class="col my-auto px-0 letra-gray4-17">Direccion de envio:</div>
            <div class="col-auto my-auto px-0 letra-azul1-14 border-b-azul1-1" v-if="!dx.usuarios_domicilios_id" @click="set(dx)">Selecciona direccion de envio</div>
            <div class="col-auto my-auto px-0 letra-azul1-14" v-else>{{direccion.calle}}</div>
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
            id: _.uniqueId('swiperTras_'),
            openK: false,
            slider:null,
            index: 0,
        };
    },
    props: [
        'data',
    ],

    computed: {
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        dx(){return this.data || {} },
        productos(){return this.dx.productos || []},
        direccion(){return this.dx.direccion || {}}
    },
    mounted(){
        console.log("DX DX", this.productos,);
    },
    methods:{
        set(a){
            this.$store.commit('setUsuarioData',['regalo',a.id]);
            this.router.navigate('/seleccionar_domicilio');
            this.$emit('close');
        },
    },
}
</script>