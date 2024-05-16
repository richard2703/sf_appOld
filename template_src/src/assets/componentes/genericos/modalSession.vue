<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-1" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px mt-80px px-3 pt-40px" @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3  border-radius-15px overflow-hidden">
            <div class="row w-100 m-0 pb-3">
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 justify-content-center py-2 px-2">
                        <div class="col-12 py-2 text-center px-2" v-if="titulo">
                            <div class="row w-100 m-0 letra-gray-dark-5-1vw fw-800 justify-content-center">{{titulo}}</div>
                        </div>
                        <div class="col-12 text-center letra-gray3-18 p-0 px-3">Debes iniciar sesión o crear una cuenta para continuar:</div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0 back-color-blanco pb-3 px-2">
                <div class="row w-100 m-0" >
                    <div class="col-6 pl-0 pr-2" @click="registro()">
                        <botonApp tipo="gris" texto="Crea una cuenta" radius="30px" />
                    </div>
                    <div class="col-6 pl-2 pr-0" @click="logout()">
                        <botonApp tipo="azul" texto="Inicia sesión" radius="30px" />
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
            name: 'modalSession',
            razon: '',
        };
    },
    props: ['titulo','texto','info','descripcion','boton','cuenta','oneButton','custom'],
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