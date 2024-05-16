import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment');

const initialState = {
    producto: null,
    domicilios: { a: [] },

    domicilio: null,
    metodo_pago: null,
    metodo_pago_alter: null,
    externo: 0,
    para_usuarios_id: null,
    email: null,
    usuario: {},
    listas_id: null,
    eventos_id: null,
    cambioIva: null,

    desgloce: {
        carrito: [],
        cupon: {},
        descuento: 0,
        descuento_total: 0,
        restaurantes_id: null,
        por_qr: false,
        cambio: 0,
        costoEnvio: 0,
        ivaEnvio: 0,
        presubtotal: 0,
        presubtotalIva: 0,
        subtotal: 0,
        subtotal_total: 0,
        subtotaliva_total: 0,
        subtotal_paraiva: 0,
        comision: 0,
        iva: 0,
        total: 0,
        tiempo: 0,
    },

    validacionEstatal: null,

    productosComprados: { a: [] },

    servicioQR: {},
};

const state = JSON.parse(JSON.stringify(initialState));

const getters = {
    carritoObject: (state) => (obj) => { return state[obj] },
    carritoArray: (state) => (obj) => { return state[obj].a },
    carritoFind: (state) => (obj, data) => { return state[obj].a.find(a => { return a.id == state[data] }) || {} },
    carritoFindInside: (state) => (obj, data, key, id) => { return state[obj].a.find(a => { return a.id == state[data] })[key].find(x => { return x.id == state[id] }) },
};
const mutations = {

    setCarritosState(state, [key, data]) {
        state[key] = data;
    },

    updateCarritosState(state, data) {
        if (data.domicilios) {
            state.domicilios = { a: data.domicilios };
            if (!state.domicilio) {
                // state.domicilio = (data.domicilios.find(x=>{return true;}) || {}).id || null;
                // if(state.domicilio){
                //     this.dispatch('synchronizeData');
                // }
            }
        }
    },

    initMetodoPago(state, metodos) {
        if (!state.metodo_pago) {
            let m = metodos.find(x => { return true });
            if (m) {
                state.metodo_pago = m.id;
            }
        }
    },

    addProductoCarrito(state, prod = {}) {
        // console.log("producto", prod);
        if (!prod.cantidad) {
            prod.cantidad = 1;
        }
        if (!prod.shipping_cost) {
            prod.shipping_cost = 0;
        }
        state.desgloce.carrito.push(prod);
        this.commit('calcularTotal');
    },

    addProductoCarritoCallback(state, { prod = {}, callback = null }) {
        let estado = this.getters.getSession.estado;
        console.log('Producto',prod)
        if (!estado) {
            swal("", "No has seleccionado tu estado de residencia", "");
            return;
        }

        if (prod.mayor) {
            let edad = this.getters.getSession.fecha_nacimiento;
            if (!edad) {
                swal("", "Necesitas ingresar tu edad, para comprar este tipo de productos", "");
                return;
            }
            edad = moment().diff(edad, 'years');
            if (edad < 19) {
                swal("", "Necesitas ser mayor de edad, para comprar alcohol", "");
                return;
            }
        }

        let addProcess = () => {
            if (!prod.cantidad) {
                prod.cantidad = 1;
            }
            if (!prod.shipping_cost) {
                prod.shipping_cost = 0;
            }
            if (!prod.dias) {
                prod.dias = 0;
            }
            state.desgloce.carrito.push(prod);
            //console.log('carrito',state.desgloce.carrito,prod);
            this.commit('calcularTotal');
            if (callback) {
                callback();
            }
        };

        let preProcess = () => {
            if (prod.product_type == '2' && false) {
                let pState = prod.partner.state_id;
                if (!pState) {
                    swal("", "Lo sentimos ese producto no esta disponible en este momento (CODENP1)", "");
                    return;
                }
                if (pState != estado) {
                    if (state.validacionEstatal != prod.id) {
                        state.validacionEstatal = prod.id;
                        let text = this.getters.catalogoGetFindById('estados', pState);
                        // console.log("ESTADON", text);
                        let leyenda = (text) ? `Recuerda que este es un servicio y solo esta disponible en ${text.nombre}` : "Recuerda que este es un servicio y no esta disponible en tu estado";
                        swal({
                            text: leyenda,
                            icon: '',
                            buttons: {
                                cancel: "Salir",
                                continuar: "Comprar"
                            },
                        }).then((value) => {
                            if (value == "continuar") {
                                prod.shipping_cost = 0;
                                prod.dias = 0;
                                prod.tipo_envio = 'qr';
                                addProcess();
                            }
                        })
                        return;
                    }
                }
            }

            let envio = null;
            // console.log("producto ENVIOS", prod, estado);
            if (prod.product_type == '1') {
                envio = (prod.envios || []).find(s => s.states_id == estado);

                if (!prod.shipping_types_id) {
                    swal({
                        text: "Lo sentimos este producto no tiene envio a domicilio",
                        icon: '',
                        buttons: {
                            continuar: "No necesito envio, usare un qr",
                            cancel: "Cancelar",
                        },
                    }).then((value) => {
                        if (value == "continuar") {
                            prod.shipping_cost = 0;
                            prod.dias = 0;
                            prod.tipo_envio = 'qr';
                            addProcess();
                        }
                    });
                    return;
                }
                if (!envio) {
                    swal({
                        text: "Lo sentimos este producto aun no tiene envio a tu estado",
                        icon: '',
                        buttons: {
                            continuar: "No necesito envio, usare un qr",
                            cancel: "Cancelar",
                        },
                    }).then((value) => {
                        if (value == "continuar") {
                            prod.shipping_cost = 0;
                            prod.dias = 0;
                            prod.tipo_envio = 'qr';
                            addProcess();
                        }
                    })
                    return;
                }
                prod.shipping_cost = envio.costo;
                prod.dias = envio.tiempo;
                addProcess();
            }
        }
        if (prod.tipo != 'Membresia') {
            swal({
                text: "Selecciona la forma de entrega",
                icon: '',
                buttons: {
                    continuar: prod.product_type == '2' ? null : "Entrega en el domicilio que seleccione",
                    qr: "Obtener codigo QR para canjear",
                    recoger: "Recoger en tienda",
                    // cancel: "Cancelar",
                },
            }).then((value) => {
                if (value == "continuar") {
                    prod.tipo_envio = 'domicilio';
                    preProcess();
                }
                if (value == "qr") {
                    prod.shipping_cost = 0;
                    prod.dias = 0;
                    prod.tipo_envio = 'qr';
                    addProcess();
                }
                if (value == "recoger") {
                    prod.shipping_cost = 0;
                    prod.dias = 0;
                    prod.tipo_envio = 'tienda';
                    addProcess();
                }
            });
        }else{
            addProcess();
        }
    },

    setCupon(state, cupon) {
        state.desgloce.cupon = cupon;
        this.commit('calcularTotal');
    },

    removeProductoCarrito(state, prod) {
        // console.log("producto", prod);
        let index = state.desgloce.carrito.findIndex(x => { return x.id == prod.id });
        if (index != -1) {
            state.desgloce.carrito.splice(index, 1);
        }
        state.desgloce.cupon = {};
        this.commit('calcularTotal');
    },

    calcularTotal(state) {
        state.desgloce.descuento = 0;
        state.desgloce.descuento_total = 0;
        state.desgloce.presubtotal = 0;
        state.desgloce.presubtotalIva = 0;
        state.desgloce.subtotal_sinIVA = 0;
        state.desgloce.subtotal = 0;
        state.desgloce.subtotal_total = 0;
        state.desgloce.subtotal_paraiva = 0;
        state.desgloce.comision = 0;
        state.desgloce.iva = 0;
        state.desgloce.iva_total = 0;
        state.desgloce.ivaEnvio = 0;
        state.desgloce.total = 0;
        state.desgloce.costoEnvio = 0;
        state.desgloce.tiempo = 0;
        state.desgloce.cambio = this.getters.catalogoGetObject('cambioUSD');
        state.desgloce.cambioIva = this.getters.catalogoGetObject('cambioIva');
        state.desgloce.cambioIva2 = this.getters.catalogoGetObject('cambioIva2');


        state.desgloce.carrito.map(x => {
            if (x.currency == 'USD') {
                state.desgloce.subtotal_sinIVA += (Number(x.precio) * Number(x.cantidad) * Number(state.desgloce.cambio));
                state.desgloce.subtotal_paraiva += (Number(x.precio) * Number(x.cantidad) * Number(state.desgloce.cambio));
                state.desgloce.subtotal += (Number(x.precio) * Number(x.cantidad) * Number(state.desgloce.cambio));

                state.desgloce.iva_total += Number(x.iva_total) * Number(x.cantidad) * Number(state.desgloce.cambio);
            }
            else {
                state.desgloce.subtotal_sinIVA += ((Number(x.precio) * Number(x.cantidad)));
                state.desgloce.subtotal_paraiva += ((Number(x.precio) * Number(x.cantidad)));
                state.desgloce.subtotal += ((Number(x.precio) * Number(x.cantidad)));

                state.desgloce.iva_total += Number(x.iva_total) * Number(x.cantidad);
            }

            state.desgloce.costoEnvio = state.desgloce.costoEnvio + Number(x.shipping_cost);

            if (state.desgloce.tiempo < x.dias) {
                state.desgloce.tiempo = x.dias;
            }

        });

        if (state.desgloce.carrito.every(x => { return x.type == 'coopera' })) {
            state.desgloce.costoEnvio = 0;
        }

        if (state.desgloce.carrito.every(x => { return x.product_type == '2' })) {
            state.desgloce.costoEnvio = 0;
        }

        if (state.desgloce.por_qr) {
            state.desgloce.costoEnvio = 0;
        }

        state.desgloce.presubtotal = state.desgloce.subtotal;
        state.desgloce.presubtotalIva = state.desgloce.subtotal_paraiva;

        state.desgloce.comision = state.desgloce.subtotal * 0;

        let user = this.getters.getSession;
        if (user.descuento) {
            state.desgloce.descuento = user.descuento;
            state.desgloce.descuento_total = state.desgloce.subtotal * state.desgloce.descuento;
            state.desgloce.subtotal_paraiva = state.desgloce.subtotal_paraiva - (state.desgloce.subtotal_paraiva * state.desgloce.descuento);
            state.desgloce.subtotal = state.desgloce.subtotal - state.desgloce.descuento_total;

            //descontamos del iva el descuento
            state.desgloce.iva_total = state.desgloce.iva_total - (state.desgloce.iva_total * state.desgloce.descuento);
        }

        // console.log(" TOTALS FASE 3 ", state.desgloce.subtotal, state.desgloce.iva, state.desgloce.costoEnvio, state.desgloce.ivaEnvio, state.desgloce.total, state.desgloce );

        let ivaGeneral = 0.16;
        if (state.desgloce.carrito.some(s => s.type_iva == '2')) {
            ivaGeneral = 0.08;
        }

        state.desgloce.ivaGeneral = ivaGeneral;

        if (state.desgloce.cupon && state.desgloce.cupon.id) {
            if (state.desgloce.cupon.factor) {
                state.desgloce.descuento = state.desgloce.cupon.factor;
                state.desgloce.descuento_total = state.desgloce.subtotal * state.desgloce.descuento;
                state.desgloce.subtotal_paraiva = state.desgloce.subtotal_paraiva - (state.desgloce.subtotal_paraiva * state.desgloce.descuento);

                //descontamos del iva el descuento
                state.desgloce.iva_total = state.desgloce.iva_total - (state.desgloce.iva_total * state.desgloce.descuento);
            }
            if (state.desgloce.cupon.restante) {
                state.desgloce.descuento = state.desgloce.cupon.restante;
                state.desgloce.descuento_total = state.desgloce.descuento;
                state.desgloce.subtotal_paraiva = state.desgloce.subtotal_paraiva - state.desgloce.descuento;

                //descontamos del iva el descuento
                state.desgloce.iva_total = state.desgloce.iva_total - (state.desgloce.descuento * ivaGeneral);
            }

            state.desgloce.subtotal = state.desgloce.subtotal - state.desgloce.descuento_total;
        }

        state.desgloce.iva = state.desgloce.iva_total;
        state.desgloce.ivaEnvio = state.desgloce.costoEnvio * state.desgloce.cambioIva;

        state.desgloce.total = (state.desgloce.subtotal + state.desgloce.iva) + (state.desgloce.costoEnvio + state.desgloce.ivaEnvio);
        // console.log("TOTALS ", state.desgloce.subtotal, state.desgloce.iva, state.desgloce.costoEnvio, state.desgloce.ivaEnvio, state.desgloce.total, state.desgloce );

        state.desgloce = JSON.parse(JSON.stringify(state.desgloce));

    },

    cleanCarrito(state) {
        state.usuario = {};
        state.externo = 0;
        state.email = null;
        state.para_usuarios_id = null;
        state.domicilio = null;
        state.metodo_pago_alter = null;
        state.metodo_pago = null;
        state.listas_id = null;
        state.eventos_id = null;
        state.desgloce = JSON.parse(JSON.stringify(initialState.desgloce));
        state.desgloce.cupon = {};
    }
};

const actions = {

    postCrearPedido({ commit, state }, [qr]) {
        let data = {
            carrito: state.desgloce,
            qr: qr,
            domicilio: this.getters.carritoFind('domicilios', 'domicilio'),
            metodo: state.metodo_pago,
            para_usuarios_id: state.para_usuarios_id,
            listas_id: state.listas_id,
            email: state.email,
            card: this.getters.getMetodoPago(state.metodo_pago)
        };

        data.carrito.metodo_pago_alter = state.metodo_pago_alter;

        // if(!data.domicilio || !data.domicilio.id){
        //     swal("","Hubo un error con el domicilio","");
        //     return;
        // }

        if (!state.metodo_pago) {
            swal("", "Selecciona un metodo de pago", "");
            return;
        }

        let finish = (res) => {
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers', [{ servicio: true }]);
            this.getters.getRouter.navigate('/historial_compras', { reloadCurrent: true });
            this.commit('cleanCarrito');
            this.commit('setCarritosState', ['productosComprados', { a: res.productos }]);
            // console.log("===============> RES RES RES ", res);
            this.commit('openMsn', ['¡Listo!\nTu pedido ha sido realizado con éxito.\nPuedes verlo en tu cuenta', 'Ok', true, false]);
        };

        this.dispatch('postPromiseLoader', ['pedidos/crear_new', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postAgregarCupon({ commit, state }, codigo) {
        let data = {
            codigo: codigo,
        };

        let finish = (res) => {
            this.dispatch('synchronizeData');
            swal("", "Cupón agregado", "success");
            // console.log("REST", res.data);
            this.commit('setCupon', res.data.cupon);
        };

        this.dispatch('postPromiseLoader', ['cupones/check_cupon', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postSelectDireccion({ commit, state }, dir) {
        let data = {
            direccion: dir,
            pedido_id: this.getters.userStateObject('regalo'),
        };

        let finish = (res) => {
            this.dispatch('synchronizeData');
            this.getters.getRouter.back();
            this.dispatch('sendDataAllUsers', [{ servicio: true }]);
            swal("", "Domicilio seleccionado", "success");
        };

        this.dispatch('postPromiseLoader', ['datos/set_domicilio', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postSaveDireccion({ commit, state }, form) {
        let data = {
            data: form,
        };

        let finish = (res) => {
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers', [{ servicio: true }]);
            this.getters.getRouter.back();
            swal("", "Domicilio agregado", "success");
            if (res.data && res.data.id) {
                // console.log("SETING", res.data);
                this.commit('setUsuarioDataForm', ['nuevoEventoForm', 'domicilios_id', res.data.id]);
                this.commit('setUsuarioDataForm', ['nuevoEventoForm', 'otro', res.data.id]);
            }
        };

        this.dispatch('postPromiseLoader', ['datos/add_domicilio', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postEliminarProductoLista({ commit, state }, form) {
        let data = {
            producto: form,
        };
        let finish = (res) => {
            this.dispatch('synchronizeData');
            swal("", "Producto eliminado", "success");
        };
        this.dispatch('postPromiseLoader', ['fechas/eliminar_producto_fecha', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postEliminarDireccion({ commit, state }, form) {
        let data = {
            domicilios_id: form.id,
        };

        let finish = (res) => {
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers', [{ servicio: true }]);
            swal("", "Domicilio eliminado", "success");
        };

        this.dispatch('postPromiseLoader', ['datos/remove_domicilio', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postAgregarProductoLista({ commit, state }, lista) {
        let data = {
            productos_id: state.producto,
            lista: lista,

        };

        let finish = (res) => {
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers', [{ servicio: true }]);
            swal("", "Producto agregado a la lista", "success");
            this.getters.getRouter.back('/detalle_producto');
        };

        this.dispatch('postPromiseLoader', ['fechas/create_producto', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postAgregarProductoListaByID({ commit, state }, [lista, prod]) {
        let data = {
            productos_id: state.producto,
            lista: lista,
            fecha: this.getters.userStateObject('lista'),
            regalos: [prod],
        };

        let finish = (res) => {
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers', [{ servicio: true }]);
            swal("", "Producto agregado a la lista", "success");

            let l = this.getters.getRouter.history.length;
            // console.log("L", l, this.getters.getRouter.history);
            if (l) {
                let h = this.getters.getRouter.history[l - 3];
                // console.log("h", h);
                if (h) {
                    this.getters.getRouter.back(h, { force: true });
                    return;
                }
            }
            this.getters.getRouter.back();
        };

        // console.log("tipo",this.getters.userStateObject('tipo'));
        // this.dispatch('postPromiseLoader', ['fechas/create_producto', data]).then(
        this.dispatch('postPromiseLoader', [(this.getters.userStateObject('tipo') == 'agregarRegaloFecha') ? 'fechas/agregar_regalos_fechas' : 'fechas/create_producto', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postCarritoGetServicio({ commit, state }, [code = null, card = null]) {
        let data = {
            code: code,
            card: card,
        };

        let finish = (res) => {
            if (code) {
                this.commit('setCarritosState', ['servicioQR', res.data.servicio]);
                this.dispatch('synchronizeData');
                this.getters.getRouterView('usuario').navigate('/detalle_servicio_qr');
                this.commit('cerrarEscaner');
            } else {
                this.commit('setCarritosState', ['servicioQR', res.data.servicio]);
                this.dispatch('synchronizeData');
                this.getters.getRouterView('usuario').navigate('/detalle_card');
                this.commit('cerrarEscaner');
            }

        };

        this.dispatch('postPromiseLoader', ['datos/get_servicio_producto', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postCobrarTarjetaRegalo({ commit, state }, [form = {}]) {
        let data = {
            form: form,
        };

        let finish = (res) => {
            swal("Cobro realizado", "Realizo el cobro a la tarjeta de regalo", "success");
            this.dispatch('synchronizeData');
            this.getters.getRouter.back();
        };

        this.dispatch('postPromiseLoader', ['datos/cobrar_tarjeta', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

    postCarritoCanjearServicio({ commit, state }, [producto]) {
        let data = {
            producto,
        };

        let finish = (res) => {
            this.commit('setCarritosState', ['servicioQR', res.data.servicio]);
            this.dispatch('synchronizeData');
            swal("Codigo canjeado", "Puedes proveer el servicio/producto. SocialFlow te realizara el pago en el proximo corte", "success");
            this.getters.getRouterView('usuario').back();
            this.commit('cerrarEscaner');

        };

        this.dispatch('postPromiseLoader', ['datos/canjear_servicio', data]).then(
            res => {
                finish(res);
            }, error => { });
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};