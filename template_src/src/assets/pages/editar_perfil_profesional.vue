<template>
    <f7-page id="inicio">
        <seleccionar-imagen :updateImg="setImg"></seleccionar-imagen>
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Editar perfil profesional'"></nav-bar>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                        <div class="col-12 text-center mb-3 position-relative">
                            <div class="row w-100 m-0 py-2">
                                <div class="row m-0 w-100 justify-content-center">
                                    <div class="w-22vw h-22vw p-1 " v-for="(f,i) of portafolio" :key="i"> 
                                        <div class="w-100 h-100 back-color-blanco border-radius-15px border-gray-lligth-1 overflow-hidden position-relative" v-if="!f.id">
                                            <img class="w-100 h-100 object-fit-contain p-3" :src="require('../iconos/img-placeholder.svg')" alt="" @click="takePicture(i)">
                                        </div>
                                        <div class="w-100 h-100 back-color-blanco border-radius-15px border-gray-lligth-1 overflow-hidden position-relative" v-else>
                                            <img class="w-100 h-100 object-fit" :src="f.imagen" alt="" @click="takePicture(i)">
                                            <button class="button boton-remove"  @click="removeImagen(f,i)">
                                                <div class="row w-100 m-0 justify-content-center"><img src="../iconos/clear.svg" alt=""></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 px-2 mt-3">
                            <inputForm type="text" :textarea="true" rows="2" texto="Especialidad:" placeholder="" v-model="form.especialidad" />
                        </div>
                        <div class="col-12 px-2 mt-3">
                            <inputForm type="text" :textarea="true" rows="2" texto="Cursos:" placeholder="" v-model="form.cursos" />
                        </div>
                        <div class="col-12 px-2 mt-3">
                            <inputForm type="text" texto="Facebook:" placeholder="" v-model="form.facebook" />
                        </div>
                        <div class="col-12 px-2 mt-3">
                            <inputForm type="text" texto="Instagram:" placeholder="" v-model="form.instagram" />
                        </div>
                        <div class="col-12 px-2 mt-3">
                            <inputForm type="text" texto="Calle y numero:" placeholder="" v-model="form.calleynumero" />
                        </div>
                        <div class="col-6 pl-2 pr-2 mt-3">
                            <inputForm type="text" texto="Colonia:" placeholder="" v-model="form.colonia" />
                        </div>
                        <div class="col-6 pr-2 pl-2 mt-3">
                            <inputForm type="text" texto="Codigo postal:" placeholder="" v-model="form.codigo_postal" />
                        </div>
                        <div class="col-6 pl-2 pr-2 mt-3">
                            <inputForm type="text" texto="Ciudad:" placeholder="" v-model="form.municipio" />
                        </div>
                        <div class="col-6 pr-2 pl-2 mt-3">
                            <inputForm type="text" texto="Estado:" placeholder="" v-model="form.estado" />
                        </div>
                </div>
                <div class="row w-100 m-0 py-4 justify-content-center">
                    <div class="col-12">
                        <boton-app texto="Guardar" @click="save"></boton-app>
                    </div>
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
                index: null,
                form:{
                    id: this.$store.getters.afiliadoStateObject('afiliado').id,
                    especialidad: this.$store.getters.afiliadoStateObject('afiliado').especialidad,
                    cursos: this.$store.getters.afiliadoStateObject('afiliado').cursos,
                    facebook: this.$store.getters.afiliadoStateObject('afiliado').facebook,
                    instagram: this.$store.getters.afiliadoStateObject('afiliado').instagram,
                    calleynumero: this.$store.getters.afiliadoStateObject('afiliado').calleynumero,
                    colonia: this.$store.getters.afiliadoStateObject('afiliado').colonia,
                    codigo_postal: this.$store.getters.afiliadoStateObject('afiliado').codigo_postal,
                    municipio: this.$store.getters.afiliadoStateObject('afiliado').municipio,
                    estado: this.$store.getters.afiliadoStateObject('afiliado').estado,
                },
                portafolio: this.$store.getters.afiliadoStateObject('afiliado').portafolio,
            } 
        },
        computed: {
            esAfiliado(){return this.$store.getters.esAfiliado;},
        },
        mounted() {
            console.log(this.$store.getters.afiliadoStateObject('afiliado'));
        },
        methods:{
            takePicture(i){
                this.index = i;
                this.$store.commit('openModal', ['seleccionarImagen']);
            },
            setImg(img){
                let data = {portafolio_afiliados_id: img.id, imagenes_id: img.imagen_id};
                console.log("SET IMAGNE", data);
                this.$store.dispatch('guardarImagenPortafolio', [data,img]).then(res=>{
                    this.$store.dispatch('synchronizeData');
                    // console.log("FOTO Agregadad",res.data,this.portafolio[this.index]);
                    this.portafolio[this.index].id = res.data.id;
                    this.portafolio[this.index].imagen = res.data.imagen;
                    this.portafolio[this.index].imagen_id = res.data.imagen_id;
                },error=>{});
            },
            removeImagen(img, index){
                let data = {portafolio_afiliados_id: img.id, imagenes_id: img.imagen_id};
                this.$store.dispatch('deleteImagenPortafolio',data).then(res=>{
                    this.$store.dispatch('synchronizeData');
                    // console.log("FOTO BORRADA", this.portafolio[index]);
                    this.portafolio[index].id = null;
                    this.portafolio[index].url = null;
                },error=>{})
            },
            save(){
                this.$store.dispatch('postUpdateAfiliacion', this.form);
            }
          
        }
    }
</script>