// Import Vue
import Vue from 'vue';
// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';
// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
// Import F7 Style
import Framework7CSS from 'framework7/css/framework7.bundle.min.css';
// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css';
// Import Material Icons
import MaterialIcons from 'material-design-icons/iconfont/material-icons.css';
// Import Fontawesome Theme Styles
import FontAwesome from '@fortawesome/fontawesome-free/css/all.min.css';
// Import fastClick
import FastClick from 'fastclick';
// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'
import customTheme from './assets/css/app.css'
// import boostrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import App Component
import app from './main.vue';

// Import Vuex Storage
// import store from './assets/vuex/storage.js';
import { store } from "./store/store";

import componentsG from './assets/componentes/genericos/components.js';
Vue.use(componentsG);

import components from './assets/componentes/personalizados/components.js';
Vue.use(components);

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters);

// Different F7-Vue plugin initialization with f7 v3.0
Framework7.use(Framework7Vue);

import directives from './directive.js';

import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter,{
    symbol : '$',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
});

// MOMENT
const moment = require('moment');
require('moment/locale/es-do');
Vue.use(require('vue-moment'), {moment});

Vue.filter('timestamp', (fecha) => {
    if(fecha){
      return moment(fecha,'YYYY-MM-DD HH:mm:ss').format('HH:mm [hrs] DD/MM/YYYY');
    }
    return null;
});



// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app
  },
  mounted() {
    window.addEventListener('load', () => {
      // run after everything is in-place
      FastClick.attach(document.body);
    });
  }
});
