import axios from 'axios';

const stateStorage = 'stateStorage';
const latlng = 'mivia-latlng';

const initialState = {
    key: 'AIzaSyAMjGwsthMvEKZrbRWA95x_quo9qgsM7Kc',
    estado: localStorage.getItem(stateStorage) || 'Jalisco',
    posicion:JSON.parse(localStorage.getItem(latlng)) || {lat: 20.674484,lng: -103.387352,  velocidad: null},

    track: true,
    GPSWatcher: false,
    busqueda:{ data: null },
    lugares: {arreglo:[]},
    geocoder: null,
};
const state = JSON.parse(JSON.stringify(initialState));

const getters = { 
    getPosicion(state){return state.posicion;},
    getMapsPlaces(state){return state.lugares.arreglo;},
    getBusqueda(state){return state.busqueda.data;},
};

const mutations = {
    updatePosicion(state, pos){
        // console.log("UPDATE POS", pos.lat, pos.lng);
        state.posicion = pos;
        localStorage.setItem(latlng,JSON.stringify(state.posicion));
        // this.dispatch('postUpdatePosicion');
        // this.dispatch('getEstadoPorUbicacion');
    },
    setEstado(state,estado){
        state.estado = estado;
        localStorage.setItem(stateStorage,estado);
    },
    setBusqueda(state, data){
        state.busqueda = {data:data};
        this.dispatch('getMapsResults');
    },
    setResultsLugares(state, lg){
        state.lugares = {arreglo:lg};
    },
    initWatcher(state,id){
        // console.log("=============> INIT WATCHER");
        state.GPSWatcher = navigator.geolocation.watchPosition(
        position=>{
            // console.log("=============> WATCHER ACTIVE", position);
            this.commit('updatePosicion',{lat: position.coords.latitude,lng: position.coords.longitude, velocidad: position.coords.speed});
        }, 
        error => {
            if (error.code) {
                this.commit('cleanWatcher');
                setTimeout(() => {this.dispatch('getLocalizacion')}, 5000);
            }
        },{timeout: 30000,maximumAge: 15000,  enableHighAccuracy: true });
    },
    cleanWatcher(state){
        navigator.geolocation.clearWatch(state.GPSWatcher);
        state.GPSWatcher = null;
    },
};

const actions = {

    getLocalizacion({state}){
        if(state.track){
            if(this.getters.deviceready) {
                if (navigator.geolocation){
                    if(!state.GPSWatcher){
                        // console.log("INIT POSITION");
                        navigator.geolocation.getCurrentPosition(
                        (position) => {
                            // console.log("=============> POSITION ACTIVE", position);
                            this.commit('updatePosicion',{lat: position.coords.latitude,lng: position.coords.longitude, velocidad: position.coords.speed});
                            this.commit('initWatcher');
                        }, 
                        error =>{
                            // console.log("=============> ERROR POSITION");
                            setTimeout(() => {this.dispatch('getLocalizacion')}, 5000);
                        },
                        { timeout: 10000,maximumAge: 15000, enableHighAccuracy: true  });
                    }
                }   
            }
        }
    },

    postUpdatePosicion(){
        if(this.getters.getSession.token){
            let data = {
                token: this.getters.getSession.token,
                lat: state.posicion.lat,
                lng: state.posicion.lng,
            };
            this.dispatch('postPromiseNoError', ['usuarios/update_pos',data]).then(res => {},error=>{});
        }
    },
    getMapsResults({state}){
        if(!state.busqueda.data){
            this.commit('setResultsLugares',[]);
            return;
        }
        new Promise((resolve, reject) => {
            let url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${state.key}&input=`;
            state.busqueda.data = state.busqueda.data.replace(' ','%20');
            url+=state.busqueda.data;

            let pos = this.getters.getPosicion;
            if(pos.lat)url+=`&location=${pos.lat},${pos.lng}&radius=10000`;

            axios.post(url, {},  { 
                headers: { 'content-type' : 'text/plain' },
                }).then(
                response =>{   
                    // console.log("ENCONTRE LUGARES",response);
                    if(response.data.status!='OK'){
                        this.commit('setResultsLugares',[]);
                        return;
                    }
                    if(!state.busqueda.data){
                        this.commit('setResultsLugares',[]);
                        return;
                    }
                    this.commit('setResultsLugares', response.data.predictions);
                },
                error=>{});
        });
    },
    getDireccionByposition({state},[pos]){
        return new Promise((resolve, reject) => {
            let url = 'https://maps.googleapis.com/maps/api/geocode/json';
            url+=`?key=${state.key}`;
            url+=`&latlng=${pos.lat},${pos.lng}`;
            axios.get(url).then(
                response =>{   
                    if(response.data.status=='OK'){
                        // console.log("ENCONTRE LUGARES",response.data.results);
                        
                        resolve(response.data.results);
                        return;
                    }
                },
                error=>{});
        });
    },
    getEstadoPorUbicacion({state}){
        new Promise((resolve, reject) => {
            let lat = this.getters.getPosicion.lat;
            let lng = this.getters.getPosicion.lng;
            let url = 'https://maps.googleapis.com/maps/api/geocode/json';
            url+=`?key=${state.key}`;
            url+=`&latlng=${lat},${lng}`;
            axios.get(url).then(
                response =>{   
                    if(response.data.status=='OK'){
                        let resultados = response.data.results;
                        if(resultados.length){
                            let info = resultados[0];
                            info = info.address_components.find(i=>{return i.types.find(t=>{return t == 'administrative_area_level_1'}) });
                            info = info.long_name;
                            // console.log("ENCONTRE ESTADOS",info);
                            this.commit('setEstado',info);
                        }
                        return;
                    }
                },
                error=>{});
        });
    },
    getDireccionPosicion({state},[pos]){
        return new Promise((resolve, reject) => {
            let url = 'https://maps.googleapis.com/maps/api/geocode/json';
            url+=`?key=${state.key}`;
            url+=`&latlng=${pos.lat},${pos.lng}`;

            // console.log("POST URL", url);
            axios.get(url).then(
                response =>{   
                    if(response.data.status=='OK'){
                        // console.log("ENCONTRE LUGARES",response.data.results);
                        let resultados = response.data.results;
                        if(resultados.length){
                            let info = resultados[0];
                            resolve(info.formatted_address);
                        }
                        return;
                    }
                },
                error=>{});
        });
    },
    postGetDistanciaResponse({state},[origen,destino]){
        return new Promise((resolve, reject) => {
            let directions = new google.maps.DirectionsService;
            directions.route({
                avoidFerries: true,
                origin: origen,
                destination: destino,
                drivingOptions: {
                    departureTime: new Date(Date.now()),
                    trafficModel: 'bestguess'
                },
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (response, status)=>{
                if(status != 'OK'){
                    reject(status);
                }
                let ruta = response.routes.find(r=>{return true});
                if(!ruta){
                    reject(status);
                }
                resolve(response);
            })
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};