<template>
<div class="row w-100 m-0" :class="show?'':''" >
    
    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1 " v-if="f.tipo=='2'" @click="set(f.data)">
        <div class="row w-100 m-0 overflow-hidden" > 
            <!-- <div class="row w-100 m-0 position-relative">
                <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px text-capitalize">{{f.data.evento.tipo}}</div>
                </div>
            </div> -->

            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.tipo == 'party'" >Esta solicitando cooperar para el regalo grupal {{f.data.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.tipo == 'reunion'" >Esta solicitando cooperar para la reunion {{f.data.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-13">El {{[f.data.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='s'" @click="setS(f)" >
        <div class="row w-100 m-0 px-2 py-2">
            <div class="row w-100 m-0 overflow-hidden border-radius-20px ">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.amigos_id == session.id">Te envio solicitud de amistad</div>
                        <div class="row w-100 m-0 letra-gray3-15" v-if="f.data.usuarios_id == session.id">Acepto tu solicitud de amistad</div>
                        <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.modificado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='3'" @click="verDeseosFecha(f.data)" >
        <div class="row w-100 m-0 px-2 py-2">
            <div class="row w-100 m-0 overflow-hidden border-radius-20px ">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">Agrego la fecha {{f.data.nombre}}</div>
                        <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Fecha</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='4'" @click="set(f.data)" >
        <div class="row w-100 m-0 border-radius-20px overflow-hidden  " >
            <!-- <div class="row w-100 m-0 position-relative">
                <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px text-capitalize">{{f.data.evento.tipo}}</div>
                </div>
            </div> -->

            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17">{{usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">Creo {{f.data.tipo=='party'?'un regalo grupal':'una reunion'}}</div>
                    <div class="row w-100 m-0 letra-gray3-13">{{f.data.nombre}} el {{[f.data.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>
        </div>
    </div>


    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" v-if="f.tipo=='5'" @click="verDeseosLista(f.data)" >
        <div class="row w-100 m-0">
            <div class="row w-100 m-0 position-relative">
                <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                    <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Wishlist</div>
                </div> -->
            </div>
            <div class="row w-100 m-0 px-3 py-2">
                <div class="w-20vw h-20vw my-auto">
                    <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                </div>
                <div class="col pl-3 pr-0 my-auto">
                    <div class="row w-100 m-0 letra-gray4-17 text-capitalize">{{usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">Agrego una nueva wishlist: {{f.data.nombre}}</div>
                    <div class="row w-100 m-0 letra-azul1-13">Agregado hace {{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="row w-100 m-0 forfor border-b-gray0-1" v-if="f.tipo=='7'" @click="verRegalo(f.data)" >
        <div class="row w-100 m-0 px-3 py-2">
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-2 position-relative">
                    <div class="w-20vw h-20vw my-auto">
                        <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                    </div>
                    <div class="col pl-3 pr-0 my-auto">
                        <div class="row w-100 m-0 letra-gray4-17">{{usuario.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray3-15">{{usuario.nombre}} te hizo un regalo</div>
                        <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 position-absolute top-0px left-0px">
                        <div class="col-auto px-3 back-color-azul1 letra-blanco-15 border-br-radius-15px">Regalo</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
const lx = 'idsNotiStorage';
export default {
    props:[
       'data',
       'perfil',
    ],
    data(){
        return {
            info:{},
            detalles: false,
            ids: JSON.parse((localStorage.getItem(lx))) || [],
        };
    },
    computed:{
        session(){return this.$store.getters.getSession;},
        usuario(){return this.perfil;},
        router(){return this.$store.getters.getRouter;},
        f(){return this.data || {}},
        show(){return !this.ids.includes(this.f.data.id) }
    },
    
    methods:{
        insert(id){
            this.ids.push(id);
            localStorage.setItem(lx, JSON.stringify(this.ids))
        },

        verRegalo(e){
            // this.info = e;
            // this.$emit('info',e);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', e.id]);
            // this.$store.commit('openModal',['modalRegalo']);
            // this.insert(e.id);
        },

        set(f){
            // this.info = f;
            // this.$emit('info',f);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.id]);
            // this.$store.commit('openModal', ['modalParty']);
            // this.insert(f.id);
            // console.log("XXXX", "PARTY");
            
        },

        setS(f){
            // this.$emit('info',f);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.data.id]);
            // this.insert(f.data.id);
            // console.log("INSERTING");
            // this.router.navigate('/solicitudes_amistad');
        },

        setF(f){
            // this.info = f;
            // this.$emit('info',f);
            // this.$store.commit('updateCatalogosArray', ['notificacionesLeidas', f.data.id]);
            // this.$store.commit('openModal', ['modalFechaUsuario']);
            // this.insert(f.data.id);
            // console.log("FECHANDO DDD", "PARTY");
            
        },

        verDeseosLista(e){
            this.$emit('verDeseosLista',e);
        },

        verDeseosFecha(e){
            console.log("FECHA FECHA FECHA");
            this.$emit('verDeseosFecha',e);
        },
    },
}
</script>