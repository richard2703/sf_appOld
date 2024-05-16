<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :imagen="1" :backs="true" :title="'Nuevo post'"></nav-bar>
          
            <div class="contenedor-page">
   
    
                <div class="row w-100 m-0 back-color-blanco border-radius-15px overflow-hidden position-relative ">
    
                    <template v-if="show">
                        <div class="w-auto position-absolute right-55px mr-1px top-0px z-10000000 " @click=" del() " v-if="session.id == post.usuarios_id" >
                            <div :class="true?'back-color-verde5':'back-color-verde5'" class="row w-100 m-0 py-8px px-8px border-bl-radius-10px border-br-radius-10px">
                                <icono icono="delete" clase="letra-blanco-35 fw-600" />
                            </div>
                        </div>
                    </template>
    
                    <template v-if="editar">
                        <div class="w-auto position-absolute right-112px mr-1px top-0px z-10000000 " @click=" preparaEditar() " v-if="session.id == post.usuarios_id" >
                            <div :class="true?'back-color-verde5':'back-color-verde5'" class="row w-100 m-0 py-8px px-8px border-bl-radius-10px border-br-radius-10px">
                                <icono icono="edit" clase="letra-blanco-35 fw-600" />
                            </div>
                        </div>
                    </template>
    
                <template v-if="show && !edicion" >
                    <div class="row w-100 m-0 pb-3">
                        <div class="row w-100 m-0 px-0">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0" v-if="galeria && galeria.length" >
                                    <div class="row w-100 m-0" >
                                        <scollX :cantidad="1" :paginado="true" >
                                            <div class="swiper-slide my-auto" v-for="p of galeria" :key="p.id">
                                                <imagen class="" :fit="true" :fullsize="true" :create="true" :src="p.imagen" />
                                            </div>
                                        </scollX>
                                    </div>
                                </div>
                                <div class="row w-100 m-0" v-else >
                                    <imagen :fullsize="true" :create="true" :src="post.imagen" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3 py-2 ">
                                <div class="w-20vw h-20vw my-auto">
                                    <imagen :clase="`border-radius-50 border-${post.usuario.nivel}-3`" :user="true" :src="post.usuario.foto" :fit="true" />
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-gray4-17" v-if="session.id == post.usuarios_id" >{{post.usuario.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray4-17" v-if="session.id == post.usuarios_id" >Hiciste un post</div>
                                    <div class="row w-100 m-0 letra-gray4-17" v-else >{{post.usuario.nombre}} hizo un post</div>
                                    <div class="row w-100 m-0 letra-gray4-17" v-if="post.eventos_id" >De la reunion {{post.evento.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15">{{post.comentarios}}</div>
                                    <div class="row w-100 m-0 letra-azul1-13">{{[post.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                </div>
                            </div>
    
                            <div class="row w-100 m-0 "  v-if="post.partners && post.partners.length">
                                <div class="row w-100 m-0 px-3 py-2 pr-3 back-color-azul1">
                                    <div class="col px-0 my-auto letra-blanco-16">Partners</div>
                                    <!-- <div class="col-auto px-0 my-auto letra-blanco-16"><icono icono="add" clase="letra-blanco-35 pb-3px" /></div> -->
                                </div>
                                <div class="row w-100 m-0 px-3 pb-3">
                                    <div class="row w-100 m-0" v-for="a of post.partners || []" :key="a.id">
                                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                                            <div class="row w-100 m-0">
                                                <div class="w-10vw h-10vw my-auto ">
                                                    <imagen clase="border-radius-50" :src="a.imagen" :fit="true" :user="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray4-15">{{a.tradename}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row w-100 m-0" v-if="post.usuarios && post.usuarios.length" >
                                <div class="row w-100 m-0 px-3 py-2 pr-3 back-color-azul1" >
                                    <div class="col px-0 my-auto letra-blanco-16">Amigos etiquetados</div>
                                    <!-- <div class="col-auto px-0 my-auto letra-blanco-16"><icono icono="add" clase="letra-blanco-35 pb-3px" /></div> -->
                                </div>
                                <div class="row w-100 m-0 px-3 pb-3 ">
                                    <div class="row w-100 m-0" v-for="a of post.usuarios || []" :key="a.id">
                                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                                            <div class="row w-100 m-0" @click.stop="$store.verPerfil({id:a.usuarios_id})" >
                                                <div class="w-10vw h-10vw my-auto ">
                                                    <imagen clase="border-radius-50" :create="true" :src="a.foto" :fit="true" :user="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray4-15">{{a.nombre}}</div>
                                                </div>
                                                <div class="w-50px border-radius-5px back-color-azul1 py-8px justify-content-center text-center" v-if="session.id != a.id" @click.stop=" $store.sendSol(a) " >
                                                    <icono icono="send" clase="letra-blanco-20 pt-4px" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </template>
                <template v-else >

                    <div class="row w-100 m-0 pb-3">
                        <div class="row w-100 m-0 pt-3 px-0">
                         
                            <div class="row w-100 m-0 letra-gray3-16 justify-content-center text-center ">Sube o toma la imagen que mas te gusta.</div>

                            <div class="row w-100 m-0 py-3 justify-content-center ">
                                <div class="w-35vw h-35vw mx-1 my-1">
                                    <uploadImagen clase="border-gray-1" :def="0" :create="true" v-model="form.imagen"  />
                                </div>
                                <div class="w-35vw h-35vw mx-1 my-1" v-for="(x,h) of imagenes" :key="h">
                                    <uploadImagen clase="border-gray-1" :def="0" :create="true" v-model="x.id"   />
                                </div>
                                <div class="w-45px h-45px ml-3 border-azul1-2 px-0 my-auto border-radius-10px" v-if="imagenes.length < 4" @click="addI()">
                                    <div class="row w-100 m-0">
                                        <icono icono="add" clase="letra-azul1-40" />
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 pt-3 pb-3">
                                <div v-if="0" class="row w-100 m-0 px-3">
                                    <inputForm texto="Título:"  input="form" type="text" placeholder="" v-model="form.titulo" />
                                </div>
                                <div class="row w-100 m-0 pt-3  px-3">
                                    <inputForm :textarea="true" texto="Agrega un texto (Opcional)" type="text" placeholder="" v-model="form.comentarios" />
                                </div>
                            </div>
    
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0 px-3 letra-gray4-16">¿Para quien sera la publicación?</div>
                                <div class="row w-100 m-0 px-1 py-2">
                                    <div class="col px-1" @click="form.publicacion = 'todos'">
                                        <div :class="form.publicacion == 'todos'?'back-color-azul1 letra-blanco-18 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                            class="row h-50px align-content-center carta px-2 py-1 w-100 m-0 border-radius-10px  justify-content-center text-center">Todos</div>
                                    </div>
                                    <div class="col px-1" @click="form.publicacion = 'importantes'">
                                        <div :class="form.publicacion == 'importantes'?'back-color-azul1 letra-blanco-18 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                            class="row h-50px align-content-center carta px-2 py-1 w-100 m-0 border-radius-10px  justify-content-center text-center">Personas importantes</div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0 px-3 letra-gray4-16">¿Cuento tiempo deseas dejar el post activo?</div>
                                <div class="row w-100 m-0 px-1 py-2">
                                    <div class="col px-1" @click="form.expiracion = semana">
                                        <div :class="form.expiracion == semana?'back-color-azul1 letra-blanco-17 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                            class="row px-2 py-1 align-content-center carta w-100 m-0 border-radius-10px justify-content-center text-center">Semana</div>
                                    </div>
                                    <div class="col px-1" @click="form.expiracion = mes">
                                        <div :class="form.expiracion == mes?'back-color-azul1 letra-blanco-17 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                            class="row px-2 py-1 align-content-center carta w-100 m-0 border-radius-10px justify-content-center text-center">Mes</div>
                                    </div>
                                    <div class="col px-1" @click="form.expiracion = null">
                                        <div :class="form.expiracion == null?'back-color-azul1 letra-blanco-17 fw-600':' back-color-fondo3 letra-gray2-16'" 
                                            class="row px-2 py-1 align-content-center carta w-100 m-0 border-radius-10px justify-content-center text-center">Permanente</div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row w-100 m-0 "  >
                                <div class="row w-100 m-0 px-3 pr-3 justify-content-start " @click="router.navigate('/agregar_partners_post')">
                                    <div class="col-auto px-0 my-auto letra-gray3-16">Etiqueta partners</div>
                                    <div class="col-auto px-0 pl-3 my-auto letra-gray3-16"><icono icono="add" clase="letra-gray2-28 pt-6px" /></div>
                                </div>
                                <div class="row w-100 m-0 pl-3 pr-1 pb-3">
                                    <div class="row w-100 m-0 py-1" v-for="a of patnersForm" :key="a.id">
                                        <div class="w-auto px-2 py-1 carta border-radius-50px">
                                            <div class="row w-100 m-0">
                                                <div class="w-8vw h-8vw my-auto ">
                                                    <imagen clase="border-radius-50" :src="a.imagen" :fit="true" :user="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray3-15">{{a.tradename}}</div>
                                                </div>
                                                <div class="col-auto my-auto px-0 pl-2" @click="eliminarPar(a)">
                                                    <icono  clase="letra-gray2-22 pt-4px" icono="close" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="row w-100 m-0" >
                                <div class="row w-100 m-0 px-3 pr-3  justify-content-start " @click="router.navigate('/agregar_usuarios_eventos')" >
                                    <div class="col-auto px-0 my-auto letra-gray3-16">Etiqueta usuarios</div>
                                    <div class="col-auto px-0 pl-3 my-auto letra-gray3-16"><icono icono="add" clase="letra-gray2-28 pt-6px" /></div>
                                </div>
                                <div class="row w-100 m-0 pl-3 pr-1 pb-3 ">
                                    <div class="row w-100 m-0 py-1" v-for="a of usuariosForm" :key="a.id">
                                        <div class="w-auto px-2 py-1 carta border-radius-50px">
                                            <div class="row w-100 m-0">
                                                <div class="w-8vw h-8vw my-auto ">
                                                    <imagen clase="border-radius-50" :create="(a.foto || '').includes('http')?false:true" :src="a.foto" :fit="true" :user="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray3-15">{{a.nombre}}</div>
                                                </div>
                                                <div class="col-auto my-auto px-0 pl-2 " @click="eliminarUser(a)">
                                                    <icono  clase="letra-gray2-22 pt-4px" icono="close" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="row w-100 m-0 back-color-blanco pb-3 px-2">
                        <div class="row w-100 m-0" >
                            <div v-if="0" class="col-6 px-1" @click="closeModal()">
                                <botonApp tipo="gris" :texto="'Cancelar'" radius="30px" />
                            </div>
                            <div class="col-11 mx-auto px-1" @click="click()">
                                <botonApp texto="Publicar" tipo="rojo" radius="30px" />
                            </div>
                        </div>
                    </div>
                </template>
    
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
const moment = require('moment')

export default {
    components: {  },
    data(){
        return {
            name: 'modalMensaje',
            edicion: false,
            semana: moment().add(7, 'days').format('YYYY-MM-DD'),
            mes: moment().add(30, 'days').format('YYYY-MM-DD'),
            form: {
                id:null,
                edicion:null,
                imagen: null,
                comentarios: null,
                publicacion: 'todos',
                expiracion: null,
            },
            imagenes:[{id:null}, {id:null}, {id:null}],
            imagenes:[ {id:null} ],
            hoy: moment().format('YYYY-MM-DD'),
        };
    },

    props: [
        'state',
        'show',
        'evento',
        'post',
        'editar',
        'fn',
    ],

    computed: {
        debug(){return this.$store.getters.deviceready == false; },
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},

        usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
        patnersForm(){return this.$store.getters.userStateArray('patnersForm');},
        galeria(){return this.post.galeria || []},

    },

    beforeMount() {
        console.log("SHOW SHOW CLEAN", this.show);
        this.$store.commit('cleanForm', [this.hoy]);
        if(this.fn){
            this.fn();
        }
    },

    methods:{
        closeModal(){
            // this.$store.commit('closeModal', [this.name]);
            this.$emit('close');
        },
        
        logout(){
            this.$store.commit('logout');
            this.closeModal();
        },

        addI(){
            const a = {id:null};
            this.imagenes.push(a);
        },
        
        registro(){
            this.$store.commit('logout');
            this.$store.getters.getRouterView('login').navigate('/registro');
            this.closeModal();
        },

        eliminarPar(a){
            this.$store.commit('removePartner',a.id);
            this.b = null;
        },

        eliminarUser(a){
            this.$store.commit('removeUser',a.id);
            this.b = null;
            console.log("USUARIOS", this.usuariosForm)
        },

        preparaEditar(){
            console.log("this", this.post.usuarios);
            this.post.usuarios.map(x=>{
                this.$store.commit('addUser',x);
            });
            this.post.partners.map(x=>{
                this.$store.commit('addPartner',x);
            });
            this.post.imagenes.map((x,i)=>{
                this.imagenes[i].id = x.imagen;
            });
            this.form.imagen = this.post.imagen;
            this.form.comentarios = this.post.comentarios;
            this.form.expiracion = this.form.expiracion;

            this.semana = moment(this.form.creado, 'YYYY-MM-DD HH:mm:ss').add(7, 'days').format('YYYY-MM-DD');
            this.mes =  moment(this.form.creado, 'YYYY-MM-DD HH:mm:ss').add(30, 'days').format('YYYY-MM-DD'),

            this.form.id = this.post.id;
            this.form.edicion = true;
            this.edicion = true;
        },

        click(){
            this.$emit('click');
            if(!this.form.comentarios && 0){
                swal("","Ingresa comentario","");
                return;
            }
            this.$store.dispatch('postGuardarPost',[this.form, this.evento, this.usuariosForm, this.patnersForm, this.imagenes ]);
            this.closeModal();
        },

        del(){
            this.$store.dispatch('postGuardarPost',[ this.post ]);
            this.closeModal();
        }
    },
}
</script>
