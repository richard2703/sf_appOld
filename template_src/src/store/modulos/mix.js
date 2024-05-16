import axios from 'axios';
const moment = require('moment');
const storage1 = 'storage1';
const comision = 0;

const initialState = {
};
const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    mixStateArray:(state)=>(obj)=>{return state[obj].a},
    mixStateObject:(state)=>(obj)=>{return state[obj]},
    mixStateFind:(state)=>([obj,data])=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    mixStateFindInside:(state)=>([obj,data,key,id])=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
    
};
const mutations={
    setMixState(state,data){
        
    },
    setMixStateExrtra(state,data){
        
    },
    updateMixState(state,[campo,id]){
        // console.log("SET SATTE", state);
        state[campo] = id;
    },
  
};
const actions={
    postAgregarPersonal({ commit, state }, [form, img]){
        let url = 'usuarios/registro';
        if(form.id){
            url = 'usuarios/edit_personal';
        }
        let end = ()=>{
            this.dispatch('synchronizeData');
            if(form.id){
                swal("",`Personal editado`,"success");
            }
            else{
                swal("",`Personal agregado`,"success");
            }
            this.getters.getRouter.back('/mi_personal',{force: true});
        };
        this.dispatch('postPromiseLoader', [url, form]).then(
            res => {
                if(!form.id || !img){
                    end();
                    return;
                }
                let data = {
                    id: form.id,
                    email: form.email,
                    nombre: form.nombre,
                };
                this.dispatch('postPromiseLoaderImage',['usuarios/edit_personal', data, img]).then(
                    res => {
                        end();
                    },
                    error=>{});
            },error=>{});
    },
    postEliminarPersonal({ commit, state }, id){
        let end = ()=>{
            this.dispatch('synchronizeData');
            swal("",`Personal Eliminado`,"success");
            this.getters.getRouter.back('/mi_personal',{force: true});
        };
        let data = {
            id : id,
        };
        this.dispatch('postPromiseLoader', ['usuarios/eliminar_personal', data]).then(
            res => {
                end();
            },error=>{});
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};