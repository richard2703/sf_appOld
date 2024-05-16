<template>
<div class="w-48vw mx-auto border-b-gray01-1" :class="index%2==0 || index == 0?'border-r-gray01-1':''">
    
    <div class="row w-100 m-0 py-2" @click="click()">
        <div class="row w-100 m-0  overflow-hidden">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 pt-2 justify-content-center">
                    <div class="w-35vw h-35vw p-5px">
                        <imagen clase="border-radius-15px" :fit="true" :src="info.imagen" v-if="info.imagen" />
                    </div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 pb-2">
                        <div class="row w-100 m-0 h-35px justify-content-center text-center letra-gray3-15 overflow-hidden" v-if="deve">{{info.id}}</div>
                        <!-- <div class="row w-100 m-0 h-35px justify-content-center text-center letra-gray4-23 overflow-hidden">{{precio | currency}} {{info.currency}}</div> -->
                        <div class="row w-100 m-0 h-35px justify-content-center text-center letra-gray4-23 overflow-hidden">{{info.total | currency}} {{info.currency}}</div>
                        <div class="row w-100 m-0 h-55px align-content-center justify-content-center text-center letra-gray4-14">{{info.nombre | truncate(50)}}</div>
                        <!-- <div class="row w-100 m-0 justify-content-center text-center letra-azul1-15">{{ info.iva }}</div> -->
                        <!-- <div class="row w-100 m-0 justify-content-center text-center letra-azul1-15">{{ cambioIva2 }}</div> -->
                        <div class="row w-100 m-0 h-20px justify-content-center text-center letra-gray2-15 overflow-hidden">{{(info.partner || {}).tradename}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props:[
        'data',
        'index',   
        'full',
        'tipo',
        'regalo',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        deve(){return this.$store.getters.deve;},

        cambioIva(){return this.$store.getters.catalogoGetObject('cambioIva');},
        cambioIva2(){return this.$store.getters.catalogoGetObject('cambioIva2');},
        info(){return this.data || {}},
        ruta(){return this.$store.getters.viajeObject('ruta')},

        precio(){
            if( Number(this.info.iva) ){
                if( this.info.type_iva == '2' ){
                    return (1 + Number(this.cambioIva2) ) * this.info.precio;
                }
                return (1 + Number(this.cambioIva) ) * this.info.precio 
            }
            return this.info.precio;
        },

    },
    methods:{
        click(){
            console.log("THIS", this.tipo);
            if(this.tipo == 1){
                this.$store.commit('updateCatalogosState',['producto', this.info.id]);
                this.$store.commit('setCarritosState',['producto', this.info.id]);
                this.router.navigate('/detalle_producto_lista');
                return;
            }
            if(this.regalo){
                this.$store.commit('updateCatalogosState',['producto', this.info.id]);
                this.$store.commit('setCarritosState',['producto', this.info.id]);
                this.router.navigate('/detalle_producto_evento');
                return;
            }
            else{
                this.$store.commit('updateCatalogosState',['producto', this.info.id]);
                this.$store.commit('setCarritosState',['producto', this.info.id]);
                this.router.navigate('/detalle_producto');
                return;
            }
        },
    },
}
</script>