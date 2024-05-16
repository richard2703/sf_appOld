<template>
<div class="row w-100 h-100 m-0">
    <div :id="id" class="mapa w-100 h-100"></div>
</div>
</template>
<script>
    export default {
        props: ['lat','lng'],
        data(){
            return{
                id: _.uniqueId('map_'),
                map: null,
                pin: null,
            }
        },
        computed:{
        },
        created(){
        },
        mounted(){
            setTimeout(this.initMapa,350);
        },
        methods:{
            initMapa(){
                try{
                    if(!this.map){
                        this.map = new google.maps.Map(document.getElementById(this.id),{
                            center: {lat: Number(this.lat), lng: Number(this.lng)},                       
                            zoom: 15,    
                            disableDefaultUI:true,
                        });
                        this.pin = new google.maps.Marker({
                            position: {lat: Number(this.lat), lng: Number(this.lng)}, 
                            map: this.map,
                            icon: {
                                // url: require('../../iconos/pin.svg'),
                                url: require('../../iconos/heart.svg'),
                                scaledSize:{height: 25, width: 25}
                            },
                        });
                        this.centerchange();
                    }
                }
                catch(e){
                    setTimeout(this.initMapa,500);
                    return;
                }
            },
        }
    }
</script>