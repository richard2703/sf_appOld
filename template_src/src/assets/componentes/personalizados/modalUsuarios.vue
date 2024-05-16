<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-2">
                    

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0">
                                <div class="w-22vw px-0 py-2" v-for="u of usuarios" :key="u.id">
                                    <div class="row w-100 m-0">
                                        <div class="w-17vw h-17vw mx-auto">
                                           <imagen clase="border-radius-50 overflow-hidden" :user="true" :src="u.usuario.foto" />
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 pt-2 letra-gray3-12 justify-content-center text-center">{{u.usuario.nombre | truncate(14) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-2 px-1">
                        <div class="col-12 px-1 pt-2">
                            <botonApp texto="Aceptar" tipo="azul" radius="15px" @click="closeModal()" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
import imagen from '../genericos/imagen.vue';
export default {
  components: { imagen },
    data(){
        return {
            name: 'modalUsuarios',
            razon: '',
            calificaion:0,
        };
    },

    props: [
        'u',
        'texto',
        'boton'
    ],

    computed: {
        state(){return this.$store.getters.getModal(this.name)},
        usuarios(){return this.u || [];},
    },

    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        next(){
            if(!this.razon){
                swal("","Ingresa el motivo de no entrega","");
                return;
            }
            this.closeModal();
            this.$emit('click', this.razon);
        },
        nuevo(id){
            this.$store.commit('setUsuarioData',['lista', id]);
            this.router.navigate('/nuevo_producto');
        },
        select(a){
            this.$store.dispatch('postAgregarProductoLista', a );
            this.closeModal();
        }
    },
}
</script>