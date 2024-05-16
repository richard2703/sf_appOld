<template>
    <f7-page id="mensaje_chat">
        <modalUsuarios :u="grupo.usuarios" />
        <modalMensajeFor
            v-if="open"
            @close="open=false"
            :titulo="null" 
            boton="Borrar conversación"
            @click="borrar()"
        />

        <div class="vista" v-vistak v-chatss >
            <nav-bar 
            tipo="chatgrupo"  
            :backs="true" 
            :title="chat.nombre" 
            :usuario="chat.usuario" 
            :contactos="contactos" 
            @show="verEvento"
            @more="open = 1"
            />
            <div class="contenedor-page-tabs pb-10px" :id="'mensajes_'+grupo.id">
                <template v-for="m of mensajes">
                    <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id!=session.id">
                        <mensajeGrupal :mensaje="m" :grupo="grupo" :e="grupo" />
                    </div>

                    <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id==session.id">
                        <div class="w-auto p-2 my-2 ml-auto mensaje-propio">
                            <div class="row m-0 justify-content-rigth mb-1">
                                <div class="p-0 pr-2 letra-blanco-4-4vw white-space-preline">{{m.mensaje}}</div>
                            </div>
                            <div class="row px-2 m-0 my-auto py-0 justify-content-end letra-gray00-13">{{$store.getters.getFechaHora(m.fecha)}}</div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="row w-100 m-0 py-2 pb-4 pb-ios-5 back-color-gray00 border-t-azul1-1">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 letra-rojo-15 justify-content-center" v-if="$store.getters.emulador">eventos</div>
                    <div class="row w-100 m-0 pb-1 ">
                        <div class="col-9 px-1">
                            <inputForm type="text" placeholder="" v-model="mensaje" :notOffset="true" @enter="enviarMensaje()" />
                        </div>
                        <div class="col-3 my-auto pl-0 pr-1">
                            <botonApp tipo="azul" @click="enviarMensaje()" texto="Enviar" radius="35px" />
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- <div class="row w-100 m-0 back-color-blanco" v-chatk ></div> -->
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                open: 0,
                mensaje:null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            grupo(){return this.$store.getters.userStateFind('misEventos','evento') || {} ; },
            contactos(){return (this.grupo.usuarios || []).filter((x, index)=>{return x.usuarios_id != this.session.id && index < 3});},
            chat(){return this.grupo || {};},
            mensajes(){return this.grupo.mensajes || [];},
        },

        created() {
            if(typeof device != 'undefined' && device.platform == 'iOS'){
                console.log("TECLADO PARA CHATS IOS");
                Keyboard.shrinkView(true);
            }
        },
        destroyed() {
            if(typeof device != 'undefined' && device.platform == 'iOS'){
                console.log("DESACTIVO TECLADO PARA CHATS IOS");
                Keyboard.disableScrollingInShrinkView(false);
                Keyboard.shrinkView(false);
            }
        },
        updated(){
            this.resfreshScroll();
        },
        mounted(){
            console.log("EVENTOS =====>", this.grupo);
            this.resfreshScroll();
        },

        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },

            borrar(){
                this.$store.dispatch('postLeerMsn', [this.chat, 10]);
            },

            verEvento(){
                this.$store.commit('setUsuarioData',['evento', this.grupo.id]);
                this.router.navigate('/detalle_eventos');
            },

            insert(mensaje,grupo_id){
                let insert = {
                    fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
                    id: `chat_${grupo_id}_${_.uniqueId('temp_')}_${moment().format('X')}`,
                    leido: null,
                    eventos_id: grupo_id,
                    mensaje: mensaje,
                    usuarios_id: this.session.id,
                };
                this.mensajes.push(insert);
                console.log("INSETANDO ___");
            },

            enviarMensaje(){
                if(!this.mensaje){
                    return;
                }
                this.insert(this.mensaje, this.grupo.id);
                this.$store.dispatch('postSaveMsnGrupo',[ this.mensaje, this.chat.id ]);
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
                    this.router.navigate('/ver_perfil_afiliado_chat');
                }
                else{
                    this.router.navigate('/ver_perfil_usuario');
                }
            }
        }
    }
</script>