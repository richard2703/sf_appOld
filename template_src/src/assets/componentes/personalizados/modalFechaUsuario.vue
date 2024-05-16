<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3 mt-5 pt-5">
           <div class="row w-100 m-0 carta overflow-hidden border-radius-20px back-color-fondo border-azul1-2 ">
                <div class="row w-100 m-0 position-relative">
                    <div class="row w-100 m-0 h-15vh" v-if="f.data.imagen">
                        <imagen clase="" :create="true" :src="f.data.imagen" :fit="true" />
                    </div>
                    <div class="row w-100 m-0 h-15vh" v-else>
                        <imagen clase="" src="https://socialflow.app/backend/apiv1/img/b1.png" :fit="true" />
                    </div>
                    <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                    </div>
                    <div class="w-auto position-absolute right-0px top-0px z-10000000" @click="closeModal()">
                        <icono icono="clear" clase="letra-rojo-40 fw-600" />
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen :clase="`border-radius-50 border-${f.data.usuario.nivel}-3`" :user="true" :src="f.data.usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} agrego la fecha {{f.data.nombre}}</div>
                        <div class="row w-100 m-0 letra-azul1-13">Agregado {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                </div>
                <div class="row w-100 m-0 py-2">
                    <div class="col pl-3 pr-0">
                        <div class="row w-100 m-0 letra-gray4-17">{{f.data.nombre}}</div>
                        <div class="row w-100 m-0 pr-3">
                            <div class="col px-0 letra-azul1-17 text-capitalize">{{[f.data.fecha, 'YYYY-MM-DD'] | moment('DD/MMMM/YYYY')}}</div>

                            <div class="col-auto px-0 letra-azul1-17" @click="verDeseosFecha(f.data)">Ver wishlist</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
const moment = require('moment');
export default {
    props:[
        'data',
    ],
    data(){
        return {
            name: 'modalFechaUsuario',
        };
    },
   
    computed:{
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        f() {return this.data || {}},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        verDeseosFecha(e){
            this.$store.dispatch('verDeseosFecha', [e]);

            // this.closeModal();
            // this.$store.commit('setUsuarioData', ['amigo',e.id]);
            // this.router.navigate('/deseos_fechas_amigos');
        },
    },
}
</script>