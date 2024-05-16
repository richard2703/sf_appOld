<template>
    <f7-page class="" id="inicio">
        <modalParty v-if="info" :data="info" />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :logo="true" :chat="true" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 letra-gray4-20 px-3 py-3">What´s flowing on</div>

                <div class="row w-100 m-0 px-3 pt-3" v-if="!amigos || !amigos.length ">
                    <div class="row w-100 m-0 px-3 letra-gray4-22 justify-content-center text-center ">Aún no tienes amigos, invita y crea una comunidad</div>
                </div>

                <div class="row w-100 m-0">

                <div class="row w-100 m-0 px-3 py-3" v-for=" f of eventos " :key="`mine_${f.id}`" @click="set(f)">
                    <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 h-15vh" v-if="f.imagen">
                                <imagen clase="" :create="true" :src="f.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-15vh" v-else>
                                <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">Creaste el evento</div>
                                <div class="row w-100 m-0 letra-gray3-13">{{f.nombre}} el {{[f.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                  <div class="row w-100 m-0 px-3 py-3" v-for=" f of cobros " :key="`w_${f.id}`" @click="set(f)">
                    <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 h-15vh" v-if="f.evento.imagen">
                                <imagen clase="" :create="true" :src="f.evento.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-15vh" v-else>
                                <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">Esta solicitando coopera para el evento {{f.evento.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-13">El {{[f.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 py-1">
                                        <div class="col px-0 letra-gray3-18">Total</div>
                                        <div class="col-auto px-0 letra-azul1-20">{{f.cobro.total | currency}}</div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 forfor" v-for="f of fechasAmigos" :key="`q_${f.id}`" >
                    <div class="row w-100 m-0 px-3 py-2">
                        <div class="row w-100 m-0 carta border-radius-20px back-color-fondo">
                            <div class="row w-100 m-0 px-3 py-2">
                                <div class="w-20vw h-20vw my-auto">
                                    <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-gray4-17">{{f.usuario.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15">{{f.usuario.nombre}} agrego el evento {{f.nombre}}</div>
                                    <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 py-2">
                                <div class="col pl-3 pr-0">
                                    <div class="row w-100 m-0 letra-gray4-17">{{f.nombre}}</div>
                                    <div class="row w-100 m-0 pr-3">
                                        <div class="col px-0 letra-gray3-17 text-capitalize">{{[f.fecha, 'YYYY-MM-DD'] | moment('DD/MMMM/YYYY')}}</div>
                                        <div class="col-auto px-0 letra-azul1-17" @click="verDeseos(f)">Ver wishlists</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row w-100 m-0 px-3 py-3" v-for=" f of invitaciones " :key="`wx_${f.id}`" @click="set(f)">
                    <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 h-15vh" v-if="f.evento.imagen">
                                <imagen clase="" :create="true" :src="f.evento.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-15vh" v-else>
                                <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">{{f.usuario.nombre}} te invito a su {{f.evento.tipo}}</div>
                                <div class="row w-100 m-0 letra-gray3-13">{{f.evento.nombre}} el {{[f.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row w-100 m-0 px-3 py-3" v-for=" f of listasAmigos " :key="`l${f.id}`" @click="set(f)">
                    <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo">

                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 h-13vh" v-if="f.imagen">
                                <imagen clase="" :create="true" :src="f.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-15vh" v-else>
                                <imagen clase="" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3 py-2">
                            <div class="w-20vw h-20vw my-auto">
                                <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                            </div>
                            <div class="col pl-3 pr-0 my-auto">
                                <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{f.usuario.nombre}}</div>
                                <div class="row w-100 m-0 letra-gray3-15">Agrego una nueva wishlist: {{f.nombre}}</div>
                                <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row w-100 m-0 forfor" v-for="f of filtrado" :key="`re_${f.id}`" >
                    <div class="row w-100 m-0 px-3 py-2">
                        <div class="row w-100 m-0 carta border-radius-20px back-color-fondo">
                            <div class="row w-100 m-0 px-3 py-2">
                                <div class="w-20vw h-20vw my-auto">
                                    <imagen clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-gray4-17">{{f.usuario.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15">{{f.usuario.nombre}} agrego el evento {{f.nombre}}</div>
                                    <div class="row w-100 m-0 letra-azul1-13">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 py-2">
                                <div class="col pl-3 pr-0">
                                    <div class="row w-100 m-0 letra-gray4-17">{{f.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-17 text-capitalize">{{[f.fecha, 'YYYY-MM-DD'] | moment('DD/MMMM/YYYY')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                info: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            fechas(){return this.$store.getters.userStateArray('fechas');},
            fechasAmigos(){return this.$store.getters.userStateArray('fechasAmigos');},
            listasAmigos(){return this.$store.getters.userStateArray('listasAmigos');},
            amigos(){return this.$store.getters.userStateArray('amigos').filter(x=>{return x.estatus == 'aceptado'});},
            filtrado(){ return this.fechas.filter(x=>{return this.amigos.find(y=>{return y.usuarios_id == x.usuarios_id || y.amigos_id == x.usuarios_id }) != undefined }); },
            eventos(){return this.$store.getters.userStateArray('misEventos'); },
            
            invitaciones(){return this.$store.getters.userStateArray('invitaciones');},
            cobros(){return this.invitaciones.filter(x=>{ return x.cobro && x.cobro.id });},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            set(f){
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },
            verDeseos(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.router.navigate('/deseos_amigos');
            }
        }
    }
</script>