<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Registro'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 text-center pt-2 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                            <uploadImagen class="back-color-azul1" :user="true" v-model="form.foto" />
                        </div>
                        <div class="col-12 py-2 letra-gray3-14 text-center">Sube una foto o imagen de perfil</div>
                    </div>
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Nombre de usuario:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" texto="Correo:" placeholder="" v-model="form.email" />
                        </div>
                        <div  class="col-12 mt-4">
                            <inputForm type="tel" texto="Celular:" placeholder="" v-model="form.telefono" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Código de referido: (opcional)" placeholder="" v-model="form.codigo_referido" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="password" :password="true" texto="Contraseña:" placeholder="" v-model="form.password" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="password" :password="true" texto="Repetir contraseña:" placeholder="" v-model="confirm_password" />
                        </div>
                        <div v-if="!test" class="col-12 mt-4">
                            <inputForm type="date" texto="Fecha de nacimiento: (opcional)" placeholder="" v-model="form.fecha_nacimiento" :maxlength="50" />
                        </div>
                        <div v-if="!test" class="col-12 mt-4">
                            <selectForm type="text" texto="Estado donde resides: (opcional)" :opciones="estados" v-model="form.estado" />
                        </div>
                        <div class="col-12 mt-4">
                            <div class="row w-100 m-0 pb-2 letra-gray3-17">Selecciona una o varias categorias de tu interes:</div>
                            <div class="row w-100 m-0 justify-content-start">
                                <div class="col-auto px-0 mx-1 my-1" v-for="c of categorias" :key="c.id" @click="set(c)">
                                    <div :class="cats.includes(c.id)?'back-color-azul1 letra-blanco-17':'letra-azul1-17'" class="row w-100 m-0 px-2 border-radius-5px border-azul1-1">{{c.name}}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="row m-0 w-100 px-3 mt-4">
                    <div class="col my-auto letra-gray4-13 p-0 pl-3">He leído y acepto los <a class="color-azul1" href="/terminos_condiciones" >Términos y Condiciones</a> y el <a class="color-azul1" href="/aviso_privacidad" >Aviso de privacidad</a> de SocialFlow</div>
                    <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto"  @click="acepto = !acepto"> 
                        <icono clase="letra-azul1-40 pt-5px" v-if="acepto" icono="check_box"  />
                        <icono clase="letra-gray3-40 pt-5px" v-else icono="check_box_outline_blank"  />
                    </div>

                    <div v-if="0" class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                        <toggle :checked="acepto" @change="acepto = !acepto" />
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="azul" texto="Registrarme" radius="30px" @click="save" />
                    </div>
                </div>
            </div>
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
                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'femenino', nombre: 'Femenino'},
                ],
                form:{
                    foto:  null,
                    nombre:     this.$store.getters.getFormRegistro.nombre,
                    email:      this.$store.getters.getFormRegistro.email,
                    telefono:   this.$store.getters.getFormRegistro.telefono,
                    password:   this.$store.getters.getFormRegistro.password,
                    genero:   'femenino',
                    estado:   'femenino',
                    codigo_referido:   null,
                    fecha_nacimiento:   null,
                },
                cats: [],
                confirm_password: null,
                acepto: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            categorias(){return this.$store.getters.getCatalogo('categorias');},
            estados(){return this.$store.getters.getCatalogo('estados');},
            session(){return this.$store.getters.getSession;},
            test(){return this.session.test },
        },
        
        mounted() {
            console.log("ESTADOS ESTADOS", this.estados);
            this.$store.dispatch('initData', [this.$f7]);
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
            save(){
                if(!this.form.nombre || !this.form.email || !this.form.password){
                    swal("","Por favor llene todos los campos","");
                    return;
                }

                if(!this.test){
                    if(!this.form.telefono){
                        swal("","ingresa tu teléfono","");
                        return;
                    }
                    if(this.form.telefono.length != 10){
                        swal("","Ingresa un teléfono valido","");
                        return;
                    }
                }
                
                if(this.form.password.length < 6){
                    swal("","La contraseña debe ser minimo de 6 caracteres","");
                    return;
                }
                if(this.form.password != this.confirm_password){
                    swal("", "Las contraseñas no coinciden","");
                    return;
                }

                if(!this.test){
                    if(!this.form.fecha_nacimiento && 0){
                        swal("", "Por favor ingresa tu fecha de nacimiento","");
                        return;
                    }else{
                        console.log("", moment().diff( this.form.fecha_nacimiento, 'years') );
                        if(moment().diff( this.form.fecha_nacimiento, 'years') < 14){
                            swal("", "No cuentas con la edad minima para registrarte","");
                            return;
                        }
                    }
                }

                if(!this.acepto){
                    swal("", "Debes aceptar los terminos y condiciones","");
                    return;
                }
                
                this.$store.dispatch('postRegistro',[this.form, this.cats]);
            }
          
        }
    }
</script>