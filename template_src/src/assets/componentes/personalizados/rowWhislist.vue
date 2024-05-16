<template>
<div class="row w-100 m-0" >
    <modalMensajeFor 
        v-if="state"
        :texto="`¿Deseas eliminar esta wishlist?`"
        :boton="'Aceptar'"
        @click="eliminar(data)"
        @close="state=false"
    />

    <div class="row w-100 m-0 my-2 border-radius-10px border-gray0-2 overflow-hidden">
        <div class="row w-100 m-0 border-b-gray0-1" >
            <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1 back-color-gray00" @click.self="detalles = !detalles">
                <div class="w-12vw h-12vw my-auto" @click="detalles = !detalles">
                    <imagen clase="border-radius-5px" :fit="true" :create="true" :src="a.imagen" />
                </div>
                <div class="col my-auto px-0 pl-3" @click="detalles = !detalles">
                    <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                    <div class="row w-100 m-0 letra-azul1-18" >{{a.type}}</div>
                </div>
                <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'lista' ">
                    <div class="row w-100 m-0" >
                        <div class="w-37px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click="nuevo(a.id)" >
                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2" >
                        <div class="w-37px border-radius-5px back-color-gray3 py-1 justify-content-center text-center" @click=" toEliminar(a) " >
                            <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                        </div>
                    </div>
                </div>
                <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'listaFecha' ">
                    <div class="row w-100 m-0" >
                        <div class="w-37px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click="nuevoF(a.id)" >
                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-2" >
                        <div class="w-37px border-radius-5px back-color-gray3 py-1 justify-content-center text-center" @click=" paraEliminarFecha(a) " >
                            <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="detalles">
                <div class="row w-100 m-0"></div>
                <div class="row w-100 m-0" v-if="!a.productos || !a.productos.length">
                    <div class="row w-100 m-0 py-2 letra-gray3-16 text-center justify-content-center">No hay productos agregados</div>
                </div>
                <div class="row w-100 m-0 pb-4">
                    <div class="row w-100 m-0 pl-3 px-3 py-1" v-for="p of a.productos" :key="p.id" :class="(a.productos.length > 1)?'border-b-gray0-1':''" @click="ver(p)" >
                        <div class="w-10vw h-10vw my-auto">
                            <imagen clase="border-radius-50" :fit="true" :src="p.imagen" v-if="p.imagen" />
                            <imagen clase="border-radius-50" :fit="true" src="https://socialflow.app/admin/apiv1/imagenes/p1.png" v-else />
                        </div>
                        <div class="col my-auto px-0 pl-3">
                            <div class="row w-100 m-0 letra-azul1-18">{{p.nombre | truncate(25)}}</div>
                            <div class="row w-100 m-0 letra-gray4-17">
                                <div class="col px-0" v-if="p.iva == '1'">x{{p.cantidad?p.cantidad:1}} {{ Number(p.precio) * 1.16 | currency}} {{(p.moneda || 'MXN').toUpperCase()}}  </div>
                                <div class="col px-0" v-else >x{{p.cantidad?p.cantidad:1}} {{ Number(p.precio) * 1 | currency}} {{(p.moneda || 'MXN').toUpperCase()}}  </div>
                                <!-- <div class="col-auto px-0">{{Number(p.precio) * 1.16 | currency}} {{p.producto.currency}}</div> -->
                                
                            </div>
                            <div class="row w-100 m-0 letra-gray4-18"></div>
                            <div class="row w-100 m-0 letra-verde6-18" v-if=" p.comprado && p.comprado.id ">Comprado</div>
                        </div>
                        <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'lista' " >
                            <div class="row w-100 m-0 pt-2" >
                                <div class="w-37px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click.stop=" $store.dispatch('postEliminarProducto', p) ">
                                    <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                </div>
                            </div>
                        </div>
                        <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'listaFecha' " >
                            <div class="row w-100 m-0 pt-2" >
                                <div class="w-37px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click.stop=" $store.dispatch('postEliminarProductoLista', p) ">
                                    <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            state: false,
            detalles: true,
        };
    },
    props:[
       'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        a(){return this.data || {}},
    },
    methods:{
        nuevo(id){
            this.$store.commit('setUsuarioData',['tipo', 'addListaX']); 
            this.$store.commit('setUsuarioData',['lista', id]);
            this.router.navigate('/regalos_listas');
        },

        ver(p){
            this.$store.commit('updateCatalogosState',['producto', p.productos_id]);
            this.router.navigate('/ver_producto_lista');
        },

        toEliminar(){
            this.state = true;
            console.log("RETROS");
        },

        paraEliminarFecha(){
            this.state = true;
        },

        eliminar(){
            console.log("DATAS", this.data.type, 'lista')
            if(this.data.type == 'lista'){
                this.$store.dispatch('postBorrarLista',this.data);
            }
            if(this.data.type == 'listaFecha'){
                this.$store.dispatch('postEliminarFecha',this.data);
            }
        },

        nuevoF(x){
            this.$store.commit('setUsuarioData',['tipo', 'agregarRegaloFecha']); 
            this.$store.commit('setUsuarioData',['lista', x]);
            this.router.navigate('/regalos_listas');
        },
       
    },
}
</script>