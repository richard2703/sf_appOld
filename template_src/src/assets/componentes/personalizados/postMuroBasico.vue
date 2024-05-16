
<template>
    <div class="row w-100 m-0">
        <div class="row w-100 m-0 " :class="pad?pad:'px-3 py-1 '" >
            <div class="row w-100 m-0 carta border-radius-20px overflow-hidden back-color-fondo " 
                :class="'border-rojo0'" @click="verProd()">
                <div class="row w-100 m-0 position-relative">
                    <div class="w-25vw h-42vw" >
                        <imagen v-if="imagen" clase="" :create="!(imagen && imagen.includes('http'))" :src="imagen" :fit="true" />
                        <imagen v-else clase="" src="https://socialflow.app/backend/apiv1/img/b1.png" :fit="true" />
                    </div>
                    <div class="col my-auto px-0 pl-3">
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 pt-5px">
                                <div class="w-37px h-37px my-auto">
                                    <imagen clase="border-radius-50" :user="1" :src="usuario.foto" :fit="1" />
                                </div>
                                <div class="col my-auto px-0 pl-2">
                                    <!-- {{ usuario.foto }} -->
                                    <div class="row w-100 m-0  letra-gray4-15 text-capitalize">{{usuario.nombre}}</div>
                                </div>
                            </div>
                            <template v-if="deve" >
                                <div v-if="id" class="row w-100 m-0 pt-1 letra-gray3-15 " >{{id}}</div>
                                <!-- <div v-if="tipex" class="row w-100 m-0 pt-1 letra-gray3-15 " >{{tipex}}</div> -->
                            </template>
                            <div v-if="texto" class="row w-100 m-0 pt-1 letra-gray3-15 " >{{texto}}</div>
                            <div v-if="nombre" class="row w-100 m-0 pt-1 letra-azul1-15 fw-800 text-capitalize " >{{nombre}}</div>
                            <div v-if="post"  class="row w-100 m-0 pt-1 letra-azul1-15 fw-800 text-capitalize " >{{post | truncate(65)}}</div>
                            <div v-if="pie"  class="row w-100 m-0 pt-1 letra-gray3-14 text-capitalize pr-4 pb-2"  >{{pie}}</div>
                        </div>
                        <div class="row w-100 m-0 h-20px"></div>
                    </div>

                    <div class="row w-100 m-0 position-absolute bottom-5px left-0px">
                        <div class="col-auto ml-auto px-3 letra-blanco-14 fw-600 border-tl-radius-15px border-bl-radius-15px text-capitalize" 
                            :class="`back-color-${color}`" >{{nota}}</div>
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
        };
    },
    props:[    
        'imagen',
        'usuario',
        'id',
        'tipex',
        'texto',
        'nombre',
        'post',
        'pad',
        'pie',
        'nota',
        'color',
    ],
    computed:{
        deve(){return this.$store.getters.deve;},
    },
    methods:{
        change(e){
            this.$emit('input',e.target.checked);
            this.$emit('change',e.target.checked);
        },
        verProd(){

        },
    },
}
</script>