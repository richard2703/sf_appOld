<template>
    <f7-page class="" id="inicio">
        <modalParty 
            v-if="info"
            :data="info"
            @cancel="preCancelarRegalo()"
        />
        <!-- :data="invitaciones.find(w=>w.id == info.id) || {}" -->
        <modalRegalo 
            v-if="info" 
            :data="info" 
        />
        <modal-mensaje 
            v-if="t==1"
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />
        <modalColores
            v-if="colores==1"
            :color="color"
            @close="(colores = 0)"
            @click="setColor"
        />

        <modal-mensaje 
            v-if="t==2"
            :texto="`Cancelar tu cooperación en el Regalo Grupal, eliminará tu participación y recalculará el monto entre los usuarios que aceptaron ¿Estas seguro de cancelar?`"
            :boton="'Cancelar'"
            colorC="azul"
            colorA="gris"
            :cancelBoton="'No cancelar'"
            @click="cancelarRegalo()"
        />

        <modalPost 
            v-if="newPost"
            :show="newPost==2"
            :editar="newPost==2"
            :post="post"
            @close="(newPost = 0)"
        />

        <modalEventoCreador />
        

        <div :class="` vista ` " :style="`background-color: ${fc.p}`" >
            <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />

            <div class="row w-100 m-0" :style="`background-color: ${fc.p}`" >
                <!-- <div class="row w-100 m-0 letra-gray2-11 px-2 justify-content-end text-end " @click="print()" v-show="debug">{{zona}}</div> -->
                <div class="row w-100 m-0  px-3 pt-13px pb-8px">
                    <div class="col px-0 pl-1 letra-azul1-20" :style="`color: ${fc.l} !important`" >What's flowing on</div>
                    <div class="col-auto px-0" @click="go('/nuevo_post')" >
                        <icono icono="add" clase="letra-azul1-30 fw-600 " :estilo="`color: ${fc.l} !important`" />
                    </div>
                    <div class="col-auto px-0" @click="(colores = 1)" >
                        <icono icono="more_vert" clase="letra-azul1-30 fw-600" :estilo="`color: ${fc.l} !important`" />
                    </div>
                </div>
            </div>
            
            <div id="inicioX123" class=" contenedor-page-tabs " :style="`background-color: ${fc.p}`" @scroll.passive="sc" >

                <template v-if="sugerencia && sugerencia.nombre">
                    <div class="row w-100 m-0 px-3 py-1 " >
                        <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo " 
                            :class="'border-rojo0'" @click="verProd()">
                            <div class="row w-100 m-0 position-relative">
                                <div class="w-25vw h-35vw" >
                                    <imagen v-if="sugerencia.imagen" clase="" :src="sugerencia.imagen" :fit="true" />
                                    <imagen v-else clase="" src="https://socialflow.app/backend/apiv1/img/b1.png" :fit="true" />
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0">
                                        <div class="row w-100 m-0 pb-2 letra-gray4-17 text-capitalize">{{sugerencia.nombre}}</div>
                                        <div class="row w-100 m-0 pb-2 letra-azul1-20 text-capitalize" v-if="sugerencia.iva == '1'">{{sugerencia.precio * 1.16 | currency}} {{sugerencia.currency}}</div>
                                        <div class="row w-100 m-0 pb-2 letra-azul1-20 text-capitalize" v-else>{{sugerencia.precio | currency}} {{sugerencia.currency}}</div>
                                        <div class="row w-100 m-0 letra-gray3-17 text-capitalize" v-if="sugerencia.partner && sugerencia.partner.tradename">{{sugerencia.partner.tradename}}</div>
                                    </div>
                                </div>

                                <div class="row w-100 m-0 position-absolute bottom-40px left-0px">
                                    <div class="col-auto ml-auto px-3 letra-blanco-17 fw-600 border-tl-radius-15px border-bl-radius-15px text-capitalize" 
                                        :class="'back-color-rojo0'" >Comprar</div>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </template>
                
                <!-- <div class="row w-100 m-0 px-3 pt-3" v-if="!amigos || !amigos.length ">
                    <div class="row w-100 m-0 px-3 letra-gray4-22 justify-content-center text-center ">Aún no tienes amigos, invita y crea una comunidad</div>
                </div> -->

            <div class="row w-100 m-0" v-for=" (f, x) of paginado " :key="f.id">
                <div class="row w-100 m-0 d-none " >{{x}} {{f.tipo}} {{notis.length}}</div>
                
            <template v-if="true">
                <div class="row w-100 m-0 px-3 py-1" v-if="f.tipo=='1'" @click="verEvento(f.data)" >
                    <postMuroBasico
                        :imagen="f.data.imagen"
                        :usuario="session"
                        :texto="(f.data.tipo == 'reunion')?`Creaste la Reunion`:`Creaste el Regalo Grupal` "
                        :nombre="`${f.data.nombre}`"
                        :pad="'px-0'"
                        :pie="`A las ${ prinF(f.data.fecha, f.data.hora) } `"
                        :nota="f.data.type"
                        :color="(f.data.tipo == 'reunion')?'verde4':'amar'"
                    />
                   
                </div>
            </template>

            <template v-if="true">
                <div class="row w-100 m-0 px-3 py-1 " v-if="f.tipo=='2'" @click="set(f.data)">
                    <postMuroBasico
                        :imagen="f.data.evento.imagen"
                        :usuario="f.data.usuario"
                        :texto="f.data.evento.tipo=='party'?`te invita al Regalo Grupal`:`te invita a la Reunion`"
                        :nombre="`${f.data.evento.nombre}`"
                        :pad="'px-0'"
                        :pie="`A las ${ prinF(f.data.evento.fecha, f.data.evento.hora) } `"
                        :nota="f.data.evento.type"
                        :color="(f.data.evento.tipo == 'reunion')?'verde4':'amar'"
                    />
                </div>
            </template>

            <template v-if="true">
                <div class="row w-100 m-0 forfor" v-if="f.tipo=='3'" @click="verDeseosFecha(f.data)">
                    <postMuroBasico
                        :imagen="f.data.imagen"
                        :usuario="f.data.usuario"
                        :texto="`Agrego la fecha`"
                        :nombre="`${f.data.nombre}`"
                        :pad="0"
                        :pie="`${ prinFrom(f.data.creado) } `"
                        :nota="'Fecha'"
                        :color="'azul1'"
                    />
                </div>
            </template>
                
            <template v-if="true">
                <div class="row w-100 m-0 px-3 py-1" v-if="f.tipo=='4'" @click="set(f.data)" >
                    <postMuroBasico
                        :imagen="f.data.evento.imagen"
                        :usuario="f.data.usuario"
                        :texto="`Te invito a su ${f.data.evento.type}`"
                        :nombre="`${f.data.evento.nombre}`"
                        :pad="'px-0'"
                        :pie="`A las ${ prinF(f.data.evento.fecha, f.data.evento.hora) } `"
                        :nota="f.data.evento.type"
                        :color="(f.data.evento.tipo=='party')?'ama':'verde4'"
                    />
                </div>
            </template>

            <template v-if="true">
                <div class="row w-100 m-0 px-3 py-1" v-if="f.tipo=='5'" @click="verDeseosLista(f.data)" >
                    <postMuroBasico
                        :imagen="f.data.imagen"
                        :usuario="f.data.usuario"
                        :texto="`Agrego una nueva wishlist: ${f.data.nombre}`"
                        :pad="'px-0'"
                        :pie="`${ prinFrom(f.data.creado) } `"
                        :nota="'Wishlist'"
                        :color="'rojo'"
                    />
                </div>
            </template>

            <template v-if="true">
                <div class="row w-100 m-0 px-3 py-1 " v-if="f.tipo=='5.5'" @click="editarD(f.data)" >
                    <postMuroBasico
                        :imagen="f.data.imagen"
                        :usuario="session"
                        :texto="`Creaste una nueva wishlist:`"
                        :nombre="`${f.data.nombre}`"
                        :pad="'px-0'"
                        :pie="`${ prinFrom(f.data.creado) } `"
                        :nota="'Wishlist'"
                        :color="'rojo'"
                    />
                </div>
            </template>

            <template v-if="true">
                <div class="row w-100 m-0 forfor" v-if="f.tipo=='6'" @click="editarF(f.data)" >
                    <postMuroBasico
                        :imagen="f.data.imagen"
                        :usuario="session"
                        :texto="`Agregaste el evento`"
                        :nombre="`${f.data.nombre}`"
                        :pad="0"
                        :pie="`${ prinFrom(f.data.creado) } `"
                        :nota="'Fecha'"
                        :color="'azul1'"
                    />
                </div>
            </template>

                <template v-if="f.tipo=='7'" >
                    <regaloNotiComponente :data="f" @input="verRegalo" />
                </template>

                <template v-if="true">
                    <div class="row w-100 m-0 forfor" v-if="f.tipo=='9'" @click="showPost(f.data)" >
                        <postMuroBasico
                        :imagen="f.data.imagen"
                        :usuario="f.data.usuario"
                        :texto="f.data.usuarios.some(s=>s.id == session.id) && f.data.usuarios_id != session.id?'Hizo un post y te etiqueto':`Hizo un post`"
                        :post="f.data.comentarios || f.data.titulo"
                        :pad="0"
                        :id="f.data.id"
                        :tipex="f.tipex"
                        :pie="`${ prinFrom(f.data.creado) } `"
                        :nota="'Post'"
                        :color="'verde5'"
                    />
                    </div>
                </template>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <div class="col-8 px-0 mx-auto" v-if="c < general.length" @click="c += add">
                            <botonApp texto="Ver mas" tipo="azul" radius="30px" />
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
const moment = require('moment-timezone');
const mo = require('moment');

const stColor = JSON.parse(localStorage.getItem('stColor'));

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                //Wishlist (Rojo)
                //Reuniones (Verde)
                //Parties (Amarillo)
                //Mis fechas (Azul)
                info: null,
                colores: null,
                color: JSON.parse(localStorage.getItem('stColor')) || { p: '#dbdbdb', l:'#262a65' },

                post: {},
                t: 1,
                c: 15,
                add: 5,
                zona: moment.tz.guess(),
                ele: {},
                scrollHeight: 0,
                newPost: false,
                insert: null,
                id: null,
                reportadosPost: [],
                reportadosFechas: [],
                reportadosRegalos: [],
                reportadosInvitaciones: [],
                reportadoslistasAmigos: [],
                reportadosfechasAmigos: [],

                
            } 
        },
        computed: {
            debug(){return this.$store.getters.deviceready == false; },
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            fc(){return this.$store.getters.getColor;},
            v(){return this.$store.getters.loadInfo;},

            sugerencia(){return this.$store.getters.getCatalogo('sugerencia');},

            fechas(){return this.$store.getters.userStateArray('fechas');},
            filtrado(){ return this.fechas.filter(x=>{return this.amigos.find(y=>{return y.usuarios_id == x.usuarios_id || y.amigos_id == x.usuarios_id }) != undefined }); },

            fechasAmigos(){return this.$store.getters.userStateArray('fechasAmigos');},
            listasAmigos(){return this.$store.getters.userStateArray('listasAmigos').filter(x=>{ return x.tipo != 'Privada' });},
            misListas(){return this.$store.getters.userStateArray('misListas');},


            amigos(){return this.$store.getters.userStateArray('amigos').filter(x=>{return x.estatus == 'aceptado'});},

            eventos(){return this.$store.getters.userStateArray('misEventos'); },
            invitaciones(){return this.$store.getters.userStateArray('invitaciones');},
            cobros(){return this.invitaciones.filter(x=>{ return x.cobro && x.cobro.id });},
            misFechas(){return this.$store.getters.userStateArray('misFechas');},
            regalosAmigos(){return this.$store.getters.userStateArray('regalosAmigos');},

            posts(){return this.$store.getters.userStateArray('posts');},
            postAmigos(){return this.$store.getters.userStateArray('postAmigos');},
            postEtiquetas(){return this.$store.getters.userStateArray('postEtiquetas');},
            notificaciones(){return this.$store.getters.getCatalogo('notificaciones');},

            solicitudes(){return this.$store.getters.userStateArray('amigos').filter(s=>s.estatus == 'enviado').filter(f=>f.amigos_id == this.session.id);},

            general(){
                let a = [];
                this.eventos.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('x'), tipo: '1', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('x'), tipo: '1', creado: x.creado, data: x });
                });

                this.cobros.filter(x=>{return x.evento.tipo == 'party'}).filter(s=>{return !this.reportadosInvitaciones.includes(s.id) }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('y'), tipo: '2', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                });

                this.fechasAmigos.filter(s=>{return !this.reportadosfechasAmigos.includes(s.id) }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('q'), tipo: '3', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('q'), tipo: '3', creado: x.creado, data: x });
                });

                this.invitaciones.filter(s=>{return !this.reportadosInvitaciones.includes(s.id) }).filter(x=>{return x.evento.tipo == 'reunion'}).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '4', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '4', creado: x.creado, data: x });
                });

                this.listasAmigos.filter(s=>{return !this.reportadoslistasAmigos.includes(s.id) }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '5', creado: x.creado, data: x });
                });

                this.misListas.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('ww'), tipo: '5.5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('ww'), tipo: '5.5', creado: x.creado, data: x });
                });

                this.misFechas.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('z'), tipo: '6', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('z'), tipo: '6', creado: x.creado, data: x });
                });

                this.regalosAmigos.map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('r'), tipo: '7', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                // this.notificaciones.map(x=>{
                //     let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                //     a.push({ id: _.uniqueId('nt'), tipo: '8', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                //     // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                // });

                this.$store.getters.userStateArray('postEtiquetas').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('pe'), tipo: '9', tipex: 'etiquetas', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.posts.filter(s=>{return !this.reportadosPost.includes(s.id) }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('post'), tipo: '9', tipex: 'postNormal', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });
                this.postAmigos.filter(w=>!this.$store.getters.userStateArray('postEtiquetas').some(a=>a.id == w.id)).filter(s=>{return !this.reportadosPost.includes(s.id) }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('post'), tipo: '9', tipex: 'postAmigos', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                return _.orderBy(a, ['creado'], ['desc']);
            }, 
            
            notis(){
                let a = [];

                this.$store.getters.userStateArray('amigos').filter(s=>{return (s.estatus == 'enviado' && s.amigos_id == this.session.id) || (s.estatus == 'aceptado' && s.usuarios_id == this.session.id) }).map(x=>{
                    let y = moment.tz(x.modificado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('s'), tipo: 's', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('invitaciones').filter(x=>{ return x.cobro && x.cobro.id }).filter(x=>{return x.evento.tipo == 'party'}).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('y'), tipo: '2', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('y'), tipo: '2', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('fechasAmigos').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('q'), tipo: '3', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('q'), tipo: '3', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('invitaciones').filter(x=>{return x.evento.tipo == 'reunion'}).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '4', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '4', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('listasAmigos').filter(x=>{ return x.tipo != 'Privada' }).map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('w'), tipo: '5', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('w'), tipo: '5', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('regalosAmigos').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('r'), tipo: '7', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });
                
                this.$store.getters.getCatalogo('notificaciones').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('nt'), tipo: '8', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('postEtiquetas').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('pe'), tipo: '9', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.getters.userStateArray('inivtacionesRechazadas').map(x=>{
                    let y = moment.tz(x.creado,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('ir'), tipo: '10', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });
                
                this.$store.getters.userStateArray('historial').map(x=>{
                    let y = moment.tz(x.created,"YYYY-MM-DD HH:mm:ss", "America/Mexico_City");
                    a.push({ id: _.uniqueId('his'), tipo: 'historialcompras', creado: y.tz(this.zona).format("YYYY-MM-DD HH:mm:ss"), data: x });
                    // a.push({ id: _.uniqueId('r'), tipo: '7', creado: x.creado, data: x });
                });

                this.$store.commit('catalogoXcontarNotificaciones', _.orderBy(a, ['creado'], ['desc']));
                return _.orderBy(a, ['creado'], ['desc']);
            }, 

            paginado(){
                return this.general.filter((x,y) => {return y <= this.c});
            }
        },
        
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
            console.log("COLOR colors INICIO", stColor);

            setTimeout(()=>{
				this.ele = document.getElementById('inicioX123');
                // console.log("ELEMNTO", this.ele);

                if(this.ele){
                        this.ele.addEventListener('scroll',(e)=>{
                            // console.log("SCROLEANDO", this.ele.scrollTop,this.ele.scrollHeight);
                            if(this.ele.scrollTop >= this.ele.scrollHeight-1000){
                            if(this.scrollHeight !=  this.ele.scrollHeight){
                                this.scrollHeight =  this.ele.scrollHeight;
                                this.c += this.add
                            }
                        }
                    });
                }
                
                $('#inicioX123').scroll(()=>{
                    // console.log("SCROLLING TIME");
                    if($('#inicioX123').scrollTop() + $('#inicioX123').height() == $('#inicioX123').height()) {
                        // alert("bottom!");
                    }
                });

			},400);

           
        },

        methods:{

            setColor(c){
                this.color = c;
                this.$store.commit('setColor', c);
            },

            prinF(fecha, hora){
                return moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm:ss').format('HH:mm [hrs] [del] DD [de] MMMM [de] YYYY') 
            },

            prinFrom(fecha){
                return moment(`${fecha}`, 'YYYY-MM-DD HH:mm:ss').fromNow();
            },

            print(){
                console.log("PRINTING", "America/Mexico_City");
                let x =  moment.tz(mo().format('YYYY-MM-DD HH:MM:ss', "America/Mexico_City"));
                let y = x.tz("Asia/Shanghai").format('YYYY-MM-DD HH:mm:ss')

                console.log("PRINTING",x, y );
            },

            preparePost(){
                console.log("this", this.usuarios);
                this.usuarios.map(x=>{
                    this.$store.commit('addUser',x.usuario);
                });
            },

            verProd(){
                this.$store.commit('updateCatalogosState',['producto', this.sugerencia.id]);
                this.$store.commit('setCarritosState',['producto', this.sugerencia.id]);
                this.router.navigate('/detalle_producto');
            },

            showPost(p){
                this.post = p;
                this.newPost = 2;
            },

            go(ruta){
                this.router.navigate(ruta);
            },

            sc(e){
                 if(e.srcElement.scrollTop >= e.srcElement.scrollHeight-1000){
                    if(this.scrollHeight !=  e.srcElement.scrollHeight){
                        // console.log("SCROLEANDO NAD GETTING", e.srcElement.scrollTop, e.srcElement.scrollHeight);
                        this.scrollHeight =  e.srcElement.scrollHeight;
                        this.c += this.add
                    }
                }
            },

            verRegalo(e){
                this.info = e;
                this.$store.commit('openModal',['modalRegalo']);
            },

            verEvento(e){
                console.log("VER EVETNOT");
                this.$store.commit('setUsuarioData',['evento', e.id]);
                this.$store.commit('openModal', ['modalEventoCreador']);
                // this.router.navigate('/detalle_eventos');
            },
            caerrar1(){
                console.log("CERRANDO");
                this.newPost = 0; 
                this.$store.commit('closeModal', ['modalEventoCreador']);
            },

            set(f){ 
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },

            verDeseos(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.router.navigate('/deseos_amigos');
            },

            verDeseosFecha(e){
                this.$store.dispatch('verDeseosFecha', [e]);
            },

            verDeseosLista(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.$store.commit('setUsuarioData', ['detalle',e.id]);
                this.router.navigate('/deseos_amigo');
            },

            cancelarRegalo(){
                this.$store.dispatch('postActulizarCobro', [this.info.evento, 0]);
            },

            preCancelarRegalo(){
                this.t = 2;
                this.$store.commit('openModal',['modalMensaje']);
            },

            reportar(x, id){
                this.t = 1;
                this.insert = x;
                this.id = id;
                this.$store.commit('openModal',['modalMensaje']);
            },

            toreportar(){
                this[this.insert].push(this.id);
                console.log("REPORTADOS", this.reportadosPost);
                swal("","Contenido reportado","success");
            },
            
            editarF(a){
                this.$store.commit('setUsuarioData',['fecha',a.id]);
                this.router.navigate('/editar_evento_fecha');
            },
            
            editarD(a){
                this.$store.commit('setUsuarioData',['lista',a.id]);
                this.$store.commit('setUsuarioData',['type',a.type]);
                // console.log("TIPE", a.type);
                this.router.navigate('/detalle_lista');
            },
            
        }
    }
</script>