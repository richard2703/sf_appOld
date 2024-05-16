import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'lodash';
const moment = require('moment');

import viaje from './modulos/viaje.js';
import servicio from './modulos/servicio.js';
import chofer from './modulos/chofer.js';

import carrito from './modulos/carrito.js';
import restaurantes from './modulos/restaurantes.js';

import usuario from './modulos/usuario.js';

//  GENERALES
import sync from './modulos/sync.js';
import metodos from './modulos/metodos.js';
import session from './modulos/session.js';
import navigation from './modulos/navigation.js';
import notificaciones from './modulos/notificaciones.js';
import apirtc from './modulos/apirtc.js';
import camara from './modulos/camara.js';
import catalogos from './modulos/catalogos.js';
import escaner from './modulos/escaner.js';
import chats from './modulos/chats.js';
import fileunpload from './modulos/fileunpload.js';
import maps from './modulos/maps.js';
import provider from './modulos/provider.js';

Vue.use(Vuex);
const modules = {
    viaje,
    servicio,
    chofer,
    
    carrito,
    restaurantes,
    usuario,
    
    //  GENERALES
    sync,
    metodos,
    session,
    navigation,
    notificaciones,
    apirtc,
    camara,
    catalogos,
    escaner,
    chats,
    fileunpload,
    maps,
    provider,
};
const state = {
    base:   { url:"https://socialflow.app/backend/apiv1/api/"},
    // base:   { url:"https://socialflow.app/admin/apiv1/api/"},
    procesando: false,
    api: '3'
};
const getters = {
    baseUrl(state){return state.base.url;},
    ready(state){return !state.procesando;},
    getArrayFotos:()=>(fotos)=>{
        let a = [];
        fotos.forEach(f=>{if(!f.id && f.url) a.push(f.url)});
        return a;
    },
    formatImagenesToArray:()=>(imagenes)=>{
        let a = [];
        imagenes.forEach(i=>{ a.push({id: i.id, url:i.imagenes_id})});
        a = a.concat(Array(4-a.length).fill({url:null}));
        return a;
    },
};
const mutations = {
    procesando(){state.procesando = true;},
    stop(){state.procesando = false;},
    initLoader(){this.commit('openModal',['loader']);},
    finishLoader(){this.commit('closeModal',['loader']);},
};
const actions = {
    postPromise({state}, [url, data, loader = false]){
        try{
            if(loader)this.commit('openModal',['loader']);
            if(this.getters.getSession.token) data.token = this.getters.getSession.token;
            return new Promise((resolve, reject) => {
                axios.post(state.base.url + url, data,  
                    { headers: { 'content-type' : 'text/plain' }, timeout: 500000 }).then(
                        response=>{
                            if(!response.data.status){
                                if(response.data.msg != 'Usuario inexistente'){
                                    swal(response.data.msg, "", "error");
                                }
                                reject(response.data);
                                this.commit('closeModal',['loader']);
                                return;
                            }
                            resolve(response.data);
                        }).catch(error => {
                            swal("","Hubo un error de red, por favor verifique su conexión", "error");
                            reject(error);
                            this.commit('closeModal',['loader']);
                        }).finally( () => {
                            // console.log("Finally");
                        });
                    });
        }
        catch (e){
            console.error("ERROR",e);
            this.commit('closeModal',['loader']);
        }
    },
    
    //POMESA CON LOADER
    postPromiseLoader({state}, [url, data]){
        try{
            this.commit('openModal',['loader']);
            if(this.getters.getSession.token) data.token = this.getters.getSession.token;
            return new Promise((resolve, reject) => {
                axios.post(state.base.url + url, data,  
                    { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                        response=>{
                            this.commit('closeModal',['loader']);
                            if(!response.data.status){
                                if(response.data.changeCard){
                                    swal({
                                        title: response.data.msg,
                                        text: null,
                                        icon: 'error',
                                        buttons: {
                                            set: 'Agregar otra tarjeta o cambiarla',
                                            cancel: "Cancelar",
                                        },
                                    }).then((value) => {
                                        if (value == "set") {
                                            this.getters.getRouter.navigate('/metodos_pago');
                                        }
                                    });
                                }
                                else if(response.data.msg != 'Usuario inexistente') {
                                    if(response.data.msg == 'Contraseña incorrecta'){
                                        swal({title: response.data.msg, text:"", icon:"error", button: "Reintentar" });
                                    }
                                    else{
                                        swal(response.data.msg, "", "error");
                                    }
                                }
                                reject(response.data);
                                return;
                            }
                            resolve(response.data);
                        },
                        err=>{
                            this.dispatch('synchronizeData');
                            this.commit('closeModal',['loader']);
                            swal("","Hubo un error de red, por favor verifique su conexión", "error");
                            reject(err);
                        });
                    });
        }
        catch (e){
            this.dispatch('synchronizeData');
            this.commit('closeModal',['loader']);
            console.error("ERROR",e);
        }
    },
    postPromiseLoaderImage({state}, [url, data, foto]){
        try{
            this.commit('openModal',['loader']);
            if(this.getters.getSession.token) data.token = this.getters.getSession.token;
            return new Promise((resolve, reject) => {
                this.dispatch('unploadImage',[data,foto,url]).then(
                    response => {
                        this.commit('finishLoader');
                        resolve(response);
                        this.dispatch('synchronizeData');
                    },
                    error=>{
                        this.dispatch('synchronizeData');
                        this.commit('finishLoader');
                        reject(error);
                    });
            });
        }
        catch (e){
            this.commit('closeModal',['loader']);
            console.error("ERROR",e);
        }
    },

    postPromiseLoaderSync({state}, [url, data, alerta = true]){
        try{
            this.commit('openModal',['loader']);
            if(this.getters.getSession.token) {
                data.token = this.getters.getSession.token;
            }
            return new Promise((resolve, reject) =>{
                axios.post(state.base.url + url, data, { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                        response=>{   
                            if(!response.data.status){
                                swal(response.data.msg, "", "error");
                                reject(response.data);
                                this.commit('closeModal',['loader']);
                                return;
                            }
                            let respuesta = response.data;
                            this.dispatch('postPromiseNoError',['sync/get',{}]).then(
                                res=>{
                                    this.commit('setData', [res.data]);
                                    this.commit('closeModal',['loader']);
                                    if(alerta){
                                        swal(respuesta.msg, "", "success");
                                    }
                                    resolve(respuesta);
                                },
                                er=>{
                                    this.dispatch('postGetSync');
                                    this.commit('closeModal',['loader']);
                                    if(alerta){
                                        swal(respuesta.msg, "", "success");
                                    }
                                    resolve(respuesta);
                                });
                        },
                        err=>{
                            this.commit('closeModal',['loader']);
                            swal("","Hubo un error de red, por favor verifique su conexión", "error");
                            reject(err);
                        });
                    }).catch(ee=>{
                        reject(ee);
                        this.commit('closeModal',['loader']);
                    });
        }
        catch (e){
            console.error("ERROR",e);
        }
    },
    //PROMESA SIN ERROR
    postPromiseNoError({state}, [url, data]){
        if(this.getters.getSession.token) data.token = this.getters.getSession.token;
        return new Promise((resolve, reject) =>
        {
            axios.post(state.base.url + url, data,  
                { headers: { 'content-type' : 'text/plain' }, timeout: 5000000 }).then(
                response=>{   
                    if(!response.data.status){
                        reject(response.data);
                        return;
                    }
                    resolve(response.data);
                },
                err=>{
                    reject(err);
                });
        });
    },
};

export const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules,   
});