import axios from 'axios';
import swal from 'sweetalert';
const moment = require('moment-timezone');


const comision = 0;
const lastStorage = 'lastStorage';
const initialState = {

    fechas: {a:[]},
    invitaciones: {a:[]},
    invitacionesSinLeer: 0,
    inivtacionesRechazadas: {a:[]},
    listasAmigos: {a:[]},
    misEventos: {a:[]},
    misFechas: {a:[]},
    misTarjetas: {a:[]},
    eventosSinLeer: 0,
    fechasAmigos: {a:[]},

    amigo: null,
    amigoFecha: null,
    detalle: null,
    evento: null,
    eventos: null,
    fecha:  null,
    perfil_id:  null,
    tipos:[
        'nuevoEvento',
        'editarEvento',
        'nuevaFecha',
        'editarFecha',
    ],
    tipo: 'nuevaFecha',
    serie: 'lista',
    misListas: {a:[]},
    lista:  null,
    type:  '1',

    nuevoEventoForm: {
        imagen:     null,
        nombre:     null,
        lugar:     null,
        domicilios_id:     null,
        otro:           null,
        tipo:           null,
        canjear_qr:           false,
        cooperacion:    'si',
        externo:        'no',
        esusuario:        'no',
        para_usuarios_id: null,
        fecha:          moment().add(5,'hours').format('YYYY-MM-DD'),
        hora:           moment().add(5,'hours').format('HH:00'),
        repeticion:     'Unico',
        lista_id:           null,
        lista_tipo:           null,
    },

    historial:{a:[]},
    servicios:{a:[]},
    usuariosForm:{a:[]},
    regalosForm:{a:[]},
    listaRegalosForm:{a:[]},
    usuarios:{a:[]},

    partners:{a:[]},
    partner:null,
    patnersForm:{a:[]},
    
    lugares:{a:[]},
    amigos:{a:[]},
    regalosAmigos:{a:[]},
    posts:{a:[]},
    postAmigos:{a:[]},
    postEtiquetas:{a:[]},
    regalo: null,

    validacionEstatal: null,

};
    
const state=JSON.parse(JSON.stringify(initialState));

const getters={   
    userStateArray:(state)=>(obj)=>{return state[obj].a},
    userStateObject:(state)=>(obj)=>{return state[obj]},
    userStateDetalle:(state)=>(obj)=>{return state[obj].a.find(a=>{return a.id == state.detalle})},
    userStateFind:(state)=>(obj, campo)=>{return state[obj].a.find(a=>{return a.id == state[campo]})},
    userStateFindById:(state)=>(obj, id)=>{return state[obj].a.find(a=>{return a.id == id })},
    userStateFindField:(state)=>(obj,id,campo)=>{return state[obj].a.find(a=>{return a[id] == state[campo]})},
    userStateFindInside:(state)=>(obj,data,key,id)=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
};

const mutations={
    setUsuarioData(state,[campo,id]){
        state[campo] = id;
    },

    setUsuarioDataForm(state,[form,campo,id]){
        state[form][campo] = id;
        state[form] = JSON.parse(JSON.stringify(state[form]));
    },

    initEdicionEvento(){
        this.commit('cleanForm',[]);

        let f = this.getters.userStateFind('misEventos','evento');

        let form = {
            id:                 f.id,
            imagen:             f.imagen,
            nombre:             f.nombre,
            tipo:               f.tipo,

            domicilios_id:      f.domicilios_id,
            otro:               f.domicilios_id?f.lugar:null,
            lugar:              f.domicilios_id?null:f.lugar,
            canjear_qr:         f.canjear_qr,
            cooperacion:        f.cooperacion,
            externo:            f.externo,
            para_usuarios_id:   f.para_usuarios_id,
            fecha:              f.fecha,
            hora:               f.hora,
            lista_id:           f.lista_id,
            lista_tipo:         f.lista_tipo,
        };

        // console.log("=============> FORM", f.domicilios_id?f.lugar:null,  form, f);
        this.commit('setUsuarioData',['nuevoEventoForm', form]);

        let uss = this.getters.userStateFind('misEventos','evento').usuarios;
        uss.map(x=>{
            if(x.usuario.id != this.getters.getSession.id){
                this.commit('addUser',x.usuario);
            }
        }); 
        
        let parx = this.getters.userStateFind('misEventos','evento').partners;
        parx.map(x=>{
            this.commit('addPartner',x);
        });

        let pss = this.getters.userStateFind('misEventos','evento').productos;
        pss.map(x=>{
            // console.log("PROD BEFORE EDITADO", x);

            x.producto.cantidad = Number(x.cantidad);
            
            x.producto.shipping_cost = Number(x.envio)/Number(x.cantidad);
            x.producto.envio_iva = Number(x.envio_iva)/Number(x.cantidad);
            
            if(Number(x.iva)){
                x.producto.precio       = Number(x.precio)*1.16;
                x.producto.subtotals    = Number(x.precio);
                x.producto.subtotal     = Number(x.precio);
                x.producto.subprecio     = Number(x.precio);
            }
            else{
                x.producto.precio       = Number(x.precio);
                x.producto.subtotals    = Number(x.precio);
                x.producto.subtotal     = Number(x.precio);
                x.producto.subprecio     = Number(x.precio);
            }
            
            x.producto.imagen = x.imagen;
            x.producto.currency = 'MXN';
            x.producto.tipo_entrega = x.tipo_entrega?x.tipo_entrega:'tienda';

            // console.log("PROD EDITADO", x);
            
            this.commit('addToArray',[ x.producto, 'regalosForm']);
        });
        let gas = this.getters.userStateFind('misEventos','evento').gastos;
        gas.map(x=>{
            x.producto.cantidad = Number(x.cantidad);

            x.producto.shipping_cost    = Number(x.envio)/Number(x.cantidad);
            x.producto.envio_iva        = Number(x.envio_iva)/Number(x.cantidad);

            if(Number(x.iva)){
                x.producto.precio       = Number(x.precio)*1.16;
                x.producto.subtotals    = Number(x.precio);
                x.producto.subtotal     = Number(x.precio);
                x.producto.subprecio     = Number(x.precio);
            }
            else{
                x.producto.precio       = Number(x.precio);
                x.producto.subtotals    = Number(x.precio);
                x.producto.subtotal     = Number(x.precio);
                x.producto.subprecio     = Number(x.precio);
            }

            x.producto.imagen = x.imagen;
            x.producto.currency = 'MXN';
            x.producto.tipo_entrega = x.tipo_entrega?x.tipo_entrega:'tienda';
            x.producto.hora_entrega = x.hora_entrega;

            this.commit('addToArray',[ x.producto, 'listaRegalosForm']);
        });
        this.getters.getRouter.navigate('/editar_evento_calendario');
    },

    cleanForm(state,[ fecha = moment().format('YYYY-MM-DD') ]){
        state.nuevoEventoForm = JSON.parse(JSON.stringify(initialState.nuevoEventoForm));
        state.usuariosForm = {a:[]};
        state.regalosForm = {a:[]};
        state.patnersForm = {a:[]};
        state.listaRegalosForm = {a:[]};
        state.nuevoEventoForm.fecha = moment().add(5,'hours').format('YYYY-MM-DD');
        state.nuevoEventoForm.hora = moment().add(5,'hours').format('HH:00');
    },

    addUser(state,usuario){

        let f = this.getters.userStateObject('nuevoEventoForm');

        usuario.cooperar = false;
        if(f.cooperacion == 'si'){
            usuario.cooperar = true;
        }

        usuario.propio = false;
        let x = state.usuariosForm.a.findIndex(x=>{return x.id == usuario.id});
        if(x == -1){
            state.usuariosForm.a.push(usuario);
        }
        state.usuariosForm = {a: JSON.parse(JSON.stringify(state.usuariosForm.a)) };
    },

    removeUser(state,id){
        let x = state.usuariosForm.a.findIndex(x=>{return x.id == id});
        // console.log("INDEXANDO",x );
        if(x != -1){
            state.usuariosForm.a.splice(x,1);
        }
        state.usuariosForm = {a: JSON.parse(JSON.stringify(state.usuariosForm.a)) };
    },

    addPartner(state,usuario){
        usuario.cooperar = true;
        usuario.propio = false;
        let x = state.patnersForm.a.findIndex(x=>{return x.id == usuario.id});
        if(x == -1){
            state.patnersForm.a.push(usuario);
        }
        state.patnersForm = {a: JSON.parse(JSON.stringify(state.patnersForm.a)) };
    },

    removePartner(state,id){
        let x = state.patnersForm.a.findIndex(x=>{return x.id == id});
        // console.log("INDEXANDO",x );
        if(x != -1){
            state.patnersForm.a.splice(x,1);
        }
        state.patnersForm = {a: JSON.parse(JSON.stringify(state.patnersForm.a)) };
    },

    addRegalo(state,regalo){

        regalo.tipo_entrega = 'tienda';
        regalo.hora_entrega = '17:00:00';

        console.log("AGREGANDO 1 =>", regalo);

        if(state.serie == 'amenidad'){
            let x = state.listaRegalosForm.a.findIndex(x=>{return x.id == regalo.id});
            if(x == -1){
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                regalo.subtotal = regalo.precio;
                if(regalo.iva == '1'){
                    regalo.precio = regalo.precio * 1.16;
                }
                
                // console.log("cantidad", regalo);
                state.listaRegalosForm.a.push(regalo);
            }
            else{
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                state.listaRegalosForm.a[x].cantidad = state.listaRegalosForm.a[x].cantidad + regalo.cantidad;
            }
            state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
        }
        else{
            let x = state.regalosForm.a.findIndex(x=>{return x.id == regalo.id});
            if(x == -1){
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                regalo.subtotal = regalo.precio;
                if(regalo.iva == '1'){
                    regalo.precio = regalo.precio * 1.16;
                }

                // console.log("cantidad", regalo);
                state.regalosForm.a.push(regalo);
            }
            else{
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                state.regalosForm.a[x].cantidad = state.regalosForm.a[x].cantidad + 1;
            }
            state.regalosForm = {a: JSON.parse(JSON.stringify(state.regalosForm.a)) };
        }
    },

    addRegaloCallback(state,{regalo, callback = null}){

        console.log("AGREGANDO 2 =>", regalo);

        let addProcess = (val = 'tienda')=>{
            regalo.tipo_entrega = val;
            regalo.hora_entrega = '17:00:00';
            if(state.serie == 'amenidad'){
                let x = state.listaRegalosForm.a.findIndex(x=>{return x.id == regalo.id});
                if(x == -1){
                    regalo.serie = state.serie;
                    if(!regalo.cantidad){
                        regalo.cantidad = 1;
                    }
                    regalo.subtotals = regalo.precio;
                    regalo.subtotal = regalo.precio;
                    if(regalo.iva == '1'){
                        // BUG QUE MODIFICABA EL PRECIO CADA QUE SE AGREGABA
                        // regalo.precio = regalo.precio * 1.16;
                    }
                    
                    // console.log("cantidad", regalo);
                    state.listaRegalosForm.a.push(regalo);
                }
                else{
                    regalo.serie = state.serie;
                    if(!regalo.cantidad){
                        regalo.cantidad = 1;
                    }
                    state.listaRegalosForm.a[x].cantidad = state.listaRegalosForm.a[x].cantidad + regalo.cantidad;
                }
                state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
            }
            else{
                let x = state.regalosForm.a.findIndex(x=>{return x.id == regalo.id});
                if(x == -1){
                    regalo.serie = state.serie;
                    if(!regalo.cantidad){
                        regalo.cantidad = 1;
                    }
                    
                    regalo.subtotals = regalo.precio;
                    regalo.subtotal = regalo.precio;
                    if(regalo.iva == '1'){
                        // BUG QUE MODIFICABA EL PRECIO CADA QUE SE AGREGABA
                        // regalo.precio = regalo.precio * 1.16;
                    }
    
                    // console.log("cantidad", regalo);
                    state.regalosForm.a.push(regalo);
                }
                else{
                    regalo.serie = state.serie;
                    if(!regalo.cantidad){
                        regalo.cantidad = 1;
                    }
                    state.regalosForm.a[x].cantidad = state.regalosForm.a[x].cantidad + 1;
                }
                state.regalosForm = {a: JSON.parse(JSON.stringify(state.regalosForm.a)) };
            }
            if(callback){
                callback();
            }
        }

        if(true){
            //guardamos el precio origianal
            regalo.subprecio = Number(regalo.precio);

            let prod = regalo;
            let estado = this.getters.getSession.estado;

            if(!estado){
                swal("","No has seleccionado tu estado de residencia","");
                return;
            }

            if(!prod.product_type){
                swal("","Este producto no esta disponible en este momento (CP700E)","");
                return;
            }

            if(prod.product_type == '2'){
                let pState = prod.partner.state_id;
                if(!pState){
                    swal("","Lo sentimos ese producto no esta disponible en este momento (CODENP1)","");
                    return;
                }
                if(pState != estado){
                    if(state.validacionEstatal != prod.id){
                        state.validacionEstatal = prod.id;
                        let text = this.getters.catalogoGetFindById('estados',pState);
                        // console.log("ESTADON", text);
                        if(text){
                            swal("",`Recuerda que este es un servicio y solo esta disponible en el estado de ${text.nombre}`,"")
                        }
                        else{
                            swal("","Recuerda que este es un servicio y no esta disponible en tu estado","")
                        }
                        return;
                    }
                }
                regalo.notEnvio = 2;
                addProcess('tienda');
                return;
            }

            let fnAlert = (text)=>{
                regalo.subtotals        = regalo.precio;
                regalo.notEnvio         = 1;
                regalo.shipping_cost    = 0;
                regalo.costo_envio      = 0;
                regalo.tiempo           = 0;
                regalo.envio_iva        = Number(regalo.costo_envio) * 0.16;
                regalo.subprecio        = Number(regalo.precio);
                regalo.precio           = Number(regalo.precio);
                addProcess('tienda');
            }

            let fnAlertSwal = (text)=>{
                swal({
                    text:   text,
                    icon:   '',
                    buttons: {
                        continuar: "No necesito envio, usare un qr",
                        cancel: "Cancelar",
                    },
                }).then((value) => {
                    if (value == "continuar") {
                        regalo.subtotals        = regalo.precio;
                        regalo.notEnvio         = 1;
                        regalo.shipping_cost    = 0;
                        regalo.costo_envio      = 0;
                        regalo.tiempo           = 0;
                        regalo.envio_iva        = Number(regalo.costo_envio) * 0.16;
                        regalo.subprecio        = Number(regalo.precio);
                        regalo.precio           = Number(regalo.precio);
                        addProcess('tienda');
                    }
                });
            }

            let envio = null;
            // console.log("producto ENVIOS", prod, estado);

            if(prod.product_type == '1'){
                envio = (prod.envios || []).find(s=>s.states_id == estado);
                if(!prod.shipping_types_id){
                    // swal("","Lo sentimos este producto no tiene envio a domicilio","");
                    fnAlert("Lo sentimos este producto no tiene envio a domicilio");
                    return;
                }
                if(!envio){
                    // swal("","Lo sentimos este producto aun no tiene envio a tu estado","");
                    fnAlert("Lo sentimos este producto aun no tiene envio a tu estado");
                    return;
                }

                let form = this.getters.userStateObject('nuevoEventoForm');
                let entrega = moment().add(envio.tiempo, 'days').format('YYYY-MM-DD');
                // console.log("FECHAS", form.fecha, entrega);
                if(form.fecha < entrega){
                    swal("",`El producto que deseas agregar no llegara el dia de tu evento ya que su tiempo de entrega es de ${envio.tiempo} dias`,"");
                    return;
                }
                prod.dias = envio.tiempo;
                if(envio.costo && Number(envio.costo)){
                    prod.shipping_cost = envio.costo;
                }
                regalo.subtotals        = regalo.precio;
                regalo.shipping_cost    = prod.shipping_cost;
                regalo.shipping_costX   = prod.shipping_cost;
                regalo.costo_envio      = prod.shipping_cost;
                regalo.tiempo           = envio.tiempo;
                regalo.tiempoX          = envio.tiempo;
                regalo.envio_iva        = Number(regalo.costo_envio) * 0.16;
                regalo.subprecio        = Number(regalo.precio);
                regalo.precio           = Number(regalo.precio);
                // console.log("PRECIOS ENVIOS", envio.costo, regalo.envio_iva, regalo.precio, regalo);
                addProcess('domicilio');
            }

        }

    },

    addRegaloEdicion(state,{regalo}){
        if(true){
            let prod = regalo;
            let estado = this.getters.getSession.estado;
            if(!estado){
                swal("","No has seleccionado tu estado de residencia","");
                return;
            }
            if(prod.product_type == '2'){
                let pState = prod.partner.state_id;
                if(!pState){
                    swal("","Lo sentimos ese producto no esta disponible en este momento (CODENP1)","");
                    return;
                }
                if(pState != estado){
                    if(state.validacionEstatal != prod.id){
                        state.validacionEstatal = prod.id;
                        let text = this.getters.catalogoGetFindById('estados',pState);
                        // console.log("ESTADON", text);
                        if(text){
                            swal("",`Recuerda que este es un servicio y solo esta disponible en el estado de ${text.nombre}`,"")
                        }
                        else{
                            swal("","Recuerda que este es un servicio y no esta disponible en tu estado","")
                        }
                        return;
                    }
                }
            }
            let envio = null;
            // console.log("producto ENVIOS", prod, estado);
            if(prod.product_type == '1'){
                envio = (prod.envios || []).find(s=>s.states_id == estado);
                if(!prod.shipping_types_id){
                    swal("","Lo sentimos este producto no tiene envio a domicilio","");
                    return;
                }
                if(!envio){
                    swal("","Lo sentimos este producto aun no tiene envio a tu estado","");
                    return;
                }
                let form = this.getters.userStateObject('nuevoEventoForm');
                let entrega = moment().add(envio.tiempo, 'days').format('YYYY-MM-DD');
                // console.log("FECHAS", form.fecha, entrega);

                if(form.fecha < entrega){
                    swal("",`El producto que deseas agregar no llegara el dia de tu evento ya que su tiempo de entrega es de ${envio.tiempo} dias`,"");
                    return;
                }

                prod.shipping_cost = envio.costo;
                prod.dias = envio.tiempo;
                regalo.subtotals = regalo.precio;
                regalo.shipping_cost = envio.costo;
                regalo.tiempo = envio.tiempo;
                regalo.envio_iva = Number(envio.costo) * 1;
                regalo.precio = Number(regalo.precio) + regalo.envio_iva;
                // console.log("PRECIOS ENVIOS", envio.costo, regalo.envio_iva, regalo.precio, regalo);
            }

        }


        if(state.serie == 'amenidad'){
            let x = state.listaRegalosForm.a.findIndex(x=>{return x.id == regalo.id});
            if(x == -1){
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                regalo.subtotals = regalo.precio;
                regalo.subtotal = regalo.precio;
                if(regalo.iva == '1'){
                    regalo.precio = regalo.precio * 1.16;
                }
                
                // console.log("cantidad", regalo);
                state.listaRegalosForm.a.push(regalo);
            }
            else{
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                state.listaRegalosForm.a[x].cantidad = state.listaRegalosForm.a[x].cantidad + regalo.cantidad;
            }
            state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
        }
        else{
            let x = state.regalosForm.a.findIndex(x=>{return x.id == regalo.id});
            if(x == -1){
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                
                regalo.subtotals = regalo.precio;
                regalo.subtotal = regalo.precio;
                if(regalo.iva == '1'){
                    regalo.precio = regalo.precio * 1.16;
                }

                // console.log("cantidad", regalo);
                state.regalosForm.a.push(regalo);
            }
            else{
                regalo.serie = state.serie;
                if(!regalo.cantidad){
                    regalo.cantidad = 1;
                }
                state.regalosForm.a[x].cantidad = state.regalosForm.a[x].cantidad + 1;
            }
            state.regalosForm = {a: JSON.parse(JSON.stringify(state.regalosForm.a)) };
        }
    },

    addToArray(state,[data, arreglo = '']){
        state[arreglo].a.push(data);
        state[arreglo] = {a: JSON.parse(JSON.stringify(state[arreglo].a)) };
    },

    userRemoveToArray(state,[data, arreglo = '']){
        state[arreglo].a = state[arreglo].a.filter(x=>{return x.id != data.id});
        state[arreglo] = {a: JSON.parse(JSON.stringify(state[arreglo].a)) };
    },

    removeConcepto(state,index){
        state.listaRegalosForm.a.splice(index,1);
        state.listaRegalosForm = {a: JSON.parse(JSON.stringify(state.listaRegalosForm.a)) };
    },

    removeRegalo(state,id){
        let x = state.regalosForm.a.findIndex(x=>{return x.id == id});
        if(x != -1){
            state.regalosForm.a.splice(x,1);
        }
        state.regalosForm = {a: JSON.parse(JSON.stringify(state.regalosForm.a)) };
    },

    setUsuarioInfo(state,data){
        if( 'fechas' in  data){
           state.fechas = {a: data.fechas};
        }
        if( 'misFechas' in  data){
           state.misFechas = {a: data.misFechas};
        }
        if( 'misEventos' in  data){
           state.misEventos = {a: data.misEventos};
        }
        if( 'misTarjetas' in  data){
           state.misTarjetas = {a: data.misTarjetas};
        }
        if( 'eventosSinLeer' in  data){
           state.eventosSinLeer = data.eventosSinLeer;
        }
        if( 'invitacionesSinLeer' in  data){
           state.invitacionesSinLeer = data.invitacionesSinLeer;
        }
        if( 'partners' in  data){
           state.partners = {a: data.partners};
        }
        if( 'fechasAmigos' in  data ){
           state.fechasAmigos = {a: data.fechasAmigos};
        } 
        if( 'listasAmigos' in  data ){
           state.listasAmigos = {a: data.listasAmigos};
        }
        if( 'invitaciones' in  data ){
            data.invitaciones = _.orderBy( data.invitaciones, ['creado'], ['desc'] );
           state.invitaciones = {a: data.invitaciones};
        }
        if( 'misListas' in  data ){
           state.misListas = {a: _.orderBy( data.misListas, ['creado'], ['desc'])};
        }
        if( 'lugares' in  data ){
           state.lugares = {a: data.lugares};
        }
        if( 'posts' in  data ){
           state.posts = {a: data.posts};
        }
        if( 'postAmigos' in  data ){
           state.postAmigos = {a: data.postAmigos};
        }
        if( 'postEtiquetas' in  data){
           state.postEtiquetas = {a: data.postEtiquetas};
        }
        if( 'inivtacionesRechazadas' in  data  ){
           state.inivtacionesRechazadas = {a: data.inivtacionesRechazadas};
        }
        if( 'usuarios' in  data ){
           state.usuarios = {a: data.usuarios};
        }
        if( 'amigos' in  data ){
           state.amigos = {a: data.amigos};
        }
        if( 'regalosAmigos' in  data  ){
           state.regalosAmigos = {a: data.regalosAmigos};
        }
        if( 'historial' in  data ){
           state.historial = {a: data.historial};
        }
        if( 'servicios' in  data ){
           state.servicios = {a: data.servicios};
        }
    },

    verPerfil(state, { id = null } ){
        // console.log("PERILSNAODO", id);
        if(state.usuarios.a.some(x=>x.id == id)){
            state.perfil_id = id;
            this.getters.getRouter.navigate(`/perfil_usuario/${id}`);
        }
        else{
            swal("","No se encontro el usuario","");
        }
    },
};

const actions={

    postGuardarPost({ commit, state }, [form, eventos_id, usuarios, partners, imagenes]){
        let data = {
            form: form,
            eventos_id: eventos_id,
            usuarios: usuarios,
            partners: partners,
            imagenes,
        };

        let finish = (res)=>{
            if(form.id){
                swal("","Post actualizado","success");
                this.getters.getRouter.back();
            }
            else{
                swal({ title:"",text:"Post creado",icon:"success",button:'Entendido' });
                this.getters.getRouter.back();
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['posts/save_post', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postGuardarFecha({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            if(form.id){
                swal("","Fecha actulizada","success");
                this.getters.getRouter.back();
            }
            else{
                this.commit('cleanForm',[]);
                swal("","Fecha agregada","success");
                this.commit('setUsuarioData',['fecha', res.data.id]);
                this.commit('setUsuarioData',['tipo', 'nuevaFecha']);
                this.getters.getRouter.navigate('/lista_nuevo_evento', {reloadCurrent: true});
                // console.log("RES RES RES", res.data.id );
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postUpdateUsuarioTable({ commit, state }, [form, callback = null]){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            // swal("", res.msg, "");
            if(callback){
                callback();
            }
            this.dispatch('synchronizeData');
        };

        this.dispatch('postPromiseNoError', ['user/updateprof', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEditarFecha({ commit, state }, [form, regalos]){
        let data = {
            data: form,
            regalos: regalos,
        };

        let finish = (res)=>{
            if(form.id){
                swal("","Fecha actulizada","success");
                this.getters.getRouter.back();
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postGuardarRegalosFechas({ commit, state }, form ){
        let data = {
            fecha: state.fecha,
            regalos: form,
        };

        let finish = (res)=>{
            swal("","Regalos guardados","success");
            this.getters.getRouter.back('/mis_fechas', {force: true} );
            this.commit('cleanForm',[]);
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/agregar_regalos_fechas', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEliminarFecha({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Fecha eliminada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/borra_fecha', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEliminarEvento({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Evento eliminado","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/borra_evento', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postGuardarLista({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Wishlist creada","success");
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create_lista', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postBorrarLista({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Wishlist borrada","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/borrar_lista', data]).then(
        res => {
            finish(res);
        },error=>{});
    },
    
    postGuardarProducto({ commit, state }, form){
        let data = {
            data: form,
        };
        data.data.listas_id = state.lista;

        let finish = (res)=>{
            swal("","Producto creado","success");
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/create_producto', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEliminarProducto({ commit, state }, form){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Producto eliminado","success");
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['fechas/delete_producto', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postActulizarSolicitudAmistad({ commit, state }, [form, estatus]){
        let data = {
            solicitud: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            if(estatus == 'aceptado'){
                swal("Solicitud aceptada",`Ahora tu y ${form.usuario.nombre} son amigos en SocialFlow`,"success");
            }else{
                swal("","Solicitud actulizada","success");
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/actulizar_solicitud', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postSetFavorito({ commit, state }, [form, estatus]){
        let data = {
            solicitud: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            if(estatus == '1'){
                swal("","Haz agregado a este usuario a tus personas importantes. Podras verlo en tu perfl.","success");
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/set_favorito', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarSolicitud({ commit, state }, usuario){
        let data = {
            usuario: usuario,
        };

        let finish = (res)=>{
            swal("","Solicitud enviada","success");
            // this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/enviar_solicitud', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarSolicitudes({ commit, state }, usuarios){
        let data = {
            usuarios: usuarios,
        };

        let finish = (res)=>{
            swal("","Solicitudes enviadas","success");
            // this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/enviar_solicitudes', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

     postEnviarInvitacion({ commit, state }, form ){
        let data = {
            data: form,
        };

        let finish = (res)=>{
            swal("","Solicitud enviada","success");
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['contactos/enviar_invitacion', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postAgregarEvento({ commit, state }, form ){
        let data = {
            form: form,
            usuarios: state.usuariosForm.a,
            regalos: state.regalosForm.a,
            conceptos: state.listaRegalosForm.a,
            partners: state.patnersForm.a,
            card: this.getters.carritoObject('metodo_pago')
        };

        if(form.tipo=='reunion'){
            if(form.cooperacion == 'no'){
                if(!data.card){
                    swal("","Debes tener seleccionado una tarjeta principal","");
                    return;
                }
            }
        }

        let finish = (res)=>{
            const fin = moment(res.fecha, 'YYYY-MM-DD HH:mm:ss').format('HH:mm [hrs] [del] dddd D [de] MMMM');
            if(form.tipo == 'party'){
                if(form.id){
                    swal("","Regalo grupal actualizado","success");
                }else{
                    swal("Gracias, tu regalo grupal ha sido creado",`Los invitados tienen hasta las ${fin} para aceptar su participación, de lo contrario este regalo será cancelado.`,"")
                }
            }else{
                if(form.id){
                    swal("","Reunion actualizada","success");
                }
                else if(form.cooperacion == 'si'){
                    swal({
                        title: 'Gracias, tu reunion ha sido creada',
                        text: `Los invitados tienen hasta las ${fin} para aceptar su participación, de lo contrario esta reunion será cancelada.`,
                        icon: 'success',
                        buttons: {
                            ok: "Entendido",
                            regalo: "Crear un regalo grupal."
                        },
                    }).then((value) => {
                        if (value == "regalo") {
                            this.commit('cleanForm', [this.hoy]);
                            this.commit('processRuteSession','/nuevo_evento_calendario')
                        }
                    })
                }else{
                    swal("","Reunion creada","success");
                }
            }
            this.commit('setUsuarioData',['nuevoEventoForm', initialState.nuevoEventoForm ]);
            this.commit('cleanForm',[]);

            this.getters.getRouter.back('/eventos',{force:true});
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/agregar_evento', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEnviarCobro({ commit, state }, [form, cantidad] ){
        let data = {
            form: form,
            cantidad: cantidad,
        };

        let finish = (res)=>{
            
            this.commit('cleanForm',[]);
            this.getters.getRouter.back();
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/cobrar_evento', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postActulizarSolicitud({ commit, state }, [form, estatus]){
        let data = {
            invitacion: form,
            estatus: estatus,
        };

        let finish = (res)=>{
            if(estatus=='rechazado'){
                swal({ 
                    title:"Has rechazado la invitación a esta reunión",
                    text: "Se le informara a los demás invitados de tu ausencia.",
                    icon:"success", 
                    button:'Entendido' 
                });
            }else{
                swal("","Invitación actualizada","success");
            }
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/actulizar_invitacion', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postActulizarCobro({ commit, state }, [evento, estatus]){
        let data = {
            evento: evento,
            estatus: estatus==1?'aceptado':'rechazado',
            card: this.getters.carritoObject('metodo_pago')
        };

        // console.log('CARDS', this.getters.carritoObject('metodo_pago'));
        if(estatus==1){
            if(!data.card){
                swal("","Debes tener seleccionado una tarjeta principal","");
                return;
            }
        }

        let finish = (res)=>{
            if(estatus == 0){
                if(evento.tipo == 'party'){
                    swal("","Ha sido rechazada tu invitación al regalo grupal.","success");
                }else{
                    swal("","Cooperacioón Rechazada ","success");
                }
            }else{
                if(evento.tipo == 'party'){
                    swal({title:"Gracias por aceptar la cooperacion.", text:"Ningun cargo sera realizado a tu tarjeta hasta que el resto de los inivtados acepten la cooperación",icon:"success", button: 'Entendido'});
                }else{
                    swal({title:"Gracias por aceptar la cooperacion.", text:"Ningun cargo sera realizado a tu tarjeta hasta que el resto de los inivtados acepten la cooperación",icon:"success", button: 'Entendido'});
                }
            }

            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
        };

        this.dispatch('postPromiseLoader', ['datos/actulizar_cobro', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postVolverAPagar({ commit, state }, [evento_id, metodo_id]){
        let data = {
            evento_id: evento_id,
            metodo_id: metodo_id,
        };

        let finish = (res)=>{
            swal("","Coperación realizada, gracias","success");
            this.dispatch('synchronizeData');
        };

        this.dispatch('postPromiseLoader', ['datos/realizar_cobro_errado', data]).then(
            res => {
                finish(res);
            },
            error=>{});
    },

    // ya no contamos la invitacion
    postContarInvitacion({ commit, state }, [total]){
        let data = {
            id: this.getters.getSession.id,
            nombre: this.getters.getSession.nombre,
            email: this.getters.getSession.email,
            // invitaciones: Number(this.getters.getSession.invitaciones)+1,
        };
        this.dispatch('postPromiseNoError', ['usuarios/edit', data]).then(
            res => {
                this.dispatch('synchronizeData');
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