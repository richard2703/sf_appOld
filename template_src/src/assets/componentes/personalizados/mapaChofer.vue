<template>
<div class="row w-100 h-100 m-0 position-relative">

    <div class="row w-100 m-0 position-absolute top-10px right-0px z-index-10000 text-center">
        <div class="row w-100 m-0 px-1 justify-content-center">
            <div class="col-10 px-1" @click="$store.dispatch('synchronizeData')">
                <div class="row w-100 m-0 letra-blanco-17 back-color-verde4 fw-600 border-radius-30px py-10px justify-content-center">{{estatus}}</div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 position-absolute bottom-30px right-0px z-index-10000 text-center" v-if="!info">
        <div class="row w-100 m-0 px-1 py-2">
            <div class="col px-1" @click="$store.dispatch('call','911')" >
                <botonApp texto="Emergencia" tipo="azul" radius="30px" />
            </div>
            <div class="col-auto px-1 ml-auto">
                <div class="w-41px h-41px border-radius-50 back-color-verde4" @click="info = true">
                    <div class="w-100">
                        <icono icono="expand_less" clase="letra-blanco-40" />
                    </div>
                </div>
            </div>
            <div class="col-6 px-1" @click="$store.dispatch('postActualizarEstatus')" >
                <botonApp :texto="boton" tipo="verde" radius="30px" />
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 position-absolute bottom-30px right-0px z-index-10000 text-center" v-if="info">
        <div class="row w-100 m-0 px-1 py-2">
            <div class="col-5 px-1" @click="$store.commit('openModal',['modalMensaje'])" >
                <botonApp texto="Cancelar viaje" tipo="azul" radius="30px" />
            </div>
            <div class="col-5 px-1" @click="$store.dispatch('postSolictarAyuda')" >
                <botonApp texto="Ayuda" tipo="verde" radius="30px" />
            </div>
            <div class="col-auto px-0 pr-3 ml-auto">
                <div class="w-41px h-41px border-radius-50 back-color-verde4" @click="info = false">
                    <icono icono="expand_more" clase="letra-blanco-35" />
                </div>
            </div>
        </div>
        <div class="row w-100 m-0">
            <rowUsuario />
        </div>
        <div class="row w-100 m-0 px-1 py-2">
            <div class="col-4 px-1" @click="$store.dispatch('call','911')" >
                <botonApp texto="Emergencia" tipo="azul" radius="30px" />
            </div>
            <div class="col-8 px-1" @click="$store.dispatch('postActualizarEstatus')" >
                <div class="row w-100 m-0" v-if="servicio.estatus == 'encamino_reco' ">
                    <botonApp :texto="boton" tipo="marino" radius="30px" />
                </div>
                <div class="row w-100 m-0" v-else-if="servicio.estatus == 'llegado_reco' ">
                    <botonApp :texto="boton" tipo="naranja" radius="30px" />
                </div>
                <div class="row w-100 m-0" v-else-if="servicio.estatus == 'encamino_entrega' || servicio.estatus == 'llegado_entrega' ">
                    <botonApp :texto="boton" tipo="negro" radius="30px" />
                </div>
                <div class="row w-100 m-0" v-else>
                    <botonApp :texto="boton" tipo="verde" radius="30px" />
                </div>
            </div>
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
            pinReco: null,
            drag: false,
            info: true,
            rutas: {
                toUser: null,
                toDestino: null,
            },
            icon: {
                url: require('../../iconos/pin.svg'),
                scaledSize:{height: 30, width: 30}
            },
        };
    },
    props:  ['cuenta'],
    computed: {
        router(){return this.$store.getters.getRouter;},
        estatus(){return this.$store.getters.estatusChofer;},
        boton(){return this.$store.getters.nextEstatusBoton},
        centro(){return this.$store.getters.getPosicion;},

        servicio(){return this.$store.getters.servicioObject('servicio');},
        chofer(){return this.servicio.chofer || {}},
        usuario(){return this.servicio.usuario || {}},
        destino(){return this.servicio.destino || {}},
    },
    watch: {
        centro(){
            this.updateCentro();
        },
        servicio(){
            this.trazarRuta();
        },
    },
    mounted() {
        this.$store.dispatch('initData', [this.$f7]);
        setTimeout(this.initMapa,350);
    },
    methods:{
        getPos(obj){
            return {lat: Number(obj.lat), lng: Number(obj.lng) };
        },
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
                            url: 'https://miviaapp.com/appfiles/car.svg',
                            scaledSize:{height: 60, width: 60}
                        },
                    });

                    this.pinReco = new google.maps.Marker({
                        position: this.getPos(this.servicio), 
                        map: this.map,
                        icon: this.icon,
                    });

                    this.map.addListener('dragstart',this.dragstart);
                    this.map.addListener('dragend',this.dragend);
                    this.map.addListener('center_changed',this.centerchange);
                    this.centerchange();
                    this.trazarRuta();

                }
            }
            catch(e){
                setTimeout(this.initMapa,500);
                return;
            }
        },
        updateCentro(){
            if(this.pin){
                this.pin.setPosition(this.centro);
            }
        },
        setCenter(data){
            this.drag = true;
            this.$emit('lugar', data);
            this.map.panTo({lng: Number(data.lng),lat: Number(data.lat)});
            this.busqueda = '';
        },
        trazarRuta(){
            if(!this.directionsRenderer){
                this.directionsRenderer = new google.maps.DirectionsRenderer({
                    map: this.map,
                    polylineOptions: {
                        clickable: false,
                        strokeColor: "#4cd77c",
                    },
                });
            }
            if(this.directionsRenderer){
                if(this.servicio.estatus == 'encamino_reco'){
                    if(!this.rutas.toUser){
                        this.$store.dispatch('postGetDistanciaResponse',[this.centro, this.getPos(this.servicio)]).then(
                            res=>{
                                this.directionsRenderer.setDirections(res);
                                this.rutas.toUser = res;
                            },error=>{});
                    }
                    
                }
                if(this.servicio.estatus == 'llegado_reco' || this.servicio.estatus == 'encamino_entrega' || this.servicio.estatus == 'llegado_entrega' || this.servicio.estatus == 'terminado'){
                    if(!this.rutas.toDestino){
                        this.$store.dispatch('postGetDistanciaResponse',[this.getPos(this.servicio), this.getPos(this.destino)]).then(
                            res=>{
                                this.directionsRenderer.setDirections(res);
                                this.rutas.toDestino = res;
                            },error=>{});
                    }
                    
                }
            }
        },
        dragstart(event){
            this.drag = true;
        },
        dragend(){
        },
        centerchange(){
           
        },
        centrar(){
            this.map.panTo(this.$store.getters.getPosicion);
        },
    },
}
</script>