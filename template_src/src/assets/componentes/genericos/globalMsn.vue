<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-1 global-msn" v-if="state" @click.self="closeModal()">
        <div class="row w-100 m-0px mt-60px px-2 pt-40px" @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-blanco pt-3 border-radius-8px overflow-hidden">
            <div class="row w-100 m-0 pb-3">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="row w-100 m-0 justify-content-center" v-if="a.icono=='success'">
                        <div class="w-80px h-80px border-radius-50 overflow-hidden border-azul1-3 text-center align-content-center">
                            <div class="row w-100 m-0 justify-content-center text-center ">
                                <icono icono="done_outline" clase="letra-azul1-49 fw-800 mt-11px " />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 px-0">
                    <div class="row w-100 m-0 justify-content-center py-2">
                       <div class="row w-100 m-0 px-3 letra-gray3-17 justify-content-center text-center white-space-preline">{{a.texto}}</div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0 back-color-blanco">

                <div class="row w-100 m-0 justify-content-center pb-3" v-if="a.texto == '¡Listo!\nTu pedido ha sido realizado con éxito.\nPuedes verlo en tu cuenta'">
                    <div class="col-6 px-1" v-if="qr" @click="verQr()">
                        <botonApp py="py-9px" texto="Ver qr" />
                    </div>
                    <div class="col-6 px-1 real" @click="click()">
                        <botonApp py="py-9px" radius="10px" tipo="azul" :texto="a.boton" />
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center pb-3 one-one" v-else-if="a.one">
                    <div class="col-7 px-0" @click="click()">
                        <botonApp py="py-9px" tipo="azul" :texto="a.boton" />
                    </div>
                </div>
                
                <div class="row w-100 m-0" v-else-if="a.cuenta">
                    <div class="col-6 pl-0 pr-2" @click="registro()">
                        <botonApp clase="back-color-blanco" :outline="true" texto="Crea una cuenta" radius="30px"></botonApp>
                    </div>
                    <div class="col-6 pl-2 pr-0" @click="logout()">
                        <botonApp texto="Inicia sesión" radius="30px"></botonApp>
                    </div>
                </div>

                <div class="row w-100 m-0 px-2 pb-3" v-else-if="a.boton=='Finalizar pedido'">
                    <div class="col px-2" @click="closeModal()">
                        <botonApp clase="back-color-blanco" tipo="gris" py="py-8px" texto="Agregar mas" radius="5px" />
                    </div>
                    <div class="col px-2" @click="goCarrito()">
                        <botonApp tipo="azul" texto="Finalizar pedido" py="py-8px" radius="5px" />
                    </div>
                </div>
                <div class="row w-100 m-0 last-last" v-else>
                    <div class="col-6 px-0" @click="closeModal()">
                        <botonApp :outline="true"  texto="Cancelar" radius="0px"></botonApp>
                    </div>
                    <div class="col-6 px-0" @click="click()">
                        <botonApp :texto="a.boton" tipo="azul" side="br" radius="0px"></botonApp>
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
            name: 'globalMsn',
            razon: '',
        };
    },
    props: [],
    computed: {
        router(){return this.$store.getters.getRouter;},
        state() {return this.$store.getters.getModal(this.name)},
        a() {return this.$store.getters.getMsn || {}},
        qr(){ return (this.$store.getters.carritoArray('productosComprados').find(x=>{return x.product_type == '2'}) || {}).code || null },
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

        verQr(){
            this.$store.commit('openModal',['modalQr']);
            this.closeModal();
        },

        goCarrito(){
            this.router.navigate('/carrito', {reloadCurrent: true});
            this.closeModal();
        },

        click(){
            if(this.a.fn){
                this.a.fn();
            }
            else{
                this.$emit('click');
            }
            this.closeModal();
        }
    },
}
</script>