<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 justify-content-center pt-2">
                        <div class="col-12 px-1 mt-2 text-center">
                            <div class="row w-100 m-0 letra-gray4-5-1vw fw-800 justify-content-center">Realizar cobro:</div>
                            <div class="row w-100 m-0 letra-gray3-4-1vw fw-800 justify-content-center py-2">Confirma la cantidad que deseas cobrar a tus amigos.</div>
                        </div>
                    </div>
                    <div class="ro w-100 m-0" v-if="total"></div>
                    <div class="row w-100 m-0 px-1">
                        <div class="row w-100 m-0 px-2 py-2 letra-azul1-28 fw-600 justify-content-center text-center">
                            <div class="col-auto my-auto px-0">{{total | currency}}</div>
                            <div class="col-auto my-auto px-0">MXN</div>
                        </div>
                        <template v-if="grupo && grupo.id">
                            <div class="row w-100 m-0 pt-2 letra-gray4-5-1vw fw-800 justify-content-center">Para Party:</div>
                            <div class="row w-100 m-0 py-2">
                                <div class="row w-100 m-0 justify-content-center">
                                    <div class="h-20vw w-20vw border-radius-50 overflow-hidden back-color-azul1 text-center">
                                        <icono icono="group" clase="letra-blanco-50 pt-11px" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 letra-azul1-22 px-2 pt-2 justify-content-center text-center">{{grupo.nombre}}</div>
                            </div>
                        </template>
                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0  justify-content-center">
                                <div class="col px-0 my-auto letra-gray4-16">Total de usuarios</div>
                                <div class="col-auto px-0 my-auto pl-2 letra-azul1-20">{{ l }}</div>
                            </div>
                            <div class="row w-100 m-0  justify-content-center">
                                <div class="col px-0 my-auto letra-gray4-16">Se cobrara al los usuarios</div>
                                <div class="col-auto px-0 my-auto pl-2 letra-azul1-20">{{ Math.round(total/l) | currency }}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 scroll-y h-max-20vh">
                            <div class="row w-100 m-0 px-1 py-1" v-for="u of a.usuarios" :key="u.id">
                                <div class="w-8vw h-8vw my-auto">
                                    <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email}}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row w-100 m-0 pt-3 justify-content-space-between">

                        <div class="col-6 px-1">
                            <botonApp tipo="gris" texto="Cancelar" radius="30px" @click="cancelar()" />
                        </div>
                        <div class="col-6 px-1">
                            <botonApp texto="Confirmar" tipo="azul" radius="30px" @click="click()" />
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
        'usuario',
        'grupo',
        'transaccion',
        'boton'
    ],
    data(){
        return {
            name: 'modalConfirmar',
            razon: '',
            calificaion:0,
            cantidad:null,
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        contactos(){return this.grupo.usuarios || []},
        a(){ return this.grupo || {}},
        l(){return (this.a.usuarios || []).length + 1},
        total(){
            let t = 0;
            this.a.gastos.map(x=>{
                t = t + Number(x.precio);
            });
            return t;
        },
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },
        click(){
            this.$store.dispatch( 'postEnviarCobro', [ this.a , Number( this.total / this.l ) ] );
            this.closeModal();
        },
    },
}
</script>