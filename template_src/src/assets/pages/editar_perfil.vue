<template>
    <f7-page id="inicio">
        <seleccionar-imagen :updateImg="setImg"></seleccionar-imagen>
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Editar perfil'" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 mt-3 px-3 justify-content-center">
                        <div class="col-auto px-0 text-center my-auto position-relative">
                            <div class="w-45vw h-45vw mx-auto border-radius-10 back-color-gray39 overflow-hidden" >
                                <uploadImagen class="back-color-azul1" :user="true" v-model="form.foto" :imagen="foto" />
                                <!-- <img class="w-100 h-100 object-fit brillo-6" :src="form.foto || require('../images/perfil.png')" alt="" @click="$store.commit('openModal', ['seleccionarImagen'])"> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <inputForm type="text" texto="Nombre:" placeholder="" v-model="form.nombre" />
                    </div>
                    <div class="col-12 mt-3">
                        <inputForm type="tel" texto="Teléfono:" placeholder="" v-model="form.telefono" :maxlength="10" />
                    </div>
                     <div class="col-12 mt-4">
                        <inputForm type="date" texto="Fecha de nacimiento:" placeholder="" v-model="form.fecha_nacimiento" :maxlength="50" />
                    </div>
                    <div class="col-12 mt-4">
                        <selectForm type="text" texto="Estado donde resides:" :opciones="estados" v-model="form.estado" />
                    </div>
                    <div class="col-12 mt-4">
                        <inputForm type="email" texto="Correo:" placeholder="" v-model="form.email" :disabled="true" />
                    </div>
                    <div class="col-12 mt-4">
                        <div class="row w-100 m-0 pb-2 letra-gray3-17">Selecciona una o varias categorias de tu interes:</div>
                        <div class="row w-100 m-0 justify-content-start">
                            <div class="col-auto px-0 mx-1 my-1" v-for="c of categorias" :key="c.id" @click="set(c)">
                                <div :class="cats.includes(c.id)?'back-color-azul1 letra-blanco-17':'letra-azul1-17'" class="row w-100 m-0 px-2 border-radius-5px border-azul1-1">{{c.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 p-0 mt-5" @click="router.navigate('/cambiar_password')">
                        <div class="row m-0 w-100 px-3 py-2 justify-content-between border-b-gray1-1 border-t-gray1-1 ">
                            <div class="col-11 my-auto letra-gray-dark2-5-1vw p-0">Cambiar contraseña</div>
                            <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 py-4 justify-content-center">
                    <div class="col-12 px-4 pb-4">
                        <botonApp tipo="azul" texto="Guardar" @click="save" radius="10px" />
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
                fotoUpdate: false,
                form:{
                    id: this.$store.getters.getSession.id,
                    foto: this.$store.getters.getSession.fotos_id,
                    nombre: this.$store.getters.getSession.nombre,
                    email: this.$store.getters.getSession.email,
                    telefono: this.$store.getters.getSession.telefono,
                    fecha_nacimiento: this.$store.getters.getSession.fecha_nacimiento,
                    estado: this.$store.getters.getSession.estado,
                    ine_frente: this.$store.getters.getSession.ine_frente,
                    ine_atras: this.$store.getters.getSession.ine_atras,
                },
                cats: this.$store.getters.getSession.cats || [],
                foto: this.$store.getters.getSession.foto,

            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            categorias(){return this.$store.getters.getCatalogo('categorias');},
            estados(){return this.$store.getters.getCatalogo('estados');},
        },
        methods:{
            set(c){
                if(this.cats.includes(c.id)){
                    this.cats = this.cats.filter(x=>x != c.id);
                }
                else{
                    this.cats.push(c.id);
                }
            },
            setImg(img){
                this.fotoUpdate = true;
                this.form.foto = img;
            },
            save(){
                if(!this.form.nombre){
                    swal("No puedes dejar campos vacios", "","info");
                    return;
                }
                this.$store.dispatch('postEditCuenta', [this.form, this.fotoUpdate, this.cats]);
            },
        }
    }
</script>