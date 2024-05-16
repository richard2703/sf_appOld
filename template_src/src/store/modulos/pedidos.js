import axios from 'axios';
const moment = require('moment');

const initialState = {
    pedidos:{a:[]},
    pedido: null,
    comision: .029,
    comisionFija: 2.5+5,
    direccion:{},
    productos:{a:[]},
    total: 0,
   
};

const state=JSON.parse(JSON.stringify(initialState));
const getters={   
    pedidosObject:(state)=>(obj)=>{return state[obj]},
    pedidosArray:(state)=>(obj)=>{return state[obj].a},
    pedidosFind:(state)=>([obj,data])=>{return state[obj].a.find(a=>{return a.id == state[data]})},
    pedidosFindInside:(state)=>([obj,data,key,id])=>{return state[obj].a.find(a=>{return a.id == state[data]})[key].find(x=>{return x.id == state[id]})},
};
const mutations={
    setPedidosState(state,[key,data]){
        state[key] = data;
    },
    initProductos(state){
        state.productos = {a: JSON.parse(JSON.stringify(this.getters.getCatalogo('productos')))};
        state.productos.a.map(p=>{ p.cantidad = 0});
    },
    setCantidadProducto(state,[tipo,producto,indx]){
        if(tipo == 'remove'){
            if(producto.cantidad > 0){
                state.productos.a[indx].cantidad--;
            }
        }
        else{
            state.productos.a[indx].cantidad++;
        }
        state.productos = {a: JSON.parse(JSON.stringify(state.productos.a))};
        state.total = 0;
        state.productos.a.map(p=>{
            state.total = state.total + (p.cantidad * Number(p.precio));
        });
    },
    updatePedidosState(state,data){
       if(data.pedidos){
           state.pedidos = {a: data.pedidos};
       }
    },
};
const actions={
    postCrearPedido({ commit, state }, form){
        let data = {
            cliente: this.getters.getCatalogoFind('clientes','cliente'),
            direccion: this.getters.pedidosObject('direccion'),
            productos: this.getters.pedidosArray('productos'),
            total: this.getters.pedidosObject('total'),
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            this.getters.getRouter.back('/inicio_despachador',{force:true});
            swal("","Pedido creado","success");
        };
        this.dispatch('postPromiseLoader', ['servicios/create_pedido', data]).then(
        res => {
            finish(res);
        },error=>{});
    },

    postEntregarPedido({ commit, state }, pedido){
        let data = {
            pedido: pedido,
        };
        let finish = (res)=>{
            this.dispatch('synchronizeData');
            this.dispatch('sendDataAllUsers',[{servicio:true}]);
            swal("","Pedido entregado","success");
        };
        this.dispatch('postPromiseLoader', ['servicios/entregar_pedido', data]).then(
        res => {
            finish(res);
        },error=>{});
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};