<template>
<div class="transaccion componente row w-100 m-0 py-2" v-if="form.tipo=='reunion'">
    <div class="row w-100 m-0 mt-4 px-3 back-color-blanco">
        <div class="row w-100 m-0 pt-3" @click="updating('/seleciconar_wishlist_reunion')">
            <div :class="`row w-100 m-0 letra-${form.tipo=='reunion'?'rojo2':'azul1'}-19 fw-800`">Mi Wishlist</div>
        </div>
        <div class="row w-100 m-0 pb-3" >
            <div class="row w-100 m-0 letra-gray3-15" v-if="!form.lista_id" @click="updating('/seleciconar_wishlist_reunion')" >
                <div class="col-auto px-0">Si la Reunión es para ti, de manera opcional puedes agregar una WISHLIST, de esta forma tus invitados sabrán que regalarte si así lo desean. Si estás organizando ésta Reunión para alguien mas, te sugerimos adicionalmente organizar un REGALO GRUPAL para el festejado, al guardar esta Reunión. </div>
            </div>
            <div class="row w-100 m-0 pt-2" v-if="!form.lista_id" @click="updating('/seleciconar_wishlist_reunion')" >
                <div class="col-auto ml-auto px-0 letra-azul1-18 border-b-azul1-1 ">Agregar wishlist</div>
            </div>
            <div class="row w-100 m-0 pt-2 letra-gray3-16" v-else @click="updating('/seleciconar_wishlist_reunion')" >
                <div class="row w-100 m-0">
                    <div class="w-12vw h-12vw my-auto">
                        <imagen clase="border-radius-5px" :fit="true" :create="true" :src="lista.imagen" />
                    </div>
                    <div class="col my-auto px-0 pl-3">
                        <div class="row w-100 m-0 letra-azul1-18">{{lista.nombre}}</div>
                    </div>
                    <div class="col-auto my-auto px-0 pl-2" >
                        <div class="row w-100 m-0 pt-2" >
                            <div class="w-37px border-radius-5px back-color-gray3 py-1 justify-content-center text-center" @click.stop="remove()" >
                                <icono icono="close" clase="letra-blanco-20 pt-4px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
const moment = require('moment');
export default {
    props:[

    ],
    data(){
        return {
        };
    },
    
    computed:{
        router(){return this.$store.getters.getRouter;},
        form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
        nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},
        misListas(){return this.$store.getters.userStateArray('misListas');},
        lista(){return this.misListas.find(x=>{return x.id == this.form.lista_id && x.type == this.form.lista_tipo}) || {}},

    },
    mounted() {
        console.log("THIS:FORM", this.form, this.lista);
    },
    methods:{
        click(){
            this.$emit('click');
        },
        tomar(){
            this.$store.dispatch('postTomarViaje', this.servicio.id);
        },
        remove(){
            this.form.lista_id = null;
            this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
        },
        updating(ruta){
            console.log("UPDATING", this.form);
            if(ruta){
                this.router.navigate(ruta);
            }
        },
    },
}
</script>