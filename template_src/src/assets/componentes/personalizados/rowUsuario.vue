<template>
<div class="row w-100 m-0" @click="click()">
    <div class="row w-100 m-0 px-3">
        <div class="row w-100 m-0 py-3 px-2 border-radius-10px carta">
            <div class="row w-100 m-0 pb-2 back-color-blanco justify-content-start">
                <div class="row w-100 m-0 pb-1 justify-content-start">
                    <div class="w-10vw my-auto px-1">
                        <imagen clase="" :icono="true" src="pin" />
                    </div>
                    <div class="col my-auto px-1">
                        <div class="row w-100 m-0 letra-gray4-16">Viaje #{{servicio.id}}</div>
                        <div class="row w-100 m-0 letra-gray3-13 justify-content-start text-align-left">{{servicio.calle}} - {{destino.calle}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">{{[servicio.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD/MM/YY')}}</div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0 ">
                <div class="col-auto my-auto px-0">
                    <div class="w-20vw h-20vw border-radius-10px overflow-hidden">
                        <imagen :fit="true" :user="true" :src="usuario.foto" />
                    </div>
                </div>
                <div class="col my-auto pl-3 pr-0">
                    <div class="row w-100 m-0 letra-gray4-16 fw-800">{{usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 text-capitalize">{{servicio.tipo_pago}}</div>
                    <div class="row w-100 m-0 letra-verde4-18 fw-800">{{servicio.total | currency}} MXN</div>
                    <div class="row w-100 m-0 py-2 letra-gray3-16 justify-content-start">
                        <div class="col-auto my-auto px-0 pr-2">
                            <div class="row w-100 m-0 justify-content-start">
                                <div class="col-auto px-0 position-relative">
                                    <div class="w-41px h-41px border-radius-50 back-color-verde4" @click="$store.commit('openChatUsuario',[servicio.id, usuario.id])">
                                        <icono icono="chat_bubble_outline" class="letra-blanco-25 pt-6px" />
                                    </div>
                                    <div class="w-20px h-20px position-absolute top--4px right--8px back-color-verde3 border-radius-50 " v-if="servicio.nuevoMensaje" ></div>
                                </div>
                                <div class="col-auto px-0 pl-3" @click="$store.dispatch('call',usuario.telefono)">
                                    <div class="w-41px h-41px border-radius-50 back-color-verde4">
                                        <icono icono="local_phone" class="letra-blanco-25 pt-6px" />
                                    </div>
                                </div>
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
export default {
    data(){
        return {
            detalles: false,
        };
    },
    props:[
       
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        servicio(){return this.$store.getters.servicioObject('servicio');},
        chofer(){return this.servicio.chofer || {}},
        usuario(){return this.servicio.usuario || {}},
        destino(){return this.servicio.destino || {}},
    },
    methods:{
        click(){
        },
    },
}
</script>