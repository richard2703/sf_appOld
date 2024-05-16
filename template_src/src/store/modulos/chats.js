import swal from 'sweetalert';

const moment = require('moment');
const initialState = {
    usuarios: {arreglo: []},
    chats:{arreglo:[]},
    mensajeNuevo: 0,
    mensajesGrupo: 0,
    chat:{id:null},
};
const state = JSON.parse(JSON.stringify(initialState));
const getters = { 
    getChats(state){return state.chats.arreglo;},
    mensajeNuevo(state){return state.mensajeNuevo; },
    getChat(state){return state.chats.arreglo.find(c=>{return c.id == state.chat.id});},
    getChatServicio(state,getters){return state.chats.arreglo.find(c=>{return c.servicios_id == getters.userStateObject('servicioProceso').id });},
    getChatByServicio:(state,getters)=>(id)=>{return state.chats.arreglo.find(c=>{return c.servicios_id == id });},
    getChatServicioRepa(state,getters){return state.chats.arreglo.find(c=>{return c.servicios_id == getters.agenteStateObject('servicioProceso').id });},
    getFecha: (state) => (fecha) =>{
        let now = moment().format('YYYY-MM-DD');
        fecha = moment(fecha).format('YYYY-MM-DD');
        if(moment(fecha).diff(now, 'days')==0) return 'hoy';
        else if (moment(fecha).diff(now, 'days')==-1) return 'ayer';
        else return moment(fecha).format('DD/MM/YY');
    },
    getFechaHora: (state)=>(fecha)=>{
        let now = moment().format('YYYY-MM-DD');
        if(moment(fecha).diff(now, 'days')==0) return moment(fecha).format('[hoy] hh:mm a');
        else if (moment(fecha).diff(now, 'days')==-1) moment(fecha).format('[ayer] hh:mm a');
        else return moment(fecha).format('DD/MM/YY hh:mm a');
    },
    getUsuarios(state){return state.usuarios.arreglo},
    getUsuarioBloqueado: (state) => (id)=> {
        return state.usuarios_bloqueados.arreglo.find(u=>{return u.bloqueado_id == id}) != undefined;
    },
    getBloqueoUsuario:(state,getters) => (id)=> {
        return state.bloqueo_usuarios.arreglo.find(u=>{return u.bloqueado_id == getters.getSession.id && u.usuarios_id == id}) != undefined;
    }
};

const mutations = {

    setChats(state,data){
        if(data.chats) {
            // console.log("!!!!!!!!! CHATS",data, data.chats);
            state.chats = {arreglo:data.chats};
            state.chats = {arreglo: state.chats.arreglo.sort((a,b)=>{
                let date_b = (b.mensajes.length)?b.mensajes[b.mensajes.length-1].fecha:0;
                let date_a = (a.mensajes.length)?a.mensajes[a.mensajes.length-1].fecha:0;
                return moment(date_b).diff(date_a)}
            )};

            state.mensajeNuevo = 0;
            let noLeidos = [];

            state.chats.arreglo.map(c=>{
                c.leido = false;
                c.notificacion = 0;
                c.mensajes.map(m=>{
                    if(m.usuarios_id != this.getters.getSession.id){
                        c.notificacion++;
                    }
                });
                let last = ( c.mensajes[ c.mensajes.length - 1 ] || {} );


                if( last.usuarios_id && last.usuarios_id != this.getters.getSession.id){
                    if(last.leido == null){
                        if(last.fecha > this.getters.getSession.fecha_lectura_chats){
                            state.mensajeNuevo = state.mensajeNuevo + 1;
                        }
                        noLeidos.push(last);
                    }
                }
            });
            // console.log("NO LEIDOS", state.mensajeNuevo,  noLeidos, );
        }
        if('mensajesGrupo' in data){
            state.mensajesGrupo = data.mensajesGrupo;
            state.mensajeNuevo  += state.mensajesGrupo;
        }
        
        if(data.usuarios_bloqueados) state.usuarios_bloqueados = {arreglo:data.usuarios_bloqueados};
        if(data.bloqueo_usuarios) state.bloqueo_usuarios = {arreglo:data.bloqueo_usuarios};        
    },

    setUsuarios(state,data){
        if(data.usuarios){
            let now = moment().format('YYYY-MM-DD');
            data.usuarios.map(u=>{
                let dia = moment(u.fecha_nacimiento);
                u.edad = moment(now).diff(dia,'years');
            });
            state.usuarios = {arreglo:data.usuarios};
        }
    },

    selectChat(state,id){
        state.chats.arreglo.map(x=>{
            if(x.id == id){
                x.leido = true;
            }
        });
        state.chat = {id:id};
    },

    goToChatByChatId(state, chats_id){
        // console.log("CHATS", chats_id);
        let chat = state.chats.arreglo.find(c => {return c.id == chats_id });
        if(chat){
            this.commit('selectChat', chat.id);
            this.getters.getRouter.navigate('/mensajes_chat');
        }
    },

    chatTransaccion(state,tran){
        if(tran.usuarios_id != this.getters.getSession.id){
            this.commit('goToChat',[tran.usuarios_id]);
        }
        else{
            this.commit('goToChat',[tran.para_usuarios_id]);
        }
    },

    goToChat(state, [user_id]){
        if(user_id == this.getters.getSession.id){
            swal("","Usuario invalido","");
            return;
        }
        let chat = state.chats.arreglo.find(c => {return c.usuario.id == user_id});
        if(chat){
            this.commit('selectChat', chat.id);
            this.getters.getRouter.navigate('/mensajes_chat');
        }
        else{
            if(this.getters.user){
                this.dispatch('postCreateChatFromUsuario',[user_id]);
            }
        }
    },

    insertMsn(state,[msn]){
        let chat = state.chats.arreglo.find(c => {return c.id == msn.chats_id});
        // console.log("SET CHAT", chat, msn);
        if(chat){
            chat.mensajes.push(msn);
            state.chats = {arreglo: JSON.parse(JSON.stringify(state.chats.arreglo))};
        }
    },
};
const actions = {

    postLeerMsn({ commit, state }, [ msn, borrar = 0 ]){
        let data = {
            msn: msn,
            borrar: borrar
        };

        let finish = (res)=>{
            if(borrar>1){
                this.getters.getRouter.back();
            }
            this.dispatch('synchronizeData');
        };

        this.dispatch('postPromiseNoError', ['chats/leer_mensaje', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postSaveMsn({ commit, state }, [msn]){
        let data = {
            mensaje: msn,
            chats_id: state.chat.id,
        }
        let insert = {
            chats_id: state.chat.id,
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: `chat_${state.chat.id}_${_.uniqueId('temp_')}_${moment().format('X')}`,
            leido: null,
            mensaje: msn,
            usuarios_id: this.getters.getSession.id,
        };
        this.commit('insertMsn',[insert]);
        this.dispatch('postPromise', ['chats/save_msn', data]).then(
        res => {
            let mensaje = res.data.msn;
            this.dispatch('sendDataUser',[this.getters.getChat.usuario.id, {mensaje: mensaje}]);
            this.dispatch('synchronizeData');
        },
        error=>{});
    },

    postSaveMsnGrupo({ commit, state }, [msn, grupo]){
        let data = {
            mensaje: msn,
            eventos_id: grupo,
        }
        let insert = {
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: `chat_${grupo}_${_.uniqueId('temp_')}_${moment().format('X')}`,
            leido: null,
            eventos_id: grupo,
            mensaje: msn,
            usuarios_id: this.getters.getSession.id,
        };
        // this.commit('insertMsnGrupo',insert);
        this.dispatch('postPromise', ['chats/save_msn_grupo', data]).then(
        res => {
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        },
        error=>{});
    },

    postCreateChatFromUsuario({ commit, state }, [amigos_id]){
        let data = {
            amigos_id: amigos_id
        };
        this.dispatch('postPromiseLoaderSync', ['chats/create_chat', data, false]).then(
            res => {
                this.commit('goToChat',[amigos_id]);
            },
            error=>{});
    },

    postBloquearUsuario({state},[chat]){
        let data = {
            chat:chat
        };
        this.dispatch('postPromiseLoader', ['chats/bloquear_usuario',data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.commit('closeModal',['modal_mensaje']);
                swal(res.msg,"","success");
            },
            error=>{});
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};