import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');

const initialState = {
    restaurantes: {a:[]},
    restaurante: null,
    platillo: null,
    usuario: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    restaurantesObject:(state)=>(obj)=>{return state[obj]},
    restaurantesArray:(state)=>(obj)=>{return state[obj].a},
    restaurantesFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    restaurantesFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
    restaurantesFindId:(state)=>(obj,id)=>{ return state[obj].a.find(a=>{return a.id == id}) },
    restaurantePlatillo(state,getters){return getters.restaurantesFind('restaurantes','restaurante').foods.find(x=>{return x.foods.find(a=>{return a.id == state.platillo}) != undefined}).foods.find(b=>{return b.id == state.platillo})},
};
const mutations={
    updateRestauranteState(state,data){
        if(data.restaurants){
            if(data.restaurants.all){
                state.restaurantes = { a: _.orderBy(data.restaurants.all, ['distancia'], ['asc']) };
                console.log("RES", state.restaurantes.a);
            }
        }
    },
    setRestauranteState(state,[key,data]){
        state[key] = data;
    }
};
const actions={
    postBuscarContacto({ commit, state }, form){
        let data = {
            usuario: form,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            if(res.data.usuario && res.data.usuario.id){
                this.commit('setContactoState',['usuario',res.data.usuario]);
                this.commit('openModal',['modalUsuario']);
            }
        };
        this.dispatch('postPromiseLoader', ['contactos/buscar_contacto', data]).then(
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