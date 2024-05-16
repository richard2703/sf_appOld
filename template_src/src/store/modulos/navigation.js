import axios from 'axios';

const initialState = {  
    f7:null,
    view: null,
    routerViewName: null,
    router:null,
    ruta:{url:null},
    backbutton_action : null,
    router_change:null,
    photoswipe: false,
    emitBack: null,
    backId: null,
    funcion: null,

    msn:{
        icono: 'success',
        texto: null,
        one: null,
        boton: null,
        fn: null,
        cuenta: null,
    },

    modales:{
        loader:false,
        selectImagen:false,
        seleccionarImagen:false,
        globalMsn:false,
        modalSession:false,
        modalNotificacion:0,

        modalVentas:false,
        modalReceta:false,
        modalTicket:false,
        tooltip:false,
        modalUsuarios:false,
        modalFecha:false,
        modalConfirmar:false,
        modalCobrar:false,
        modalUsuario:false,
        modalCalificar:false,
        modalAvisar:false,
        modalQr:false,
        modalCambioDestino:false,
        modalNuevoDestino:false,
        modalUsuario:false,
        modalParty:false,
        modalEventoCreador:false,
        modalRegalo:false,
        modalLista:false,
        modalFechaUsuario:false,
        
        modalCancelar:false,
        modalMensaje:false,
        modalmensajeA:false,
        modalDireccion: false,
    },
};

const state =  JSON.parse(JSON.stringify(initialState));

const getters = {
    getF7(state,f7){return state.f7},
    getView(state,f7){return state.view},
    getRouter(state){return state.router},
    getRouterView:(state)=>(view)=>{return state.f7.views[view].router},
    getRuta(state){return state.ruta;},
    getFuncion(state){return state.funcion;},
    getMsn(state){return state.msn;},
    getModal:(state)=>(name)=>{return state.modales[name];},
    getModalesAbiertos(state){ 
        for(let m in state.modales){if(state.modales[m].open)return true;}
        return false;
    }

};

function closeModales(modales){
    for(let m in modales){
        if(modales[m].open){
            if(m != 'llamada' &&  m != 'llamar' && m != 'loader'){
                modales[m].open = false;
                modales = JSON.parse(JSON.stringify(modales));
            }
            return true;
        }
    }
    return false;
}

const mutations = {
    setF7(state,f7){
        state.f7 = f7;
    },
    setRouter(state){
        state.router = state.f7.views.current.router
    },
    updateF7(state, [f7]){
        if(f7){
            let add = ()=>{
                this.commit('setF7',f7);
                this.commit('setRouter');
                
                if(!state.router_change){
                    if(f7.view.usuario && f7.view.usuario.router){
                        // console.log("----------> ----------->      INGRESANDO");
                        state.router_change = f7.view.usuario.router.on('routeChange',(nueva, anterior, router)=>{
                            // console.log("----> ROUTEXR CHANGE ---->", nueva.url, anterior, f7.view.usuario, f7.views);
                            // console.log("----> ROUTEXR CHANGE 2 ---->", state.router_change);
                            state.ruta = {url: nueva.url};
                        });
                    }
                }
            }
            
            // console.log(">>>>>> ROUTER VIEEW NAME", state.routerViewName, f7.view.current.id);
            if(!state.routerViewName){
                state.routerViewName = f7.view.current.id;
                add();
            }else{
                if(state.routerViewName != f7.view.current.id){
                    add();
                }
            }
        }
    },

    addBackbutton_action(state){
        let procesador = (e)=> {  
            // e.preventDefault();
            // console.log( "ROUTER BACK", this.getters.getRouter.back() );
            // let view = state.f7.view.current;
            // let ruta = state.f7.view.current.router.url;               
            // switch(ruta){
            //     default:
            //         this.getters.getRouter.back();
            //         break;
            // }
        };

        if(state.f7){
            if(this.getters.deviceready){
                if(!state.backbutton_action){
                    let id = _.uniqueId('back_');
                    state.backId = id;
                    state.backbutton_action = document.addEventListener('backbutton',(e)=>{
                        try{
                            // console.log("APRETE EL BACK BUTTON", id, state.backId);
                            e.preventDefault();
                            if(state.backId == id){
                                procesador();
                            }
                        }catch(err){
                            // console.log("ERR",err);
                        }
                    },false);
                    // console.log("F7 BACK BUTTTON ", state.backbutton_action);
                }
            }

        }
    },

    changeView(state,vista){
        switch(vista){
            case 'usuario':
                state.f7.tab.show('#view-usuario', true);
                state.view = 'usuario';
                break;
            case 'chofer':
                state.view = 'chofer';
                state.f7.tab.show('#view-chofer', true);
                break;
            case 'escaner':
                state.f7.tab.show('#view-scanner', true);
                state.view = 'scanner';
                break;
            case 'login':
                state.f7.tab.show('#view-login', true);
                state.view = 'login';
                break;
        }
        this.commit('setRouter');
    },

    changeViewByTipe(state){
        // console.log("------------TIPO",this.getters.getSession.tipo);
        switch(this.getters.getSession.tipo){
            case 'usuario':
                this.commit('changeView','usuario');
                break;
            case 'chofer':
                this.commit('changeView','chofer');
                break;
        }
    },

    commitFuncion(state, fn){
        state.funcion = fn;
    },

    openMsn(state,[t = '', b= '',o = true, c = false,f = null, i = 'success']){
        state.msn = {
            texto:  t,
            one:    o,
            boton:  b,
            fn:     f,
            cuenta: c,
            icono:  i,
        };
        this.commit('openModal',['globalMsn']);
    },

    openModal(state,[modal]){
        state.modales[modal] = true; 
    },

    openM(state){
        state.modales['modalMensaje'] = true; 
    },

    openA(state){
        state.modales['modalmensajeA'] = true; 
    },
    
    closeM(state){
        state.modales['modalMensaje'] = false; 
    },

    closeModal(state,[modal]){
        state.modales[modal] = false;
    },

    setOpenPreview(state, galeria){
        state.photoswipe = galeria;
    },

    setClosePreview(){
        state.photoswipe = null;
    },

    setEmitBack(state,fn){
        state.emitBack = fn;
    },
    openPorOrdernar(state){
        state.f7.views.por_ordenar.router.navigate('/por_ordenar',{reloadCurrent: true})
        state.f7.panel.open('right', true);
    },
    closePorOrdernar(state){
        state.f7.panel.close('right', true);
    },
    openMenu(state){
        state.f7.panel.open('left', true);
    },
    closeMenu(state){
        state.f7.panel.close('left', true);
    },
    openMenuRight(state){
        state.f7.panel.open('right', true);
    },
    closeMenuRight(state){
        state.f7.panel.close('right', true);
    },

};

const actions = {
    backRouta({state}){
        this.getters.getRouter.back();
    },
    backRouter({state},[url=null,opt={}]){
        
    },
    navigate({state},[vista,page,params={}]){
        // console.log("views",state.f7.views[vista]);
        state.f7.views[vista].router.navigate(page, params);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
