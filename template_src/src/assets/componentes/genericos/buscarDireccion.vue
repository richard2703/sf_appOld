<template>
<!-- <transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"> -->
    <div class="modal_app modalDireccion w-100 m-0 p-0 justify-content-center px-3" v-if="state">
        <div class="row w-100 m-0px px-2 pt-40px">
            <div class="row w-100 m-0 mt-5 back-color-blanco border-radius-15px overflow-hidden">
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 back-color-blanco m-0 pl-3 py-2 border-b-gray-light-1">
                        <div class="col my-auto px-0 pr-2">
                            <busqueda-input v-model="busqueda" @input="getResultados()" />
                        </div>
                        <div class="col-auto my-auto px-0" @click="closeModal()">
                            <div class="w-50px">
                                <imagen :icono="true" src="cancel_g" />
                            </div>
                        </div>
                    </div>
                    <div class="h-50vh scroll-y back-color-blanco ">
                        <div class="row w-100 m-0" >
                            <div class="row w-100 m-0 py-2 px-2 border-b-gray1-1" v-for="p of resultados" :key="p.place_id" @click="getGeo(p)">
                                <div class="col-1 my-auto px-1 mr-1">
                                    <imagen :icono="true" src="pin" />
                                </div>
                                <div class="col pl-2 pr-0 letra-gray3-3-5vw">{{p.description}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 py-3 back-color-verde3 letra-blanco-5-1vw justify-content-center" @click="closeModal()">CANCELAR</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- </transition> -->
</template>
<script>
export default {
    data(){
        return {
            name: 'modalDireccion',
            busqueda: '',
            autocomplete: null,
            geocoder: null,
            post_id: _.uniqueId('post_'),
            resultados: [],
        };
    },
    props: [],
    computed: {
            state() {return this.$store.getters.getModal(this.name)},
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            posicion(){return this.$store.getters.getPosicion;},
        },
    mounted() {
        this.autocomplete = new google.maps.places.AutocompleteService();
        this.geocoder = new google.maps.Geocoder();
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        getResultados(){
            let options = {
                input:      this.busqueda,
                location:   new google.maps.LatLng(this.posicion.lat, this.posicion.lng),
                radius:      100000,
            };
            console.log("PROBANDO", this.posicion);
            this.post_id =  _.uniqueId('post_');
            let id = this.post_id;
            this.post(id,options);
        },
        post(id,options){
            this.autocomplete.getPlacePredictions(options, 
            (resultado,estatus)=>{
                if (estatus == 'OK') {
                console.log("resultados", resultado);
                    if(id == this.post_id){
                        this.resultados = resultado;
                    }
                }
                
            });
        },
        getGeo(place){
            this.$store.commit('initLoader');
            this.geocoder.geocode({'placeId': place.place_id, 'region': 'MX'},
            (results, status)=>{
                this.$store.commit('finishLoader');
                if (status == 'OK') {
                    this.$emit('resultado', results[0]);
                    this.closeModal();
                }
            });
        },
    },
}
</script>