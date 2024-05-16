


import sucursalesProductos from './sucursalesProductos.vue';
import cardProducto from './cardProducto.vue';
import topRowPorducto from './topRowPorducto.vue';
import mapaChofer from './mapaChofer.vue';
import rowUsuario from './rowUsuario.vue';
import modalCalificar from './modalCalificar.vue';
import modalConfirmar from './modalConfirmar.vue';
import modalAvisar from './modalAvisar.vue';
import msnComponent from './msnComponent.vue';
import modalInfo from './modalInfo.vue';
import modalNuevoDestino from './modalNuevoDestino.vue';
import modalUsuario from './modalUsuario.vue';
import mensajeGrupal from './mensajeGrupal.vue';
import modalParty from './modalParty.vue';
import modalFiltro from './modalFiltro.vue';
import modalEventoCreador from './modalEventoCreador.vue';
import modalLista from './modalLista.vue';
import eventosRow from './eventosRow.vue';
import eventosFull from './eventosFull.vue';
import modalQr from './modalQr.vue';
import modalRegalo from './modalRegalo.vue';
import modalUsuarios from './modalUsuarios.vue';
import desgloceCarrito from './desgloceCarrito.vue';

import reunionFestejado from './reunionFestejado.vue';
import reunionRegalos from './reunionRegalos.vue';
import desgloceTotalCoopera from './desgloceTotalCoopera.vue';
import reunionUsuarios from './reunionUsuarios.vue';
import reunionWishlistUsuario from './reunionWishlistUsuario.vue';
import reunionAmenidades from './reunionAmenidades.vue';
import reunionPartners from './reunionPartners.vue';
import modalFechaUsuario from './modalFechaUsuario.vue';
import regaloNotiComponente from './regaloNotiComponente.vue';

import notificacionesComponent from './notificacionesComponent.vue';
import rowActividadUsuario from './rowActividadUsuario.vue';
import rowWhislist from './rowWhislist.vue';
import compraHistorialComponente from './compraHistorialComponente.vue';
import tarjetaRegaloComponent from './tarjetaRegaloComponent.vue';
import postMuroBasico from './postMuroBasico.vue';
import modalColores from './modalColores.vue';
import rowRegaloSelectDireccion from './rowRegaloSelectDireccion.vue';
import compReuRegalo from './compReuRegalo.vue';
import compServiciosCanjeables from './compServiciosCanjeables.vue';
import compRegalosRecibidos from './compRegalosRecibidos.vue';
import compProdDesgloce from './compProdDesgloce.vue';
import pagoDeclinadoComponent from './pagoDeclinadoComponent.vue';
import share from './share.vue';

import reunionMetodoPago from './reuniones/reunionMetodoPago.vue';

function plugin(Vue) {
    // PERSONALIZADOS
    Vue.component('sucursalesProductos', sucursalesProductos);
    Vue.component('cardProducto', cardProducto);
    Vue.component('topRowPorducto', topRowPorducto);
    Vue.component('mapaChofer', mapaChofer);
    Vue.component('rowUsuario', rowUsuario);
    Vue.component('modalCalificar', modalCalificar);
    Vue.component('modalConfirmar', modalConfirmar);
    Vue.component('modalAvisar', modalAvisar);
    Vue.component('msnComponent', msnComponent);
    Vue.component('modalQr', modalQr);
    Vue.component('modalRegalo', modalRegalo);
    Vue.component('modalInfo', modalInfo);
    Vue.component('modalNuevoDestino', modalNuevoDestino);
    Vue.component('modalUsuario', modalUsuario);
    Vue.component('mensajeGrupal', mensajeGrupal);
    Vue.component('modalParty', modalParty);
    Vue.component('modalFiltro', modalFiltro);
    Vue.component('modalEventoCreador', modalEventoCreador);
    Vue.component('modalLista', modalLista);
    Vue.component('eventosRow', eventosRow);
    Vue.component('eventosFull', eventosFull);
    Vue.component('modalUsuarios', modalUsuarios);
    Vue.component('desgloceCarrito', desgloceCarrito);
    
    Vue.component('reunionFestejado', reunionFestejado);
    Vue.component('reunionRegalos', reunionRegalos);
    Vue.component('desgloceTotalCoopera', desgloceTotalCoopera);
    Vue.component('reunionWishlistUsuario', reunionWishlistUsuario);
    Vue.component('reunionUsuarios', reunionUsuarios);
    Vue.component('reunionAmenidades', reunionAmenidades);
    Vue.component('reunionPartners', reunionPartners);
    Vue.component('modalFechaUsuario', modalFechaUsuario);
    Vue.component('regaloNotiComponente', regaloNotiComponente);
    
    Vue.component('notificacionesComponent', notificacionesComponent);
    Vue.component('rowActividadUsuario', rowActividadUsuario);
    Vue.component('rowWhislist', rowWhislist);
    Vue.component('compraHistorialComponente', compraHistorialComponente);
    Vue.component('tarjetaRegaloComponent', tarjetaRegaloComponent);
    Vue.component('postMuroBasico', postMuroBasico);
    Vue.component('modalColores', modalColores);
    Vue.component('rowRegaloSelectDireccion', rowRegaloSelectDireccion);
    Vue.component('compReuRegalo', compReuRegalo);
    Vue.component('compServiciosCanjeables', compServiciosCanjeables);
    Vue.component('compRegalosRecibidos', compRegalosRecibidos);
    Vue.component('compProdDesgloce', compProdDesgloce);
    Vue.component('pagoDeclinadoComponent', pagoDeclinadoComponent);
    Vue.component('share', share);

    Vue.component('reunionMetodoPago', reunionMetodoPago);
}
export default plugin
