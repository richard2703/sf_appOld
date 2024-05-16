<template>
    <f7-page>
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Niveles'"></nav-bar>
            <div class="contenedor-page-tabs">
                <div class="row w-100 m-0 back-color-blanco">
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 px-2 py-3 border-b-gray0-1">
                            <p class="m-0 letra-gray3-18">Solo por unirte a <span class="color-rojo fw-600">SocialFlow</span> eres nivel <span class="back-color-silver color-blanco px-1 border-radius-5px">SILVER</span> y ganaras el 10% de tus compras en puntos.
                            El 10% de tus puntos se convertirán en pesos para que puedas usarlos dentro de <span class="color-rojo fw-600">SocialFlow</span> en el momento que tu quieras. Recuerda que <span class="color-azul fw-600" @click="goTo('/nuevos_amigos')">invitando amigos</span> a <span class="color-rojo fw-600">SocialFlow</span> tambien podras subir tu nivel de usuario.</p>
                        </div>
                        <div class="row w-100 m-0 px-2 py-3 border-b-gray0-1">
                            <p class="m-0 letra-gray3-18">Si cuentas con mas de 3 compras en 1 año pasaras a nivel <span class="back-color-gold color-negro px-1 border-radius-5px">GOLD</span>, ganaras el 10% de tus compras en puntos.
                            El 20% de tus puntos se convertirán en pesos para que puedas usarlos dentro de <span class="color-rojo fw-600">SocialFlow</span> en el momento que tu quieras. Recuerda que <span class="color-azul fw-600" @click="goTo('/nuevos_amigos')">invitando amigos</span> a <span class="color-rojo fw-600">SocialFlow</span> tambien podras subir tu nivel de usuario.</p>
                        </div>
                        <div class="row w-100 m-0 px-2 py-3 border-b-gray0-1">
                            <p class="m-0 letra-gray3-18">Si cuentas con mas de 6 compras en 1 año pasaras a nivel <span class="back-color-platinum color-blanco px-1 border-radius-5px">PLATINUM</span>, ganaras el 10% de tus compras en puntos.
                            El 30% de tus puntos se convertirán en pesos para que puedas usarlos dentro de <span class="color-rojo fw-600">SocialFlow</span> en el momento que tu quieras.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                promos_slider: null,
                categorias_slider: null
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            user(){return this.$store.getters.user;},
            chofer(){return this.$store.getters.chofer;},
        },
        methods:{
            goTo(ruta){
                this.router.navigate(ruta);
            },
        }
    }
</script>