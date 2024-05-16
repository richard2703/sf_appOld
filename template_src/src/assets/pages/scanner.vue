<template>
    <f7-page class="scanner" :class="{'transparent': status.active, 'back-color-blanco': !(status.active)}"> 
        <nav-bar tipo="inicio" :back="false" :emitBack="true" :title="'Escaner'" @back_click="cerrarEscaner()" />  
            <transition name="custom-classes-transition"
            enter-active-class="animated zoomIn fast"
            leave-active-class="animated zoomOut faster">
            <div class="row m-0 w-100 row-opciones pb-3" v-if="!status.active">
                <div class="row w-100 m-0 justify-content-center" >
                    <div class="col-6 p-0 text-center">
                        <boton-app @click="initEscaner" texto="Iniciar" radius="20px"></boton-app>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="custom-classes-transition"
        enter-active-class="animated zoomIn fast"
        leave-active-class="animated zoomOut faster">
            <div class="row m-0 w-100 row-opciones" v-if="status.active">
                <div class="row w-100 m-0 justify-content-center" >
                    <div class="col-8 mt-2 p-0 text-center" v-if="debug">
                        <!-- <botonApp @click="scanComplete('d5cd7aa211')" texto="Probar" radius="20px" /> -->
                        <botonApp @click="scanComplete('6762553ec0')" texto="Probar" radius="20px" />
                    </div>
                    <div class="col-8 mt-2 p-0 text-center">
                        <boton-app @click="scan()" texto="Escanear" radius="20px"></boton-app>
                    </div>
                    <div class="col-8 mt-2 p-0 pb-5 text-center">
                        <botonApp @click="cerrarEscaner()" tipo="gris" texto="Salir" radius="20px" />
                    </div>
                </div>
            </div>
        </transition>
    </f7-page>
</template>

<script>
    import {
        f7Page,
    } from 'framework7-vue';
    export default {
        components: {
            f7Page,
        },
        data(){
            return {
            }
        },  
        computed: {
            status(){return this.$store.getters.scanStatus;},
            debug(){return this.$store.getters.deviceready == false; },
        },  
        methods: {            
            goTo(ruta) {
                this.router.navigate(ruta)
            }, 
            initEscaner(){
                this.$store.commit('openEscaner');
            },
            scan(){
                this.$store.commit('scan');
            },
            enableLight(){
                this.$store.commit('enableLight');
            },
            cerrarEscaner(){
                this.$store.commit('cerrarEscaner');
            },
            cancelEscaner(){
                this.$store.commit('cancelEscaner');
            },
            scanComplete(texto){
                this.$store.commit('scanComplete',texto);
            }
        },           
    };

    
</script>


