<template>
<div class="nav-bar-component template w-100 pt-3px back-color-blanco pt-ios-20px " @click="$store.dispatch('synchronizeData')" >

    <template v-if="tipo=='init'">
    
        <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-gray0-1'}`">
            
            <div class="col my-auto px-0 pl-3 text-left" @click="$store.dispatch('synchronizeData')">
                <div class="w-100 pb-5px" v-if="logo">
                    <imagen :logo="3" :fit="true" />
                </div>
            </div>

            <div class="w-auto pl-5px pr-2px boton-carrito h-100 position-relative" @click="router.navigate('/amigos')">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 pl-2px pr-0px"  >
                    <div class="w-30px mx-auto">
                        <imagen :icono="1" src="fri" />
                    </div>
                </button>
                <div class="w-20px h-20px back-color-rojo border-radius-50 position-absolute top--6px right--5px" v-if="solicitudes">
                    <div class="row w-100 m-0 letra-blanco-13 justify-content-center text-center fw-600">{{solicitudes>12?solicitudes:solicitudes}}</div>
                </div>
            </div>

            <div class="w-auto px-5px boton-carrito h-100 position-relative" @click="router.navigate('/notificaciones')" >
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px text-center "  >
                    <div class="w-20px mx-auto">
                        <imagen :icono="1" src="notix" />
                    </div>
                </button>
                <div class="w-20px h-20px back-color-rojo border-radius-50 position-absolute top--6px right--2px" v-if="notificacionesTotal">
                    <div class="row w-100 m-0 letra-blanco-13 justify-content-center text-center fw-600">{{notificacionesTotal>12?notificacionesTotal:notificacionesTotal}}</div>
                </div>
            </div>

            <div class="w-auto px-5px boton-carrito h-100 position-relative" @click="router.navigate('/chats')" >
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px"  >
                    <div class="w-20px mx-auto">
                        <imagen :icono="1" src="chatx" />
                    </div>
                </button>
                <div class="w-20px h-20px back-color-rojo border-radius-50 position-absolute top--6px right--2px" v-if="mensajeNuevo">
                    <div class="row w-100 m-0 letra-blanco-13 justify-content-center text-center fw-600">{{mensajeNuevo>12?mensajeNuevo:mensajeNuevo}}</div>
                </div>
            </div>
            
           

            <div class="col-auto px-1 boton-carrito h-100 position-relative" v-if="profile" @click="router.navigate('/mi_cuenta')">
                <div class="w-119px">
                    <div class="row w-100 m-0 border-radius-30px" :class="`back-${session.nivel}`" >
                        <div class="col my-auto pb-3px px-0 letra-blanca-14 fw-600 justify-content-center text-center text-capitalize ">{{session.nivel}}</div>
                        <div class="w-38px h-38px ml-auto">
                            <imagen clase="border-radius-50" :fit="true" :perfil="true" />
                        </div>
                    </div>
                </div>
            </div>


            <div class="w-10 boton-carrito h-100"  v-if="right" >
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-0" @click="$emit('right')" v-if="icon">
                    <imagen :icono="true" src="scan_blanco" v-if="!icon"/>
                    <i class="material-icons letra-gray-7-5vw" v-else>{{icon}}</i>
                </button>
            </div>

        </div>
    </template>

    <template v-if="tipo=='init2'">
        <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-gray0-1'}`">
            
            <div class="col my-auto px-0 pl-1 text-left">
                <div class="w-85 pb-5px" v-if="logo">
                    <imagen :logo="3" :fit="true" />
                </div>
            </div>

            <div class="w-10 boton-carrito h-100 position-relative">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="router.navigate('/notificaciones')" >
                    <i class="material-icons letra-gray-7-5vw" >notifications</i>
                </button>
                <div class="w-22px h-22px back-color-rojo border-radius-50 position-absolute top--6px right--2px" v-if="notificacionesTotal">
                    <div class="row w-100 m-0 pt-1px letra-blanco-13 justify-content-center text-center fw-600">{{notificacionesTotal>12?notificacionesTotal:notificacionesTotal}}</div>
                </div>
            </div>

            <div class="w-10 boton-carrito h-100 position-relative">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="router.navigate('/chats')" >
                    <i class="material-icons letra-gray-7-5vw" >chat</i>
                </button>
                <div class="w-14px h-14px back-color-rojo position-absolute right-0px top-0px border-radius-50" v-if="mensajeNuevo" ></div>
            </div>

            <div class="col-auto px-1 boton-carrito h-100 position-relative" v-if="profile" @click="router.navigate('/mi_cuenta')">
                <div class="w-38px h-38px">
                    <imagen clase="border-radius-50" :fit="true" :perfil="true" />
                </div>
            </div>

            <!-- <div class="col-auto px-1 boton-carrito h-100 position-relative" @click="router.navigate('/mis_deseos')">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-0px"  >
                    <i class="material-icons letra-gray-7-5vw" >playlist_play</i>
                </button>
            </div> -->

            <div class="w-9 boton-carrito h-100"  v-if="right" >
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-0" @click="$emit('right')" v-if="icon">
                    <imagen :icono="true" src="scan_blanco" v-if="!icon"/>
                    <i class="material-icons letra-gray-7-5vw" v-else>{{icon}}</i>
                </button>
            </div>

        </div>
    </template>

<template v-if="tipo=='inicio'">
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-gray0-1'}`">
        <div class="w-12 boton-menu p-0" v-if="right || backs || emitBack">
            <template v-if="backs">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="back()">
                    <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
                </button>
            </template>
            <template v-else-if="emitBack">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="$emit('back_click')">
                    <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
                </button>
            </template>
        </div>
        <div class="w-12 boton-menu p-0" v-if="chat">
        </div>

        <div class="w-35vw my-auto px-0 pl-3 text-left" >
            <div class="w-100 pb-5px" v-if="imagen">
                <imagen :logo="3" :fit="true" />
            </div>
        </div>

        <div class="col my-auto text-center title p-0">
            <div class="w-74 mx-auto" v-if="logo">
                <imagen :logo="3" :fit="true" />
            </div>
            <p class="m-0 letra-gray-4-8vw my-auto pb-5px" v-else >{{title}}</p>
        </div>

        <div class="w-12 boton-carrito h-100 position-relative" v-if="chat">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="router.navigate('/chats')" >
                <i class="material-icons letra-gray-7-5vw" >chat</i>
            </button>
            <div class="w-14px h-14px back-color-rojo position-absolute right-0px top-0px border-radius-50" v-if="mensajeNuevo" ></div>
        </div>

        <div class="col-auto px-1 boton-carrito h-100 position-relative" v-if="profile" @click="router.navigate('/mi_cuenta')">
            <div class="w-45px h-45px">
                <imagen clase="border-radius-50" :fit="true" :perfil="true" />
            </div>
        </div>

        <div class="w-12 boton-carrito h-100"  v-if="right || (backs || emitBack)" >
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="$emit('right')" v-if="icon">
                <imagen :icono="true" src="scan_blanco" v-if="!icon"/>
                <i class="material-icons letra-gray-7-5vw" v-else>{{icon}}</i>
            </button>
        </div>
    </div>
</template>

<template v-if="tipo=='menuRigth'">
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-gray0-1'}`">
        <div class="w-12 boton-menu p-0" >
            <template v-if="backs">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="back()">
                    <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
                </button>
            </template>
            <template v-else-if="emitBack">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="$emit('back_click')">
                    <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
                </button>
            </template>
        </div>
        <div class="w-12 boton-carrito h-100" >
          
        </div>
        <div class="col text-center title p-0px pl-30px">
            <div class="w-80px mx-auto">
                <imagen :logo="true" />
            </div>
            <!-- <p class="m-0 letra-gray-4-8vw my-auto">{{title}}</p> -->
        </div>
        <div class="w-12 boton-carrito h-100" @click="$store.dispatch('postGetCuentasSucursal');">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px">
                <i class="material-icons letra-verde3-7-5vw" >cached</i>
            </button>
        </div>
        <div class="w-12 boton-carrito h-100" @click="goTo('/notificaciones')">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" >
                <i class="material-icons letra-amar2-7-5vw" >notifications</i>
            </button>
        </div>
        <div class="w-12 boton-carrito h-100" @click="openRightMenu()">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" >
                <i class="material-icons letra-gray-7-5vw" >menu</i>
            </button>
        </div>
    </div>
</template>

<template v-if="tipo=='menu'">        
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-gray0-1'}`">
        <div class="w-12 boton-menu p-0" >
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="openMenu()">
                <i class="f7-icons color-white letra-gray-5-5vw">menu</i>
            </button>
        </div>
        <div class="col my-auto p-0">
            <div class="w-25 mx-auto" >
                <!-- <imagen :logo="true" /> -->
            </div> 
        </div>
        <div class="w-12 boton-menu p-0" @click="$store.dispatch('synchronizeDataCallback')">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px">
                <i class="material-icons color-white letra-gray-7-5vw">cached</i>
            </button>
        </div>
    </div>
</template>

<template v-if="tipo=='normal'">        
    <div class="row m-0 justify-content-space-between px-3px nav-bar nav-inicio" :class="`${no_border?'':'border-b-gray0-1'}`">
        <div class="w-12 boton-menu p-0" >
            <template v-if="backs">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="back()">
                    <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
                </button>
            </template>
            <template v-else-if="emitBack">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="$emit('back_click')">
                    <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
                </button>
            </template>
        </div>
        <div class="col-6 text-center title p-0">
            <p class="m-0 letra-gray-4-8vw my-auto">{{title}}</p>
        </div>
        <div class="w-10 boton-carrito h-100">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="$emit('rigth_click')" v-if="rigth">
                <i class="material-icons color-white letra-gray-7-5vw">person_outline</i>
            </button>
        </div>
    </div>
</template>

<template v-if="tipo=='chat'">        
    <div class="row w-100 m-0 justify-content-space-between px-3px nav-bar nav-inicio border-b-gray0-1">
        <div class="col-2 boton-menu p-0" v-if="backs">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="back()">
                <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
            </button>
        </div>
       <div class="col text-center title p-0">
            <p class="m-0 letra-gray-4-1vw my-auto">{{title}}</p>
        </div>
        <div class="col-2 boton-carrito h-100 pl-1" >
            <div class="row w-12vw h-12vw m-0 mx-auto my-auto p-5px" @click="$emit('perfil')">
                <imagen clase="w-100 h-100 border-radius-50 " :user="true" :src="usuario.foto"  />
            </div>
        </div>
        <div class="w-10 h-100" @click="$emit('more')">
            <div class="row w-100 h-100 m-0 py-14px px-2px ">
                <icono clase="letra-gray3-30" icono="more_vert" />
            </div>
        </div>
    </div>
</template>

<template v-if="tipo=='chatgrupo'">        
    <div class="row w-100 m-0 justify-content-space-between px-3px nav-bar nav-inicio border-b-gray1-1">
        <div class="col-2 boton-menu p-0" v-if="backs">
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="back()">
                <i class="f7-icons color-white letra-gray-5-5vw">chevron_left</i>
            </button>
        </div>
       <div class="col text-center title p-0" @click="$emit('show')" >
            <p class="m-0 letra-gray-4-1vw my-auto">{{title}}</p>
        </div>
        <div class="col-auto px-0 pr-2 my-auto" @click="$store.commit('openModal',['modalUsuarios'])" >
            <div class="row w-100 m-0 my-auto pt-1">
                <div class="w-37px h-37px border-radius-50 overflow-hidden" v-for="u of contactos" :key="u.id" >
                    <imagen clase="object-fit" :user="true" :src="u.usuario.foto" />
                </div>
            </div>
        </div>

        <div class="w-10 h-100" @click="$emit('more')">
            <div class="row w-100 h-100 m-0 py-14px px-2px ">
                <icono clase="letra-gray3-30" icono="more_vert" />
            </div>
        </div>
    </div>
</template>

<template v-if="tipo=='img'">        
    <div class="row w-100 h-100 m-0 justify-content-space-between position-relative" :class="`${no_border?'':'border-b-gray0-1'}`">
        <div class="row w-100 m-0">
            <imagen :src="imagen" />
        </div>
        <div class="row w-100 m-0 position-absolute bottom-10px left-0px z-90" >
            <div class="row w-100 m-0 letra-blanco-8-5vw fw-800" :class="`justify-content-${orientacion}`">{{texto}}</div>
        </div>
        <div class="row w-100 m-0 pt-3 position-absolute top-0px left-0px">
        <div class="w-12 boton-menu p-0 pt-2" >
            <template v-if="backs">
                <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="back()">
                    <i class="f7-icons letra-blanco-5-5vw">chevron_left</i>
                </button>
            </template>
            <template v-else-if="emitBack">
                <button type="button" class="button button-outline button-raised button-active-blanco h-100 p-2px" @click="$emit('back_click')">
                    <i class="f7-icons letra-blanco-5-5vw">chevron_left</i>
                </button>
            </template>
        </div>
        <div class="col text-center title p-0">
            <p class="m-0 letra-gray-4-8vw my-auto">{{title}}</p>
        </div>
        <div class="w-12 boton-carrito h-100" >
            <button type="button" class="button button-outline button-raised button-active-gray h-100 p-2px" @click="$emit('right')" v-if="right">
                <i class="material-icons letra-gray-7-5vw">{{icon}}</i>
            </button>
        </div>
        </div>
    </div>
</template>
</div>
</template>
<script>
// import velocity from 'velocity-animate'
    export default {
        props: [
            'ios', 
            'tipo', 
            'routerView',
            'title', 
            'logo', 
            'texto', 
            'chat',
            'profile',
            'orientacion', 
            'backs', 
            'bloqueado',
            'emitBack', 
            'no_border', 
            'add',
            'right', 
            'icon',
            'show',
            'imagen',
            'usuario',
            'mesa',
            'contactos',
        ],
        data(){
            return {
            }
        },
        computed:{
            router(){
                if(!this.routerView) return this.$store.getters.getRouter;
                else return this.routerView;
            },
            session(){return this.$store.getters.getSession;},
            isUsuario(){return this.$store.getters.esUsuario;},
            cuenta(){return this.$store.getters.getCuenta;},
            mensajeNuevo(){
                // return this.$store.getters.mensajeNuevo + this.$store.getters.userStateObject('invitacionesSinLeer') + this.$store.getters.userStateObject('eventosSinLeer');},
                return this.$store.getters.mensajeNuevo;
            },
            notificacionesTotal(){return this.$store.getters.catalogoGetObject('notificacionesTotal');},
            solicitudes(){return this.$store.getters.userStateArray('amigos').filter(x=>{ return x.estatus == 'enviado' && x.amigos_id == this.session.id } ).length; },

        },
        methods:{
            back(){this.router.back();},
            goTo(ruta){
                this.router.navigate(ruta);
            },
            openMenu(){
                this.$store.dispatch('synchronizeData');
                this.$store.commit('openMenu');
            },
            openRightMenu(){
                this.$store.dispatch('synchronizeData');
                this.$store.commit('openMenuRight');
            }
        },
    }
</script>