<template>
<div class="row w-100 h-100 m-0">
    <div :id="id" class="mapa w-100 h-100"></div>
</div>
</template>
<script>
    export default {
        props: [
        'data',
        ],
        data(){
            return{
                id: _.uniqueId('map_'),
                map: null,
                pinRepa: null,
                pinRes: null,
                pinDom: null,
                directionsRenderer: null,

            }
        },
        computed:{
            pedido(){return this.data || {} },
            restaurante(){return this.pedido.restaurante || {} },
            repa(){return this.pedido.repartidor || {} },
            domicilio(){return this.pedido.domicilio || {} },
            centro(){
                if(this.repa.lat && this.repa.lng){
                    return {lat:Number(this.repa.lat), lng:Number(this.repa.lng)};
                }
                return {lat: 20.6780964,lng: -103.3555637};
            },
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
                            zoom: 13,    
                            disableDefaultUI:true,
                        });
                        this.map.addListener('dragstart',this.dragstart);
                        this.map.addListener('dragend',this.dragend);
                        this.map.addListener('center_changed',this.centerchange);

                        this.pinRepa = new google.maps.Marker({
                            position: {lat:Number(this.centro.lat), lng:Number(this.centro.lng)}, 
                            map: this.map,
                            icon: {
                                url: require('../../iconos/pinrepa.svg'),
                                scaledSize:{height: 35, width: 35}
                            },
                        });

                        this.pinRes = new google.maps.Marker({
                            position: {lat:Number(this.restaurante.lat), lng:Number(this.restaurante.lng)}, 
                            map: this.map,
                            icon: {
                                url: require('../../iconos/respin.svg'),
                                scaledSize:{height: 35, width: 35}
                            },
                        });

                        this.pindom = new google.maps.Marker({
                            position: {lat:Number(this.domicilio.lat), lng:Number(this.domicilio.lng)}, 
                            map: this.map,
                            icon: {
                                url: require('../../iconos/pindom.svg'),
                                scaledSize:{height: 35, width: 35}
                            },
                        });
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
        }
    }
</script>