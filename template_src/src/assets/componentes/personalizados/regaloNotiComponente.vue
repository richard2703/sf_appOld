<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="row w-100 m-0">

        <div class="row w-100 m-0 forfor"  @click="verRegalo(f.data)">
            <div class="row w-100 m-0 px-3 py-2" v-if="f.data.eventos_id">
                <div class="row w-100 m-0 carta border-radius-20px back-color-fondo overflow-hidden border-rojo-2 ">
                    
                    <div class="row w-100 m-0 px-3 py-2 position-relative">
                        <div class="w-20vw h-20vw my-auto">
                            <imagen :clase="`border-radius-50 `" :create="true" :src="eventos.imagen" :fit="true" />
                        </div>
                        <div class="col pl-3 pr-0 my-auto">
                            <div class="row w-100 m-0 letra-gray4-17">{{eventos.nombre}}</div>
                            <div class="row w-100 m-0 letra-gray3-15">Te hicieron un regalo grupal</div>
                            <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                            
                        </div>
                        <div class="row w-100 m-0 position-absolute top-0px left-0px">
                            <div class="col-auto px-3 back-color-rojo letra-blanco-15 border-br-radius-15px">Regalo</div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 pb-2 pl-3">
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
                    <div class="row w-100 m-0 py-2 pl-3" v-if="0" >
                        <div class="row w-100 m-0" v-if=" productos && productos.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Productos</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2" v-for="u of productos" :key="u.id">
                                    <div class="w-10vw h-10vw">
                                        <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{u.nombre}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pb-2 pl-3" v-if="0" >
                        <div class="row w-100 m-0" v-if=" users && users.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Usuarios</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2" v-for="u of users" :key="u.id">
                                    <div class="w-6vw h-6vw">
                                        <imagen clase="border-radius-50" :create="1" :src="u.foto" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-16">{{u.nombre}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>

            <div class="row w-100 m-0 px-3 py-2" v-else >
                <div class="row w-100 m-0 carta border-radius-20px back-color-fondo overflow-hidden border-rojo-2 ">
                    <div class="row w-100 m-0 px-3 py-2 position-relative">
                        <div class="w-20vw h-20vw my-auto">
                            <imagen :clase="`border-radius-50 border-${f.data.usuario.nivel}-3`" :user="true" :src="f.data.usuario.foto" :fit="true" />
                        </div>
                        <div class="col pl-3 pr-0 my-auto">
                            <div class="row w-100 m-0 letra-gray4-17">{{f.data.usuario.nombre}}</div>
                            <div class="row w-100 m-0 letra-gray3-15">{{f.data.usuario.nombre}} te hizo un regalo</div>
                            <div class="row w-100 m-0 letra-azul1-13">{{[f.data.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                        </div>
                        <div class="row w-100 m-0 position-absolute top-0px left-0px">
                            <div class="col-auto px-3 back-color-rojo letra-blanco-15 border-br-radius-15px">Regalo</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 py-2 pl-3">
                        <div class="row w-100 m-0" v-if=" f.data.productos && f.data.productos.length ">
                            <div class="row w-100 m-0 letra-gray3-15">Productos</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3 py-2" v-for="u of f.data.productos" :key="u.id">
                                    <div class="w-10vw h-10vw">
                                        <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                                    </div>
                                    <div class="col my-auto px-0 pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{u.nombre}}</div>
                                    </div>
                                </div>
                            </div>
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
        };
    },
    props:[
        'data',
    ],
    computed:{
        router(){ return this.$store.getters.getRouter; },
        f(){ return this.data || {} },
        eventos(){ return this.f.data.eventos || {} },
        productos(){ return this.f.data.productos || {} },
        creador(){ return this.f.data.usuario || {} },
        users(){ return this.f.data.users || {} },
    },

    methods:{
        verRegalo(e){
            this.info = e;
            this.$emit('input', e);
            this.$store.commit('openModal',['modalRegalo']);
        },
    },
}
</script>