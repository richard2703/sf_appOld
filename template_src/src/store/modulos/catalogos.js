import axios from 'axios';
import _ from 'lodash';
const moment = require('moment-timezone');


const xs = 'idsNotiStorage';

const initialState = {
    modo: null,
    meses:{a:[
        {numero: '01', mes: 'Enero', dias: 31},
        {numero: '02', mes: 'Febrero', dias: 28},
        {numero: '03', mes: 'Marzo', dias: 31},
        {numero: '04', mes: 'Abril', dias: 30},
        {numero: '05', mes: 'Mayo', dias: 31},
        {numero: '06', mes: 'Junio', dias: 30},
        {numero: '07', mes: 'Julio', dias: 31},
        {numero: '08', mes: 'Agosto', dias: 31},
        {numero: '09', mes: 'Septiembre', dias: 30},
        {numero: '10', mes: 'Octubre', dias: 31},
        {numero: '11', mes: 'Noviembre', dias: 30},
        {numero: '12', mes: 'Diciembre', dias: 31},
    ]},
    bancos:  {a:[]},
    estados:  {a:[]},
    banners:  {a:[]},
    contactos:  {a:[]},
    regalosEventos:  {a:[]},
    notificaciones:  {a:[]},
    
    categorias:  {a:[]},
    tipos_fechas:  {a:[]},
    repeticiones:  {a:[]},
    productos:  {a:[]},
    sugerencia: null,
    producto: null,
    categoria: null,
    cambioUSD: 20,
    cambioIva: 0.16,
    cambioIva2: 0.08,

    notiAll: { a: [] },
    notificacionesTotal: 0,
    permisoA: 0,
    notificacionesLeidas:           { a: []},
    notificacionesPreLeidasVista:   { a: []},
    notificacionesPreLeidas:        { a: []},
};

const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    stripeModo(state){return state.modo},
    getCatalogos(state){return state},
    getCatalogo:(state)=>(cat)=>{return (state[cat]||{}).a || []},
    catalogoGetObject:(state)=>(key)=>{return state[key]},
    catalogoGetFind:(state)=>(key,id)=>{return state[key].a.find(x=>{return x.id == state[id]}) || {} },
    catalogoGetFindById:(state)=>(key,id)=>{return state[key].a.find(x=>{return x.id == [id]}) || {} },
};

const mutations={
    setVersion(state,data){
        if(data.version) state.version  = data.version;
    },

    updateCatalogosState(state,[key,value]){
        state[key] = value;
    },

    updateCatalogosArray(state,[key,value]){
        state[key].a.push(value);
        if(key == 'notificacionesLeidas'){
            localStorage.setItem(xs, JSON.stringify(state.notificacionesLeidas.a));
        }
    },

    setContactos(state){
        if(this.getters.deviceready){
            if(navigator.contactsPhoneNumbers){
                navigator.contactsPhoneNumbers.list(r=>{
                    if(r && r.length){
                        r.map(x=>{
                            x.nombre = x.displayName;
                            x.telefono = (x.phoneNumbers.find(y=>{return y.normalizedNumber.includes('+')}) || {}).normalizedNumber;
                            if(!x.telefono){
                                x.telefono = `+521${ (x.phoneNumbers.find(y => { return true }) || {}).normalizedNumber } `;
                            }
                        });
                    }
                    // console.log("CONTACTOS", r);
                    state.contactos = { a: _.orderBy(r, ['nombre'], ['asc'])};
                }, e=>{
                    console.log("ERROR GETTING CONTACTS");
                    this.commit('checkPermiso');
                });
            }
        }
    },

    checkPermiso(state, sol = 0){
        // console.log(" VAMOS A CHECAR EL PERMISO ");
        let permissions = cordova.plugins.permissions;
        permissions.checkPermission(permissions.READ_CONTACTS, 
            ( status )=>{
                if ( status.hasPermission ) {
                    state.permisoA = 1;
                    console.log("SI TENGO PERMISO");
                }
                else {
                    state.permisoA = 0;
                    console.log("NO SE TIENE PERMISO", "SOL", sol);
                    if(sol){
                        console.warn('VAMOS A PEDIR PERMISO');
                        let error = () => {
                            console.warn('NO SE PUDO ACTIVAR EL PERMISO');
                            state.permisoA = 0;
                        }
                        let success = (status)=>{
                            if(!status.hasPermission){
                                error();
                            }else{
                                this.commit('setContactos');
                                state.permisoA = 1;
                            }
                        }
                        permissions.requestPermission(permissions.READ_CONTACTS, success, error);
                    }
                }
        });
    },

    setCatalogos(state,data){
        // 'misTarjetas' in  data
        if( 'notificacionesLeidas' in  data ){
            state.notificacionesLeidas  = {a: data.notificacionesLeidas };
        }
        if( 'notificacionesPreLeidasVista' in  data ){
            state.notificacionesPreLeidasVista  = {a: data.notificacionesPreLeidasVista };
        }

        // console.log("SETTING NOTIS", 'notificacionesPreLeidas' in  data, data.notificacionesPreLeidas );

        if( 'notificacionesPreLeidas' in  data ){
            state.notificacionesPreLeidas  = {a: data.notificacionesPreLeidas };
            this.commit('catalogoXcontarNotificaciones', []);
        } 
        
        if(data.cambioUSD){
            state.cambioUSD  = data.cambioUSD;
        } 
        if(data.cambioIva){
            state.cambioIva  = data.cambioIva;
        } 
        if(data.costoEnvio){
            state.costoEnvio  = data.costoEnvio;
        } 
        if( 'notificaciones' in  data  ){
            state.notificaciones  = {a:data.notificaciones};
        } 
        if(data.bancos){
            state.bancos  = {a:data.bancos};
        }
        if(data.estados){
            state.estados  = {a: data.estados};
        } 
        if( 'regalosEventos' in  data ){
            state.regalosEventos  = {a:data.regalosEventos};
        }
        if(data.banners){
            state.banners  = {a:data.banners};
        } 
        if(data.categorias){
            state.categorias  = {a:data.categorias};
        } 
        if(data.tipos_fechas){
            state.tipos_fechas  = {a:data.tipos_fechas};
        } 
        if(data.repeticiones){
            state.repeticiones  = {a:data.repeticiones};
        } 
        if(data.sugerencia){
            state.sugerencia  = {a:data.sugerencia};
        } 
        if(data.productos){
            data.productos.map(x=>{
                x.precio = Number(x.precio);
            });
            state.productos  = {a:data.productos};
            this.commit('updateHora');
        } 
    },

    catalogoXcontarNotificaciones(state, arreglo){
        let session = this.getters.getSession;
        let zona    = moment.tz.guess();
        let a = [];

        this.getters.getCatalogo('notificaciones').map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('nt'), tipo: '8', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });

        this.getters.userStateArray('amigos').filter(s=>{return (s.estatus == 'enviado' && s.amigos_id == session.id) || (s.estatus == 'aceptado' && s.usuarios_id == session.id) }).map(x=>{
            let y = moment.tz(x.modificado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('s'), tipo: 's', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('invitaciones').filter(x=>{ return x.cobro && x.cobro.id }).filter(x=>{return x.evento.tipo == 'party'}).map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('y'), tipo: '2', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('fechasAmigos').map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('q'), tipo: '3', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('invitaciones').filter(x=>{return x.evento.tipo == 'reunion'}).map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('w'), tipo: '4', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('listasAmigos').filter(x=>{ return x.tipo != 'Privada' }).map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('w'), tipo: '5', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('regalosAmigos').map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('r'), tipo: '7', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('postEtiquetas').map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('pe'), tipo: '9', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('inivtacionesRechazadas').map(x=>{
            let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('ir'), tipo: '10', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });
        this.getters.userStateArray('historial').map(x=>{
            let y = moment.tz(x.created,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
            a.push({ id: _.uniqueId('his'), tipo: 'historialcompras', creado: y.tz(zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
        });

        a = _.orderBy(a, ['creado'], ['desc']);
        // console.log("CREANDING");
        a = a.filter(s=>s.creado >= this.getters.getSession.creado);
        state.notiAll = {a: a};

        state.notificacionesTotal = a.filter(x=>{return !( state.notificacionesPreLeidas.a.includes(x.data.id) || state.notificacionesPreLeidas.a.includes(x.data.creado) ) }).length;
    },

    clearNoti(state){
        state.notificacionesTotal = 0;
        this.commit('setCatalogos',{
            notificaciones: [],
        });
        this.commit('setUsuarioInfo',{
            amigos:                 [],
            invitaciones:           [],
            fechasAmigos:           [],
            invitaciones:           [],
            listasAmigos:           [],
            regalosAmigos:          [],
            postEtiquetas:          [],
            inivtacionesRechazadas: [],
            historial:              [],
        });
    },

    initStripeData(state,data){
        if(data.stripe){
            if(data.stripe.key){
                // console.log("INIT STRIPE 22", data.stripe );
                try{
                    // console.log("INIT STRIPE ===>", this.getters.deviceready,  data.stripe );
                    if(this.getters.deviceready){
                        // console.log("STRIPE MODE");
                        if(state.modo){
                            return;
                        }
                        if(cordova.plugins){
                            cordova.plugins.stripe.setPublishableKey(data.stripe.key,
                                (res)=>{ 
                                    console.log("CORRECTO STRIPE SET PUBLIC KEY",res);
                                    if(data.stripe.key.includes('live')){
                                        state.modo = 'live';
                                    }
                                    else if(data.stripe.key.includes('test')){
                                        state.modo = 'test';
                                    }
                                },
                                (error) => {
                                    // console.error("ERROR STRIPE SET PUBLIC KEY", error);
                                });
                        }
                    }
                }catch(e){console.log("TRYE STRIPE ERROR",e);}
            }
        }
    },
    
};
const actions={

    postLeerNotification({state}, [id, creado, preleer = 0, vista = '']){
        let data ={
            id: id,
            creado: creado,
            preleer: preleer,
            vista: vista,
        };
        this.dispatch('postPromiseNoError', ['posts/guardar_noti', data]).then(
            res => {
                this.dispatch('synchronizeData');
            },error=>{
                this.dispatch('synchronizeData');
            });
    },
   
};

export default {
    state,
    getters,
    mutations,
    actions
};