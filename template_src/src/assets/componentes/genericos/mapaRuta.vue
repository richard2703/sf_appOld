<template>
<div class="row w-100 h-100 m-0 position-relative ">
    <div :id="id" class="mapa w-100 h-100"></div>
    <div class="w-50px h-50px border-radius-50 back-color-blanco position-absolute bottom-5px right-5px z-index-10000 text-center carta" @click="map.panTo(centro)">
        <div class="w-100 h-100 text-center">
            <icono class="mt-2" icono="my_location" clase="letra-app-7-8vw" />
        </div>
    </div>
</div>
</template>
<script>
    export default {
        props: ['origen','fin'],
        data(){
            return{
                id: _.uniqueId('map_'),
                map: null,
                pinOrigen: null,
                pinFin: null,
                directionsRenderer: null,

            }
        },
        computed:{
            centro(){
                if(this.origen.lat && this.origen.lng){
                    return {lat:Number(this.origen.lat), lng:Number(this.origen.lng)};
                }
                return this.$store.getters.getPosicion;},
            response(){return this.$store.getters.userStateObject('response');},
        },
        created(){
        },
        mounted(){
            console.log("MAPA SERVICIO", this.response);
            setTimeout(this.initMapa,350);
        },
        methods:{
            initMapa(){
                try{
                    if(!this.map){
                        this.map = new google.maps.Map(document.getElementById(this.id),{
                            center: this.centro,                       
                            zoom: 10,    
                            disableDefaultUI:true,
                        });
                        this.map.addListener('dragstart',this.dragstart);
                        this.map.addListener('dragend',this.dragend);
                        this.map.addListener('center_changed',this.centerchange);
                        // this.pinOrigen = new google.maps.Marker({
                        //     position: this.centro, 
                        //     map: this.map,
                        //     icon: {
                        //         url: require('../../iconos/pin.svg'),
                        //         scaledSize:{height: 25, width: 25}
                        //     },
                        // });
                        // this.pinFin = new google.maps.Marker({
                        //     position: {lat: Number(this.fin.lat), lng: Number(this.fin.lng)}, 
                        //     map: this.map,
                        //     icon: {
                        //         url: require('../../iconos/pin.svg'),
                        //         scaledSize:{height: 25, width: 25}
                        //     },
                        // });
                        this.directionsRenderer = new google.maps.DirectionsRenderer({
                            map: this.map,
                            polylineOptions: {
                                strokeColor: "red"
                            },
                        });
                        this.directionsRenderer.setDirections(this.response);
                        this.centerchange();
                    }
                }
                catch(e){
                    setTimeout(this.initMapa,500);
                    return;
                }
            },
            dragstart(){
            },
            centerchange(){
            },
            dragend(){
            },
            trazarRuta(){

            }
        }
    }
</script>