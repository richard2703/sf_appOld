<template>
<div class="row m-0 w-100 pt-8px justify-content-space-between border-t-gray01-1 back-color-blanco" >
    <div class="row w-100 m-0 pb-3 pb-ios-20px " >

        <div class="row w-100 m-0" v-if="user">

            <div class="col p-0 h-100" @click="goTo('/inicio')">
                <div class="row w-100 m-0 position-absolute left-0px top--7px z-10 justify-content-center" v-if="0">
                    <div class="w-65px h-65px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='inicio'"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <div class="w-35px mx-auto">
                            <imagen :icono="1" :src="tabVisible=='inicio'?'hhr':'hhg'" />
                        </div>
                        <!-- <icono icono="home" :clase="(tabVisible=='inicio')?'letra-blanco-30':'letra-negro-30'" /> -->
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='inicio')?'letra-gray4-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 h-40px align-content-center text-center justify-content-center w-100"  >Inicio</div>
                    </div>
                </div>
            </div>
            
            <div class="col p-0 h-100" @click="goTo('/eventos')">
                <div class="row w-100 m-0 position-absolute left-0px top--7px z-10 justify-content-center" v-if="0">
                    <div class="w-65px h-65px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='eventos'"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <div class="w-30px mx-auto">
                            <imagen :icono="1" :src="tabVisible=='eventos'?'ta1':'tt1'" />
                        </div>
                        <!-- <icono icono="home" :clase="(tabVisible=='eventos')?'letra-blanco-30':'letra-negro-30'" /> -->
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='eventos')?'letra-gray4-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 pt-2 h-40px align-content-center text-center justify-content-center w-100"  >Eventos</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/regalos')">
                <div v-if="0" class="row w-100 m-0 position-absolute left-0px top--7px z-10 justify-content-center">
                    <div class="w-65px h-65px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='regalos'"></div>
                </div>
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="w-30px mx-auto">
                        <imagen :icono="1" :src="tabVisible=='regalos'?'ta22':'t2'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='regalos')?'letra-gray4-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 h-40px align-content-center pt-2 text-capitalize text-center justify-content-center w-100"  >Productos & Experiencias</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/carrito')">
                <div v-if="0" class="row w-100 m-0 position-absolute left-0px top--7px z-10 justify-content-center">
                    <div class="w-65px h-65px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='carrito'"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="w-35px mx-auto">
                        <imagen :icono="1" :src="tabVisible=='carrito'?'ta33':'car'" />
                    </div>
                    <div class="row w-100 m-0 pt-2px justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='carrito')?'letra-gray4-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 h-40px align-content-center pt-2 text-capitalize text-center justify-content-center w-100"  >Carrito</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/mis_deseos')">
                <div v-if="0" class="row w-100 m-0 position-absolute left-0px top--7px z-10 justify-content-center">
                    <div class="w-65px h-65px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='mis_deseos'"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="w-35px mx-auto">
                        <imagen :icono="1" :src="tabVisible=='mis_deseos'?'ta44':'t4'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='mis_deseos')?'letra-gray4-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 h-40px align-content-center pt-1 text-capitalize text-center justify-content-center w-100"  >Wishlist</div>
                    </div>
                </div>
            </div>

            <div v-if="0" class="col p-0 h-100" @click="goTo('/historial_puntos')">
                <div v-if="0" class="row w-100 m-0 position-absolute left-0px top--7px z-10 justify-content-center">
                    <div class="w-65px h-65px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='mis_deseos'"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="w-35px mx-auto">
                        <imagen :icono="1" :src="tabVisible=='mis_deseos'?'ta5':'t5'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='mis_deseos')?'letra-gray4-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 h-40px align-content-center pt-1 text-capitalize text-center justify-content-center w-100" >Monedero</div>
                    </div>
                </div>
            </div>


        </div>
    
    </div>
</div>  
</template>
<script>
export default {
    data(){
        return {
            active: 'inicio',
            onlyIcon: false,
        }
    },
    props: [
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        user(){return this.$store.getters.user || !this.session.token;},

        rutaVisible(){
            switch(this.$store.getters.getRuta.url){
                case '/mensajes_chat': return false;
                default: return true;
            }
        },

        tabVisible(){
            // console.log("RUTAAS 123", this.$store.getters.getRuta.url);
            switch(this.$store.getters.getRuta.url){
                case '/inicio': 
                    this.active = 'inicio';
                    break;
                case '/eventos': 
                case '/nuevo_evento_calendario': 
                case '/regalos_eventos': 
                case '/seleciconar_wishlist_reunion': 
                this.active = 'eventos';
                break;
                case '/regalos': 
                    this.active = 'regalos';
                    break;
                case '/chats': 
                    this.active = 'chats';
                    break;
                case '/carrito': 
                    this.active = 'carrito';
                    break;
                case '/mis_deseos': 
                    this.active = 'mis_deseos';
                    break;
                case '/historial_puntos': 
                    this.active = 'mis_deseos';
                    break;
                case '/mi_cuenta': 
                    this.active = 'mi_cuenta';
                    break;
            }
            return this.active;
        },

        data(){return this.$store.getters.carritoObject('desgloce') || {};},
        productos(){return this.data.carrito || [];},
    },

    created(){
        // console.log("UISER", this.user);
    },

    methods:{
        goTo(ruta){

            if(ruta == '/chats' || ruta == '/mi_cuenta'){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }
            }
            else if(this.active == 'carrito'){
                if(ruta != '/carrito'){
                    if(this.productos && this.productos.length){
                        this.$emit('open', ruta);
                        return;
                    }
                }
            }

            this.router.navigate(ruta, {reloadCurrent: true});
            this.$store.dispatch('synchronizeData');
        },
    },
    }
</script>