<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal-aplicar-front w-100 m-0 p-0 justify-content-center px-1" @click.self="closeModal()">
        <div class="row w-100 m-0px mt-80px px-3 pt-40px" @click.self="closeModal()">

            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3 border-radius-15px overflow-hidden">
                <template v-if="titulo == 'share'">
                        <div class="row w-100 m-0">
                            <share />
                        </div>
                </template>
                
                <template v-else >
                    <div class="row w-100 m-0" >
                        <div class="row w-100 m-0 px-0">
                            <div class="row w-100 m-0 justify-content-center py-2 pb-3" v-if="titulo || texto">
                                <div class="col-11 mx-auto px-2 py-2 text-center " v-if="titulo">
                                    <div class="row w-100 m-0 letra-gray-dark-20 fw-600 justify-content-center">{{titulo}}</div>
                                </div>
                                <div class="col-11 mx-auto text-center letra-gray3-20 p-0 px-2" v-if="texto">{{texto}}</div>
                                <div class="col-11 mx-auto text-center letra-azul1-18 p-0 px-2 py-2" v-if="texto2">{{texto2}}</div>
                            </div>
                            <div class="row w-100 m-0" v-if="info">
                                <div class="col-12 mt-3">
                                    <p class="letra-gray-light-4-4vw m-0 mb-2">{{descripcion}}</p>
                                    <textarea type="text" rows="5" class="regular-textarea w-100 m-0" placeholder="Descripción" @input="$emit('input',razon)" v-model="razon"></textarea>
                                </div>
                            </div>
                            <div class="row w-100 m-0" v-if="custom">
                                <slot></slot>
                            </div>
                        </div>
                    </div>
                </template>

            <div class="row w-100 m-0 back-color-blanco pb-3 px-2">
                <div class="row w-100 m-0" v-if="oneButton">
                    <div class="col-12 px-2" @click="closeModal(); $emit('click')">
                        <botonApp tipo="azul" radius="35px" :texto="boton" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="cuenta">
                    <div class="col-6 pl-0 pr-2" @click="registro()">
                        <boton-app clase="back-color-blanco" :outline="true" texto="Crea una cuenta" radius="30px"></boton-app>
                    </div>
                    <div class="col-6 pl-2 pr-0" @click="logout()">
                        <boton-app texto="Inicia sesión" radius="30px"></boton-app>
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="!titulo && !texto">
                    <div class="col-4 px-1" @click="closeModal()">
                        <botonApp tipo="gris" :texto="cancelBoton || 'Cancelar'" radius="30px" />
                    </div>
                    <div class="col-8 px-1" @click="click()">
                        <botonApp :texto="boton" tipo="azul" radius="30px" />
                    </div>
                </div>
                
                <div class="row w-100 m-0" v-else>
                    <div class="col-6 px-1" @click="closeModal()">
                        <botonApp tipo="gris" :texto="cancelBoton || 'Cancelar'" radius="30px" />
                    </div>
                    <div class="col-6 px-1" @click="click()">
                        <botonApp :texto="boton" tipo="azul" radius="30px" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
export default {
    data(){
        return {
            name: 'modalMensaje',
            razon: '',
        };
    },
    props: [
        'state',
        'titulo',
        'texto',
        'texto2',
        'info',
        'descripcion',
        'boton',
        'cancelBoton',
        'cuenta',
        'oneButton',
        'custom'
    ],
    
    computed: {
    },

    methods:{
        closeModal(){
            this.$emit('close');
        },
        logout(){
            this.$store.commit('logout');
            this.closeModal();
        },
       
        registro(){
            this.$store.commit('logout');
            this.$store.getters.getRouterView('login').navigate('/registro');
            this.closeModal();
        },
        click(){
            this.$emit('click');
            this.closeModal();
        }
    },
}
</script>