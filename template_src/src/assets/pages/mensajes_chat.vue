<template>
    <f7-page>
        <modalUsuario :usuario="chat.usuario" />
        <modalMensajeFor
            v-if="open"
            @close="open=false"
            :titulo="null" 
            boton="Borrar conversación"
            @click="borrar()"
        />

        <div class="vista" v-vistak v-chatss >
            <nav-bar tipo="chat" 
                :backs="true" 
                :title="chat.usuario.nombre" 
                :usuario="chat.usuario" 
                @more="open = 1" 
                @call="llamar()" 
                @perfil="verPerfil()" 
                :show="chat.usuario.tipo == 'usuario'" 
            />
            <div class="contenedor-page-tabs pb-10px" :id="'mensajes_'+chat.id">
                <template v-for="m of chat.mensajes">
                    <div class="row w-100 m-0" :key="m.id" >
                        <msnComponent :data="m" />
                    </div>
                </template>
            </div>
            <div class="row w-100 m-0 py-2 pb-ios-5 back-color-blanco border-t-appve-1">
                <div class="row w-100 m-0 letra-rojo-15 justify-content-center" v-if="$store.getters.emulador">CHAT PERSONAL</div>
                <div class="row w-100 m-0 pb-3">
                    <div class="col-9 px-1">
                        <inputForm type="text" placeholder="" v-model="mensaje" :notOffset="true" @enter="enviarMensaje()" />
                    </div>
                    <div class="col-3 my-auto pl-0 pr-1">
                        <botonApp tipo="azul" @click="enviarMensaje()" texto="Enviar" radius="35px" />
                    </div>
                </div>
            </div>
            <!-- <div class="row w-100 m-0 back-color-blanco" v-chatk ></div> -->
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                open:0,
                mensajes:[{user:1, mensaje: '1'}],
                mensaje:null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            chat(){return this.$store.getters.getChat || {};},
            // usuario_bloqueado(){return this.$store.getters.getUsuarioBloqueado(this.chat.usuario.id)},
            // bloqueo_usuario(){return this.$store.getters.getBloqueoUsuario(this.chat.usuario.id)},
        },
        created() {
            if(device.platform == 'iOS'){
                console.log("TECLADO PARA CHATS IOS");
                Keyboard.shrinkView(true);
                // console.log("VOY NAVEGAMTO TO IOS", this.router);
                // this.router.navigate('/mensajes_chat_ios',{reloadCurrent: true});
            }
        },
        destroyed() {
            if(device.platform == 'iOS'){
                console.log("DESACTIVO TECLADO PARA CHATS IOS");
                Keyboard.disableScrollingInShrinkView(false);
                Keyboard.shrinkView(false);
            }
        },
        updated(){
            if(!this.chat.id){
                if(this.esAfiliado){
                    this.router.back('/inicio_afiliado');
                    return;
                }
                this.router.back('/incio');
                return;
            }
            this.resfreshScroll();
        },
        mounted(){
            this.resfreshScroll();
        },
        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },
            enviarMensaje(){
                if(!this.mensaje){
                    return;
                }
                this.$store.dispatch('postSaveMsn',[this.mensaje]);
                this.mensaje = null;
            },
            scroll(){
                $('#mensajes_'+this.chat.id).scrollTop($('#mensajes_'+this.chat.id)[0].scrollHeight);
            },
            resfreshScroll(){
                setTimeout(this.scroll, 300);
            },
            modalBloquearUsuario(bloqueado){
                this.bloqueado = bloqueado;
                this.$store.commit('openModal', ['modal_mensaje']);
            },
            bloquearUsuario(){
                this.$store.dispatch('postBloquearUsuario',[this.chat.usuario.id]);
            },
            llamar(){
                this.$store.dispatch('openBrowser',`tel:${this.chat.usuario.telefono}`)
            },
            verPerfil(){
                this.$store.commit('openModal',['modalUsuario']);
            },
            borrar(){
                this.$store.dispatch('postLeerMsn', [this.chat, 5]);
            },
        }
    }
</script>