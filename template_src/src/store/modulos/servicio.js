import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');

const initialState = {
    servicio: {},
    destino: {},
    lastEstatus: null,
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    servicioObject:(state)=>(obj)=>{return state[obj]},
    servicioArray:(state)=>(obj)=>{return state[obj].a},
    servicioFind:(state)=>(obj,data)=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    servicioFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
    estatusUsuario:(state)=>{
        switch(state.servicio.estatus){
            case 'creado':
                return '';
            case 'asignado':
                return 'El chofer va camino a tu ubicación';
            case 'encamino_reco':
                return 'El chofer va camino a tu ubicación';
            case 'llegado_reco':
                return 'El chofer llego a tu ubicación';
            case 'encamino_entrega':
                return 'Vas en camino a tu destino, ponte comodo.';
            case 'llegado_entrega':
                return 'Llegaste a tu destino';
            case 'terminado':
                return 'Viaje terminado';
            case 'cancelado':
                return 'Viaje cancelado';
        }
    },
    estatusChofer:(state)=>{
        switch(state.servicio.estatus){
            case 'creado':
                return '';
            case 'asignado':
                return 'En camino a la ubicación';
            case 'encamino_reco':
                return 'En camino a la ubicación';
            case 'llegado_reco':
                return 'Llegaste a la ubicación';
            case 'encamino_entrega':
                return 'En camino al destino';
            case 'llegado_entrega':
                return 'Llegaste al destino';
            case 'terminado':
                return 'Viaje terminado';
            case 'cancelado':
                return 'Viaje cancelado';
        }
    },
    nextEstatusBoton:(state)=>{
        switch(state.servicio.estatus){
            case 'asignado':
                return 'Voy en camino';
            case 'encamino_reco':
                return 'Llegue a la ubicacion';
            case 'llegado_reco':
                return 'Voy camino al destino';
            case 'encamino_entrega':
            case 'llegado_entrega':
                return 'Terminar viaje';
            case 'creado':
            case 'terminado':
            case 'cancelado':
                return '';
        }
    },
    nextEstatus:(state)=>{
        switch(state.servicio.estatus){
            case 'asignado':
                return 'encamino_reco';
            case 'encamino_reco':
                return 'llegado_reco';
            case 'llegado_reco':
                return 'encamino_entrega';
            case 'encamino_entrega':
            case 'llegado_entrega':
                return 'terminado';
            case 'creado':
            case 'terminado':
            case 'cancelado':
                return '';
        }
    },
};

const mutations={

    updateServicioState(state,data){
        if(data.servicio){
            if(data.servicio.id){
                state.servicio = data.servicio;
                if(!state.destino.id){
                    state.destino = state.servicio.destino;
                }
                if(state.servicio.nuevoDestino && state.servicio.nuevoDestino.id){
                    this.commit('openModal',['modalNuevoDestino']);
                    state.destino = state.servicio.destino;
                }

                data.servicio.chat = this.getters.getChatByServicio(data.servicio.id);
                data.servicio.lastMensaje = {};
                data.servicio.nuevoMensaje = false;
                if(data.servicio.chat){
                    if(data.servicio.chat.mensajes.length){
                        data.servicio.lastMensaje = data.servicio.chat.mensajes[data.servicio.chat.mensajes.length-1];
                        data.servicio.lastMensaje.mine = this.getters.getSession.id ==  data.servicio.lastMensaje.usuarios_id;
                        data.servicio.nuevoMensaje = !(this.getters.getSession.id ==  data.servicio.lastMensaje.usuarios_id);
                    }
                }
            }
            switch(state.servicio.estatus){
                case 'creado':
                case 'asignado':
                case 'encamino_reco':
                case 'llegado_reco':
                case 'encamino_entrega':
                case 'llegado_entrega':
                    if(this.getters.user){
                        if(!state.lastEstatus){
                            // swal({
                            //     icon: 'success',
                            //     title: this.getters.estatusUsuario,
                            //     text: '',
                            //     button: 'Entendido',
                            // });
                            // swal("Servicio actualizado", this.getters.estatusUsuario, "success");
                            state.lastEstatus = state.servicio.estatus;
                        }
                        if(state.lastEstatus != state.servicio.estatus){
                            swal({
                                icon: 'success',
                                title: this.getters.estatusUsuario,
                                text: '',
                                button: 'Entendido',
                            });
                            // swal("Servicio actualizado", this.getters.estatusUsuario, "success");
                            state.lastEstatus = state.servicio.estatus;
                        }
                    }
                    
                    if(this.getters.user){
                        if(this.getters.getRuta.url != '/servicio_usuario' && this.getters.getRuta.url != '/mensajes_chat'){
                            this.getters.getRouter.navigate('/servicio_usuario',{reloadCurrent: true});
                        }
                    }
                    if(this.getters.chofer){
                        if(this.getters.getRuta.url != '/servicio_chofer' && this.getters.getRuta.url != '/mensajes_chat'){
                            this.getters.getRouter.navigate('/servicio_chofer',{reloadCurrent: true});
                        }
                    }
                    return;
                case 'terminado':
                    if(this.getters.user){
                        if(this.getters.getRuta.url == '/servicio_usuario'){
                            swal("","Viaje terminado","success");
                            this.commit('openModal',['modalCalificar']);
                            this.getters.getRouter.navigate('/inicio',{reloadCurrent: true});
                        }
                    }
                    if(this.getters.chofer){
                        if(this.getters.getRuta.url == '/servicio_chofer'){
                            swal("","Viaje terminado","success");
                            this.getters.getRouter.navigate('/inicio_chofer',{reloadCurrent: true});
                        }
                    }
                    return;
                case 'cancelado':
                    if(this.getters.user){
                        if(this.getters.getRuta.url == '/servicio_usuario'){
                            swal("Viaje cancelado","El chofer cancelo el viaje","success");
                            this.getters.getRouter.navigate('/inicio',{reloadCurrent: true});
                        }
                    }
                    if(this.getters.chofer){
                        if(this.getters.getRuta.url == '/servicio_chofer'){
                            swal("Viaje cancelado","El usuario cancelo el viaje","success");
                            this.getters.getRouter.navigate('/inicio_chofer',{reloadCurrent: true});
                        }
                    }
                    return;
            }
        }
        
    },

    setServiciosState(state,[key,data]){
        state[key] = data;
    },
   
};

const actions={

    postActualizarEstatus({ commit, state }){

        let data = {
            servicio: state.servicio,
            estatus: this.getters.nextEstatus,
        };
        let finish = (res)=>{
            if(data.estatus == 'llegado_reco'){
                swal({
                    icono: 'success',
                    title: '',
                    text: 'Encuentrate con tu pasajero , invitalo a pasar y documenta el siguiente estatus',
                    button: 'Entedido',
                });
            }
            if(data.estatus == 'encamino_entrega'){
                swal({
                    icono: 'success',
                    title: '',
                    text: 'Ofrece agua a tu pasajero y que se ponga comodo, pronto llegaran.',
                    button: 'Entedido',
                });
            }
            if(data.estatus == 'terminado'){
                swal("","Viaje terminado","success");
                this.getters.getRouter.navigate('/historial_chofer',{reloadCurrent: true});
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/update_servicio_chofer', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postCambiarDestino({ commit, state }, form){
        let data = {
            servicio: state.servicio,
            destino: form,
        };

        let finish = (res)=>{
            swal({
                icon: 'success',
                title: 'Destino actualizado',
                text: ' El tiempo y el costo de tu viaje puede variar dependiendo el destino indicado',
                button: 'Entedido',
            });
            this.commit('closeModal',['modalCambioDestino']);
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/cambiar_destino', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postCancelarUsuario({ commit, state }){
        let data = {
            servicio: state.servicio,
            estatus: 'cancelado',
        };

        let finish = (res)=>{
            swal("","Viaje cancelado","success");
            this.getters.getRouter.navigate('/inicio',{reloadCurrent: true});
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/cancelar_usuario', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postCancelarChofer({ commit, state }){
        let data = {
            servicio: state.servicio,
            estatus: 'cancelado',
        };

        let finish = (res)=>{
            swal("","Viaje cancelado","success");
            this.getters.getRouter.navigate('/inicio_chofer',{reloadCurrent: true});
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/cancelar_servicio_chofer', data]).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    postActulizarDestinoChofer({ commit, state }, estatus){
        let data = {
            servicio: state.servicio,
            estatus: estatus,
        };

        let finish = (res)=>{
            if(estatus == 'rechazado'){
                swal("","Nuevo destino rechazado","success");
            }
            if(estatus == 'confirmado'){
                swal("","Nuevo destino aceptado","success");
            }
            this.commit('closeModal',['modalNuevoDestino']);
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/actualizar_destino_chofer', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postSolictarAyuda({ commit, state }){
        let data = {
            servicio: state.servicio,
        };

        let finish = (res)=>{
            swal("","Solicitud de ayuda enviada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{grupo:true}]);
        };

        this.dispatch('postPromiseLoader', ['servicios/push_ayuda', data]).then(
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