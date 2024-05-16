import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');
const cardst = 'cardstoraje';

const initialState = {

    paso: 0,

    ubicacion:{
        lat: null,
        lng: null,
        direccion: null,
        calle: null,
    },

    inicio:{
        lat: null,
        lng: null,
        direccion: null,
        calle: null,
    },

    destino:{
        lat: null,
        lng: null,
        calle: null,
        direccion: null,
    },

    ruta:{
        banderazo: 30,
        costo_km: 10,
        distancia: 50,
        tiempo: 30,
        total_km: 60,
    },

    metodo_id: localStorage.getItem(cardst) || null ,

    tarjeta:{
        id: null,
    },

    transporte:{
        id: null,
    },
};

const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    viajeObject:(state)=>(obj)=>{return state[obj]},
    viajeArray:(state)=>(obj)=>{return state[obj].a},
    viajeFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]}) || {}},
    viajeFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
   
};
const mutations={

    setViajeState(state,[key,data]){
        state[key] = data;
    },

    setStorageMetodo(state){
        localStorage.setItem(cardst,state.metodo_id);
    },

    setViajeStateObject(state,[obj,key,data]){
        state[obj][key] = data;
        state[obj] = JSON.parse(JSON.stringify(state[obj]));
    },

    calcularCosto(){

    },

    updateViajeState(state,data){
        if(data.domicilios){
            state.domicilios = {a: data.domicilios};
            if(!state.domicilio){
                state.domicilio = (data.domicilios.find(x=>{return true;}) || {}).id || null;
                if(state.domicilio){
                    this.dispatch('synchronizeData');
                }
            }
        }
    },
    
};

const actions={

    postPedirViaje({ commit, state }){
        let data = {
            inicio: state.inicio,
            destino: state.destino,
            transporte: state.transporte,
            tarjeta: {id: state.metodo_id},
            ruta: state.ruta,
        };

        let finish = (res)=>{
            this.commit('updateServicioState',res.data);
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/create_servicio', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};