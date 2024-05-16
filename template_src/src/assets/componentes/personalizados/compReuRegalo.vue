<template>
<div @click="completar()" class="row w-100 m-0 position-relative">

    <div :class="lecCompleta?'':'border-gray3-2'" class="row w-100 m-0 carta  border-radius-20px overflow-hidden back-color-fondo">
        <div class="row w-100 m-0">
            <div class="row w-100 m-0 h-15vh" v-if="evento.imagen" >
                <imagen clase="" :create="true" :src="evento.imagen" :fit="true" />
            </div>
            <div class="row w-100 m-0 h-15vh" v-else >
                <imagen clase="" src="https://socialflow.app/backend/apiv1/img/b1.png" :fit="true" />
            </div>
        </div>
        <div class="row w-100 m-0 px-3 py-2">
            <div class="w-20vw h-20vw my-auto">
                <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
            </div>
            <div class="col pl-2 pr-0 my-auto">
                <div class="row w-100 m-0 letra-gray4-17 text-capitalize" v-if="deve">{{dx.id}}</div>
                <div class="row w-100 m-0 letra-gray4-17 text-capitalize" :class="lecCompleta?'':'fw-600 font-italic'" >{{usuario.nombre}}</div>
                <div class="row w-100 m-0 letra-gray3-15" :class="lecCompleta?'':'fw-600 font-italic'" >{{usuario.nombre}} te invito a su {{evento.tipo=='party'?'Regalo grupal':'Reunion'}}</div>
                <div class="row w-100 m-0 letra-gray3-13" :class="lecCompleta?'':'fw-600 font-italic'" >{{evento.nombre}} el {{[evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
            </div>
        </div>
    </div>
   
</div>
</template>
<script>
export default {

    data(){
        return {
            tab: null,
            
        };
    },
    props:  [
        'data',
        'vista',
    ],
    computed: {
        deve(){return this.$store.getters.deve;},
        router(){return this.$store.getters.getRouter;},

        session(){return this.$store.getters.getSession;},
        dx(){return this.data || {};},
        evento(){return this.dx.evento || {};},
        usuario(){return this.dx.usuario || {};},

        prelecturas(){return this.$store.getters.getCatalogo('notificacionesPreLeidasVista') },
        preLec(){return this.prelecturas.some(s=>s.vista == this.vista && s.valor == this.dx.id ) },
        lecCompleta(){return this.prelecturas.some(s=>s.vista == this.vista && s.valor == this.dx.id && s.completa ) }
    },

    mounted(){
        console.log("REU REGALO ACTIVE", this.vista, this.preLec, this.dx.id );
        this.preleer();
    },

    methods:{
        preleer(id){
            let d = {
                id:     this.dx.id,
                creado: this.dx.creado,
            };
            if(!this.preLec){
                this.$store.dispatch('postLeerNotification',[ this.dx.id, this.dx.creado, 1, this.vista ]);
            }
        }, 
        
        completar(){
            this.$emit('click', this.dx);
            console.log("COMPLETANDO LECTURA");
            let d = {
                id:     this.dx.id,
                creado: this.dx.creado,
            };
            if(!this.lecCompleta){
                this.$store.dispatch('postLeerNotification',[ this.dx.id, this.dx.creado, 5, this.vista ]);
            }
        },
    },
}
</script>