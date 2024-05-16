<template>
<div class="row w-100 h-100 m-0">
    <div :id="id" class="mapa w-100 h-100"></div>
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
                        this.trazarRuta();
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
                this.$store.dispatch('postGetDistanciaResponse',[this.origen, this.fin]).then(
                    res=>{
                        this.directionsRenderer = new google.maps.DirectionsRenderer({map: this.map});
                        this.directionsRenderer.setDirections(res);
                    },error=>{})
            }
        }
    }
</script>