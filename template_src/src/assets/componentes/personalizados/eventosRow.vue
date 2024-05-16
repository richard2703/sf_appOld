<template>
<div class="row w-100 m-0" >
    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">

        <div class="row w-100 m-0"  v-if="externo" @click="$emit('set',a)" >
            <div class="w-22vw h-22vw back-color-rojo border-radius-10px align-content-center">
                <div class="row w-100 m-0 letra-blanco-39 fw-800 justify-content-center text-center text-capitalize" >{{ x.fecha | moment('DD')}}</div>
                <div class="row w-100 m-0 letra-blanco-16 fw-600 justify-content-center text-center text-capitalize" >{{ [x.fecha, 'YYYY-MM-DD'] | moment('dddd')}}</div>
            </div>
            <template v-if="0">
                <div class="w-18vw h-18vw my-auto" v-if="x.imagen">
                    <imagen :fit="true" clase="border-radius-15px" :create="true" :src="x.imagen" />
                </div>
                <div class="w-18vw h-18vw my-auto" v-else >
                    <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/img/b1.png" />
                </div>
            </template>
            <div class="col my-auto px-0 pl-3">
            <div class="row w-100 m-0 letra-gray4-17 fw-600 text-capitalize" v-if="debug">ID #{{a.id}}</div>
            <div class="row w-100 m-0 letra-gray4-17 fw-600 text-capitalize">Invitacion {{x.type}}</div>
            <div class="row w-100 m-0 letra-gray4-16">{{x.nombre}}</div>
            <div class="row w-100 m-0 letra-gray4-16">{{a.usuario.nombre}} te invito.</div>
            <div class="row w-100 m-0 letra-gray4-15 text-capitalize" v-if="x.hora">{{[x.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
            </div>
            <!-- <div class="col-auto px-0">
                <div class="row w-100 m-0">
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" editar(a) ">
                        <icono icono="edit" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
                <div class="row w-100 m-0 pt-2" >
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" eliminar(a) ">
                        <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
            </div> -->
        </div>

        <div class="row w-100 m-0" @click="click()" v-else >
            <div class="w-22vw h-22vw back-color-rojo border-radius-10px align-content-center">
                <div class="row w-100 m-0 letra-blanco-39 fw-800 justify-content-center text-center text-capitalize" >{{ a.fecha | moment('DD')}}</div>
                <div class="row w-100 m-0 letra-blanco-16 fw-600 justify-content-center text-center text-capitalize" >{{ [a.fecha, 'YYYY-MM-DD'] | moment('dddd')}}</div>
            </div>
            <template v-if="0">
                <div class="w-18vw h-18vw my-auto" v-if="a.imagen">
                    <imagen :fit="true" clase="border-radius-15px" :create="true" :src="a.imagen" />
                </div>
                <div class="w-18vw h-18vw my-auto" v-else >
                    <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/img/b1.png" />
                </div>
            </template>
            <div class="col my-auto px-0 pl-3">
            <div class="row w-100 m-0 letra-azul1-17 text-capitalize" v-if="debug">ID #{{a.id}}</div>
            <div class="row w-100 m-0 letra-gray4-19 fw-600  text-capitalize">{{a.type}}</div>
            <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
            <div class="row w-100 m-0 letra-gray4-17 text-capitalize" v-if="a.hora">{{[a.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
            </div>
            <!-- <div class="col-auto px-0">
                <div class="row w-100 m-0">
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" editar(a) ">
                        <icono icono="edit" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
                <div class="row w-100 m-0 pt-2" >
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" eliminar(a) ">
                        <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
            </div> -->
        </div>

        <div class="row w-100 m-0">
            <div class="col-auto letra-rojo-18 ml-auto" v-if="!detalles" @click.stop="detalles = true">Ver mas</div>
            <div class="col-auto letra-rojo-18 ml-auto" v-else  @click.stop="detalles = false" >Ver menos</div>
        </div>
        <div class="row w-100 m-0 pb-3" v-if="detalles" >

            <div class="row w-100 m-0" v-if="a.lugar">
                <div class="row w-100 m-0 letra-gray3-15">Lugar</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-2">
                        <!-- <div class="w-10vw h-10vw">
                            <imagen clase="border-radius-50" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                        </div> -->
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-18">{{a.lugar}}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row w-100 m-0" v-if=" a.productos && a.productos.length ">
                <div class="row w-100 m-0 letra-gray3-15">Productos</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-2" v-for="u of a.productos" :key="u.id">
                        <div class="w-10vw h-10vw">
                            <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                        </div>
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-18">{{u.nombre}}</div>
                            <div class="row w-100 m-0 letra-gray3-16">{{u.email}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0" v-if=" a.usuarios && a.usuarios.length ">
                <div class="row w-100 m-0 letra-gray3-15">Usuarios</div>
                <div class="row w-100 m-0">
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
       'externo',
       'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter; },
        debug(){return this.$store.getters.deviceready == false; },
        a(){ return this.data || {} },
        x(){ return this.a.evento || {} },
    },
    methods:{
        click(){
            this.$emit('click');
        },
    },
}
</script>