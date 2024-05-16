import axios from 'axios';
import _ from 'lodash';
const storage = 'socialflownewuser';

const initialState = {
    session : JSON.parse(localStorage.getItem(storage)) || {token: null, tipo: 'usuario'},
    cuentas: {a:[]},
    metodos_pago: {a:[]},
    registro: {
        foto:       null,
        nombres:    null,
        nombre:     null,
        email:      null,
        telefono:   null,
        password:   null,
    },
    color: JSON.parse(localStorage.getItem('stColor')) || { p: '#dbdbdb', l:'#262a65' },
    coloresX: [
        { p: '#dbdbdb', l:'#262a65' },
        { p: '#262a65', l:'white' },
        { p: '#05789b', l:'white' },
        { p: '#6f73aa', l:'white' },
        { p: '#ce6cbe', l:'white' },
        { p: '#dbcad4', l:'white' },
        { p: '#30bced', l:'white' },
        { p: '#fce837', l:'black' },
        { p: 'white',   l:'#262a65' },
        { p: '#ff9e03', l:'#262a65' },
        { p: '#f82929', l:'white' },
        { p: '#498a80', l:'#262a65' },
        { p: '#4cd77c', l:'#262a65' },
        { p: '#004445', l:'white' },
        { p: '#72b606', l:'#262a65' },
    ],
};
const state = JSON.parse(JSON.stringify(initialState));

const getters = {   
   getSession(state){return state.session},
   getColor(state){return state.color},
   esUsuario(state){return state.session.tipo == 'usuario'},
   user(state){return state.session.tipo == 'usuario'},
   chofer(state){return state.session.tipo == 'chofer'},
   getMetodos:(state)=>{return state.metodos_pago.a;},
   getMetodoPago:(state)=>(id)=>{return state.metodos_pago.a.find(m=>{return m.id == id}) || {};},
   getFormRegistro(state){return state.registro},
   
};

const mutations = {
    setToken(state, data){
        state.session = {token: data.token, tipo: data.tipo};
        this.commit('initColor', [data])
        localStorage.setItem(storage,JSON.stringify(state.session));
    },

    initColor(state, [data]){
        let c = JSON.parse(localStorage.getItem('stColor'));
        // console.log("FINDI COLORS ----->", localStorage.getItem('stColor'), c);
        if(!c){
            if(data.color){
                // console.log("COLOR FORM DATABEAS", data.color, data);
                c = state.coloresX.find(s=>s.p == data.color);
                if(c){
                    // console.log("FIND COLORS EXPO ",  c, state.color, localStorage.getItem('stColor'),);
                    state.color.p = c.p;
                    state.color.l = c.l;
                    localStorage.setItem('stColor', JSON.stringify(state.color));
                }
            }
        }
    },

    setColor(state, color){
        state.color = color;
        localStorage.setItem('stColor', JSON.stringify(state.color));
        this.dispatch('postGetSyncForm', [ {color: state.color} ]);
    },

    setSession(state, data){
        if(data.usuario){
            state.session = data.usuario;
            // console.log("usuarios", state.session);
        }
        if(data.metodosPago){
            state.metodos_pago = {a:data.metodosPago};
            this.commit('initMetodoPago',data.metodosPago);
        }
    },
    logout(state){
        localStorage.removeItem(storage);
        localStorage.removeItem('stColor');
        localStorage.clear();
        this.commit('unsubcribe', state.session.token);

        state.session = {token: null, tipo: 'usuario'};
        state.color = { p: '#dbdbdb', l:'#262a65' };
        this.getters.getRouterView('login').navigate('/login',{reloadCurrent: true});
        this.commit('changeView','login');
        
        this.getters.getRouterView('login').navigate('/login',{reloadCurrent: true});
        this.commit('clearNoti');
        this.commit('cerrarPush');
        this.commit('cleanPush');
        this.commit('cleanCarrito');
        this.commit('initVista');
        this.commit('logoutApirtc');
    },

    processSession(state, fn){
        if(!state.session.token){
            this.commit('openModal',['modalSession']);
            return;
        }
        fn();
    },
    
    processRuteSession(state, ruta){
        if(!state.session.token){
            this.commit('openModal',['modalSession']);
            return;
        }
        this.getters.getRouter.navigate(ruta);
    },

    setFormRegistro(state, form){state.registro = form;},
    initWatcher(state,id){state.GPSWatcher = id},
    cleanWatcher(state){
        navigator.geolocation.clearWatch(state.GPSWatcher);
        state.GPSWatcher = false
    },
    initVista(state){
        this.getters.getRouterView('usuario').navigate('/inicio',{reloadCurrent:true});
        // this.getters.getRouterView('chofer').navigate('/inicio_chofer',{force:true});
    }
};

const actions = {

    postRegistro({ commit, state }, [form, cats]){
        let data = {
            form,
            cats,
        };
        this.dispatch('postPromiseLoader', ['usuarios/registro', data, true]).then(
            res => {
                this.commit('initVista');
                this.commit('setToken', res.data)
                this.dispatch('synchronizeData',true);
                this.commit('changeView', 'usuario');
                swal("",`Bienvenid@ ${form.nombre}`,"success");
            },error=>{});
    },

    postLogin({ commit, state }, [data]){
         this.dispatch('postPromiseLoader', ['usuarios/login', data]).then(
            res => {
                this.commit('setToken', res.data);
                this.dispatch('synchronizeData', true);
                this.commit('initVista');
                this.commit('changeViewByTipe');
                // this.commit('changeView','usuario');
                // swal("",res.msg,"success");
            },
            error=>{});
    },
    
    postBorrarPerfil({ commit, state }, [data, callback = null]){
         this.dispatch('postPromiseLoader', ['fechas/borrar_usuario', data]).then(
            res => {
                if(callback){
                    callback();
                }
            },
            error=>{});
    },

    postrecoverPassword({ commit, state }, [data]){
         this.dispatch('postPromiseLoader', ['usuarios/reset_password', data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal("","Se han enviado las indicaciones a tu correo","success");
            },
            error=>{});
    },

    postSendCode({ commit, state }, [data]){
         this.dispatch('postPromiseLoader', ['usuarios/validar_codigo', data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal("","Asignacion correcta, gracias","success");
            },
            error=>{});
    },

    postRelaciona({ commit, state }, [data]){
         this.dispatch('postPromiseLoader', ['usuarios/relaciona_cuenta', data]).then(
            res => {
                this.dispatch('synchronizeData');
                swal("","Codigo Enviado","success");
            },
            error=>{});
    },

    postChangePassword({ commit, state }, data){
        let d = {
            form: data
        };
         this.dispatch('postPromise', ['usuarios/edit', d]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal("",res.msg,"success");
            },
            error=>{});
    },
    postEditCuenta({ commit, state }, [data, update = false, cats = []]){
        let d = {
            form: data,
            cats,
        }
        this.dispatch('postPromiseLoader', ['usuarios/edit', d]).then(
            res => {
                this.dispatch('synchronizeData');
                swal(res.msg,"","success");
                this.getters.getRouter.back();
            },
            error=>{});
    },
    postSetActive({ commit, state }, active){
        let data = {
            form:{
                id: this.getters.getSession.id,
                nombre: this.getters.getSession.nombre,
                email: this.getters.getSession.email,
                active: active,
            }
        };
        this.dispatch('postPromise', ['usuarios/edit', data]).then(
            res => {
                this.dispatch('synchronizeData');
            },
            error=>{});
    },
    postAddMetodoPago({ commit, state }, data){
        data.modo = this.getters.stripeModo;
        this.dispatch('postPromiseLoader', ['metodospago/add', data]).then(
            res => {
                this.dispatch('synchronizeData');
                this.getters.getRouter.back();
                swal(res.msg,"","success");
            },
            error=>{});
    },
    postUpdatePrincipal({ commit, state }, data){
         this.dispatch('postPromiseLoader', ['metodospago/update_principal', data]).then(
            res => {
                this.dispatch('synchronizeData');
                // swal(res.msg,"","success");
            },
            error=>{});
    },
    postRemoveMetodoPago({ commit, state }, data){
        let form = {
            metodos_id: data.id
        };
        this.dispatch('postPromiseLoader', ['metodospago/remove', form]).then(
            res => {
                this.dispatch('synchronizeData');
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