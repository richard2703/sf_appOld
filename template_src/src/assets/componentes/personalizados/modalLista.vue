<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-2">
                    
                    <div class="row w-100 m-0 letra-gray3-18 px-3 py-2">Selecciona la wishlist a la que deseas agregar el producto: </div>

                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 h-max-50vh scroll-y border-t-gray1-1">
                            <div class="row w-100 m-0 " v-for="a of misListas " :key="a.id">
                                    <div class="row w-100 m-0 px-3 py-2 border-b-gray1-1" @click="select(a)">
                                        <div class="row w-100 m-0 py-2" >
                                            <div class="w-12vw h-12vw my-auto">
                                                <imagen clase="border-radius-15px" v-if="!a.imagen" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/w1.jpg" />
                                                <imagen clase="border-radius-15px" v-else :fit="true" :create="true" :src="a.imagen" />
                                            </div>
                                            <div class="col my-auto px-0 pl-3">
                                                <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                                            </div>
                                            <!-- <div class="col-auto px-0 my-auto" @click="nuevo(a)">
                                                <icono clase="letra-gray3-30 pt-3px" icono="add" />
                                            </div> -->
                                        </div>
                                        <div class="row w-100 m-0"></div>
                                        <!-- <div class="row w-100 m-0 px-3 ">
                                            <div class="row w-100 m-0 py-1" v-for="p of a.productos" :key="p.id">
                                                <div class="w-18vw h-18vw my-auto">
                                                    <imagen clase="border-radius-15px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                                    <imagen clase="border-radius-15px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/no.png" v-else />
                                                </div>
                                                <div class="col my-auto px-0 pl-3">
                                                    <div class="row w-100 m-0 letra-azul1-18">{{p.nombre}}</div>
                                                    <div class="row w-100 m-0 letra-gray4-18">{{p.precio | currency}}</div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-2 px-1">
                        <div class="col-12 px-1 pt-2">
                            <botonApp texto="Cancelar" tipo="gris" @click="closeModal()" />
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
            name: 'modalLista',
            razon: '',
            calificaion:0,
        };
    },
    props: ['emit','texto','boton'],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        misListas(){return this.$store.getters.userStateArray('misListas');},
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