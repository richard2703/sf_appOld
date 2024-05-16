import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');

const initialState = {
    contactos: {a:[]},
    contacto: null,
    usuario: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    contactosObject:(state)=>(obj)=>{return state[obj]},
    contactosArray:(state)=>(obj)=>{return state[obj].a},
    contactosFind:(state)=>([obj,data])=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    contactosFindInside:(state)=>([obj,data,key,id])=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
};
const mutations={
    updateContactoState(state,data){
        if(data.contactos){
            state.contactos = {a: data.contactos};
        }
    },
    setContactoState(state,[key,data]){
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

    postAgregarContacto({ commit, state }, [usuario, back = false]){
        let data = {
            usuario: usuario,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            swal("","Contacto agregado","success");
            this.commit('closeModal',['modalUsuario']);
            if(back){
                this.getters.getRouter.back();
            }
        };
        this.dispatch('postPromiseLoader', ['contactos/save_contacto', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarInvitacion({ commit, state }, email){
        let data = {
            email: email,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            swal("","Invitación enviada","success");
            this.getters.getRouter.back();
        };
        this.dispatch('postPromiseLoader', ['contactos/enviar_invitacion', data]).then(
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