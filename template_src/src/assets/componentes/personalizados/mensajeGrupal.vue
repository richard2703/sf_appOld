<template>
<div class="w-auto" @click="click()">
   <div class="p-2 my-2 mr-auto mensaje-usuario">
        <div class="row w-100 m-0 letra-link-14 pl-3 justify-content-start " v-if="data.usuarios_id == evento.usuarios_id">{{creador.nombre}}</div>
        <div class="row w-100 m-0 letra-link-14 pl-3 justify-content-start " v-else >{{usuario.nombre}}</div>
        <div class="row m-0 justify-content-rigth">
            <div class="col p-0 letra-gray-dark2-4-4vw white-space-preline">{{data.mensaje}}</div>
        </div>
        <div class="row w-100 px-2 m-0 my-auto pb-1 justify-content-end letra-gray-2-8vw">{{$store.getters.getFechaHora(data.fecha)}}</div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props:[
       'mensaje',
       'grupo',
       'e',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        data(){return this.mensaje || {} },
        evento(){return this.e || {} },
        usuarios(){return (this.grupo || {}).usuarios || [] },
        usuario(){ return (this.usuarios.find(x=>x.usuarios_id == this.data.usuarios_id) || {}).usuario || {}},
        creador(){ return this.grupo.usuario || {} },
    },
    mounted() {
        this.send();
    },

    methods:{
        send(){
            console.log("ENVIAR LECTURA", this.data, this.data.usuarios_id == this.session.id, !this.data.leido);
            if(this.data.usuarios_id != this.session.id){
                if(!this.data.leido){
                    this.$store.dispatch('postLeerMsn',[this.data]);
                }
            }
        }
    },
}
</script>