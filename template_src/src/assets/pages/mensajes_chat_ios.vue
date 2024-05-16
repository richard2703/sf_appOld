<template>
    <f7-page id="mensaje_chat">
        <div class="vista" v-vistak>
            <nav-bar tipo="chat"  :backs="true" :title="chat.usuario.nombre" :usuario="chat.usuario" @call="llamar()" @perfil="verPerfil()" />
            <div class="contenedor-page-tabs pb-10px" :id="'mensajes_'+chat.id">
                <template v-for="m of chat.mensajes">
                <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id!=session.id">
                    <div class="p-2 my-2 mr-auto mensaje-usuario">
                        <div class="row m-0 justify-content-rigth">
                            <div class="col p-0 letra-gray-dark2-4-4vw white-space-preline">{{m.mensaje}}</div>
                        </div>
                        <div class="row w-100 px-2 m-0 my-auto pb-1 justify-content-end letra-gray-2-8vw">{{$store.getters.getFechaHora(m.fecha)}}</div>
                    </div>
                </div>
                <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id==session.id">
                    <div class="w-auto p-2 my-2 ml-auto mensaje-propio">
                        <div class="row m-0 justify-content-rigth mb-1">
                            <div class="p-0 pr-2 letra-blanco-4-4vw white-space-preline">{{m.mensaje}}</div>
                        </div>
                        <div class="row px-2 m-0 my-auto py-0 justify-content-end letra-gray-super-light-2-2-8vw">{{$store.getters.getFechaHora(m.fecha)}}</div>
                    </div>
                </div>
                </template>
            </div>
            <div class="row w-100 m-0 py-2 back-color-blanco border-t-app-1">
                <div class="col-9 px-1">
                    <inputForm type="text" placeholder="" v-model="mensaje" :notOffset="true" />
                </div>
                <div class="col-3 my-auto px-1" @click="enviarMensaje()">
                    <div class="row w-100 m-0 letra-app-4-5vw justify-content-center border-radius-5px border-app-1 py-2">Enviar</div>
                </div>
            </div>
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
        created(){
            console.log("TECLADO PARA CHATS IOS");
            Keyboard.shrinkView(true);
        },
        destroyed() {
            console.log("DESACTIVO TECLADO PARA CHATS");
            Keyboard.disableScrollingInShrinkView(false);
            Keyboard.shrinkView(false);
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
                if(!this.mensaje) return;
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
                if(this.chat.usuario.tipo == 'afiliado'){
                    this.router.navigate('/ver_perfil_afiliado');
                }
                else{
                    this.router.navigate('/ver_perfil_usuario');
                }
            }
        }
    }
</script>