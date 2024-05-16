<template>
<div class="row w-100 h-100 m-0 position-relative">

    <div class="row w-100 m-0 position-absolute top-30px left-0px px-3 z-index-10000 ">
        <div class="row w-100 m-0">
            <recoleccion :map="map" :pin="pin" />
        </div>
    </div>

    <div class="w-50px h-50px position-absolute top-40 right-5px z-index-10000 text-center" @click="map.panTo(centro)">
        <div class="w-100 h-100 text-center">
            <icono class="mt-2" icono="my_location" clase="letra-negro-30" />
        </div>
    </div>

    <div class="row w-100 m-0 position-absolute bottom-10px right-10px z-index-10000 text-center" v-if="paso==2">
        <div class="row w-100 m-0">
            <sliderTransporte />
        </div>
    </div>

    <div :id="id" class="w-100 h-100"></div>
</div>
</template>
<script>
export default {
    data()
    {
        return {
            id:_.uniqueId('mapa_'),
            map: null,
            pin: null,
            drag: false,
        };
    },
    props:  ['cuenta'],
    computed: {
        router(){return this.$store.getters.getRouter;},
        paso(){return this.$store.getters.viajeObject('paso')},
        centro(){return this.$store.getters.getPosicion;},
        ubicacion(){return this.$store.getters.viajeObject('ubicacion')},
    },
    watch: {
        centro(){
            this.updateCentro();
        },
    },
    mounted() {
        this.$store.dispatch('initData', [this.$f7]);
        setTimeout(this.initMapa,350);
        setTimeout(this.updateRestaurantes,400);
    },
    methods:{
        goto(ruta){
            this.router.navigate(ruta);
        },
        initMapa(){
            try{
                if(!this.map){
                    this.map = new google.maps.Map(document.getElementById(this.id),{
                        center: this.centro,                       
                        zoom: 15,    
                        disableDefaultUI:true,
                        clickableIcons:false,
                    });

                    this.pin = new google.maps.Marker({
                        position: this.centro, 
                        map: this.map,
                        icon: {
                            url: require('../../iconos/pin.svg'),
                            scaledSize:{height: 25, width: 25}
                        },
                    });

                    this.map.addListener('dragstart',this.dragstart);
                    this.map.addListener('dragend',this.dragend);
                    this.map.addListener('center_changed',this.centerchange);
                    this.centerchange();

                }
            }
            catch(e){
                setTimeout(this.initMapa,500);
                return;
            }
        },
        updateCentro(){
            if(this.miUbicacion){
                this.miUbicacion.setPosition(this.centro);
                if(!this.drag){
                    this.map.panTo(this.centro);
                }
            }
        },
        setCenter(data){
            this.drag = true;
            this.$emit('lugar', data);
            this.map.panTo({lng: Number(data.lng),lat: Number(data.lat)});
            this.busqueda = '';
        },
        dragstart(event){
            this.drag = true;
        },
        dragend(){
        },
        centerchange(){
            // console.log("SET",this.value);
            if(this.paso <= 1){
                this.pin.setPosition(this.map.getCenter());
                this.$store.commit('setViajeStateObject',['ubicacion','lat',this.map.getCenter().lat()]);
                this.$store.commit('setViajeStateObject',['ubicacion','lng',this.map.getCenter().lng()]);
                this.getDireccion();
            }
        },
        getDireccion(){
            // console.log("ubicacion", this.ubicacion);
            this.$store.dispatch('getDireccionPosicion',[this.ubicacion]).then(
                res=>{
                    this.$store.commit('setViajeStateObject',['ubicacion','direccion',res]);
                    this.$store.commit('setViajeStateObject',[ 'ubicacion','calle', (res.split(','))[0] ]);
                    this.$store.commit('setViajeState',['inicio', {lat: this.ubicacion.lat, lng: this.ubicacion.lng, direccion: this.ubicacion.direccion, calle: this.ubicacion.calle,}]);
                },error=>{}
            );
        },
        centrar(){
            this.map.panTo(this.$store.getters.getPosicion);
        },
       
    },
}
</script>