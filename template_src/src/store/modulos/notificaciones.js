
const initialState = {
    enable: true,
    notificacion:{},
    pushNotification:{},
    push: null,
    opciones:{
        android:{
            senderID: '80519246540',
            forceShow:false,
        },
        ios: {
            alert: true,
            sound: true,
            badge: true,
        },     
    },
    token:null,

    info:{},

    x:{
        additionalData:{
            payload:{
                tipo: 'cobroevento',
                msg: 'Re realizo cobro de 300',
                body: 'Re realizo cobro de la coopera de la reunion XV Maria por la cantidad de 300'
            }
        }
    }

};
const state = JSON.parse(JSON.stringify(initialState));
const getters = { 
    notiInfo(state){return state.info;},
    notificacion(state){return state.notificacion;},
    pushNotification(state){return state.pushNotification;},
};
const mutations = {
    setNotificacionesData(state, data){
        if(data.notificacion && data.notificacion.id){
            state.notificacion = data.notificacion;
            this.commit('openModal',['modalNotificacion']);
        }
        else{
            state.notificacion = {};
            if(!state.pushNotification.tipo){
                this.commit('closeModal',['modalNotificacion']);
            }
        }
    },

    iniciarNotificacionInterna(state, notificacion){
        let info = notificacion.additionalData.payload;
        if(info.tipo == 'cobroevento' || info.tipo == 'toshow' || info.tipo == 'custom' ){
            state.info = info;
            this.commit('openModal',['modalNotificacion']);
            this.dispatch('synchronizeData');
        }
        
    },

    initPushDeviceReady(state){
        if(state.enable){
            if(this.getters.deviceready){
                if(this.getters.getSession.token){
                    console.log("VOY INICIANDO PUSH");
                    if(!state.push){
                        let init = ()=>{
                            console.log("REGISTRANDO PUSH READY");
                            state.push = PushNotification.init(state.opciones);
                            PushNotification.hasPermission(data => {
                                if (data.isEnabled) {
                                    console.log('>>>>PUSH is Enabled');
                                }
                            });
                            let processNotificacion = (data)=>{
                                this.dispatch('synchronizeData');
                                this.commit('iniciarNotificacionInterna',data);
                            };
                            state.push.on('registration', data => {
                                state.token = data.registrationId;
                                this.dispatch('postSaveToken');
                            });
                            state.push.on('notification', data => {
                                console.log("==== NOTI RECIBIDA", data);
                                processNotificacion(data);
                            });
                        };
                        init();
                    }
                }
            }else{
                // this.commit('iniciarNotificacionInterna',state.x);
            }

        }
    },

    cerrarPush(state){
        state.push = null;
    },

    unsubcribe(state, token = '1'){
        if(state.enable){
            console.log('BORRANDO SUBSCRIPCION A PUSH');
            if(this.getters.deviceready){
                if(state.push){
                    this.dispatch('postRemoveToken', token);
                    state.push.off('registration', data => {
                        console.log("OFF REGIS", data);
                        state.push = null;
                    });
                }
            }
        }
    },

    cleanPush(state){
        // state.push = null;
    },

    goToMensajes(state){
        this.commit('cerrarNotificacionMensaje');
        this.getters.getRouter.navigate('/mensajes',{reloadCurrent:true});
    }
};
const actions = {
    postSaveToken({state}){
        if(this.getters.getSession.token){
            let data ={
                app_version:    '1.10.0',
                app_identifier: 'com.social.flow',
                type:           'usuarios',
                type_name:      'token',
                type_id:        this.getters.getSession.token,
                device_token:   state.token,
                platform:       device.platform,
            };
            this.dispatch('postPromiseNoError', ['pushbridge/savetoken', data]).then(res => {},error=>{});
        }
    },

    postRemoveToken({state}, token = '1'){
        let data ={
            app_version:    '1.10.0',
            app_identifier: 'com.social.flow',
            type:           'usuarios',
            type_name:      'token',
            type_id:        token,
            device_token:   state.token,
            platform:       device.platform,
            model:          device.model,
        };
        this.dispatch('postPromiseNoError', ['pushbridge/removetoken', data]).then(res => {},error=>{});
    },

    postupdateNotification({state}){
        let data ={
            notificacion: state.notificacion,
        };
        this.dispatch('postPromiseNoError', ['notificaciones/read_notificacion', data]).then(
            res => {
                this.dispatch('synchronizeData');
            },error=>{
                this.dispatch('synchronizeData');
            });
    },
    postPushPrueba({state},form){
        this.dispatch('postPromise', ['sync/push_prueba', form]).then(
            res => {this.dispatch('synchronizeData');},error=>{this.dispatch('synchronizeData');});
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};

// SRT001 