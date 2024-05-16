<template>
<div class="row w-100 m-0">

    <modalMensajeFor
        v-if="open"
        @close="open=false"
        :titulo="null" 
        boton="Borrar mensaje"
        @click="borrar()"
    />

    <div class="row w-100 m-0 px-3"  v-if="m.usuarios_id!=session.id">
        <div class="p-2 my-2 mr-auto mensaje-usuario position-relative">
            <div class="row m-0 justify-content-rigth">
                <div class="col p-0 letra-gray-dark2-4-4vw white-space-preline">{{m.mensaje}}</div>
            </div>
            <div class="row w-100 px-2 m-0 my-auto pb-1 justify-content-end letra-gray-2-8vw">{{$store.getters.getFechaHora(m.fecha)}}</div>

            <div class="w-auto position-absolute top-1px right-3px" @click="open = 1" >
                <icono clase="letra-gray1-30" icono="more_horiz" />
            </div>
        </div>
    </div>
    <div class="row w-100 m-0 px-3" v-if="m.usuarios_id==session.id">
        <div class="w-auto p-2 my-2 ml-auto mensaje-propio position-relative "> 
            <div class="row m-0 justify-content-rigth mb-1">
                <div class="p-0 pr-2 letra-blanco-4-4vw white-space-preline">{{m.mensaje}}</div>
            </div>
            <div class="row px-2 m-0 my-auto py-0 justify-content-end letra-gray00-13">{{$store.getters.getFechaHora(m.fecha)}}</div>

            <div class="w-auto position-absolute top-1px right-3px" @click="open = 1" >
                <icono clase="letra-blanco-30" icono="more_horiz" />
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data(){
        return {
            open: 0,
        };
    },
    props:[
       'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        m(){return this.data || {} },
    },

    mounted() {
        this.send();
    },

    methods:{
        send(){
            console.log("ENVIAR LECTURA", this.m, this.m.usuarios_id == this.session.id, !this.m.leido);
            if(this.m.usuarios_id != this.session.id){
                if(!this.m.leido){
                    this.$store.dispatch('postLeerMsn',[this.m]);
                }
            }
        },
        borrar(){
            this.$store.dispatch('postLeerMsn', [this.m, 1]);
        },
    },
}
</script>