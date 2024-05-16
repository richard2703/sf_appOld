<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3 pt-5">
           <div class="row w-100 m-0 back-color-blanco border-radius-10px position-relative">

                <div class="w-auto position-absolute right-5px top-5px z-100" @click="closeModal()">
                    <icono icono="clear" clase="letra-rojo2-40 fw-600" />
                </div>

               <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen :clase="`border-radius-50 `" :create="true" :src="eventos.imagen" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17" v-if="eventos.nombre" >{{eventos.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-if="eventos.nombre" >Te hicieron un regalo grupal</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-else>Te hicieron un regalo</div>
                        <div class="row w-100 m-0 letra-azul1-13">{{[data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                        <rowRegaloSelectDireccion @close="closeModal"  :data="data" />
                    </div>
                    <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-rojo letra-blanco-15 border-br-radius-15px">Regalo</div>
                    </div>
                </div>

                <div class="row w-100 m-0 pl-3 pt-3" >
                    <div class="row w-100 m-0 letra-gray3-15">Creador</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 px-3 py-2"  >
                            <div class="w-13vw h-13vw">
                                <imagen clase="border-radius-50" :create="0" :src="creador.foto" :fit="true" />
                            </div>
                            <div class="col my-auto px-0 pl-2">
                                <div class="row w-100 m-0 letra-gray4-16">{{creador.nombre}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 py-2">
                    <div class="row w-100 m-0 py-2 pl-3" v-if="1" >
                        <div class="row w-100 m-0" v-if=" productos && productos.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Productos</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2" v-for="u of productos" :key="u.id">
                                    <div class="w-12vw h-12vw">
                                        <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{u.nombre}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pb-2 pl-3" v-if="1" >
                        <div class="row w-100 m-0" v-if=" users && users.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Usuarios</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2" v-for="u of users" :key="u.id">
                                    <div class="w-12vw h-12vw">
                                        <imagen clase="border-radius-50" :create="1" :src="u.foto" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-16">{{u.nombre}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-3 pb-2 " @click="router.navigate('/regalos_amigos')" v-if="0" >
                        <div class="col-7 px-0 ml-auto ">
                            <botonApp texto="Ir a regalos" tipo="azul" radius="30px" />
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-2 pb-2 pt-3 " @click="closeModal()" v-if="1" >
                        <div class="col-11 px-0 mx-auto ">
                            <botonApp texto="Aceptar" tipo="azul" radius="30px" />
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
    props: [
        'data',
    ],
    data(){
        return {
            name: 'modalRegalo',
            razon: '',
            calificaion:0,
            cantidad:null,
        };
    },
    computed: {
        router(){return this.$store.getters.getRouter;},

        state() {return this.$store.getters.getModal(this.name)},

        eventos(){return this.data.eventos || []},
        productos(){ return this.data.productos || {} },
        creador(){ return this.data.usuario || {} },
        users(){ return this.data.users || {} },

        a(){ return this.grupo || {}},
     
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        click(){
            swal("","Solicitud enviada","success");
            this.closeModal();
            // this.$emit('click', this.cantidad);
        },
    },
}
</script>