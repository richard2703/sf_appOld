import axios from 'axios';
const lastStorage = 'scanerstorage';

const initialState = {
    status: {
        active: false,
        ready: false,
        luz: false,
        card: 0,
    },
};
const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    scanStatus(state){return state.status;}
};

const mutations={
    openEscaner(state, card = 0){
        state.status.active = true;
        state.status.card = card;
        console.log("CARD CARD", state.status.card, card);


        this.commit('changeView','escaner');
        if(!state.status.ready){
            state.status.ready = true;
            let callback = (err, text)=> {
                if(err){ console.error(err); } 
                else { 
                    this.commit('scanComplete',text); 
                }
            }
            QRScanner.scan(callback);
        }
        QRScanner.show();
    },

    cerrarEscaner(state){
        state.status.active = false;
        state.status.ready = false;
        this.commit('changeView', 'usuario');
        QRScanner.destroy((status) => {
            console.log("DESTRUYENDO escan",status);
        });
    },
    scan(state){
        state.status.ready = true;
        let callback = (err, text)=> {
            if(err){ console.error(err); } 
            else {
                this.commit('scanComplete',text);
            }
        }
        QRScanner.scan(callback);
    },

    enableLight(state){
        if(!state.status.luz){
            QRScanner.enableLight((err, status) =>{
                err && console.error(err);
                state.status.luz=true;
                console.log(status);
            });
        }
        else{
            QRScanner.disableLight((err, status)=>{
                err && console.error(err);
                console.log(status);
                state.status.luz=false;
            });
        }
    },
    
    cancelEscaner(state){
        QRScanner.destroy((status) => {
            state.status.active = false;
            console.log("DESTRUYENDO escan",status);
        });
    },

    scanComplete(state,texto){
        state.status.ready = false;
        console.log("CARD CARD", state.status.card);

        if(state.status.card){
            this.dispatch('postCarritoGetServicio',[null, texto]);
        }else{
            this.dispatch('postCarritoGetServicio',[texto]);
        }
       
    },


    calcularTotalLast(state){
        state.desgloce.descuento = 0;
        state.desgloce.descuento_total = 0;
        state.desgloce.presubtotal = 0;
        state.desgloce.presubtotalIva = 0;
        state.desgloce.subtotal = 0;
        state.desgloce.subtotal_total = 0;
        state.desgloce.subtotal_paraiva = 0;
        state.desgloce.comision = 0;
        state.desgloce.total = 0;
        state.desgloce.costoEnvio = 0;
        state.desgloce.tiempo = 0;
        state.desgloce.cambio = this.getters.catalogoGetObject('cambioUSD');
        state.desgloce.cambioIva = this.getters.catalogoGetObject('cambioIva');
        state.desgloce.cambioIva2 = this.getters.catalogoGetObject('cambioIva2');

        state.desgloce.carrito.map(x=>{
            if(x.currency == 'USD'){
                state.desgloce.subtotal = state.desgloce.subtotal + ( Number(x.precio) * Number(x.cantidad) * Number(state.desgloce.cambio) ) ;
                if(x.iva == '1'){
                    state.desgloce.subtotal_paraiva += ( Number(x.precio) * Number(x.cantidad) * Number(state.desgloce.cambio) );
                }
            }
            else{
                state.desgloce.subtotal = state.desgloce.subtotal + ((Number(x.precio) * Number(x.cantidad)) );
                if(x.iva == '1'){
                    state.desgloce.subtotal_paraiva += ((Number(x.precio) * Number(x.cantidad)) );
                }
            }
            state.desgloce.costoEnvio = state.desgloce.costoEnvio + Number(x.shipping_cost);

            if(state.desgloce.tiempo < x.dias){
                state.desgloce.tiempo = x.dias;
            }

        });

        if( state.desgloce.carrito.every(x=>{return x.type == 'coopera'}) ){
            state.desgloce.costoEnvio = 0;
        }

        if( state.desgloce.carrito.every(x=>{return x.product_type == '2'}) ){
            state.desgloce.costoEnvio = 0;
        }

        if(state.desgloce.por_qr){
            state.desgloce.costoEnvio = 0;
        }

        state.desgloce.presubtotal = state.desgloce.subtotal;
        state.desgloce.presubtotalIva = state.desgloce.subtotal_paraiva;

        state.desgloce.comision = state.desgloce.subtotal * 0;


        let user = this.getters.getSession;
        if(user.descuento){
            state.desgloce.descuento            = user.descuento;
            state.desgloce.descuento_total      = state.desgloce.subtotal * state.desgloce.descuento;
            state.desgloce.subtotal_paraiva    = state.desgloce.subtotal_paraiva - (state.desgloce.subtotal_paraiva * state.desgloce.descuento);
            state.desgloce.subtotal = state.desgloce.subtotal - state.desgloce.descuento_total;
        }

        if(state.desgloce.cupon && state.desgloce.cupon.id){
            if(state.desgloce.cupon.factor){
                state.desgloce.descuento            = state.desgloce.cupon.factor;
                state.desgloce.descuento_total      = state.desgloce.subtotal * state.desgloce.descuento;
                state.desgloce.subtotal_paraiva    = state.desgloce.subtotal_paraiva - (state.desgloce.subtotal_paraiva * state.desgloce.descuento);
            }
            if(state.desgloce.cupon.restante){
                state.desgloce.descuento            = state.desgloce.cupon.restante;
                state.desgloce.descuento_total      = state.desgloce.descuento;
                state.desgloce.subtotal_paraiva    = state.desgloce.subtotal_paraiva - state.desgloce.descuento;
            }
            state.desgloce.subtotal = state.desgloce.subtotal - state.desgloce.descuento_total;
        }

        state.desgloce.iva      = state.desgloce.subtotal_paraiva * state.desgloce.cambioIva;
        state.desgloce.ivaEnvio = state.desgloce.costoEnvio * state.desgloce.cambioIva;
        state.desgloce.total    = (state.desgloce.subtotal + state.desgloce.iva) + (state.desgloce.costoEnvio + state.desgloce.ivaEnvio);
        console.log("TOTALS ", state.desgloce.subtotal, state.desgloce.iva, state.desgloce.costoEnvio, state.desgloce.ivaEnvio, state.desgloce.total, state.desgloce );
        state.desgloce = JSON.parse(JSON.stringify(state.desgloce));

    },
};

const actions={
};

export default {
    state,
    getters,
    mutations,
    actions
};