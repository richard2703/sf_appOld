import Vue from 'vue';
const moment = require('moment');

Vue.directive('vistak',{
    bind: (el,bindign, vnode) => {
        // console.log("device KVIUSTA", device.platform);
        if(typeof device != 'undefined' && device.platform == 'Android'){
            window.addEventListener('keyboardWillShow', (event) => {
                // console.log("TECLADO SHOW BEBE show", event.keyboardHeight);
                el.style.paddingBottom = (event.keyboardHeight+ 20 ) + 'px' ;
            });
            window.addEventListener('keyboardWillHide', function (event) {
                // console.log("TECLADO HIDE BEBE", event.keyboardHeight);
                el.style.paddingBottom = '0px';
            });
        }
    }
});

Vue.directive('chatss',{
    bind: (el,bindign, vnode) => {
        if(typeof device != 'undefined' && device.platform == 'iOS'){
            window.addEventListener('keyboardDidShow', (event) => {
                console.log("Window scroll ----- ", event.keyboardHeight);
                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                    Keyboard.disableScrollingInShrinkView(true);
            });
            window.addEventListener('keyboardWillShow', (event) => {
                    console.log("scroll will --- entra", event.keyboardHeight);
                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
            });
          
        }
    }
});