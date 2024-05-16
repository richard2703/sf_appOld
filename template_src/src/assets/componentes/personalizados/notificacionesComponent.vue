<template>
<div class="row w-100 m-0" :class="show?'back-color-gray001':''" v-if="ver">

    <modalMensajeFor 
        v-if="state"
        :titulo="titulo"
        :texto="text"
        oneButton="Aceptar"
        boton="Aceptar"
        @close="state = false"
    />

    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1 " v-if="f.tipo=='2'" @click="set(f.data)">
        <div class="row w-100 m-0 overflow-hidden" > 
            <!-- <div class="row w-100 m-0 position-relative">
                <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px text-capitalize">{{f.data.evento.tipo}}</div>
                </div>
            </div> -->

            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.evento.tipo == 'party'" >Esta solicitando cooperar para el {{f.data.evento.type}} {{f.data.evento.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.evento.tipo == 'reunion'" >Esta solicitando cooperar para la {{f.data.evento.type}} {{f.data.evento.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-13">El {{[f.data.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='s'" @click="setS(f)" >
        <div class="row w-100 m-0 px-2 py-2">
            <div class="row w-100 m-0 overflow-hidden border-radius-20px ">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.amigos_id == session.id">Te envio solicitud de amistad</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.usuarios_id == session.id">Acepto tu solicitud de amistad</div>
                        <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.modificado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='3'" @click="setF(f)" >
        <div class="row w-100 m-0 px-2 py-2">
            <div class="row w-100 m-0 overflow-hidden border-radius-20px ">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} agrego la fecha {{f.data.nombre}}</div>
                        <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='historialcompras'" @click="seth(f)" >
        <div class="row w-100 m-0 px-2 py-2">
            <div class="row w-100 m-0 overflow-hidden border-radius-20px ">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :perfil="1" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">Pedido #{{f.data.id}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">Realizaste una compra</div>
                        <div class="row w-100 m-0 letra-azul1-13">creada {{[f.data.created, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='4'" @click="set(f.data)" >
        <div class="row w-100 m-0 border-radius-20px overflow-hidden  " >
            <!-- <div class="row w-100 m-0 position-relative">
                <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px text-capitalize">{{f.data.evento.tipo}}</div>
                </div>
            </div> -->

            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} te invito a su {{f.data.evento.type}}</div>
                    <div class="row w-100 m-0 letra-gray3-13">{{f.data.evento.nombre}} el {{[f.data.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>
        </div>
    </div>


    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='5'" @click="verDeseosLista(f.data)" >
        <div class="row w-100 m-0">
            <div class="row w-100 m-0 position-relative">
                <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Wishlist</div>
                </div> -->
            </div>
            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">Agrego una nueva wishlist: {{f.data.nombre}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='7'" @click="verRegalo(f.data)" >
        <div class="row w-100 m-0 px-3 py-2">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} te hizo un regalo</div>
                        <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Regalo</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='8'" @click="showM(f.data.msg, f.data.body); insert(f.data.id)">
        <div class="row w-100 m-0">
            <div class="row w-100 m-0 position-relative">
                <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Wishlist</div>
                </div> -->
            </div>
            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="session.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.data.msg}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{f.data.body}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='9'" @click="post(f.data.id)" >
        <div class="row w-100 m-0 px-3 py-2">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} te etiqueto en un post</div>
                        <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Regalo</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>


    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='10'" @click="verEvento(f.data)" >
        <div class="row w-100 m-0 px-3 py-2">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="f.data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.evento.tipo == 'reunion'">{{f.data.usuario.nombre}} rechazo la invitacion a la reunion {{f.data.evento.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-else >{{f.data.usuario.nombre}} rechazo la invitacion al regalo grupal {{f.data.evento.nombre}}</div>
                        <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Regalo</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>

const lx = 'idsNotiStorage';
export default {
    props:[
       'data',
       'tab',
    ],
    data(){
        return {
            info:{},
            detalles: false,
            titulo: false,
            text: false,
            state: false,
            // ids: JSON.parse((localStorage.getItem(lx))) || [],
        };
    },
    computed:{
        session(){return this.$store.getters.getSession;},
        router(){return this.$store.getters.getRouter;},
        f(){return this.data || {}},
        prelecturas(){return this.$store.getters.getCatalogo('notificacionesPreLeidas') },
        preLec(){return this.prelecturas.includes(this.f.data.id) || this.prelecturas.includes(this.f.data.creado) },


        ids(){return this.$store.getters.getCatalogo('notificacionesLeidas') },
        show(){return !( this.ids.includes(this.f.data.id) || this.ids.includes(this.f.data.creado) ) },
        ver(){
            return true;

            if(this.tab == 1){
                if(this.show){
                    return true;
                }
            }
            if(this.tab == 2){
                if(!this.show){
                    return true;
                }
            }
            return false;
        }
    },

    mounted(){
        console.log("LEYENDO noti", this.preLec);
        if(!this.preLec){
            this.preleer(1);
        }
    },
    
    methods:{

        showM(t, m){
            this.titulo = t;
            this.text = m;
            this.state = true;
        },

        verEvento(e){
            this.insert(e.id);
            
            this.$store.commit('setUsuarioData',['evento', e.eventos_id]);
            this.$store.commit('openModal', ['modalEventoCreador']);
            // this.router.navigate('/detalle_eventos');
        },

        post(){
            this.$emit('input',this.f.data);
            this.$emit('ver');
            this.insert(this.f.data.id);
        },

        insert(id){
            let d = {
                id: this.f.data.id,
                creado: this.f.data.creado,
            };
            if(this.show){
                this.$store.dispatch('postLeerNotification',[this.f.data.id, this.f.data.creado]);
            }
        },
        
        preleer(id){
            let d = {
                id: this.f.data.id,
                creado: this.f.data.creado,
            };
            this.$store.dispatch('postLeerNotification',[this.f.data.id, this.f.data.creado, 1]);
        },

        insert2(id){
            console.log("DESERTINF", this.ids);
            this.ids = JSON.parse((localStorage.getItem(lx))) || [];
            this.ids.push(this.f.data.id);
            this.ids.push(this.f.data.creado);
            // console.log("INSERTING", this.ids.length, this.ids);
            this.$store.commit('updateCatalogosState', ['notificacionesLeidas', {a:this.ids} ]);
            localStorage.setItem(lx, JSON.stringify(this.ids));
        },

        verRegalo(e){
            this.info = e;
            this.$emit('info',e);
            this.$store.commit('openModal',['modalRegalo']);
            this.insert(e.id);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', e.id]);
        },

        set(f){
            this.info = f;
            this.$emit('info',f);
            this.$store.commit('openModal', ['modalParty']);
            this.insert(f.id);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.id]);
        },

        seth(f){
            this.info = f;
            this.$emit('info',f);
            this.insert(f.id);
            this.router.navigate('/historial_compras');
        },

        setS(f){
            this.$emit('info',f);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.data.id]);
            this.insert(f.data.id);
            this.router.navigate('/amigos');
        },

        setF(f){
            this.info = f;
            this.$emit('info',f);
            this.$store.commit('openModal', ['modalFechaUsuario']);
            this.insert(f.data.id);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.data.id]);
            
        },

        verDeseosLista(e){
            this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
            this.$store.commit('setUsuarioData', ['detalle',e.id]);
            this.router.navigate('/deseos_amigo');
            this.insert(e.id);
        },
    },
}
</script>