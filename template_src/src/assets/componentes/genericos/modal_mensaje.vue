<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal-aplicar-front w-100 m-0 p-0 justify-content-center px-1" v-if="state" @click.self="closeModal()" >
        <div class="row w-100 m-0px mt-80px px-3 pt-40px" @click.self="closeModal()" > 

            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3  border-radius-15px overflow-hidden">
            <div class="row w-100 m-0 pb-3">
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 justify-content-center py-2" v-if="titulo || texto">
                        <div class="col-12 py-2 text-center px-2" v-if="titulo">
                            <div class="row w-100 m-0 letra-gray-dark-5-1vw fw-800 justify-content-center">{{titulo}}</div>
                        </div>
                        <div class="col-12 text-center letra-gray3-4-5vw p-0 px-2" v-if="texto">{{texto}}</div>
                        <div class="col-12 text-center letra-azul1-4-5vw p-0 px-2 py-2" v-if="texto2">{{texto2}}</div>
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

                    <template v-if="boton=='Explorar'" >
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 justify-content-center px-3">
                                <div class="col-auto px-0 " @click="check = !check" >
                                    <icono :icono="check?'check_box':'check_box_outline_blank'" :clase="check?'letra-azul1-30':'letra-gray3-30'" />
                                </div>
                                <div class="col-auto px-0 pt-2px pl-2 justify-content-start text-left letra-gray4-18 ">No volver a mostrar este mensaje</div>
                            </div>
                        </div>
                    </template>

                </div>
            </div>
            <div class="row w-100 m-0 back-color-blanco pb-3 px-2">
                <div class="row w-100 m-0" v-if="oneButton && boton == 'Explorar'">
                    <div class="col-12 px-2" @click="closeModal(); check? $emit('clickx') : $emit('click')">
                        <botonApp tipo="azul" radius="35px" :texto="boton" />
                    </div>
                    <div v-if="0" class="col-12 px-2 pt-3" @click="closeModal(); $emit('clickx')">
                        <botonApp tipo="azul" radius="35px" :texto="'Ok, no volver a mostrar este mensaje'" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else-if="oneButton">
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
                <div class="row w-100 m-0" v-else-if="invertir">
                    <div class="col-6 px-1" @click="click()">
                        <botonApp :texto="boton" :tipo="colorA || 'azul'" radius="30px" />
                    </div>
                    <div class="col-6 px-1" @click="closeModal()">
                        <botonApp :tipo="colorC || 'gris'" :texto="cancelBoton || 'Cancelar'" radius="30px" />
                    </div>
                </div>
                <div class="row w-100 m-0" v-else>
                    <div class="col-6 px-1" @click="closeModal()">
                        <botonApp :tipo="colorC || 'gris'" :texto="cancelBoton || 'Cancelar'" radius="30px" />
                    </div>
                    <div class="col-6 px-1" @click="click()">
                        <botonApp :texto="boton" :tipo="colorA || 'azul'" radius="30px" />
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
            check: 0,
        };
    },
    props: [
        'titulo',
        'texto',
        'texto2',
        'info',
        'descripcion',
        'boton',
        'cancelBoton',
        'cuenta',
        'colorC',
        'colorA',
        'invertir',
        'oneButton',
        'custom'
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
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