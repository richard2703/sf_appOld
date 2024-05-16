import axios from 'axios';

const initialState = {};
const state = JSON.parse(JSON.stringify(initialState));
const getters={};
const mutations={};

const actions={
  
  call({state},tel){
    let url = `tel:${tel}`;
    console.log("CORDOVA OPEN", url);
    try{
      cordova.InAppBrowser.open(url, '_system');
    }catch(e){};
  }, 
  sendWhatsapp({state},tel){
    let url = `https://api.whatsapp.com/send?phone=${tel}`;
    console.log("CORDOVA OPEN", url);
    try{
      cordova.InAppBrowser.open(url, '_system');
    }catch(e){};
  }, 
  mailto({state},tel){
    let url = `mailto:${tel}`;
    console.log("CORDOVA OPEN", url);
    try{
      cordova.InAppBrowser.open(url, '_system');
    }catch(e){};
  }, 
  openBrowser({state},url){
    console.log("CORDOVA OPEN", url);
    try{
      cordova.InAppBrowser.open(url, '_system');
    }catch(e){};
  }, 
  abrirNavegador({state},destination){
    console.log("Navigator launch", destination);
    try{
      launchnavigator.navigate(destination, {});
    }catch(e){};
  }, 
  openWebPage({state}, url){
    url = url.replace(/\s/g, '');
    if(!url.includes('http') && !url.includes('https')){
      url = 'https://'+url;
    }
    console.log("OPEN URL", url);
    cordova.InAppBrowser.open(url, '_system');
  }, 
  shareApp({state}){
    var msg = [],file,          
    options = {
      subject: '¡Mira esta increible app! Descargala aquí: https://play.google.com/store/apps/details?id=com.sustam.globel&hl=es',
      message: '¡Mira esta increible app!',
      url: 'https://play.google.com/store/apps/details?id=com.sustam.globel&hl=es',
      chooserTitle: 'Compartir vía...'
    },
    onSuccess = function(result) {
      console.info("Finalización de shareinApp", result)
    },
    onError = function(msg) {
      console.error("Error de Share in APP", msg);
    };  
    file = 'https://lh3.googleusercontent.com/vrDJFSHsBbpPACSfYQjU2hW6Q0TBEFv4ZfFlnJ6lq2ivN_mFxwkWSgwuAVa4jXIPbuh0=w1475-h846-rw';
    window.plugins.socialsharing.share((options.message), (options.subject), file, onSuccess, onError);
  },
  showImage({state},[imagen, h, w]){
    let img = [{src: imagen, h:  h || 500, w: w || 600}];
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
        loop: false,
        maxSpreadZoom: 5,
        pinchToClose: false,
        closeEl:true,
        captionEl: false,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: false,
        arrowEl: false,
        preloaderEl: true,
    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, img, options);
    gallery.listen('close', () => {
        this.commit('setClosePreview');
    });
    this.commit('setOpenPreview',gallery);
    gallery.init();
  },
  verImagenes({state},[galeria,index=0]){
    let img = [];
    galeria.forEach( p => {img.push({src: p.src, h:  p.h || 1000, w: p.w || 720})});
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var options = {
        index: index,
        loop: false,
        maxSpreadZoom: 5,
        pinchToClose: false,
        closeEl:true,
        captionEl: false,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: false,
        arrowEl: false,
        preloaderEl: true,
    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, img, options);
    gallery.listen('close', () => {
        this.commit('setClosePreview');
    });
    this.commit('setOpenPreview',gallery);
    gallery.init();
},
};

export default {
    state,
    getters,
    mutations,
    actions
};