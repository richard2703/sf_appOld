import axios from 'axios';


const STATE_WAIT = "wait";
const STATE_INCALL = "incall";
const appcode = 410000;

const initialState = {
    enable: true,
    init:{status:null}, //1-Se va a iniciar, 2-Iniciado, 3-
    webRTCClient: null ,
    dataClient: null,
    localId:{id:null},
    callId:{id:null},
    video_source:{principal: null, secondaria: null},
    estatus:{state:STATE_WAIT},
    usuario:{},
    usuario_calling:{id:1,},
    indicaciones:{
        top:    false,
        right:  false,
        down:   false,
        left:   false,
    }
};
const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    getLocalId(state){return state.localId;},
    getDataClient(state){return state.dataClient;},
    getUsuarioLLamada(state){return state.usuario;},
    getUsuarioLLamando(state,getters){return getters.getUsuarioActivoById(state.usuario_calling.id);},
    getIndicaciones(state){return state.indicaciones},
    
};
const mutations={
    
    initApirtc(state){
        if(state.enable){
            if(!this.getters.getSession.id){
                return;
            }
            if(!state.init.status){
                state.init ={status : 1};
                if(typeof(apiRTC) != "undefined"){
                    apiRTC.init({
                        apiCCId : appcode+this.getters.getSession.id, // Your can overide your number
                        onReady: (e)=>{this.commit('createSession',e)},
                        apiKey: "32f19979c7def20b960af53d2962d122"
                        // apiKey: "90255007f0c173cfe2470883c43085ee"
                    });
                }
            }
        }
    },
    createSession(state,e){
        //es un canal para recibir informacion
        apiRTC.addEventListener('receiveData',(e)=>{this.commit('reciveDirections',e)});
        //evento para saber cuando alguien se conecta a ala app
        apiRTC.addEventListener('connectedUsersListUpdate',(e)=>{this.commit('eventUserConect',e)});

        // COMENTADO 18-JUL PARA VER QUE PASA
        // state.webRTCClient = apiCC.session.createWebRTCClient({});
        state.dataClient = apiCC.session.createDataClient({});

        //modo activo de contestar llamda
        // state.webRTCClient.setUserAcceptOnIncomingCall(true);
        
        state.localId = {id:apiCC.session.apiCCId};
        state.init =    {status : 2};
        // console.log(">>>>>Tu session APIRTC >>>",apiCC.session.apiCCId);
    },

    closeAllModals(state, llamada=false){
        //cerramos todos los modales
        this.commit('closeModal',['llamar']);
        this.commit('closeModal',['llamada_entrante']);
        if(!llamada){this.commit('closeModal',['llamada']);}
        else {this.commit('openModal',['llamada']);}
    },

    logoutApirtc(state){
        apiRTC.disconnect();
        state.init ={status:null};
    },
    reciveDirections(state, info){
        // console.log(">>>>>>>>>>>>>>>>>>>>>>> recive Data", info.detail.data);
        let data = info.detail.data;
        if(data.instruccion){
            state.indicaciones[data.instruccion] = true;
            state.indicaciones = JSON.parse(JSON.stringify(state.indicaciones));
            setTimeout(()=>{
                state.indicaciones[data.instruccion] = false;
                state.indicaciones = JSON.parse(JSON.stringify(state.indicaciones));
            },300);
        }
        else if(data.mensaje){
            this.commit('insertMsn',[data.mensaje]);
            this.dispatch('synchronizeData');
        }
        else if (data.ayuda_asignada){
            this.commit('setUsuarioAsignado', data.usuario);
            this.dispatch('synchronizeData');
        }
        else {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>> ME ACTUALIZO", data);
            this.dispatch('synchronizeData');
        }
    },
    eventUserConect(state,info){
        // console.log("UPDATED list users", apiCC.session.getConnectedUserIdsList());
        // this.dispatch('synchronizeData');
    },
};
const actions={
    sendDataUser({state}, [user_id,data]){
        if(data){
            data.app = 'socialflow';
        }
        state.dataClient.sendData(appcode + user_id, data, 
        (e) => {
            // console.log(">>>> envio de informacion", e)
        });
    },
    sendDataAllUsers({state},[data]){
        if(typeof(apiCC) != "undefined"){
            if( apiCC.session ){
                let users = apiCC.session.getConnectedUserIdsList();
                if(data){
                    data.app = 'socialflow';
                }
                users.map(u=>{
                    // console.log("u", u.userId, Number(u.userId) > appcode);
                    if(Number(u.userId) > appcode){
                        state.dataClient.sendData(u.userId, data,()=>{});
                    }
                });
            }
        }
    },
    updateUsers({state},msn){
        this.dispatch('sendDataAllUsers',[{msn: msn}]);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};