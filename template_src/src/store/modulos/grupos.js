import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');

const initialState = {
    grupos: {a:[]},
    grupo: null,
    usuario: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    gruposObject:(state)=>(obj)=>{return state[obj]},
    gruposArray:(state)=>(obj)=>{return state[obj].a},
    gruposFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    gruposFindInside:(state)=>([obj,data,key,id])=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
};
const mutations={
    updateGruposState(state,data){
        if(data.grupos){
            data.grupos.map(g=>{
                g.creador = g.usuarios_id == this.getters.getSession.id;
            });
            state.grupos = {a: data.grupos};
        }
    },
    setGruposState(state,[key,data]){
        state[key] = data;
    }
};
const actions={

    postCrearGrupo({ commit, state }, form){
        let data = {
            form: form,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
            this.getters.getRouter.back();
            swal("","Grupo creado","success");
        };
        this.dispatch('postPromiseLoader', ['grupos/crear_grupo', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postAgregarUsuarioGrupo({ commit, state }, [usuario, back = false]){
        let data = {
            grupo: this.getters.gruposFind('grupos','grupo'),
            usuario: usuario,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            swal("","Usuario agregado","success");
            this.commit('closeModal',['modalUsuario']);
            if(back){
                this.getters.getRouter.back();
            }
        };
        this.dispatch('postPromiseLoader', ['grupos/save_usuario', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarDineroGrupo({ commit, state }, [grupo,form]){
        let data = {
            grupo: grupo,
            data: form,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            this.commit('closeModal',['modalConfirmar']);
            this.getters.getRouter.back();
            swal("","Envío exitoso","success");
        };
        this.dispatch('postPromiseLoader', ['transacciones/enviar_dinero_grupo', data]).then(
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