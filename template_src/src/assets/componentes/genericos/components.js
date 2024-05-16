//componentes genericos
import statusbar from './statusbar.vue';
import botonApp from './botonApp.vue';
import boton_icono from './boton-icono.vue';
import icono from './icono.vue';
import inputForm from './inputForm.vue';
import busquedaInput from './busquedaInput.vue';

import imagen from './imagen.vue';

import mapa from './mapa.vue';
import mapaPick from './mapaPick.vue';
import mapaPickLatLng from './mapaPickLatLng.vue';
import mapaRuta from './mapaRuta.vue';
import mapaTrazarRuta from './mapaTrazarRuta.vue';
import mapaUbicacion from './mapaUbicacion.vue';
import mapaLocalizador from './mapaLocalizador.vue';
import modal_loader from './modal_loader.vue';
import modal_mensaje from './modal_mensaje.vue';
import globalMsn from './globalMsn.vue';
import modalSession from './modalSession.vue';

import nav_bar from './nav-bar.vue';
import modalNotificacion from './modalNotificacion.vue';
import photoswipe from './photoswipe.vue';
import seleccionar_imagen from './seleccionar_imagen.vue';
import uploadImagen from './uploadImagen.vue';
import selectImagen from './selectImagen.vue';
import select_form from './select-form.vue';
import sliderHome from './sliderHome.vue';
import banners from './banners.vue';
import sliderFotos from './sliderFotos.vue';
import tabs from './tabs.vue';
import toggle from './toggle.vue';
import spinner from './spinner.vue';
import calendario from './calendario.vue';
import calendarioVertical from './calendarioVertical.vue';
import categorias from './categorias.vue';
import scollX from './scollX.vue';
import buscarDireccion from './buscarDireccion.vue';
import geoResultado from './geoResultado.vue';
import selectFecha from './selectFecha.vue';
import modalFecha from './modalFecha.vue';
import modalmensajeA from './modalmensajeA.vue';
import modalMensajeFor from './modalMensajeFor.vue';
import modalPost from './modalPost.vue';


function plugin(Vue) {
    Vue.component('statusbar', statusbar);
    Vue.component('botonApp', botonApp);
    Vue.component('boton-icono', boton_icono);
    Vue.component('icono', icono);
    Vue.component('inputForm', inputForm);
    Vue.component('busquedaInput', busquedaInput);

    Vue.component('imagen', imagen);

    Vue.component('mapa', mapa);
    Vue.component('mapaPick', mapaPick);
    Vue.component('mapaPickLatLng', mapaPickLatLng);
    Vue.component('mapaRuta', mapaRuta);
    Vue.component('mapaTrazarRuta', mapaTrazarRuta);
    Vue.component('mapaUbicacion', mapaUbicacion);
    Vue.component('mapaLocalizador', mapaLocalizador);
    Vue.component('modal-loader', modal_loader);
    Vue.component('modal-mensaje', modal_mensaje);
    Vue.component('modalMensajeFor', modalMensajeFor);
    Vue.component('modalmensajeA', modalmensajeA);
    Vue.component('globalMsn', globalMsn);
    Vue.component('modalSession', modalSession);
    Vue.component('modalPost', modalPost);


    Vue.component('nav-bar', nav_bar);
    Vue.component('tabs', tabs);
    Vue.component('toggle', toggle);
    Vue.component('spinner', spinner);
    Vue.component('banners', banners);
    Vue.component('seleccionar-imagen', seleccionar_imagen);
    Vue.component('selectImagen', selectImagen);
    Vue.component('uploadImagen', uploadImagen);
    Vue.component('selectForm', select_form);
    Vue.component('sliderHome', sliderHome);
    Vue.component('photoswipe', photoswipe);
    Vue.component('sliderFotos', sliderFotos);
    Vue.component('modalNotificacion', modalNotificacion);
    Vue.component('calendario', calendario);
    Vue.component('calendarioVertical', calendarioVertical);
    Vue.component('categorias', categorias);
    Vue.component('scollX', scollX);
    Vue.component('buscarDireccion', buscarDireccion);
    Vue.component('geoResultado', geoResultado);
    Vue.component('selectFecha', selectFecha);
    Vue.component('modalFecha', modalFecha);
}

export default plugin
