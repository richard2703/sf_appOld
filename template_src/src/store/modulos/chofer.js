import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');
const storage1 = 'storage1';
const comision = 0;

const initialState = {
    servicios: {a:[]},

};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    choferStateArray:(state)=>(obj)=>{return state[obj].a},
    choferStateObject:(state)=>(obj)=>{return state[obj]},
    choferStateFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    choferStateFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
    
};
const mutations={
    setChoferState(state,data){
        if(data.servicios){
            state.servicios = {a: data.servicios};
        }
    },

    rechazarViaje(state, servicio){
        let i = state.servicios.a.findIndex(x=>{return x.id == servicio.id});
        if(i != -1){
            state.servicios.a.splice(i,1)
            state.servicios = JSON.parse(JSON.stringify({a: state.servicios.a}));
        }
    },

    updateChoferState(state,[campo,id]){
        state[campo] = id;
    },
  
};
const actions={

    postTomarViaje({ commit, state }, viaje_id){
        let data = {
            servicios_id: viaje_id,
        };

        let finish = (res)=>{
            this.commit('updateServicioState',res.data);
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            swal("","Viaje tomado con exito, dirigete a la ubicación de tu pasajero para recolectarlo.","success");
        };

        this.dispatch('postPromiseLoader', ['servicios/tomar', data]).then(
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